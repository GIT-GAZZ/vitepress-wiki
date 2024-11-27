# Git标签

## 查看

```shell
git tag [-l]
	-l <tagName> # 查找标签，支持通配符匹配
```

## 两种标签

### 轻量标签（lightweight）

#### 创建

```shell
git tag <tagName>
	<hash> # 给指定提交打上标签
```

### 附注标签（annotated）

> 附注标签是存储在 Git 数据库中的一个完整对象， 它们是可以被校验的，其中包含打标签者的名字、电子邮件地址、日期时间， 此外还有一个标签信息，并且可以使用 GNU Privacy Guard （GPG）签名并验证

#### 创建

```shell
git tag -a <tagName> -m <msg>
	<hash> # 给指定提交打上标签
```

## 推送标签到远程仓库上

```shell
git push <remote简称> <tagName>
	--tags # 推送所有标签
```

## 删除标签

```shell
git tag -d <tagName>
```

## 删除远程仓库上的标签

* 方式一

  ```shell
  git push <remote简称> :refs/tags/<tagName>
  ```

  > 上面这种操作的含义是，将冒号前面的空值推送到远程标签名，从而高效地删除它

* 方式二

  ```shell
  git push <remote简称> --delete <tagName>
  ```

## 检出标签（危险操作）
