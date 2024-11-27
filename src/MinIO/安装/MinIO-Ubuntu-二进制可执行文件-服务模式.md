# MinIO-Ubuntu-二进制可执行文件-服务模式

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

3. 添加服务文件：`/usr/lib/systemd/system/minio.service`

   ```shell
   # 多行重定向
   cat <<'EOT' > /usr/lib/systemd/system/minio.service
   [Unit]
   Description=MinIO
   Documentation=https://min.io/docs/minio/linux/index.html
   Wants=network-online.target
   After=network-online.target
   AssertFileIsExecutable=/data/minio/minio
   
   [Service]
   WorkingDirectory=/data/minio
   
   User=minio-user
   Group=minio-user
   ProtectProc=invisible
   
   EnvironmentFile=-/etc/default/minio
   ExecStartPre=/bin/bash -c "if [ -z \"${MINIO_VOLUMES}\" ]; then echo \"Variable MINIO_VOLUMES not set in /etc/default/minio\"; exit 1; fi"
   ExecStart=/data/minio/minio server $MINIO_OPTS $MINIO_VOLUMES
   
   # log
   StandardOutput=append:/data/minio/log/minio.log
   StandardError=append:/data/minio/log/minio.error.log
   
   # MinIO RELEASE.2023-05-04T21-44-30Z adds support for Type=notify (https://www.freedesktop.org/software/systemd/man/systemd.service.html#Type=)
   # This may improve systemctl setups where other services use `After=minio.server`
   # Uncomment the line to enable the functionality
   # Type=notify
   
   # Let systemd restart this service always
   Restart=always
   
   # Specifies the maximum file descriptor number that can be opened by this process
   LimitNOFILE=65536
   
   # Specifies the maximum number of threads this process can create
   TasksMax=infinity
   
   # Disable timeout logic and wait until process is stopped
   TimeoutStopSec=infinity
   SendSIGKILL=no
   
   [Install]
   WantedBy=multi-user.target
   
   # Built for ${project.name}-${project.version} (${project.name})
   
   EOT
   ```

4. 创建环境变量文件：`/etc/default/minio`

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

5. 创建用户、创建数据目录、修改权限

   ```shell
   # 创建用户组
   sudo groupadd -r minio-user
   # 创建系统用户，并添加到用户组
   sudo useradd -M -r -g minio-user minio-user
   # 创建数据目录、日志目录
   sudo mkdir -p /data/minio/data
   sudo mkdir -p /data/minio/log
   # 修改权限
   sudo chown minio-user:minio-user /data/minio/data /data/minio/log
   ```

6. 启动服务、开启自启服务

   ```shell
   # 开启自启minio服务
   sudo systemctl enable minio
   # 启动minio服务
   sudo systemctl start minio
   ```

