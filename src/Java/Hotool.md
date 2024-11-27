# Hotool

### CollUtil

```java
// 如果list是空的，则返回默认值
CollUtil.defaultIfEmpty(list, new ArrayList<>());

// 移除“空的”元素
CollUtil.removeNull();
CollUtil.removeEmpty();
CollUtil.removeBlank();

// 将集合拼接为字符串
CollUtil.join();
```

### 生成List

```java
// 返回的类型是ArrayList
ListUtil.toList();
// 内部就是ListUtil.toList()
CollUtil.toList();
// 返回的类型是不可修改的List
ListUtil.of();
```

### ClassUtil

- 扫描包路径下所有Class文件

  ```java
  Set<Class<?>> clazzSet = ClassUtil.scanPackage("org.dromara.common.core.enums.xhsl");
  ```

### ReflectUtil

- 获取静态字段的值

  ```java
  String value = (String) ReflectUtil.getStaticFieldValue(field);
  ```

### ReUtil

### 删除null元素

```
list.removeIf(Objects::isNull);
CollUtil.removeNull();
CollUtil.filter(list, Objects::nonNull);
```

