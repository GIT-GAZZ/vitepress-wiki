# Seata部署TC服务

## 下载并解压

[点击跳转GitHub](https://github.com/apache/incubator-seata/releases)下载最新压缩包，并解压到任意目录

- bin：启动文件
- conf：配置文件，包含官方提供示例
- script：官方提供的脚本，包含初始化配置中心和数据库的脚本
- ...

## 配置

[官方参数说明文档](https://seata.apache.org/zh-cn/docs/user/configurations)

Seata 的 TC 服务本身就是一个 Spring Cloud 微服务项目，需要配合注册中心和配置中心使用，配置文件目录：%SEATA_HOME%/conf/application.yml

```yaml
server:
  port: 7091
spring:
  application:
    name: seata-server

seata:
  # 配置中心
  config:
    # 支持：nacos、consul、apollo、zk、etcd3
    type: nacos
    nacos:
      server-addr: 127.0.0.1:8848
      namespace: dev
      group: DEFAULT_GROUP
      username: nacos
      password: nacos
      context-path:
      # 如果Nacos启用权限认证，则需要配置成跟Nacos的一样
      access-key: xhsl
      secret-key: xhsl
      data-id: seata-server.properties
  # 注册中心
  registry:
    # 支持：nacos、eureka、redis、zk、consul、etcd3、sofa
    type: nacos
    # 多网卡时，指定使用哪个网络
    # preferred-networks: 30.240.*
    nacos:
      application: ${spring.application.name}
      server-addr: 127.0.0.1:8848
      group: DEFAULT_GROUP
      namespace: dev
      cluster: default
      username: nacos
      password: nacos
      context-path:
      # 如果Nacos启用权限认证，则需要配置成跟Nacos的一样
      access-key: xhsl
      secret-key: xhsl
  # 存储分布式事务的相关信息，配置信息放在配置中心里
	# store:
		# 支持：file、db、redis
		# mode: file
```

配置中心的seata-server.properties配置

```properties
# Seata配置官方稳定：https://seata.apache.org/zh-cn/docs/user/configurations

# 事务分组，与application-common.yml文件的seata.tx-service-group配置对应
# 官方文档：https://seata.apache.org/zh-cn/docs/user/txgroup/transaction-group/
service.vgroupMapping.xhs-auth-group=default
service.vgroupMapping.xhs-system-group=default
service.vgroupMapping.xhs-resource-group=default
service.vgroupMapping.xhs-xhsl-group=default
service.vgroupMapping.xhs-portal-group=default

# 事务信息存储方式：file、db、redis、raft
store.mode=db
# 事务锁信息存储方式，默认取store.mode配置项值
store.lock.mode=db
# 事务会话信息存储方式，默认取store.mode配置项值
store.session.mode=db

# 当存储方式为db时
store.db.datasource=druid
store.db.dbType=mysql
store.db.driverClassName=com.mysql.cj.jdbc.Driver
store.db.url=jdbc:mysql://mysql:3306/xhsl-seata?useUnicode=true&rewriteBatchedStatements=true
store.db.user=root
store.db.password=root
store.db.minConn=5
store.db.maxConn=30
store.db.globalTable=global_table
store.db.branchTable=branch_table
store.db.distributedLockTable=distributed_lock
store.db.queryLimit=100
store.db.lockTable=lock_table
store.db.maxWait=5000

# 当存储方式为redis时
store.redis.mode=single
store.redis.host=redis
store.redis.port=6379
store.redis.password=root
store.redis.database=0
store.redis.minConn=10
store.redis.maxConn=1
store.redis.queryLimit=100
store.redis.type=pippline

```

