# Git基础

## 链接

- [官网](https://git-scm.com/)
- [官方文档](https://git-scm.com/book/zh/v2)
- [B站教程](https://www.bilibili.com/video/BV1MU4y1Y7h5?p=17&spm_id_from=pageDriver&vd_source=53294602cb119e85cf1cb4f290f57627)
- [菜鸟教程](https://www.runoob.com/git/git-tutorial.html)

## Git与SVN主要区别

* Git：分布式管理，每个客户端都保存有完整的库（包括历史版本信息），当一个客户端的库丢失且无法找回时，可以直接拷贝其他客户端的完整库
* SVN：集中式管理，中央服务器如果崩溃，则所有历史版本信息都会丢失

## 命令

### 基本命令

* 查看Git版本

  ```shell
  git -v
  git --version
  ```

* 查看帮助

  ```shell
  git help
  git help <command>
  git <command> --help
  ```
  
  > 使用-h会得到更简洁的帮助文本
