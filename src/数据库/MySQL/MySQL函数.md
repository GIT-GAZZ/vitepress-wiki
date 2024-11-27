# MySQL函数

- 进制转换

  ```sql
  # 十进制 => 十六进制
  select conv('16711680', 10, 16);
  # 十六进制 => 十进制
  select conv('FF0000', 16, 10);
  ```