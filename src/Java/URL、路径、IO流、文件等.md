# URL、路径、IO流、文件等

### URL或路径拼接

```java
String path1 = "";
String path2 = "";

System.out.println(path1 + File.separator + path2);

System.out.println(Path.of(path1, path2).toString());
```

