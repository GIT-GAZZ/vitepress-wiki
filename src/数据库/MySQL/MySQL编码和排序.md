# MySQL编码和排序

## 编码

- utf8：Unicode的可变长度字符编码，最大4个字节
  - utf8mb3：最大3个字节
  - utf8mb4：最大4个字节，可以表示更多字符

## 排序

- 排序方式

  - utf8mb4_0900_ai_ci：MySQL8默认排序，使用 Unicode 9.0 版本进行排序

  - utf8mb4_general_ci：MySQL5的默认排序，排序较快，准确性较差

  - utf8mb4_unicode_ci：基于标准的Unicode来排序，准确性较好，排序较慢

  - utf8mb4_bin：二进制排序

- 规则说明

  - _ci：不区分大小写

  - _cs：区分大小写

  - _bin：二进制

  - _ai：不区分重音

  - _as：区分重音