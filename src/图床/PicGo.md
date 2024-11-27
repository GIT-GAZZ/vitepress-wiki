# 入门

PicGo分为[PicGo][PicGo]（可视化界面）和[PicGo-Core][PicGo-Core]（命令行工具），PicGo-Core是PicGo的核心，PicGo-Core本质是一个NPM模块，所以PicGo-Core可以使用NPM命令安装，而PicGo是使用安装包安装

### 配置

PicGo和PicGo-Core的配置是一样的，PicGo可以在可视化界面直接修改配置

* PicGo

  默认配置文件位置：`%APPDATA%/picgo/data.json`，[点击打开](C:\Users\GAZZ\AppData\Roaming\picgo\data.json)配置文件

* PicGo-Core

  默认配置文件路径：`C:/Users/%USERNAME%/.picgo/config.json`，[点击打开](C:/Users/GAZZ/.picgo/config.json)配置文件

> 可以在官网上找到其他操作系统的默认配置文件位置

```json
{
	"picBed": {
		"github": {
			"repo": "GIT-GAZZ/typora-cloud-image",
			"token": "...",
			"path": "image/",
			"customUrl": "",
			"branch": "master"
		},
		"current": "github",
		"uploader": "github"
	},
	"picgoPlugins": {}
}
```

### 插件

PicGo的所有插件都是已`picgo-plugin-`开头，都是NPM模块，可以使用NPM命令安装，[点击查询](https://www.npmjs.com/search?q=picgo-plugin-)所有插件，[点击查看](https://github.com/PicGo/Awesome-PicGo)官方整理的插件列表，PicGo-Core跟PicGo的插件一样，只是部份插件针对可视化界面做了优化，且可视化界面中可以直接搜索安装插件

#### 常用插件

* [rename-file][rename-file]

  上传图片时重命名文件，从而保证上传相同名称的图片时不会覆盖掉之前上传的图片，导致图片错误和丢失

  ```
  配置如下：
  {origin}-{hash}
  ```

  [点击查看][rename-file]配置说明

  > 注意：PicGo的可视化界面可以开启上传图片时使用时间戳重命名，但会导致原始名称丢失，不推荐使用

* [picgo-plugin-pic-migrater](https://github.com/PicGo/picgo-plugin-pic-migrater/blob/master/README_CN.md)

  一个能将你markdown文件里的图片从一个地方迁移到另外一个图床的PicGo插件

















[PicGo-Core]: https://picgo.github.io/PicGo-Core-Doc/	"PicGo-Code中文官网"
[PicGo]: https://picgo.github.io/PicGo-Doc/	"PicGo中文官网"
[rename-file]: https://github.com/liuwave/picgo-plugin-rename-file	"rename-file插件GitHub地址"

