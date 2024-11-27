# MySQL时区

只有以TIMESTAMP类型存储的时间才会收到时区的影响（MySQL将 `TIMESTAMP` 值从当前时区转换为UTC进行存储，并从UTC转换回当前时区进行检索）

### 时区格式

- +08:00
- 时区名称，例如：UTC、MET、Asia/Shanghai、CST

### 查询MySQL时区

```sql
-- 会返回两条数据
-- system_time_zone表示当前操作系统使用的时区，在MySQL启动时确认的
-- time_zone表示当前数据库使用的时区，如果值为SYSTEM，则使用system_time_zone的值
show variables like '%time_zone%';

-- 查询当前会话的时区
select @@session.time_zone;

-- 查询全局时区
select @@global.time_zone;
```

> 安装数据库时最好设置以下时区，因为正常情况下，system_time_zone的默认值为CST，而CST在MySQL和Java中表示的时区是不一样的

### 设置时区

```sql
-- 设置当前会话的时区（重新连接会话失效）
set time_zone='+08:00';
set time_zone='SYSTEM';

-- 设置全局的时区（重启数据库失效）
set global time_zone='+08:00;
set global time_zone='SYSTEM';
```

### 修改配置中的默认时区

```properties
default-time-zone=+08:00
```

