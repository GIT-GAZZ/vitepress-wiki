# Git后悔药

<span style="color: red">**以下部分操作是危险操作，请做好备份**</span>❗❗

## 修补提交

修改最近一次提交，补充新的更改或修改提交信息（不能撤销更改）

```shell
git commit --amend [-m <msg>]
```

> 这个命令无法直接撤销更改，但有其他小技巧来实现，但操作比较繁琐（修改工作区，然后提交，再恢复工作区）

## 撤销暂存

```shell
git reset HEAD <file>
```

## 撤销更改（回滚）

### 使用暂存区替换工作区

```shell
# 所有文件
git checkout .
# 一个文件
git checkout -- <file>
```

### 使用版本库替换工作区

```shell
# 所有文件
git checkout HEAD .
# 一个文件
git checkout HEAD <file>
```
