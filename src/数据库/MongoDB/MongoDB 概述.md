# MongoDB 概述

[官方网站](https://www.mongodb.com/)

- MongoDB 是一个文档型数据库，数据以 BSON 的格式存储（类似 JSON，二进制的 JSON）

- MongoDB 的设计理念是为了应对大数据量、高性能和灵活性需求

- MongoDB 使用集合（Collections）来组织文档（Documents），每个文档都是由键值对组成的：数据库 => 集合 => 文档 => 键值对


## 数据库

内置数据库：

- admin
- local
- config

## 数据类型

- 字符串
- 对象 ID：主键类型，类似 UUID
- 布尔值
- 数组
- 32 位整数、64 位整数：不支持，通过 NumberInt() 方法转为浮点数
- 64 位浮点数：唯一的数字类型
- null
- undefined
- 正则表达式
- 代码
- 二进制数据
- 最大值/最小值