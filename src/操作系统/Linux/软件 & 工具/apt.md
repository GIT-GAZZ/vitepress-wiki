[第 6 章 维护和更新：APT 工具 (debian.org)](https://www.debian.org/doc/manuals/debian-handbook/apt.zh-cn.html)

# APT、apt-get、apt、**<font style="color:rgb(0, 0, 0);">dpkg</font>**
+ Advanced Package Tool（APT）是 Debian 软件包管理系统的核心部分，本身不是一个独立的命令行工具，而是底层的库
+ `apt-get`、`apt-cache`、`apt-config` 等命令是传统的命令行工具，用于管理软件包
+ `apt` 是新的命令行工具，是  `apt-get`、`apt-cache`、`apt-config` 等命令的简化版和合并版（推荐使用这个）

# 常用命令
```shell
# 更新软件包信息
apt update

# 安装软件包
apt install <package_name>

# 升级所有软件包
apt upgrade
# 完整升级所有软件包（自动处理依赖项变更）
apt full-upgrade

# 自动清理旧包
apt autoremove
# 卸载软件包
apt remove <package_name>
```

# 配置
`/etc/apt/apt.conf` 是 `apt` 的主要配置文件，用于定义全局配置项，如代理、缓存、下载速度等

`/etc/apt/apt.conf.d/` 包含多个配置文件，系统或软件包可以将它们自己的 apt 配置放在这里。每个文件定义特定的配置，所有文件的设置都会被 apt 读取并生效

`/etc/apt/preferences` 通过这个文件可以控制不同软件包的优先级，比如选择从哪个源安装某个包

## 镜像仓库
`/etc/apt/sources.lis` 这是 `apt` 的主要配置文件，用于定义软件包的源地址

`/etc/apt/sources.list.d/` 该目录包含了额外的源文件，每个文件的内容格式与 `sources.list` 相同

+ 清华：[https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/](https://mirrors.tuna.tsinghua.edu.cn/help/ubuntu/)

```shell
# 备份
cp /etc/apt/sources.list /etc/apt/sources.list.bak

# 修改配置文件
vim /etc/apt/sources.list
# 将光标移动到文件的第一行（输入gg），删除从当前行到文件的最后一行的所有内容（输入dG），然后写入配置并保存（输入:wq）

# 更新
apt-get update
```

## 代理
+ 方式一：使用 Linux [全局代理](https://www.yuque.com/u41936830/gcmqmn/cc385t82able0bt4)
+ 方式二：修改 apt-get 配置

```shell
# 修改配置文件
vim /etc/apt/apt.conf

Acquire::http::proxy "http://192.168.10.9:7890";
Acquire::https::proxy "http://192.168.10.9:7890";
```

+ 方式三：安装时指定（一次性）

```shell
apt install <package> -o Acquire::http::proxy="http://192.168.10.9:7890"
```

