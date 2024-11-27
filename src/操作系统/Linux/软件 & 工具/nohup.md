# nohup

nohup 本身只是一个可执行程序，并不是 Shell 语法或内部命令，nohup 可以是进程忽略中断信号，避免因父进程或终端关闭导致进程中断

```shell
# 前台运行
# 标准输入、标准输出、标准错误都指向终端
cat
ping 127.0.0.1

# 后台运行，终端关闭时程序停止运行
# 标准输入会被关闭，标准输出和标准错误还是指向终端
cat &
ping 127.0.0.1 &

# 后台运行，终端关闭时程序停止运行
# 标准输入会被关闭，标准输出和标准错误会指向当前目录nohup.out
nohup cat &
nohup ping 127.0.0.1 &

# 后台运行，终端关闭时程序停止运行
# 标准输入会被关闭，标准输出和标准错误重定向到log.log文件
nohup cat > log.log &
nohup ping 127.0.0.1 > log.log &

# nohup与管道一起使用时，可能会出现意外之外的结果和错误
nohup <command1> | <command2> &
# 由于末尾由&结束，所以nohup <command1> | <command2>整个是在后台运行的
# 由于管道两边的命令会分开执行，所以nohup对第一个命令是生效的，对第二个命令不生效
# 解决方案一：第二个命令也加上nohup
nohup <command1> | nohup <command2> &
# 解决方案二：
nohup bash -c "<command1> | <command2>" &
# 解决方案三：
nohup $SHELL <<'EOF' &
<command1> | <command2>
EOF
# 解决方案四：将<command1> | <command2>命令写到脚本中
echo "<command1> | <command2>" > nohupScript.sh
nohup nohupScript.sh &
```

