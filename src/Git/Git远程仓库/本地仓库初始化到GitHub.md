# 本地仓库初始化到GitHub

- 创建本地仓库，并提交更改

  ```shell
  git init
  git add .
  git commit -m "初始化"
  git branch -M main
  ```

- 创建 GitHub 远程仓库，注意：不要创建 `README.md` 文件

- 关联远程仓库

  ```shell
  git remote add origin https://github.com/GIT-GAZZ/hello.git
  git push origin main:main
  ```

  