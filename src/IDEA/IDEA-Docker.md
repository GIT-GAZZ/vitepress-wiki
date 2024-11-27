# IDEA-Docker

[Docker |IntelliJ IDEA 文档 --- Docker | IntelliJ IDEA Documentation (jetbrains.com)](https://www.jetbrains.com/help/idea/docker.html)

[Docker tools settings | IntelliJ IDEA Documentation (jetbrains.com)](https://www.jetbrains.com/help/idea/settings-docker-tools.html)

[IDEA 一键远程部署docker服务_cannot run program "docker.exe-CSDN博客](https://blog.csdn.net/je_rry/article/details/139341785)

https://download.docker.com/win/static/stable/x86_64/

[Releases · docker/buildx (github.com)](https://github.com/docker/buildx/releases)

新版 IDEA 会内置了 Docker 插件，无需手动安装，Docker 插件依赖 Docker CLI 和 Docker Buildx 工具，需要手动安装依赖：

- 方式一（推荐）：安装 Docker Desktop，IDEA 正常情况下会自动识别 Docker Desktop 的安装路径，如果没有识别到，则需要手动设置，默认位置：`C:\Program Files\Docker\Docker\resources\bin\docker.exe`

  <img src="https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240924143700677-2fc31a3a00209187d9ae3e5608de8398-2fc31a3a00209187d9ae3e5608de8398.png" alt="image-20240924143700677" style="zoom:50%;" />

- 方式二：手动下载 [Docker CLI](https://download.docker.com/win/static/stable/x86_64/) 和 [Docker Buildx](https://github.com/docker/buildx/releases)

  - Docker CLI 可以放任意位置，IDEA 进行配置就行了
  - Docker Buildx 文件位置：`%USERPROFILE%/.docker/cli-plugins/docker-buildx.exe`