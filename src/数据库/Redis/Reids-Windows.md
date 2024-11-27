# Redis-Windows

从 [GitHub](https://github.com/tporadowski/redis) 下载安装包直接安装，会自动安装 Windows 服务

配置文件说明

+ `redis.windows.conf`：Redis 配置文件（非服务）
+ `redis.windows-service.conf`：Redis 配置文件（服务）

修改密码

```shell
# 修改配置文件
requirepass 123456
```

