终端打开时，会自动启动一个 Shell，用户在终端中输入命令，终端将命令传递给 Shell（CLI 的一部分），Shell解释并执行命令（实际是由内核执行），Shell 将输出结果返回给终端，终端将输出结果显示在屏幕上。

# 终端
终端是人与计算机交互的接口、是一种输入/输出环境，终端可以是物理终端，也可以是虚拟的模拟终端（Terminal Emulator，终端仿真器）

```shell
# 查看当前终端对应的文件
$ tyy
# 输出：/dev/pts/0

# 显示已登录的用户，以及这些用户登录的终端
# tty是物理终端，pts是虚拟终端
who
```

终端本质是一个文件，`/dev/pts/0` 就是一个虚拟终端

# Shell
Shell 是命令解释器，主要任务就是解释命令，解释顺序：命令别名 > 内部命令 > 外部命令的缓存 > 外部命令（外部命令按 `$PATH` 变量中的配置顺序查找）

## 内部命令
内部命令是 Shell 自身提供并直接执行的命令，它们在 Shell 启动时就已经加载到内存中，执行内部不会启动新的进程

+ `cd`：更改当前工作目录。
+ `echo`：输出字符串到终端。
+ `export`：设置或显示环境变量。
+ `alias`：查看所有别名，别名的优先级比内部命令还高
    - `alias <别名>=<命令>`：临时创建别名（永久的去 `.bashrc` 文件修改）
    - `unalias <别名>`：删除别名
    - 当别名跟内部命令或外部名称的名称冲突了，可以使用 `\命令`、`/路径/外部命令` 执行内部命令或外部命名，加了 `\` 表示不使用别名
+ `unset`：删除变量或函数。
+ `type`：显示命令的类型（例如，是否是内部命令），如果是外部命令，则会显示命令对应的可执行文件的位置。
    - type -a <命令>：可以找到所有同名的外部命令
+ `builtin`：运行 shell 的内部命令。
+ `exit`：退出 shell 会话。
+ `read`：从标准输入读取一行，并将其分配给变量。
+ `help`：显示所有内部命令及其帮助
+ `enable`：显示所有已启用的内部命令
    - `enable <命令>`：临时启用内部命令
    - `enable -n <命令>`：临时禁用内部命令
+ `.` 或则 `source`：在当前 Shell 进程中执行一个文件中的命令
    + 正常执行一个脚本，由于脚本内的命令是由子Shell进程解释执行的，所以脚本内的变量不会影响当前Shell
    + 如果用 `.` 或则 `source` 执行一个脚本，由于脚本内的命令是由当前Shell进程解释执行的，所以会影响当前Shell

+ `hash`：查看所有已经缓存的外部命令，并显示命中次数，退出登录时清空缓存
    - `hash -r`：清空所有缓存
    - `hash -d <命令>`：清空指定命令的缓存
+ `history`：查看命令历史记录

## 外部命令
外部命令是系统中独立存在的可执行文件，执行外部命令时，Shell 会在 `$PATH` 变量的指定路径中查找该命令，并启动一个新的进程来执行它

```shell
echo $PATH
# Ubuntu：/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

# 查找外部命令对应的可执行文件的位置
which <命令>
# 查找外部命令对应的可执行文件的位置，也显示命令的帮助文件的位置
whereis <命令>
```

当 Shell 第一次找到外部命令的的可执行文件时，就会将其缓存起来

```shell
# 查看所有已经缓存的外部命令，并显示命中次数
hash
# 已缓存的外部命令，使用type执行，会显示改命令已缓存
type cat
# 输出：cat is hashed (/usr/bin/cat)
```

## Bash Shell 配置文件
+ 登录 Shell：需要登录的 Shell 进程，比如通过登录终端或远程 SSH 登录
+ 非登录 Shell：不需要登录的 Shell 进程，已登录用户手动创建的 Shell 进程
+ `~/.bashrc`：非登录 Shell 的配置文件
+ `~/.profile`、`~/.bash_profile`：登录 Shell 的配置文件，登录时这个文件才会被执行
+ `/etc/profile`：所有用户的登录 Shell 的配置文件
+ `/etc/bash.bashrc`：所有用户的非登录 Shell 的配置文件

## 启动选项
启动 Shell 时可以通过不同的选项来控制其行为，以下是一些常见的 Shell 启动选项：

+ `h`：`hashall`，用于缓存命令的路径，以加快后续的查找
+ `i`：`interactive`，交互模式，这意味着 Shell 在用户的命令行会话中运行，允许用户输入命令和交互操作
+ `m`：`monitor`，启用后台作业监控，这使得 Shell 可以处理后台作业并发送信号
+ `B`：`braceexpand`，启用大括号扩展，这允许使用大括号 `{}` 扩展字符串（如 `{1..10}`）
+ `H`：`history`，命令执行的历史记录
+ `s`：`stdin`，从标准输入读取脚本
+ `v`：`verbose`，执行一个命令前，会先显示命令及其参数，写脚本时会用到
+ `x`：`xtrace`，脚本调试，会直接打印中间变量扩展后的值，不需要再另外打印
+ `e`：`errexit`，命令失败时退出
+ `C`：使用 IO 重定向时，是否允许覆盖文件内容

`$-` 环境变量包含了当前 Bash 中启用的所有选项，通常是 `himBHs`

这些标志可以通过 `set` 命令或使用 `shopt` 命令（针对 Bash 特定选项）进行设置或更改

```shell
# 显示当前 Shell 启动时的选项和标志的命令，通常是 himBHs
echo $-

# 列出每个选项的状态
set -o

# 启用某个选项
set -B
set -o braceexpand
# 禁用某个选项
set +B
set +o braceexpand
```

## 历史版本
+ Thompson shell：是 Unix 第一个命令解释器，功能相对有限
+ sh（Bourne shell）：最经典的 Unix shell
+ bash：目前绝大多数 Linux 发行版的默认 shell，是 GNU 项目的一部分

```shell
# 看当前系统使用的Shell类型及其所在位置
echo $SHELL
# 查看当前系统有哪些Shell
cat /etc/shells
```

