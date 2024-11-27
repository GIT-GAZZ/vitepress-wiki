# TLS（HTTPS）

默认加载路径：`${HOME}/.minio/certs`，其中 `${HOME}` 是运行 MinIO Server 进程的用户的家目录（系统用户可能没有家目录），私钥默认名称为 `private.key`，公共证书默认名称为 `public.crt`

自定义加载路径

- 方式一：添加启动参数

  ```shell
  minio server <其他参数> --certs-dir <证书路径>
  # 缩写形式
  minio server <其他参数> -s <证书路径>
  ```

- 方式二：添加环境变量

  ```shell
  export MINIO_CERTS_DIR=/minio/cert
  export MINIO_SERVER_TLS_CERT=/minio/cert/public.crt
  export MINIO_SERVER_TLS_KEY=/minio/cert/private.key
  ```

生成用于测试的证书：[minio/certgen: A dead simple tool to generate self signed certificates for MinIO TLS deployments (github.com)](https://github.com/minio/certgen)

```shell
certgen -host "localhost,minio-*.example.net"
```

