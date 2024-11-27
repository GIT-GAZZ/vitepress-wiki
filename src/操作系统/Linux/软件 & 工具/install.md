用于将文件复制到指定位置并设置文件或目录的权限和属性，该过程类似安装软件

```shell
# 复制文件并设置权限
install -m 0755 source_file /path/to/destination

# 创建目录并设置权限
install -m 0755 -d /path/to/new_directory

# 将多个文件安装到指定目录
install -m 0644 file1 file2 /path/to/destination/

# 创建目录并设置所有者（需要 root 权限）
install -o user -g group -d /path/to/directory

# 复制并重命名文件
install -m 0644 oldname /path/to/newname
```

