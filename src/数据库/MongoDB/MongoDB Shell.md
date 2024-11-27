# MongoDB Shell

MongoDB Shell 本质是一个 JavaScript Shell，可以执行 JS 代码

MongoDB Shell 本身命令：

```shell
# 通过 MongoDB Shell 连接 MongoDB 数据库命令
mongosh
	--host <hostname>:<port>
	--port <port>
	--username <username>
	--password <password>

# 查看 MongoDB Shell 的版本
mongosh --version
```

连接数据库后的命令：

数据库

```javascript
// 查看当前数据库，默认是test数据库
db

// 显示数据库列表
show dbs

// 切换到指定数据库
use <database_name>

// 隐式创建数据库：写入数据时会自动创建不存在的数据库
// 如果数据库不存在，MongoDB 会在您首次向该数据库存储数据时创建该数据库
use <database_name>
db.<collection_name>.insertOne( { x: 1 } )

db.dropDatabase()
```

集合：

```javascript
// 显式创建集合
db.createCollection(<collection_name>)
// 隐式创建集合：写入数据时会自动创建不存在的集合

// 查询集合
show collections

// 删除集合
db.<collection_name>.drop()
```

文档：

```javascript
// 查询文档，第一个参数相当于查询条件，第二个参数控制查询哪些字段，0-不查询、1-要查询
db.<collection_name>.find({ query... }, { _id: 0, field: 1 })
db.<collection_name>.findOne()

// 分页查询、排序查询（默认按主键排序）
// 排序：1表示升序、-1表示降序
db.<collection_name>.find().limit(10).skip(10).sort({ field: 1, field: -1 })

// 比较查询
db.<collection_name>.find({ field: { $gt: value } })
db.<collection_name>.find({ field: { $lt: value } })
db.<collection_name>.find({ field: { $gte: value } })
db.<collection_name>.find({ field: { $lte: value } })
db.<collection_name>.find({ field: { $ne: value } })

// 包含查询
db.<collection_name>.find({ field: { $in: [ ... ] } })
db.<collection_name>.find({ field: { $nin: [ ... ] } })

// 条件连接查询
db.<collection_name>.find({ $and: [ query... ] })
db.<collection_name>.find({ $or: [ query... ] })

// 正则查询（JavaScript）
db.<collection_name>.find({ field:/regex/ })
```

```javascript
// 插入文档
db.<collection_name>.save({ data... })
db.<collection_name>.insert({ data... })
db.<collection_name>.insertOne({ data... })
db.<collection_name>.insertMany([ { data... }, { data... }, ... ])

// 更新文档
// 第一个参数是查询，匹配出多条时数据，默认只修改第一条数据
// 第二个参数是更新数据
// 第三个参数是额外选项
	// multi: <boolean> 为 true 时，更新所有匹配到的数据
// 覆盖更新
db.<collection_name>.update({ query... }, { data... }, { option... })
// 局部更新
db.<collection_name>.update({ query... }, $set:{ data... })
// 自增
db.<collection_name>.update({ query... }, { $inc:{ field: NumberInt(1) } })
db.<collection_name>.updateOne()

// 删除文档
db.<collection_name>.remove({ query... })
db.<collection_name>.deleteOne({ query... })
```

异常

```javascript
try {
	...
} catch (e) {
	print(e);
}
```

统计

```javascript
db.<collection_name>.count({ query... }, { option... })
```

