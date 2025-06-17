# scp

```shell
# 下载文件
scp <username>@<host>:<远程路径> <本地路径>
	 -l 4096 限速（Kbit/s，【4096 Kbit/s】 等于 【512 KB/s】）
	 -r 递归文件夹

# 上传文件
scp <本地路径> <username>@<host>:<远程路径>
```

