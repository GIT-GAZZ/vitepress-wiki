# Nacos集群

## 默认端口

| 端口 | 与主端口的偏移量 | 描述                                                       |
| ---- | ---------------- | ---------------------------------------------------------- |
| 8848 | 0                | 主端口，客户端、控制台及OpenAPI所使用的HTTP端口            |
| 9848 | 1000             | 客户端gRPC请求服务端端口，用于客户端向服务端发起连接和请求 |
| 9849 | 1001             | 服务端gRPC请求服务端端口，用于服务间同步等                 |
| 7848 | -1000            | Jraft请求服务端端口，用于处理服务端间的Raft相关请求        |

## 操作步骤

假设在同一个系统上实现集群，集群内有三个Nacos节点，端口分别是8844、8846、8848，注意：这里的端口不能是相邻的，否者偏移量为1000和1001的端口会冲突

1. 下载安装包，并拷贝三份，分别重命名为 `nacos-8844`、`nacos-8846`、`nacos-8848`

2. 修改配置文件：conf/cluster.conf，三个Nacos服务都要修改

   ```properties
   127.0.0.1:8844
   127.0.0.1:8846
   127.0.0.1:8848
   ```

   注意：如果电脑装了VM虚拟机，则系统中会多出一张虚拟网卡，导致系统编程多网卡环境，可能会导致Nacos的IP不正确，Nacos启动后会自动往cluster.conf添加一条虚拟网卡的IP进来，解决办法：修改配置文件conf/application.properties

   ```properties
   nacos.inetutils.ip-address=127.0.0.1
   ```

3. 将每个Nacos节点的端口改成自己的，配置文件：conf/application.properties

   ```properties
   server.port=8848
   ```

4. 启动命令

   ```shell
   # -p embedded表示使用内置数据源
   nacos-8844\bin\startup.cmd -p embedded
   ```

5. 编写一键启动脚本（Windows版本）

   ```bat
   REM 使用外置数据源
   start "nacos-8844" /D .\nacos-8844\bin startup.cmd
   start "nacos-8846" /D .\nacos-8846\bin startup.cmd
   start "nacos-8848" /D .\nacos-8848\bin startup.cmd
   
   REM -p embedded 使用内置数据源
   REM start "nacos-8844" /D .\nacos-8844\bin startup.cmd -p embedded
   REM start "nacos-8846" /D .\nacos-8846\bin startup.cmd -p embedded
   REM start "nacos-8848" /D .\nacos-8848\bin startup.cmd -p embedded
   
   REM -m standalone 单机模式
   REM start "nacos-8844" /D .\nacos-8844\bin startup.cmd -m standalone
   REM start "nacos-8846" /D .\nacos-8846\bin startup.cmd -m standalone
   REM start "nacos-8848" /D .\nacos-8848\bin startup.cmd -m standalone
   ```

6. 配置Nginx

   ```
   
   ```

## 可选配置

### 权限认证

修改配置文件：conf/application.properties

```properties
# 是否开启鉴权功能
nacos.core.auth.enabled=true
# 鉴权类型
nacos.core.auth.system.type=nacos
# JWT生成Token的密钥，必须以SecretKey开头，且长度至少32位，最好使用Base64加密
# 集群模式时，所有节点必须一样
nacos.core.auth.plugin.nacos.token.secret.key=自定义
# 用于替换useragent白名单的身份识别key，任意字符串
# 集群模式时，所有节点必须一样
nacos.core.auth.server.identity.key=自定义
# 用于替换useragent白名单的身份识别value，任意字符串
# 集群模式时，所有节点必须一样# 集群模式时，所有节点必须一样
nacos.core.auth.server.identity.value=自定义
```

### 数据库

1. 初始化数据库，初始化文件：conf/mysql-schema.sql

2. 修改配置文件：conf/application.properties

   ```properties
   # 使用MySQL数据库，目前只支持MySQL数据库
   spring.datasource.platform=mysql
   db.num=1
   db.url.0=jdbc:mysql://127.0.0.1:3306/nacos?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true&useUnicode=true&useSSL=false&serverTimezone=UTC
   db.user.0=root
   db.password.0=root
   ```

   

