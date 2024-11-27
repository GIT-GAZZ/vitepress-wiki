# MySQL配置

![image-20241112143730282](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20241112143730282-95a1f46f909ca020c5741f140519081b.png)

MySQL配置有多种形式：命令行参数、配置文件、系统变量、系统状态，下面以配置【字符集变量】为例：

- 命令行参数：--character-set-server=utf8mb4
- 配置文件：character_set_server=utf8mb4

官方文档：

- 服务选项和系统变量概述：https://dev.mysql.com/doc/refman/8.4/en/server-option-variable-reference.html
- 服务器选项：https://dev.mysql.com/doc/refman/8.4/en/server-options.html
- 服务器变量：https://dev.mysql.com/doc/refman/8.4/en/server-system-variables.html

## 配置文件

- Linux：`/etc/my.cnf`、`/etc/mysql/my.cnf`、`/etc/mysql/conf.d/*`、`/etc/mysql/mysql.conf.d/*`
- Windows：`C:\ProgramData\MySQL\MySQL Server 8.0\my.ini`，不同版本可能有所不同

## 配置相关SQL

```sql
select @@session.sql_mode;
select @@global.sql_mode;
```

## 常见配置

```properties
# MySQL8的密码策略改变了，mysql_native_password-表示使用原来的密码策略、caching_sha2_password-表示新的密码策略
default_authentication_plugin=mysql_native_password

# 字符集编码，默认：utf8mb4
# character_set_server=utf8mb4
# 排序规则，默认：utf8mb4_0900_ai_ci
# collation_server=utf8mb4_0900_ai_ci

# 设置TIMESTAMP数据类型的行为
# true（更加符合SQL标准）_字段可以为null，也可以指定默认值
# false（MySQL默认配置）_字段不能为null，默认为当前时间戳
explicit_defaults_for_timestamp=true

# 决定表名如何存储和比较（初始化数据时才生效）
# 0-存储时保留大小写，比较时区分大小写
# 1-存储时转为小写，比较时不区分大小写
# 2-存储时保留大小写，比较时不区分大小写
lower_case_table_names=1

# 错误日志
log_error=/var/log/mysql/error.log

# sql-mode
sql-mode="ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION,TIME_TRUNCATE_FRACTIONAL"

# 不配置这个，函数可能无法创建
log-bin-trust-function-creators=1
```

