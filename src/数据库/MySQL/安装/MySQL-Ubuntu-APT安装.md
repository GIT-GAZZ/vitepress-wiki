# MySQL-Ubuntu-通过APT安装

## 安装命令

```shell
# 更新镜像仓库信息
sudo apt update

# 搜索 MySQL 软件包
sudo apt search mysql-server

# 安装
sudo apt install -y mysql-server

# 检查mysql服务
sudo systemctl status mysql
```

默认行为：

- 自动启动 MySQL 服务
- 用户 `root` 的密码为空，可以以空密码登录

## 后续步骤

### 修改绑定地址

```shell
# 编辑配置文件
sudo vim /etc/mysql/my.cnf

# 配置项
[mysqld]
# bind-address：默认值-127.0.0.1，改成0.0.0.0，表示所有IP
bind-address = 0.0.0.0

# 重启服务
sudo systemctl restart mysql
```

### 修改配置文件

根据实际情况修改配置

```shell
# 编辑配置文件
sudo vim /etc/mysql/my.cnf

# 配置项
[mysqld]
# 解决函数无法创建的问题
log-bin-trust-function-creators=1

# 重启服务
sudo systemctl restart mysql
```

### 修改用户权限

MySQL8 默认的身份认证插件从 `mysql_native_password` 改成 `caching_sha2_password`

```mysql
-- 查询用户信息
select user, host, plugin from mysql.user;

-- 修改密码和身份验证插件
alter user 'root'@'localhost' identified with mysql_native_password by 'root';

-- MySQL5
-- 创建用户、初始化密码和身份验证插件、分配权限
grant all privileges on *.* to 'root'@'%' identified with mysql_native_password by 'root' with grant option;

-- MySQL8
-- 创建用户、初始化密码和身份验证插件
create user 'root'@'%' identified with mysql_native_password by 'root';
-- 分配权限
grant all privileges on *.* to 'root'@'%' with grant option;

-- 刷新权限
flush privileges;
```

### 防火墙（可选）

```shell
# 检查防火墙状态
sudo ufw status

# 开发端口：指定IP可以访问
sudo ufw allow from 192.168.10.254 to any port 3306
# 开发端口：指定网段可以访问
sudo ufw allow from 192.168.10.0/24 to any port 3306
# 开发端口：所有IP可以访问
sudo ufw allow 3306

# 启动防火墙
sudo ufw enable
# 关闭防火墙
sudo ufw disable
# 重启防火墙
sudo ufw reload
```

### 安全脚本（可选）

MySQL 安装文件附带一个名为 `mysql_secure_installation` 的安全配置脚本，它将通过以下方式来提升安全性：

- 设置 MySQL root 用户密码
- 删除匿名用户
- 禁止 root 用户远程登录
- 删除测试数据库
- 重新加载权限表

```shell
# 执行脚本
sudo mysql_secure_installation
```

