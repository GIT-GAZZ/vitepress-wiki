# MinIO-Ubuntu-.deb安装

[官方文档](https://min.io/docs/minio/linux/index.html)

## 安装命令

```shell
# 下载安装包
sudo wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20241002175041.0.0_amd64.deb -O minio.deb
# 安装
sudo dpkg -i minio.deb
```

默认行为：

- 自动创建服务文件：`/usr/lib/systemd/system/minio.service`

  注意：由于服务文件是自动创建的，默认的配置没有保存日志
- 服务默认使用 `minio-user` 用户和用户组运行
- 服务默认加载 `/etc/default/minio` 的环境变量
- 二进制可执行文件位置：`/usr/local/bin/minio`

## 创建环境变量文件

```shell
# 多行重定向
cat <<'EOT' > /etc/default/minio
# 用户名和密码
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

# 证书相关
MINIO_DOMAIN=www.gazz.com
MINIO_CERTS_DIR=/data/minio/cert
MINIO_SERVER_TLS_CERT=/data/minio/cert/public.crt
MINIO_SERVER_TLS_KEY=/data/minio/cert/private.key

# 数据目录
MINIO_VOLUMES="/data/minio/data"

# 服务启动参数
MINIO_OPTS="--address :9000 --console-address :9001"

EOT
```

## 创建用户、修改权限

```shell
# 创建用户组
sudo groupadd -r minio-user
# 创建系统用户，并添加到用户组
sudo useradd -M -r -g minio-user minio-user
# 创建数据目录
sudo mkdir -p /data/minio/data
# 修改权限
sudo chown minio-user:minio-user /data/minio/data
```

## 启动服务、开启自启服务

```shell
# 开启自启minio服务
sudo systemctl enable minio
# 启动minio服务
sudo systemctl start minio
```

