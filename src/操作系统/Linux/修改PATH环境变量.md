# 修改PATH环境变量

方式一：

```shell
vim /etc/profile

export PATH="${PATH}:/usr/local/bin/minio"

./etc/profile
```

方式二：

```shell
echo 'export PATH="${PATH}:/data/minio/minio"' >> /etc/profile

./etc/profile
```

