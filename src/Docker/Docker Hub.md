# Docker Hub

[Docker Hub](https://hub.docker.com/)

## 登录

```shell
# 使用该命令登录Docker Hub，这样可以推送私有镜像到Docker Hub上
$ docker login
```

```shell
# 拉取镜像，Registry地址默认docker.io，表示官方Docker Hub镜像仓库，仓库名分两个部分<用户名>/<软件名>，用户名可以不写，默认library表示官方镜像，标签默认latest
$ docker pull [选项] [Registry地址/]仓库名[:标签]
# 例子
$ docker pull hello-world:latest
$ docker pull docker.io/library/hello-world:latest

# 搜索镜像
$ docker search hello-world
	# --filter=stars=N 只显示收藏数大于N的镜像（热门镜像）

# 推送镜像
$ docker push <用户名/镜像名称:标签>
```

