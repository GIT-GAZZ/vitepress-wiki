# tar

[Linux tar 命令 | 菜鸟教程 (runoob.com)](https://www.runoob.com/linux/linux-comm-tar.html)

```shell
# 压缩
tar -cvzf name.tar.gz 文件
    -c 打包归档文件
    -v 显示详细操作过程
    -z 使用 gzip 压缩归档文件
    -f <name.tar.gz> 指定归档文件的名称
    --exclude <file> 排除文件

# 解压
tar -xvzf name.tar.gz
    -x 解包归档文件
    -v 显示详细操作过程
    -z 使用 gzip 解压归档文件
    -f 指定归档文件的名称
```

