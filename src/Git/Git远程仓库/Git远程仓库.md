# Git远程仓库

## 查看远程仓库

默认远程仓库名称为 origin

```shell
# 列出远程仓库的简称
$ git remote
	-v # 显示对应的地址
	show <远程仓库名称> # 查看详细信息
```

## 添加远程仓库

```shell
# 默认名称：
$ git remote add <远程仓库名称> <URL>
```

## 拉取（不合并）

```shell
$ git fetch <远程仓库名称>
```

## 拉取（合并）

```shell
$ git pull
```

## 推送

```shell
$ git push <远程仓库名称> <本地分支名称>
	-u # # 推送分支，并将远程分支设置为上游分支
```

## 重命名

```shell
$ git remote rename <远程仓库旧名称> <远程仓库新名称>
```

## 移除（不可恢复）

```shell
$ git remote remove <远程仓库名称>
```

## 拉取远程的分支，但本地不切换分支（IDEA不支持这个操作）

```shell
$ git fetch <远程仓库名称> <远程分支名称>:<本地分支名称>
```

## 配置远程仓库SSH

```shell
# 生成密钥
ssh-keygen -t rsa -C 1306964897@qq.com
# 验证密钥
ssh -T git@github.com
```
