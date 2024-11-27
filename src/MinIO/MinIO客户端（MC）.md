# MinIO客户端（MC）

## 安装

```shell
# 下载可执行文件
curl https://dl.min.io/client/mc/release/linux-amd64/mc \
  --create-dirs \
  -o $HOME/minio-binaries/mc

# 修改权限、添加环境变量
chmod +x $HOME/minio-binaries/mc

# 验证
mc --help
```

## 添加 `PATH` 环境变量

```shell
vim /etc/profile

export PATH="${PATH}:/usr/local/bin/minio"
```

## 常用命令

```shell
# 检查站点状态
mc stat <alias>

# 扫描仪信息
mc admin scanner info minio-local
```

### 别名

```shell
# 设置站点别名
mc alias set minio-local http://127.0.0.1:9000 minioadmin minioadmin
# 站点别名列表
mc alias list
```

### 站点复制

[官方文档](https://min.io/docs/minio/linux/reference/minio-mc-admin/mc-admin-replicate.html#)

```shell
# 配置站点复制，有数据的站点放在第一个位置
mc admin replicate add minio-local minio-backup
	--replicate-ilm-expiry 同步过期规则

# 重新同步
mc admin replicate resync start minio-local minio-backup
# 重新同步的状态
mc admin replicate resync status minio-local minio-backup
# 停止重新同步
mc admin replicate resync cancel minio-local minio-backup

# 查询站点复制配置信息
mc admin replicate info minio-local
# 查询站点复制状态
mc admin replicate status minio-local
```

### 桶复制

```shell
# 检查存储桶的复制状态
mc replicate status minio-local/1000
```

