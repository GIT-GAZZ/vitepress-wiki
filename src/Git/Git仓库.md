# Git仓库

## 初始化

```shell
git init [directory]
```

## 克隆

```shell
git clone <remote_repo> [directory]
	-c # 网络代理地址，例如：-c http.proxy='http://127.0.0.1:7890'
```

## 查看文件状态

```shell
git status
	--short / -s # 精简化输出信息
	
	状态标记
        ?? 新增文件，未添加
        A  新文件已添加至暂存区
        AM 旧文件已修改并提交到暂存区
         M
        MM
```

> 简化输出时，每个文件都会显示一对状态标记，左测标记表示暂存区的状态，右侧标记表示工作区的状态，`?`表示未追踪，`A`表示新文件，`M`表示已修改

### 文件状态

- 未跟踪（Untracked，新建状态）
- 已追踪
  - 未修改（Unmodified）
  - 已修改/未暂存（Modified/Unstaged）
  - 已暂存（Staged）
  - 已提交（Committed）
  - 冲突（Conflicted）
  - 已解决


![lifecycle](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/lifecycle-b65dc1f4245a9a1230e78bac21f5ee6f.png)

## git add

这是个多功能命令：可以用它开始跟踪新文件，或者把已跟踪的文件放到暂存区，还能用于合并时把有冲突的文件标记为已解决状态等，将这个命令理解为“精确地将内容添加到下一次提交中”

```shell
git add . # 通常使用这个
git add [file] [file] ...
git add [directory]
git add * # 会无视.gitignore文件
```

## 提交

```shell
git commit [-m <message>]
	-a / -am # 修改文件后不需要执行 git add 命令，直接来提交（注意：只会提交之前就提交过的文件，新建的文件不会提交），-am是-a和-m的缩写
	--amend # 修补上一次提交
```

## 重置

```shell
git reset [HEAD] [file] # 使用本地仓库替换暂存区，可以指定文件
    --mixed # 默认，可以不用带该参数，用于重置暂存区的文件与上一次的提交(commit)保持一致，工作区文件内容保持不变
    --soft # 用于回退到某个版本
    --hard # 撤销工作区中所有未提交的修改内容【危险操作】，将暂存区与工作区都回到上一次版本，并删除之前的所有提交信息
```

## 删除

```shell
git rm <file> # 删除工作区和暂存区的文件
    --cached # 只删除暂存区
    -f # 如果删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除
    -r <directory | *> # 递归删除目录下的所有文件及目录
```

> 注意：在资源管理器中直接删除文件，并不算真正从 Git 仓库中删除，还是需要执行 `git rm` 命令

## 检出

```shell
git checkout . / git checkout -- <file> # 使用暂存区替换工作区【危险操作】
git checkout HEAD . / git checkout HEAD <file> # 使用本地仓库替换暂存区和工作区【危险操作】
```

## 差异

```shell
git diff [file] # 默认查看工作区与暂存区的差异
    --cached # 查看暂存区与版本库的差异
    HEAD # 查看工作区的与版本库的差异
    --stat # 精简化输出
    --staged
git diff [first-branch]...[second-branch] # 显示两次提交之间的差异
```

## 移动文件

```shell
git mv [file] [newFile] # 移动
    -f # 名称重复，强制移动
```

## 远程仓库

```shell
git remote # 显示远程仓库（只显示别名）
    -v # 查看仓库别名及实际URL
    add <alias> <url> # 添加仓库并设置别名
    rm <alias> # 删除仓库
    rename <old_alias> <new_alias> # 修改仓库别名
    show <alias> # 查看远程仓库信息

git fetch <alias>[/branch] # 获取更新，之后需要merge合并分支

git pull <alias> <remote_branch>[:<local_branch>]
git push <alias> <local_branch>[:<remote_branch>]
    --force 强制推送
    --delete 删除主机的分支
```

