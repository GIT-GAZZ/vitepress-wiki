# SpringMVC

### 获取HttpServletRequest和HttpServletResponse的方式

- Controller 方法自动注入

  ```java
  @GetMapping("/doSomething")
  public void doSomething(HttpServletRequest request, HttpServletResponse response) {
  	
  }
  ```

- Bean 依赖注入

  ```java
  @Autowired
  private HttpServletRequest request;
  @Autowired
  private HttpServletResponse response;
  ```

- 静态方法

  ```java
  ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
  HttpServletRequest request = requestAttributes.getRequest();
  HttpServletResponse response = requestAttributes.getResponse();
  ```

  

