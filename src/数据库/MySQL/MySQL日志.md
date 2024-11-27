# MySQL日志

[MySQL ：： MySQL 8.0 参考手册 ：： 7.4 MySQL服务器日志 --- MySQL :: MySQL 8.0 Reference Manual :: 7.4 MySQL Server Logs](https://dev.mysql.com/doc/refman/8.0/en/server-logs.html)

### 常规查询日志和慢查询日志

```properties
# 日志输出类型：TABLE-日志表、FILE-文件、NONE
log_output=TABLE,FILE

# 常规查询日志
general_log=1
general_log_file=/var/log/mysql/general_query.log

# 慢查询日志
slow_query_log=1
slow_query_log_file=/var/log/mysql/slow_query.log
```

### 错误日志

```properties
log_error=/var/log/mysql/error.log
```

