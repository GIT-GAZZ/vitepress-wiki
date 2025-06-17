# 安装和启动
+ CentOS：SSH 服务的名称是 sshd

```shell
# 更新元数据
$ yum clean all && yum makecache
# 安装SSH服务，不会自动启动
$ yum install openssh-server -y

# 检查SSH服务的状态
$ systemctl status sshd
# 启动SSH服务，注意：CentOS中SSH服务的名称是sshd
$ systemctl start sshd
# 重启SSH服务
$ systemctl restart sshd
```

+ Ubuntu：SSH 服务的名称是 ssh

```shell
# 更新软件包信息
$ apt update
# 安装SSH服务，会自动启动
$ apt install openssh-server

# 检查SSH服务的状态
$ systemctl status ssh
# 启动SSH服务
$ systemctl start ssh
# 重启SSH服务
$ systemctl restart ssh
```

# SSH 服务配置
CentOS 和 Ubuntu 的配置是一样的

```shell
# 是否允许root用户登录
# 禁止密码登录（默认）：PermitRootLogin prohibit-password
# 允许登录：PermitRootLogin yes
$ cat /etc/ssh/sshd_config | grep PermitRootLogin
# 启用密钥对验证，PubkeyAuthentication应该设置为yes
$ cat /etc/ssh/sshd_config | grep PubkeyAuthentication
# 指定公钥库文件，AuthorizedKeysFile应该设置为公钥文件，默认.ssh/authorized_keys
$ cat /etc/ssh/sshd_config | grep AuthorizedKeysFile
# 每隔N秒给客户端发送一次保活信息包给客户端
$ cat /etc/ssh/sshd_config | grep ClientAliveInterval
# 客户端活跃状态最大数量
$ cat /etc/ssh/sshd_config | grep ClientAliveCountMax

# 修改SSH配置
$ vim /etc/ssh/sshd_config
# 重启SSH服务（CentOS/Ubuntu）
$ systemctl restart sshd
$ systemctl restart ssh
```

# 公私钥配置
1. 在 Windows 生成 RSA 私钥和公钥，默认生成目录：`%USERPROFILE%/.ssh`

```shell
$ ssh-keygen -t rsa
```

2. 复制公钥到 SSH 服务器

```shell
# 方式一：在Windows上使用scp命令远程上传
$ scp "%userprofile%\.ssh\id_rsa.pub" root@ip:~/.ssh/authorized_keys

# 方式二：使用echo和通道写入公钥
$ echo 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDZ068bJPmhV/mbDx7Cav/7xGPAVecmIONJFMy5RjSoT4AAOkWqwQuQgud5IKN4WS6vDhm3OgBY9enmKE0nRNaoWVoCN+EGcAlrCmyy5Az/X/1Vgw+lbXjwPT5Uq97oNc+vkvSvp87Znsy4xHZHA3KhaQ0shiq+yzQbuZXTnDp1rXKycput7wMcOegRWQNUKabghXbHr/xytiXA4KxIacpb2djtpDAAHOWJOJYN21VGdNnUADDNKgg0YjEtJm2ezYjGcbzTtsuVUzyShqtxYGhf1cDxu+O36RpOennd/j4JdoYY1X3Zw2bJ+Y+UKwHqYlbBloif5mGD6AFdIJ5yNdqmgcUk17zcyIQc9iV3W3NfIWlCWvLlNbHofzsSuSkwUZ8AuIgr20/r+6EyCR/uV3mZiqb0csIaokmv5NkOI1f+tX+7d8CL6g8eqB/7U1t4gE2fbbfApWE49DUyD2SEzCJYq5x3lO0cAKIexm2TagUnZm6DuirHOmiMmOg9snnv86c= 1306964897@qq.com' >> ~/.ssh/authorized_keys

# 方式三：使用cat写入公钥
$ scp "%userprofile%\.ssh\id_rsa.pub" root@ip:~/.ssh/id_rsa.pub
$ cat id_rsa.pub >> ~/.ssh/authorized_keys

# 方式四：使用vim写入公钥
$ vim ~/.ssh/authorized_keys
```

3. 尝试连接

```shell
$ ssh root@ip
```

# 异常情况
+ CentOS 的 SSH 无法通过密钥对登录，只能通过密码登录

如果 CentOS 服务器上启用了 SELinux，可能需要确保 `~/.ssh` 和 `~/.ssh/authorized_keys` 文件具有正确的上下文。可以使用以下命令来恢复正确的上下文

```shell
$ restorecon -Rv ~/.ssh
```

+ Ubuntu 的 root 用户无法通过 SHH 登录：修改 SSH 的配置，使其允许 root 用户登录

