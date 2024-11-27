# Seata

Seata事务管理中有三个重要的角色：

- 事务协调者（Transaction Coordinator，TC）：本质就是Seata服务器。负责全局事务的协调和控制，管理全局事务的生命周期，协调各个参与者的事务处理，并最终决定全局事务的提交或回滚。
- 资源管理器（Resource Manager，RM）：本质就是一个一个的微服务，是一个Seata客户端。负责管理分支事务的生命周期，控制分支事务的提交和回滚，同时向事务协调器注册分支事务，并根据协调器的指令执行对应的操作。
- 事务管理器（Transaction Manager，TM）：本质就是开启全局事务的那个微服务，本身也是一个RM。定义全局事务的范围：开始全局事务、提交或回滚全局事务

<img src="https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240129183748283-74b1f768fd2f76384aa5ea8432e16b61.png" alt="image-20240129183748283" style="zoom: 50%;" />

## XA模式

XA规范（X/Open XA，也称为"分布式事务处理规范"）是一种用于处理跨多个资源的分布式事务的标准化规范。它提供了一种方法，允许在分布式环境中协调多个资源管理器（通常是数据库管理系统），以确保事务的原子性、一致性、隔离性和持久性（ACID属性）。

在这个规范中，事务由一个全局事务管理器（Global Transaction Manager）来管理，它负责协调所有参与事务的资源管理器。每个资源管理器（如数据库）都有一个本地事务管理器（Local Transaction Manager），它负责管理本地资源的事务处理。所有分支事务等待全局事务一起提交或回滚，是强一致性事务。

缺点：性能较差