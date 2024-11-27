# WSL

https://learn.microsoft.com/zh-cn/windows/wsl/basic-commands?source=recommendations

### 基本命令

```shell
# 查看帮助
wsl --help

# 列出已安装的 Linux 发行版，并标记出默认的发行版
wsl --list
	--online # 列出可用的 Linux 发行版，包括已安装的
	--all # 列出已安装的 Linux 发行版，包括被注销的
	--verbose # 显示更多信息
	--running # 仅列出当前正在运行的分发版
	--quiet # 仅显示分发版名称

# 安装 Linux 发行版，默认安装默认的 Linux 发行版
wsl --install [DistributionName]
	--distribution # 指定要安装的 Linux 发行版。 可以通过运行 wsl --list --online 来查找可用的发行版
	--no-launch # 安装 Linux 发行版，但不自动启动它
	--web-download # 通过联机渠道安装，而不是使用 Microsoft Store 安装
	
# 运行或进入虚拟机
wsl --distribution <DistributionName>
	--user root # 登录root用户cd 

# 关闭虚拟机（所有）
wsl --shutdown
# 关闭虚拟机（单个）
wsl --terminate <DistributionName>
# 注销虚拟机，将会清空所有数据
wsl --unregister <DistributionName>
# 卸载
wsl --uninstall <DistributionName>

# 设置 WSL 的默认版本
wsl --set-default-version <Version>
# 设置 Linux 的默认发行版
wsl --set-default <Distribution Name>
# 检查 WSL 状态
wsl --status

# 设置WSL的版本
wsl --set-version <distribution name> <versionNumber>

# 检查WSL版本
wsl --version
# 更新WSL版本
wsl --update
```

### 虚拟机迁移、导出、备份

```shell
# 导出.tar文件
wsl --export Ubuntu F:\Ubuntu\ubuntu.tar

# 通过.tar文件导入
wsl --import Ubuntu F:\Ubuntu\ F:\Ubuntu\ubuntu.tar
# 通过.vhdx文件导入
# .vhdx文件就是虚拟机本身，所以相当于克隆虚拟机
wsl --import Ubuntu F:\Ubuntu\ F:\Ubuntu\ext4.vhdx --vhd
```

### 在Windows系统访问WSL虚拟机内的文件系统

```shell
\\wsl$\Ubuntu\
```

### 在WSL虚拟机访问Windows系统内的文件系统

```shell
# 这是c盘
/mnt/c/
# 这是d盘
/mnt/d/
```

### WSL虚拟机配置

C:\Users\GAZZ\\.wslconfig

```properties
[wsl2]
memory=14GB
swap=16GB
localhostForwarding=true
```

