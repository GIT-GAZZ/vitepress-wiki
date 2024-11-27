# Ribbon 客户端负载均衡器

Ribbon 是一个客户端负载均衡器，它是 Spring Cloud 体系中的一个重要组件。在 Spring Cloud 中，Ribbon 可以无缝地与 RestTemplate 集成，从而使 RestTemplate 具备了客户端负载均衡的能力。通过在 RestTemplate 的基础上添加 Ribbon 支持，RestTemplate 在发送请求时，会利用 Ribbon 选择一个合适的服务实例，并将请求发送到该实例。

## 使用 Rubbon 进行负载均衡

### 与 RestTemplate 配合

RestTemplate 是 Spring 框架提供的一个用于发送 HTTP 请求的同步客户端，可以给 RestTemplate 添加拦截器，从而实现额外功能，例如负载均衡

```java
@Bean
@LoadBalanced # 添加拦截器，拦截器会调用 Rubbon 进行负载均衡
public RestTemplate restTemplate() {
    return new RestTemplate();
}

// 发送请求，并将结果JSON转为指定对象
Object result = restTemplate.getForObject("http://服务名称/api", Object.class);
```

`@LoadBalanced` 的原理就是给 RestTemplate 客户端添加一个拦截器，发送请求时先由这个拦截器进行处理，拦截器会通过 Ribbon 实现负载均衡，Ribbon 会去 注册中心拉取服务信息

![image-20240105112255797](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240105112255797-4f9199ad2d1dac99114cdd16b6b90e26.png)

![image-20240105113551241](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240105113551241-277dadefc392149e70e68d80854b25d9.png)

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

  ![image-20240105113740045](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240105113740045-1a4e3bff0693453f881a976194646ca5.png)

### 修改ribbon的加载策略

```yaml
ribbon:
	eager-load:
		enabled: true # 开启饥饿加载
		clients: userservice # 指定对userservice这个服务饥饿加载

```

