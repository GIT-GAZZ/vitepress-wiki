# MinIO-Ubuntu-二进制可执行文件-非服务模式

1. 下载二进制可执行文件、修改权限

   ```shell
   sudo mkdir -p /data/minio
   sudo wget https://dl.min.io/server/minio/release/linux-amd64/minio -O /data/minio/minio
   sudo chmod +x /data/minio/minio
   ```

2. 修改 `PATH` 环境变量

   ```shell
   echo 'export PATH="${PATH}:/data/minio"' >> /etc/profile
   . /etc/profile
   ```

3. 创建启动脚本并启动

   ```shell
   # 多行重定向
   cat <<'EOT' > /data/minio/minio-start.sh
   # 用户名和密码
   export MINIO_ROOT_USER=minioadmin
   export MINIO_ROOT_PASSWORD=minioadmin
   
   # 证书相关
   export MINIO_DOMAIN=www.gazz.com
   export MINIO_CERTS_DIR=/data/minio/cert
   export MINIO_SERVER_TLS_CERT=/data/minio/cert/public.crt
   export MINIO_SERVER_TLS_KEY=/data/minio/cert/private.key
   
   # 数据目录
   export MINIO_VOLUMES=/data/minio/data
   
   # 服务启动参数
   export MINIO_OPTS="--address :9000 --console-address :9001"
   
   # 创建目录
   mkdir -p /data/minio/data
   mkdir -p /data/minio/log
   
   # 后台启动MinIO
   # nohup /data/minio/minio server ${MINIO_OPTS} ${MINIO_VOLUMES} >> /data/minio/log/minio.log 2>&1 &
   nohup /data/minio/minio server ${MINIO_OPTS} ${MINIO_VOLUMES} 1>> /data/minio/log/minio.log 2>>/data/minio/log/minio.error.log &
   
   EOT
   
   # 修改权限
   sudo chmod u+x /data/minio/minio-start.sh
   ```

4. 手动启动

   ```shell
   /data/minio/minio-start.sh
   ```
   
5. 开机启动

   ```shell
   # 检查文件是否存在，如果不存在，需要在创建文件后，添加执行权限
   cat /etc/rc.local
   ```
   
   如果文件存在，则按下方修改 `/etc/rc.local` 文件
   
   ```shell
   #!/bin/bash
   
   /data/minio/minio-start.sh
   
   exit 0
   ```
   
   如果文件不存在，可以直接执行下面的命令
   
   ```shell
   # 多行重定向
   cat <<'EOT' > /etc/rc.local
   #!/bin/bash
   
   # 执行脚本
   /data/minio/minio-start.sh
   
   exit 0
   
   EOT
   
   sudo chmod +x /etc/rc.local
   ```


## 停止或重启

```shell
ps aux | grep minio

kill <PID>
```

