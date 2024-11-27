```json
{
    "name": "@scope/name" 模块名 @scope/名称空间 npm config set name:port 8001
    "version": "x.y.z" 版本号
    "description": "" 描述
    "keywords": ["", ""] 检索模块时用到
    "homepage": "URL" 主页
    "bugs": { 提交BUG的地址或邮箱
        "url": ""    
    }
    "license": "" 开源协议
    "funding": { 捐赠
        "type": ""
        "url": ""    
    }
    "files": ["*"] 描述了将软件包作为依赖项安装时要包括的条目，使用.npmignore文件忽略文件发布
    "main": "" 指定js入口文件，用户通过require获取，默认未index.js
    "browserslist": "" 指定该模板供浏览器使用的版本
    "bin": { 公开js文件，命令行可以直接使用
        "": ""    
    }
    "repository": { 项目的仓库url
        "type": "git",
        "url": "https://github.com/ant-design/ant-design"
    }
    "scripts": { 定义NPM脚本
        "": ""    
    }
    "config": {
        "port": "8080" 当执行npm start命令，就会引用 npm_package_config_port 环境变量
    }
    "dependencies": { 生成和开发环境的依赖
        "name": "x.y.z"    
    }
    "devDependencies": { 开发环境的依赖
        "name": "x.y.z"
    }
    "peerDependencies": { 可以解决依赖版本问题
            
    }
    "optionalDependencies": { 可选依赖（依据功能）
            
    }
    "engines": { 指明运行环境
        "node": ">=x.y.z"
        "npm": ">7.0.0"
    }
    "private": true 私人项目，不能发布项目
}

未完：https://www.jianshu.com/p/c86d511d99fd
```

