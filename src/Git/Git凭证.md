# Git凭证

## Credential Helper

[官方文档](https://git-scm.com/doc/credential-helpers)

- no helper：不存储凭证

- 凭证为账号密码的
  - cache：缓存在内存中，可以指定缓存时间
  - store：保存在磁盘中，永不过期，可以指定保存位置
  - wincred：使用Windows自带的凭证管理器，[Windows Credential Manager](https://support.microsoft.com/en-us/windows/accessing-credential-manager-1b5c916a-6a16-889f-8581-fc16e8165ac0)

- OAuth认证（GitHub的Https格式的仓库，只能选择这种的）
  - manager：使用Git自带的凭证管理器，[Git Credential Manager](https://github.com/git-ecosystem/git-credential-manager)


## 设置Credential Helper

```shell
git config --global credential.helper store # 设置长期存储
git config --global credential.helper # 查看配置
```

### Credential Helper Selector

正常情况下，克隆远程仓库，会弹出Credential Helper Selector让用户选择如何存储凭证

![image-20241125152924144](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20241125152924144-4c0b27edbeaad128eb065fdad534fd57.png)

如果勾选了Always use this from now on，则下一次就不会弹出了，解决方案：

- 方案一：使用以下命令打开

  ```shell
  git credential-helper-selector
  ```

- 方案二：修改%GIT_HOME%/etc/gitconfig文件，添加如下配置

  ```properties
  [credential]
  	helper = helper-selector
  ```

  > 安装Git时，helper的默认值就是helper-selector，勾选Always use this from now on后，helper就变成别的内容了

## 密码重置

[官方文档](https://git-scm.com/docs/git-credential)、[所有命令的文档](https://git-scm.com/docs/git#_git_commands)

```shell
# 重置所有密码。也可以通过参数重置指定范围内的密码。具体请参照 git credential --help
git credential reject
protocol=https
host=github.com
```
