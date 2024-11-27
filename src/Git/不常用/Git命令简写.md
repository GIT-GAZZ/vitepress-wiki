# Git命令简写

[点击跳转](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-Git-%E5%88%AB%E5%90%8D)官方文档

1. 配置简写（别名）

   * 例一：

     ```shell
     git config --global alias.ci commit
     ```

     > `alias.ci` 中的 `ci` 就是简写，将 `commit` 简写成 `ci`

   * 例二：

     ```shell
     git config --global alias.unstage 'reset HEAD --'
     ```

     > `alias.unstage` 中的 `unstage` 就是简写，将 `reset HEAD --` 简写成 `unstage`

2. 使用简写

   1. 例一：

      ```shell
      git ci -m <msg>
      ```

      > 等同于 `git commit -m <msg>`

   2. 例二：

      ```shell
      git unstage <file>
      ```

      > 等同于 `git reset HEAD -- <file>`