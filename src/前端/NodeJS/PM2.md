**单机模式 分布式模式 集群模式的区别**

------

**单机模式：**

单机模式：所有业务集成在一台服务器上。例如一台服务器上的电商系统：一台服务器上同时包含了用户交互系统，商品搜索系统，后台管理系统所有的功能。例如一个餐厅的厨房只有一个人，这个人既要买菜，又要洗菜，切菜，做饭，一个人做完所有的事！ 

**分布式模式：**

分布式模式：分布式：是指多台服务器集中在一起，每台服务器都实现总体中的不同业务，做不同的事。例如多台服务器的电商系统：将用户交互系统，商品搜索系统，后台管理系统分别建到3台服务器上，以网络连接起来互相通信，共同服务。例如一个餐厅的厨房现在有3个人，分别只负责买菜，洗菜，切菜，做饭！这样的模式远远提高了效率。

但是上述分布式模式存在单点故障问题，例如电商系统的一台服务器突然故障，那么整体业务就无法工作！比如餐厅的唯一的买菜员工小王今天生病没来，那么今天餐厅就无法工作！

所有我们需要引入集群概念：比如将餐厅的每项工作的员工都安排3个人，那么今天负责餐厅买菜小王生病没来，但还是还有其他2位负责买菜的员工代替或者帮忙工作，这样餐厅还能继续工作！ 

分布式模式：分解工作，分解职能，多人做不同的事来得到最后的结果：比如要算1加到1000的结果，一个人负责1加到300的结果，一个人负责301加到600的结果，一个人负责601加到1000的结果，最后将3个结果加到一起得到最后结果！但是如果中间任何一个单点环节出现故障，就不会得到最后结果！ 

**集群模式：**

集群模式：是将分布式模式分出的单个业务又由多个人来做.将同一个业务，部署到多个服务器上，多个人在一起做同样的事：比如要算1加到1000的结果，可以安排多个人负责1加到300的结果，多个人负责301加到600的结果，多个人负责601加到1000的结果，最后将3个结果加到一起得到最后结果！避免了单点故障。分布式模式和集群模式常常配合使用。

```shell
NPX：https://zhuanlan.zhihu.com/p/269419296
PM2：https://www.cnblogs.com/zlp520/p/15675339.html

pm2 start start.js  启动node程序
pm2 start app.js --name application1  启动进程并指定应用的程序名
pm2 start start.js -i max   集群模式启动 ，-i 表示 number-instances 实例数量；max 表示 PM2将自动检测可用CPU的数量 可以自己指定数量
pm2 start app.js --name start --watch   在文件改变的时候会重新启动程序
pm2 list   简写pm2 ls   列出所有进程
pm2 delete app  指定进程名删除
pm2 delete 0   指定进程id删除
pm2 delete all  删除进程列表中所有进程
pm2 describe app   查看某个进程具体情况
pm2 monit   查看进程的资源消耗情况
pm2 restart app  重启指定名称的进程
pm2 restart all  重启所有进程
pm2 logs app   查看该名称进程的日志
pm2 logs all   查看所有进程的日志
pm2 startup centos  开启启动设置，此处是CentOS系统，其他系统替换最后一个选项（可选项：ubuntu, centos, redhat, gentoo, systemd, darwin, amazon）
pm2 save  保存
```

