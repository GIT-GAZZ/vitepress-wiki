# split

一个大文件分隔为多个小文件

```shell
split -b 512m <大文件> <小文件>
	-b 每个小文件的大小

# 会将big.zip分隔成small.zip.aa、small.zip.ab、small.zip.ac...
split -b 512m big.zip small.zip.
```

```shell
# 多个小文件合并为一个大文件
cat small.zip.* > big.zip
```

