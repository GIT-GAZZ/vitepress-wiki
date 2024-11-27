# Git安装

## 压缩包方式安装

1. 下载`Git`压缩包并解压，[点击跳转](https://git-scm.com/downloads)下载页面

2. 配置环境变量

    ```shell
    GIT_HOME = D:\dev\PortableGit
    path += %GIT_HOME%\cmd
    ```

3. 验证

    ```shell
    git -v
    ```

4. 配置用户名和邮箱

    ```shell
    git config --global user.name 薛征鹏
    git config --global user.email 1306964897@qq.com
    ```

    安装完后，最好配置一下用户名和邮箱，用于记录是谁提交的版本（理论上来说不配也能提交版本，提交到远程仓库时基本都必须配置用户名和邮箱）


## 安装包方式安装

鼠标右键会有Git GUI和Git Bash两个功能

- Git GUI：图形化界面

- Git Bash：Git提供的小型Linux命令行工具

## 密钥

```shell
ssh-keygen -t rsa -C 1306964897@qq.com # 生成密钥
ssh -T git@github.com # 验证密钥
```

