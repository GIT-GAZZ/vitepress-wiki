# MongoDB 备份和恢复

[mongodump - MongoDB 数据库工具](https://www.mongodb.com/zh-cn/docs/database-tools/mongodump/)

[mongorestore - MongoDB 数据库工具](https://www.mongodb.com/zh-cn/docs/database-tools/mongorestore/)

[MongoDB数据库备份（mongodump）以及恢复（mongorestore）工具实践-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/2000614)

单例模式下，不推荐使用 `--oplog` 备份，主要用于副本集和主从架构

```shell
# 备份
mongodump \
	--username root \
	--password root \
	--authenticationDatabase admin \
	--port 27017 \
	--db xhsl \
	--out /data/gazz/backup/mongodb \
	--gzip
	
# mongodump 命令参数说明
	-h,--host 代表远程连接的数据库地址，默认连接本地Mongo数据库；
	--port 代表远程连接的数据库的端口，默认连接的远程端口27017；
	-u,--username 代表连接远程数据库的账号，如果设置数据库的认证，需要指定用户账号；
	-p,--password 代表连接数据库的账号对应的密码；
	-d,--db 代表连接的数据库；
	-c,--collection 代表连接数据库中的集合；
	-o, --out 代表导出的文件输出目录；
	-q, --query 代表查询条件；
	-j，--numParallelCollections 要并行转储的集合数（默认为4）
	--gzip 使用Gzip压缩存档；
	--oplog 使用oplog进行时间点快照；
	--authenticationDatabase 指定用户鉴定库

# 恢复
mongorestore \
	--username root \
	--password root \
	--authenticationDatabase admin \
	--port 27017 \
	--db xhsl \
	/data/gazz/backup/mongodb/xhsl

# 命令参数说明
-h,--host 代表远程连接的数据库地址，默认连接本地Mongo数据库；
--port 代表远程连接的数据库的端口，默认连接的远程端口27017；
-u,--username 代表连接远程数据库的账号，如果设置数据库的认证，需要指定用户账号；
-p,--password 代表连接数据库的账号对应的密码；
-d,--db 代表连接的数据库；
-c,--collection 代表连接数据库中的集合；
-o, --out 代表导出的文件输出目录；
--dir <目录名称>输入目录
--drop 导入前删除数据库中集合；
--gzip 解压Gzip压缩存档还原；
--oplog 重放oplog以基于时间点还原；
--oplogFile = <文件名> 指定重播oplog的oplog文件
--authenticationDatabase 指定用户鉴定库
```

