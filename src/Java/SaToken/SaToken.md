# SaToken

## 全局类

### SaHolder

Sa-Token上下文持有类，通过此类快速获取当前环境的相关对象

```java
SaHolder.getContext();           // 获取当前请求的 SaTokenContext
SaHolder.getRequest();           // 获取当前请求的 [Request] 对象 
SaHolder.getResponse();          // 获取当前请求的 [Response] 对象 
SaHolder.getStorage();           // 获取当前请求的 [Storage] 对象
SaHolder.getApplication();       // 获取全局 SaApplication 对象
```

