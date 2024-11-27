# 在 CentOS 上安装

[官方文档](https://docs.docker.com/engine/install/centos/)

## 卸载

不同版本的卸载命令可能有所不同，可以在官方文档查看

```shell
# 卸载旧版本
sudo yum remove docker \
                docker-client \
                docker-client-latest \
                docker-common \
                docker-latest \
                docker-latest-logrotate \
                docker-logrotate \
                docker-engine

# 卸载新版本
sudo yum remove docker-ce \
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

### 安装方式一：通过 yum 命令在线安装

安装完后，默认会自动启动 docker，且会创建一个 docker 用户组，但用户组下没有用户

```shell
# 安装 yum-utils 工具
sudo yum install -y yum-utils

# 默认的 yum 源只包含操作系统的组件包，不包含 Docker 的安装包，所有安装之前要先添加包含 Docker 安装包的 yum 源
# 添加官方源（网络不好可能导致部分软件包安装失败）
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
# 添加阿里云（推荐）
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 清空缓存，重新加载元数据
sudo yum clean all && yum makecache

# 安装 docker-ce，docker-ce 依赖于 docker-ce-cli、containerd.io、docker-buildx-plugin、docker-compose-plugin，所以被依赖的软件包可以省略，它会自动安装
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# 注意：可能发生异常，详情查看下方的【异常一】，或则添加“--nogpgcheck”参数进行安装
sudo yum install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin --nogpgcheck

# 检查Docker服务
sudo systemctl status docker
```

### 安装方式二：通过RPM包离线安装

[官方文档](https://docs.docker.com/engine/install/centos/#install-from-a-package)

```shell
# 查看CentOS版本
cat /etc/redhat-release

# 下载安装包
https://download.docker.com/linux/centos/7/x86_64/stable/Packages/

# 这种方式比较麻烦，后续再研究
```

## 异常情况

### 异常一

```shell
# 安装 Docker 异常，报错信息：
# warning: /var/cache/yum/x86_64/7/docker-ce-stable/packages/docker-buildx-plugin-0.11.2-1.el7.x86_64.rpm: Header V4 RSA/SHA512 Signature, key ID 621e9f35: NOKEY
# Public key for docker-buildx-plugin-0.11.2-1.el7.x86_64.rpm is not installed

# 原因：校验不通过

# 解决：关闭校验
# 修改配置文件
$ vim /etc/yum.conf # 这个是yum的主配置文件，这个文件可以不改
$ vim /etc/yum.repos.d/docker-ce.repo # 这个是镜像仓库的配置文件，这个优先级更高，只要改这个文件就行了
# 将gpgcheck的值改成0
gpgcheck=0
```

### 异常二

```shell
# 安装 Docker 异常，报错信息：
# Installing : 2:container-selinux-2.119.2-1.911c772.el7_8.noarch
# setsebool:  SELinux is disabled.

# 原因：SELinux没有开启

# 解决：开启SELinux
# 修改配置文件
$ vim /etc/selinux/config
# 将SELINUX的值改成enforcing，然后重启Linux
SELINUX=enforcing

$ cat /etc/selinux/config | grep SELINUX
```

### 异常三

由于 CentOS8 防火墙使用了 `nftables`，但 Docker 尚未支持 `nftables`， 我们可以使用如下设置：

```shell
vi /etc/firewalld/firewalld.conf

# FirewallBackend=nftables
FirewallBackend=iptables
```

或者

```shell
firewall-cmd --permanent --zone=trusted --add-interface=docker0
firewall-cmd --reload
```

## 参考文献

- [Install Docker Engine on CentOS | Docker Docs](https://docs.docker.com/engine/install/centos/)
- [CentOS Docker 安装 | 菜鸟教程 (runoob.com)](https://www.runoob.com/docker/centos-docker-install.html)