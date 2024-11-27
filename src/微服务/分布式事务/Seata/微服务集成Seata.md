# 微服务集成Seata（RM）

## 添加依赖

```xml
<dependency>
  <groupId>com.alibaba.cloud</groupId>
  <artifactId>spring-cloud-starter-alibaba-seata</artifactId>
</dependency>
```

## 修改配置

```yaml
seata:
  registry:
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace: ""
      group: DEFAULT_GROUP
      application: seata-server
  tx-service-group: seata-demo
  service:
    vgroup-mapping:
      seata-demo: SH
```

## XA模式（强一致思想）

XA规范（X/Open XA，也称为"分布式事务处理规范"）是一种用于处理跨多个资源的分布式事务的标准化规范。它提供了一种方法，允许在分布式环境中协调多个资源管理器（通常是数据库管理系统），以确保事务的原子性、一致性、隔离性和持久性（ACID属性）。

在这个规范中，事务由一个全局事务管理器（Global Transaction Manager）来管理，它负责协调所有参与事务的资源管理器。每个资源管理器（如数据库）都有一个本地事务管理器（Local Transaction Manager），它负责管理本地资源的事务处理。所有分支事务等待全局事务一起提交或回滚，性能较差，安全性高。

### 配置

```yaml
seata:
	data-source-proxy-mode: XA
```

### 注解

```java
// 添加注解，发起全局事务，定义全局事务的范围
@GlobalTransactional
```

## AT模式（最终一致思想）

AT模式也是两阶段提交协议，于XA模式不同，分支事务在执行完后会立即提交，不会等待全局事务一起提交，此时会生成一个回滚日志undo_log（数据快照），当需要回滚时，通过回滚日志来进行反向补偿操作。所有分支事务提前提交，释放资源，性能较高。由于高并发时不安全，Seata提供一个全局锁，分支事务提交必须获取全局锁，全局锁消耗较低，不会影响性能，但还是不够安全。