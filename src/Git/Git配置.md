# Git配置

## 配置文件

Git的配置文件分三个级别：系统、全局（用户）、本地（项目、仓库），优先级从左到右依次变高

- 系统配置：`安装目录/etc/gitconfig（%GIT_HOME%/etc/gitconfig）`

- 全局配置：`用户目录/.gitconfig（%USERPROFILE%/.gitconfig）`

- 本地配置：`仓库目录/.git/config`


## 命令

Git使用`git config`命令来操作配置文件，[点击跳转](https://git-scm.com/docs/git-config/zh_HANS-CN)官方文档

* 系统配置：git config --system
* 全局配置：git config --global、git config
* 本地配置：git config --local

### 查看c

| 命令                             | 描述                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| `git config --list --show-origi` | 查看所有配置项及其所在配置文件（可能会出现相同的配置项，最后一个生效） |
| `git config <key> --show-origi`  | 查看一个配置项及其所在配置文件                               |

### 添加和修改

| 命令                             | 描述                                           |
| -------------------------------- | ---------------------------------------------- |
| `git config <key> <value>`       | 添加或修改一个配置项                           |
| `git config --add <key> <value>` | 在不改变现有配置项的情况下，添加一个新的配置项 |

### 删除

| 命令                       | 描述           |
| -------------------------- | -------------- |
| `git config --unset <key>` | 删除一个配置项 |
