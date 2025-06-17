# NodeJS

```shell
npm -v
npm install <模块名>
	[--registry <URL>]
	[-g]
	[--save/-S/]
	[--save-dev/-D]
npm uninstall/uni <模块名> [-g] 安装模块 install可以简写i -g表示全局安装 --registry使用指定镜像安装模块

npm install npm -g 升级npm
npm install cnpm -g --registry=https://registry.npmmirror.com 从淘宝镜像全局安装cnpm，cnpm镜像默认为淘宝镜像，然后升级cnpm

npm config get registry 查看当前镜像源
npm config set registry <URL> 修改镜像源
https://registry.npmmirror.com / https://npmmirror.com
npm config set registry https://registry.npmmirror.com

cnpm模块：中国版npm，与npm用法一致
nrm
    nrm -V / nrm -version
    nrm ls 查看镜像列表
    nrl use <镜像名> 使用镜像

npm list/ls [模块名] [-g] 查看模块
npm update <模块名> 更新模块
npm search <模块名> 搜索模块

npm init 创建模块
npm adduser 需要切换到默认镜像
npm login 登录账号
npm whoami 查看账号
npm publish 发布模块

npm install . -g
npm help [command]
npm cache clear [-f] 版本7.0.0以上不需要清除缓存
npm unpublish <package>@<version> [-f]

node --version
node server.js

require('http');

var http = require('http');
http.createServer(function (request, response) {}).listen(port);
response.writeHead(200, {'Content-Type': 'text/plain'});
response.end('Hello World\n');

var fs = require("fs");
var data = fs.readFileSync('input.txt');
data.toString();

NVM笔记
环境变量
    NVM_HOME: 安装目录
    NVM_SYMLINK: 安装时设置的NodeJS路径
设置镜像命令，也可以在安装目录下的setting.txt配置
nvm npm_mirror https://npmmirror.com/mirrors/npm/
nvm node_mirror https://npmmirror.com/mirrors/node/
nvm [version | v]
nvm install <node_version>
nvm uninstall <node_version>
nvm user <node_version> 可能要以管理员身份运行
nvm list 查看已经安装的版本
nvm list installed 查看已经安装的版本
nvm list available 查看网络可以安装的版本
nvm version 查看当前的版本
nvm ls 列出所有版本
nvm user node 使用最新node版本
nvm install 安装最新版本nvm

NPM脚本 
npm run 查看所有可用NPM脚本
npm run <script> 执行脚本
    -- <param> 添加给脚本添加参数
脚本：
可以用所有Shell可执行的脚本
可以直接使用node_modules/.bin里面的所有脚本
退出码：0-正常、非0-执行失败
并行脚本：使用 & 连接脚本
继发执行：使用 && 连接脚本 只有上一个任务执行成功时，下一个任务才会执行
默认脚本：
    "start": "node server.js"，
    "install": "node-gyp rebuild"
脚本钩子（切面）：使用 && 连接钩子和脚本
    pre前缀: 在脚本之前执行，且只有pre执行成功才会执行脚本
    post前缀: 在脚本之后执行，且只有脚本执行成功才会执行post
默认钩子：
    prepublish，postpublish
    preinstall，postinstall
    preuninstall，postuninstall
    preversion，postversion
    pretest，posttest
    prestop，poststop
    prestart，poststart
    prerestart，postrestart
特殊遍历：process.env.npm_lifecycle_event，返回当前正在运行的脚本名称
特殊钩子：prepublish
    这个钩子不仅会在npm publish命令之前运行
    还会在npm install（不带任何参数）命令之前运行
    这种行为很容易让用户感到困惑
    所以 npm 4 引入了一个新的钩子prepare
    行为等同于prepublish，而从 npm 5 开始
    prepublish将只在npm publish命令之前运行
简写：
    npm start、npm stop、npm test、npm restart（npm run stop && npm run restart && npm run start）
变量：可以拿到package.json里面的字段 可以嵌套
    js:process.env.npm_package_<name>
    shell:$npm_package_<name>
    shell:npm_config_<name>
    shell:env 列出所有环境变量
    npm config get/set <name> 可以获取或者设置package.json里面的字段
常用脚本：
    // 删除目录
    "clean": "rimraf dist/*",
    // 本地搭建一个 HTTP 服务
    "serve": "http-server -p 9090 dist/",
    // 打开浏览器
    "open:dev": "opener http://localhost:9090",
    // 实时刷新
     "livereload": "live-reload --port 9091 dist/",
    // 构建 HTML 文件
    "build:html": "jade index.jade > dist/index.html",
    // 只要 CSS 文件有变动，就重新执行构建
    "watch:css": "watch 'npm run build:css' assets/styles/",
    // 只要 HTML 文件有变动，就重新执行构建
    "watch:html": "watch 'npm run build:html' assets/html",
    // 部署到 Amazon S3
    "deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",
    // 构建 favicon
    "build:favicon": "node scripts/favicon.js",
    
yarn常用命令：
npm install -g yarn
set-ExecutionPolicy RemoteSigned
get-ExecutionPolicy
yarn
yarn --version
yarn add <>
yarn remove <>
yarn cache dir 查看缓存目录
yarn cache clean 清空缓存
yarn config set registry https://registry.npmmirror.com

PM2日志Linux位置：/root/.pm2/logs/
```

