# MySQL连接参数

常用参数

- characterEncoding=utf8
- connectTimeout=1000
- socketTimeout=3000
- autoReconnect=true
- useUnicode=true
- useSSL=false
- serverTimezone=Asia/Shanghai

MySQL8.0相关参数

- allowPublicKeyRetrieval=true

优化相关参数

- rewriteBatchedStatements=true

  优化批量插入操作，通过重写 SQL 语句提高性能

- zeroDateTimeBehavior=convertToNull

  将数据库中的零日期转换为 Java 的 `null` 值