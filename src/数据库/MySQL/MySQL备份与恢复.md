# MySQL 备份与恢复

[Mysql数据库导入命令Source详解_source导入数据库-CSDN博客](https://blog.csdn.net/qq_41848006/article/details/89049374)

[学习MySQL备份一篇就够了！！！（完全备份、增量备份、备份恢复）_mysql备份数据库-CSDN博客](https://blog.csdn.net/qyf158236/article/details/109220563)

## Windows

```shell
mysqldump -R -uroot -proot --databases "falcon-dev" > "C:\Users\13069\Desktop\falcon-dev.sql"
```

