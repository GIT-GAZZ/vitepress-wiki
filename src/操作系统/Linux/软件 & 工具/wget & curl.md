# wget

```shell
# 下载文件
wget <URL>
	-O 保存目录和名称，默认当前目录和文件原名，目录必须存在
	-P 保存目录，目录必须存在
	--limit-rate 限制下载速度
	-c 断点续传
```

# curl

```shell
# 请求URL，默认将响应结果打印到标准输出中
curl <URL>
	-O 下载文件，指定保存目录和名称，目录必须存在
	--create-dirs 下载文件时，创建不存在的目录
	-f 请求错误时不会输出任何内容，DockerCompose健康检查会用到
```

