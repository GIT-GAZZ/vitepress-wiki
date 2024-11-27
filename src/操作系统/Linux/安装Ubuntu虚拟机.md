# 安装Ubuntu虚拟机

1. 修改 root 用户的密码

   ```shell
   sudo passwd root
   ```

2. 找不到 ifconfig 命令

   ```shell
   # 更新镜像仓库信息
   sudo apt update
   # 安装工具
   sudo apt install -y net-tools
   ```

3. <font style="color:rgb(51, 51, 51);">默认情况下，SSH 不允许 root 登录，需要</font>修改 SSH 服务的配置

   ```shell
   # 是否允许root用户登录
   # 禁止密码登录（默认）：PermitRootLogin prohibit-password
   # 允许登录：PermitRootLogin yes
   cat /etc/ssh/sshd_config | grep PermitRootLogin
   
   # 修改SSH配置
   vim /etc/ssh/sshd_config
   # 重启SSH服务
   systemctl restart ssh
   ```

