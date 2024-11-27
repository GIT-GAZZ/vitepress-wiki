# MySQL 用户

## 修改用户密码

已知旧密码，或者旧密码为空

```mysql
# 方式一：使用 mysqladmin 工具修改
sudo mysqladmin -u root -p <old_password> password <new_password>

# 方式二：进入 MySQL 后，通过 SQL 修改
sudo mysql -u root -p
alter user 'root'@'localhost' identified by 'new_password';

# 方式三：进入 MySQL 后，通过 SQL 修改
sudo mysql -u root -p
set password for 'root'@'localhost' = 'new_password';
```

