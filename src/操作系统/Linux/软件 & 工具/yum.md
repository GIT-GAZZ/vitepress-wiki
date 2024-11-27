Yum 是基于 RPM（Red Hat Package Manager）的 Linux 系统上用于管理软件包的包管理工具，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包。

# 配置
Yum 的配置分为两个部分：全局配置（main）、仓库配置（repository），仓库配置的优先级更高

+ 全局配置：`/etc/yum.conf`
+ 仓库配置：`/etc/yum.repos.d/*.repo`，一个配置文件可以配置多个镜像仓库

```properties
[main]
# 下载的RPM包的缓存目录
cachedir=/var/cache/yum
# 缓存是否保存：0-否、1-是
keepcache=0
# 调试级别（0-10），默认为2
debuglevel=2
# 日志文件位置
logfile=/var/log/yum.log
# 在更新的时候，是否允许更新不同版本的RPM包，比如是否在i386上更新i686的RPM包
exactarch=1
# 这是一个update的参数，具体请参阅yum(8)，简单的说就是相当于upgrade，允许更新陈旧的RPM包
obsoletes=1
# 是否校验文件：0-否、1-是
gpgcheck=1
# 是否允许使用插件：0-否、1-是
plugins=1
# 允许保留多少个内核包
installonly_limit=3
# 屏蔽不想更新的RPM包，可用通配符，多个RPM包之间使用空格分离
exclude=selinux*
```

```properties
# 配置文件中会用到两个常量
# $releasever表示当前系统的发行版本，CentOS 7系统下的$releasever等于7
# $basearch表示当前系统的CPU架构类型，通常等于x86_64

# 镜像仓库唯一标识符
[base]
# 镜像仓库名称描述
name=CentOS-$releasever - Base - mirrors.aliyun.com
# 镜像仓库地址
baseurl=http://mirrors.aliyun.com/centos/$releasever/os/$basearch/
        http://mirrors.aliyuncs.com/centos/$releasever/os/$basearch/
        http://mirrors.cloud.aliyuncs.com/centos/$releasever/os/$basearch/
# 是否可用：0-否、1-是
enabled=1
# 是否校验文件：0-否、1-是
gpgcheck=1
# 校验时需要用到的签名文件地址
gpgkey=http://mirrors.aliyun.com/centos/RPM-GPG-KEY-CentOS-7
# 指定在多个镜像源之间进行故障切换（failover）的方法：roundrobin-轮询、priority-优先级、random-随机
failovermethod=priority
```

# 镜像仓库
Yum 镜像仓库用于存放各种 RPM 包以及软件包之间的依赖关系

```shell
# 备份原始配置文件
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup_`date +%Y%m%d%H%M%S`

# 下载阿里云镜像仓库的配置文件
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
# 下载网易163镜像仓库的配置文件
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.163.com/.help/CentOS7-Base-163.repo

# yum clean all用于清理所有缓存，包括已下载的软件包、头文件和元数据
# yum makecache用于生成镜像仓库的元数据缓存，执行此命令会下载镜像仓库中的软件包列表和相关信息，以加速后续的yum操作，如搜索软件包和执行安装操作，这样可以提高软件包管理的效
yum clean all && yum makecache

# 查看所有镜像仓库列表
yum repolist all
# 查看已启用的镜像仓库列表，enabled可以省略
yum repolist enabled
# 查看已禁用的镜像仓库列表
yum repolist disabled
```

# 命令
```shell
# 安装指定软件
# -y：自动确认所有提示，无需手动输入
yum install -y <package_name>

# 检查更新
yum check-update
# 更新指定软件
yum update <package_name>
# 更新所有软件
yum update

# 移除指定软件
yum remove <package_name>

# 列出所有软件，包括未安装的
yum list
# 列出已安装的软件
yum list installed
# 判断指定软甲是否安装
yum list installed | grep <软件名>
# 获取软件信息（未安装的也会获取），可以判断是否安装
yum info <软件名>
# 查找软件
yum search <keyword>

# 清除所有缓存，包括软件包、软件包头文件、元数据等等
yum clean all
# 生成镜像仓库的元数据缓存，执行此命令会下载镜像仓库中的软件包列表和相关信息，以加速后续的yum操作，如搜索软件包和执行安装操作，这样可以提高软件包管理的效
yum makecache

# 搜索
yum search ifconfig
```

# 插件
## yum-utils
yum-utils 是一组用于扩展和增强 Yum 包管理器功能的工具集合，提供了额外的命令和插件，用于包管理和系统维护。[参考文献](https://www.cnblogs.com/ryanpan/p/16422240.html)

```shell
# 安装yum-utils
yum install -y yum-utils
# yum-config-manager是yum-utils提供的一个工具，用于管理yum配置文件中的软件源。它允许用户添加、启用、禁用、删除或显示系统中的软件源配置，提供了对 `yum` 软件源管理的便捷命令

# 添加阿里云镜像仓库的配置文件（本质还是在/etc/yum.repos.d/目录下添加配置文件）
sudo yum-config-manager --add-repo https://mirrors.aliyun.com/repo/Centos-7.repo
# 添加网易163镜像仓库的配置文件（本质还是在/etc/yum.repos.d/目录下添加配置文件）
sudo yum-config-manager --add-repo http://mirrors.163.com/.help/CentOS7-Base-163.repo

# yum clean all用于清除所有缓存，包括软件包、软件包头文件、元数据等等
# yum makecache用于生成镜像仓库的元数据缓存，执行此命令会下载镜像仓库中的软件包列表和相关信息，以加速后续的yum操作，如搜索软件包和执行安装操作，这样可以提高软件包管理的效率
yum clean all && yum makecache

# 启用镜像仓库
yum-config-manager --enable repository_name
# 禁用镜像仓库
yum-config-manager --disable repository_name
# 删除镜像仓库配置文件
rm -f /etc/yum.repos.d/<file>
```

## yum-plugin-downloadonly
下载软件的 RPM 包

```shell
yum install yum-plugin-downloadonly
yum install --downloadonly --downloaddir=/root/rpm <package-name>
```

## fastestmirror
这个插件的作用是通过测量各个镜像源的响应时间，自动选择最快的镜像源进行软件包下载

```shell
$ yum install -y fastestmirror
```

