# Eureka

## 搭建Eureka注册中心

- 引入依赖

  ```xml
  <dependency>
  	<groupId>org.springframework.cloud</groupId>
      <!-- 注意，这里是eureka-server，不是eureka-client -->
  	<artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
  </dependency>
  ```

- 开启Eureka注册中心

  ```java
  @EnableEurekaServer
  @SpringBootApplication
  public class EurekaApplication {
      public static void main(String[] args) {
  		SpringApplication.run(EurekaApplication.class, args);
      }
  }
  ```

- 配置服务信息（Eureka注册中心本身也是服务）

  ```yaml
  server:
  	# 服务端口
  	port: 8090
  spring:
  	application:
  		# 服务名称
  		name: eurekaserver
  ```

- 服务注册（由于Eureka注册中心本身也是服务，所以可以注册到Eureka注册中心）

  ```yaml
  eureka:
  	client:
  		service-url:
  			# Eureka注册中心地址
  			defaultZone: http://127.0.0.1:8090/eureka/
  ```

## 向Eureka服务注册服务

- 引入依赖

  ```xml
  <dependency>
  	<groupId>org.springframework.cloud</groupId>
      <!-- 注意，这里是eureka-client，不是eureka-server -->
      <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
  </dependency>
  ```

- 配置服务信息

  ```yaml
  server:
  	# 服务端口
  	port: 8090
  spring:
  	application:
  		# 服务名称
  		name: eurekaserver
  ```

- 服务注册（跟上面一样）

  ```yaml
  eureka:
  	client:
  		service-url:
  			# Eureka注册中心地址
  			defaultZone: http://127.0.0.1:8090/eureka/
  ```

## 服务发现、服务调用、负载均衡

```java
@Bean
@LoadBalanced # 负载均衡
public RestTemplate restTemplate() {
    return new RestTemplate();
}

Object result = restTemplate.getForObject("http://服务名称/api", Object.class);
```

RestTemplate 是 Spring 框架提供的一个用于发送 HTTP 请求的同步客户端，`@LoadBalanced` 的原理是给 RestTemplate 添加一个拦截器，发送请求时先由这个拦截器进行处理，拦截器会通过 **Ribbon** 实现负载均衡，Ribbon会去 Eureka 注册中心拉取服务信息

![image-20240105112255797](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240105112255797-4f9199ad2d1dac99114cdd16b6b90e26.png)

![image-20240105113551241](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240105113551241-277dadefc392149e70e68d80854b25d9.png)

![image-20240105113740045](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240105113740045-1a4e3bff0693453f881a976194646ca5.png)

### 修改负载均衡策略

- 方式一：对所有服务生效

  ```java
  @Bean
  public IRule randomRule() {
      return new RandomRule();
  }
  ```

- 方式二：对指定服务生效

  ```yaml
  userservice: # 服务名称
  	ribbon:
  		NFLoadBalancerRuleClassName: com.netflix.loadbalancer.RandomRule # 负载均衡策略-随机
  ```

### 修改ribbon的加载策略

```yaml
ribbon:
	eager-load:
		enabled: true # 开启饥饿加载
		clients: userservice # 指定对userservice这个服务饥饿加载
```

