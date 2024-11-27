# MongoDB-Ubuntu-APT安装

[官方文档](https://www.mongodb.com/zh-cn/docs/manual/tutorial/install-mongodb-on-ubuntu/)

## 安装命令

```shell
# 更新镜像仓库信息
sudo apt update

# 安装 gnupg 和 curl
sudo apt install -y gnupg curl

# 导入 MongoDB 公共 GPG 密钥
sudo curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# 将 MongoDB 的软件源添加到 Apt 源列表中
sudo echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# 更新镜像仓库信息
sudo apt update

# 安装
sudo apt install -y mongodb-org
```

默认行为：

- 不会创建任何用户，包括 root、admin 这类超级用户，任何人都可以访问

- 数据目录：`/var/lib/mongodb`
- 日志目录：`/var/log/mongodb`
- 配置文件：`/etc/mongod.conf`

## 后续步骤

### 修改绑定地址

```shell
# 编辑配置文件
sudo vim /etc/mongod.conf

# 配置项
# net.bindIp：默认值-127.0.0.1，改成0.0.0.0，表示所有IP
net:
	bindIp: 0.0.0.0

# 重启服务
sudo systemctl restart mongod
```

### 安全

#### 创建用户

```javascript
// 切换到 admin 数据库
use admin
// 创建数据库
db.createUser({
    // 用户名
    user: "root",
    
    // 会提示手动输入密码
    pwd: passwordPrompt(),
    // 明文密码
    // pwd: "...",
    
    // 角色：超级用户
    roles: [ "root" ]
})
```

#### 开启身份认证

```shell
# 编辑配置文件
sudo vim /etc/mongod.conf

# 配置项
security:
  authorization: enabled

# 重启服务
sudo systemctl restart mongod
```

