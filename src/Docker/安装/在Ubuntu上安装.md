# 在 Ubuntu 上安装

[官方文档](https://docs.docker.com/engine/install/ubuntu/)

## 卸载

不同版本的卸载命令可能有所不同，可以在官方文档查看

```shell
# 卸载可能冲突的软件包
# Docker Engine 依赖于 containerd 和 runc。Docker Engine 将这些依赖项捆绑为一个捆绑包：containerd.io。如果您之前安装了 containerd 或 runc，请卸载它们以避免与 Docker Engine 捆绑的版本冲突
sudo apt remove docker.io \
                docker-doc \
                docker-compose \
                docker-compose-v2 \
                podman-docker \
                containerd \
                runc

# 卸载旧版本
sudo apt remove docker-ce \
                docker-ce-cli \
                containerd.io \
                docker-buildx-plugin \
                docker-compose-plugin \
                docker-ce-rootless-extras

# 删除镜像、容器、卷和自定义配置文件等等
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

## 安装 

### 安装方式一：通过 apt 命令在线安装

安装完后，默认会自动启动 docker，且会创建一个 docker 用户组，但用户组下没有用户

```shell
# 更新镜像仓库信息
sudo apt update
# 安装软件：ca-certificates（用于验证 SSL 证书）、 curl（用于从 URL 下载文件）
sudo apt install -y ca-certificates curl

# 创建文件夹，并设置权限，用于存放 GPG 密钥
sudo install -m 0755 -d /etc/apt/keyrings
# 下载 Docker 的 GPG 密钥
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
# 设置权限
sudo chmod a+r /etc/apt/keyrings/docker.asc

# 将 Docker 的软件源添加到 Apt 源列表中
# /etc/apt/sources.list.d/docker.list 文件多了一行配置：deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable
# /etc/os-release 文件以键值对的形式保存系统版本信息，可以通过 `. /etc/os-release` 命令执行这个文件，将文件中的每一个键值对都作为环境变量加载到当前 Shell 会话中，供后续的命令使用
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新镜像仓库信息
sudo apt update

# 安装 Docker 软件包
sudo apt install -y \
  docker-ce \
  docker-ce-cli \
  containerd.io \
  docker-buildx-plugin \
  docker-compose-plugin

# 检查Docker服务
sudo systemctl status docker
```

### 安装方式二：离线安装

[官方文档](https://docs.docker.com/engine/install/ubuntu/#install-from-a-package)

```shell
# 待补充
```

## 异常情况

### 异常一

```shell
# 待补充
```