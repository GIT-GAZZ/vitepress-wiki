# MySQL事务和锁

## 前置知识点

- InnoDB一定存在聚簇索引，默认以主键作为聚簇索引
- 有几个索引，就有几棵B+树(不考虑hash索引的情形)
- 聚簇索引的叶子节点为磁盘上的真实数据。非聚簇索引的叶子节点还是索引，指向聚簇索引B+树

> [测试脚本](#测试脚本)

## 锁（RR隔离级别）

大部分SQL的执行，都要求当前事务先获取相关数据的若干个锁，当获取完所需要的锁后，SQL才会执行，否者将会阻塞等待。

### 一致性读

- 非锁定读（快照读）

  ```sql
  select ...;
  ```

  > 一致性由多版本并发控制（MVCC）机制实现
  >
  > 因为读取的是快照版本，所以不受行锁的影响，但会受到表锁的影响

- 锁定读（当前读）

  ```sql
  select ... lock in share mode;
  select ... for share;
  select ... for update;
  ```

  > 一致性由行锁实现
  >
  > 嵌套SQL，当父SQL是锁定读，且子SQL是非锁定读，则不会锁定子SQL查询的表，子SQL必须显式指定为锁定读

### 行锁-Row Lock（记录锁-Record Lock、正经记录锁-REC_NOT_GAP）

只有InnoDB支持，行锁是加在索引上而不是行上，InnoDB一定存在聚簇索引，因此行锁最终都会落到聚簇索引上

- S锁（共享锁-Shared Lock、读锁-Read Lock）

  同一行数据可以拥有多个S锁

  ```sql
  select ... lock in share mode;
  select ... for share;
  ```

- X锁（排他锁/独占锁-Exclusive Lock，写锁-Write Lock）

  同一行数据最多拥有一个X锁，且不能同时拥有S锁

  ```sql
  select ... for update;
  insert ...;
  update ...;
  delete...;
  ```

- 行锁兼容性

  S锁上可以再加S锁，不能再加X锁，X锁上不可以再加任何锁

  |      | S锁                                   | X锁                                 |
  | ---- | ------------------------------------- | ----------------------------------- |
  | S锁  | <span style="color:green">兼容</span> | <span style="color:red">冲突</span> |
  | X锁  | <span style="color:red">冲突</span>   | <span style="color:red">冲突</span> |

### 表锁（Table Lock）

- S锁（共享锁-Shared Lock、读锁-Read Lock）

  同一个表可以拥有多个S锁

  ```sql
  -- 获取表级共享锁
  lock tables ... read;
  -- 释放锁
  unlock tables;
  ```

- X锁（排他锁/独占锁-Exclusive Lock，写锁-Write Lock）

  同一个表最多拥有一个X锁，且不能同时拥有S锁

  ```sql
  lock tables ... write;
  unlock tables;
  ```

- I锁（Intention Lock-意向锁）

  意向锁表示当前表准备或正在做什么，当其他事务需要加表锁时，可以通过意向锁快速判断是否可以加锁，不需要进入到表内部的每一行去判断

  - 意向共享锁（IS锁）：一个事务在获取（任何一行/或者全表）S锁之前，一定会先在所在的表上加IS锁，或更高级别的锁
  - 意向排他锁（IX锁）：一个事务在获取（任何一行/或者全表）X锁之前，一定会先在所在的表上加IX锁

- 表锁兼容性

  意向锁与其他表锁之间可能会冲突，意向锁之间不会冲突，也不会影响行锁

  |      | S锁                                   | IS锁                                  | X锁                                 | IX锁                                  |
  | ---- | ------------------------------------- | ------------------------------------- | ----------------------------------- | ------------------------------------- |
  | S锁  | <span style="color:green">兼容</span> | <span style="color:green">兼容</span> | <span style="color:red">冲突</span> | <span style="color:red">冲突</span>   |
  | IS锁 | <span style="color:green">兼容</span> | <span style="color:green">兼容</span> | <span style="color:red">冲突</span> | <span style="color:green">兼容</span> |
  | X锁  | <span style="color:red">冲突</span>   | <span style="color:red">冲突</span>   | <span style="color:red">冲突</span> | <span style="color:red">冲突</span>   |
  | IX锁 | <span style="color:red">冲突</span>   | <span style="color:green">兼容</span> | <span style="color:red">冲突</span> | <span style="color:green">兼容</span> |

- 元数据锁（Meta Data Lock，MDL）

  当对一个表做增删改查操作的时候，加MDL读锁，当要对表做结构变更操作的时候，加MDL写锁

### 页锁（Page Lock）

页锁是 MySQL 中锁定粒度介于行级锁和表级锁中间的一种锁。表级锁速度快，但冲突多，行级冲突少，但速度慢。因此，采取了折衷的页级锁，一次锁定相邻的一组记录，一般在大批量操作数据时，才会使用

### 全局锁（Global Lock）

```sql
-- 获取全局读锁
flush tables with read lock;
-- 获取全局写锁
flush tables with write lock;
-- 释放全局锁
unlock tables;
```

> 使用mysqldump备份是，也会自动添加全局锁，可以添加--single-transaction参数，启动一个事务，确保拿到一致性视图。而由于MVCC的支持，这个过程中数据是可以正常更新的。

### 间隙锁（Gap Lock）

对索引的间隙加锁，是左开右开的区间，只会阻塞 `insert ...` 语句，间隙锁之间不互相冲突，隔离级别为RR或S的事务才会使用间隙锁

- ~~`select ... for share`、`select ... for update`、`update ...`、`delete ...`~~
  - ~~有且只有一个搜索条件，且是唯一索引：不加间隙锁，只加记录锁~~
  - ~~其他搜索条件：使用间隙锁或临键锁~~

执行SQL（不包括insert）时，其结果不受其他事务的插入操作影响，则不会添加间隙锁

### 临键锁（next-key lock）

是间隙锁+记录锁的组合，注意：间隙只能是记录前面的间隙，是一个左开右闭的区间

每个索引（除了空间索引）都带有临键锁（包括正无穷伪索引），遍历索引时，是按临键锁为基本单位进行遍历和加锁得

实际加锁时，会根据搜索条件，将临键锁退化成记录锁或间隙锁

### 插入意向锁（Insert Intention Lock）

插入意向锁是一种特殊得间隙锁，只有在插入操作时才会添加插入意向锁，插入意向锁之间不会冲突，插入意向锁跟意向锁会冲突

### 自增锁（AUTO-INC Lock）

`AUTO-INC` 锁是一种特殊的表级锁

### 空间索引得谓词锁

空间索引无法排序，也就没有临键锁，特引入谓词锁





## 测试脚本

- 初始化

  ```mysql
  drop table if exists t_user;
  create table t_user
  (
      id      bigint                                                       not null auto_increment comment 'ID',
      dept_id bigint                                                       not null comment '部门ID',
      name    varchar(32) character set utf8mb4 collate utf8mb4_0900_ai_ci not null comment '名称',
      remark  varchar(64) character set utf8mb4 collate utf8mb4_0900_ai_ci default null comment '备注',
      primary key (id) using btree,
      unique key name (name) using btree
  ) engine = innodb
    auto_increment = 7
    default charset = utf8mb4
    collate = utf8mb4_0900_ai_ci
    row_format = dynamic comment ='用户';
  
  drop table if exists t_dept;
  create table t_dept
  (
      id     bigint                                                       not null auto_increment comment 'ID',
      name   varchar(32) character set utf8mb4 collate utf8mb4_0900_ai_ci not null comment '名称',
      remark varchar(64) character set utf8mb4 collate utf8mb4_0900_ai_ci default null comment '备注',
      primary key (id) using btree,
      unique key name (name) using btree
  ) engine = innodb
    auto_increment = 7
    default charset = utf8mb4
    collate = utf8mb4_0900_ai_ci
    row_format = dynamic comment ='部门';
  
  drop table if exists t_sequence;
  create table t_sequence
  (
      sequence_name varchar(64) character set utf8mb4 collate utf8mb4_0900_ai_ci not null comment '序列名称',
      current_value bigint                                                       not null comment '当前序列号（上一次生成的序列号）',
      update_time   datetime                                                     not null comment '更新时间',
      primary key (sequence_name) using btree,
      unique key sequence_name (sequence_name) using btree
  ) engine = innodb
    default charset = utf8mb4
    collate = utf8mb4_0900_ai_ci comment ='序列表';
  
  insert into t_user (id, dept_id, name, remark)
  values (1, 1, '一一', '一一的备注'),
         (2, 1, '二二', '二二的备注'),
         (3, 1, '张三', '张三的备注'),
         (4, 1, '李四', '李四的备注'),
         (5, 1, '王五', '王五的备注'),
         (6, 1, '赵六', '赵六的备注'),
         (7, 1, '孙七', '孙七的备注'),
         (8, 1, '周八', '周八的备注'),
         (9, 1, '吴九', '吴九的备注');
  
  insert into t_dept (id, name, remark)
  values (1, '研发部', '研发部的备注');
  
  insert into t_sequence (sequence_name, current_value, update_time)
  values ('custom', 1, now());
  ```

- 会话一

  ```mysql
  # 查询引擎状态信息，包含事务信息
  # show engine innodb status\g;
  
  lock tables t_user read;
  lock tables t_user write;
  unlock tables;
  
  # 用例-1
  # 不会加间隙锁（唯一索引，其他事务无法插入相同索引的数据）
  # 会加行级共享锁（其他事务无法写入）
  begin;
  select *
  from t_user
  where id = 4 for share;
  
  select *
  from performance_schema.data_locks
  where object_name = 't_user';
  rollback;
  
  # 用例-2
  # 不会加间隙锁（唯一索引，其他事务无法插入相同索引的数据）
  # 会加行级排他锁（其他事务无法读写）
  begin;
  select *
  from t_user
  where id = 4 for
  update;
  
  select *
  from performance_schema.data_locks
  where object_name = 't_user';
  rollback;
  
  # 用例-3
  # 不会加间隙锁（唯一索引，其他事务无法插入相同索引的数据）
  # 会加行级排他锁（其他事务无法读写）
  begin;
  select *
  from t_user
  where id > 3
    and id <= 5 for
  update;
  
  select *
  from performance_schema.data_locks
  where object_name = 't_user';
  rollback;
  
  # 用例-4
  # 不会加间隙锁（唯一索引，其他事务无法插入相同索引的数据）
  # id:3和id:4会加行级共享锁（其他事务无法修改）
  begin;
  select *
  from t_user
  where id = 3
     or id = 4 for share;
  
  select *
  from performance_schema.data_locks
  where object_name = 't_user';
  rollback;
  
  # 用例-5
  # id:3会加行级共享锁（其他事务无法修改）
  # 会加一个正无穷的间隙锁，无法插入大于当前最大id的数据
  begin;
  select *
  from t_user
  where id = 3
     or id = 999 for share;
  
  select *
  from performance_schema.data_locks
  where object_name = 't_user';
  rollback;
  
  # 用例-6
  # 不会加任何锁（无论其他事务怎么修改数据，该sql都不可能查询到数据）
  begin;
  select *
  from t_user
  where id = 3
    and id = 4 for share;
  
  select *
  from performance_schema.data_locks
  where object_name = 't_user';
  rollback;
  
  # 用例-7
  begin;
  select *
  from t_user
  where remark like '%张三%' for
  update;
  select *
  from performance_schema.data_locks
  where object_name = 't_user';
  rollback;
  
  # 用例-8
  begin;
  select *
  from t_dept
  where id = 1;
  
  insert into t_user (id, dept_id, name, remark)
  values (10, 1, '郑十', '郑十的备注');
  commit;
  rollback;
  
  
  
  # 5.7
  # select * from information_schema.innodb_locks;
  # select * from information_schema.innodb_lock_waits;
  # select * from information_schema.innodb_trx;
  # 8.0
  select *
  from performance_schema.data_locks;
  select *
  from performance_schema.data_lock_waits;
  select *
  from information_schema.innodb_trx;
  
  lock tables t_sequence read;
  lock tables t_sequence write;
  
  unlock tables;
  
  show open tables where in_use > 0;
  
  # 查看innodb引擎状态
  show engine innodb status;
  
  show status like 'table%';
  
  show status like '%lock%';
  
  set session group_concat_max_len = 10240000;
  
  begin;
  commit;
  rollback;
  
  select *
  from t_sequence
  where sequence_name = '111' for share;
  select *
  from t_sequence
  where current_value = 999 for
  update;
  select *
  from t_sequence
  where current_value = 999 for share;
  insert into t_sequence value ('test', 999, now());
  insert into t_sequence value ('111', 999, now());
  
  update t_sequence
  set update_time = now()
  where sequence_name = 'attribute_code_sequence';
  
  
  select *
  from t_sequence
  where sequence_name = 'attribute_code_sequence' for share;
  select *
  from t_sequence
  where sequence_name = 'attribute_code_sequence'
     or sequence_name = 'general_trade_code_sequence' for share;
  ```

- 会话二

  ```mysql
  lock tables t_user write;
  show open tables where in_use > 0;
  unlock tables;
  
  lock tables t_user read;
  show open tables where in_use > 0;
  unlock tables;
  
  select @@transaction_isolation;
  
  begin;
  select * from t_user where id = 3;
  rollback;
  
  begin;
  select * from t_user where id = 5 for share;
  select * from performance_schema.data_locks where object_name = 't_user';
  rollback;
  
  # 用例-8：快照读无法检测到删除
  begin;
  select * from t_user where dept_id = 1;
  delete from t_dept where id = 1;
  commit;
  rollback;
  ```

  



![image-20240523114211410](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240523114211410-ea63ec1862e340acb3809423bb2c1d47.png)



| SQL                   | 读未提交（RU） | 读已提交（RC） | 可重复读（RR） | 串行化（S） |
| --------------------- | -------------- | -------------- | -------------- | ----------- |
| insert                |                |                |                |             |
| select                |                |                | 不加锁         |             |
| select ... for share  |                |                | 行级S锁        |             |
| select ... for update |                |                | 行级X锁        |             |
| update                |                |                |                |             |
| delete                |                |                |                |             |





```sql
show processlist;
select * from information_schema.innodb_locks;
select * from information_schema.innodb_lock_waits;
select * from information_schema.innodb_trx;

show engine innodb status\G
```



NOWAIT：不阻塞，直接报错（不推荐使用）

SKIP LOCKED：不阻塞，也不报错，跳过被锁定的数据（不推荐使用）