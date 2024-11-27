# 异常问题

## <span id="root_auth">远程连接失败</span>

MySQL8 默认的身份认证插件从 `mysql_native_password` 改成 `caching_sha2_password`

### 修改用户信息

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

### 修改连接方式

```properties
# 修改连接参数（允许客户端从服务器获取公钥，不安全，会被中间人(MITM)攻击）
allowPublicKeyRetrieval=true
```

### 修改默认的身份认证插件

```properties
# 方案一：修改配置文件
default_authentication_plugin=mysql_native_password

# 方案二：修改启动参数（Docker-Compose）
--default-authentication-plugin=mysql_native_password
```

## 函数无法创建

```properties
# 报错信息
# This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators

# 解决方案：在配置文件中添加以下配置
[mysqld]
log-bin-trust-function-creators=1
```

