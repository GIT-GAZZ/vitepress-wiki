# 窗口函数

## 注意点

[mysql高阶-窗口函数避坑总结方法技巧_窗口函数和groupby一起用_DI O的博客-CSDN博客](https://blog.csdn.net/LeFran/article/details/118275520)

* 窗口函数只能出现在select 和order by 字句中
* 如果查询的其他部分( where,GROUP BY, having)需要窗口函数,请使用子查询,在子查询使用窗口函数
* 如果查询使用聚合或者group by 请记住窗口函数只能处理分组后的结果,而不是原始的表数据

## SQL执行顺序

1. FROM、JOIN
2. WHERE
3. GROUP BY
4. 聚合函数
5. HAVING
6. 窗口函数
7. SELECT
8. DISTINCT
9. UNION
10. ORDER BY
11. LIMIT

## 日期比较

- 两个都是日期类型

## 统计

- WITH ROLLUP

  `WITH ROLLUP` 在 GROUP BY 子句的末尾添加一个额外的行，用来表示所有行的总计，注意：总计这一行的 group by 字段是null，可以用 coalesce 函数处理





1. 

### 查询隔离级别

MySQL8.0+：

1.查看当前会话隔离级别

```
select @@transaction_isolation;
```

2.查看系统当前隔离级别

```
select @@global.transaction_isolation;
```

MySQL5.0+：

1.查看当前会话隔离级别

```
select @@tx_isolation;
```

2.查看系统当前隔离级别

```
select @@global.tx_isolation;
```