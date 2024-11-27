* BigDecimal

  * 只能使用`new BigDecimal(String)`或`BigDecimal.valueOf()`，不要使用`new BigDecimal(Double)`，否者会有精度丢失风险

  * 不要使用`equals`比较，使用`compareTo`比较

    使用`equals`会比较`scale`，而`compareTo`不会，只会比较数值本身

* 每个接口一个Vo

* SQL尽量不要复用（分页、总计、导出这些可以考虑复用），业务代码不要复用

* 接口校验应该在Controller中实现

* Vo对象应该在Controller或Service中生成，且最好是不可修改的

  * Vo可以继承Vo，Vo不能继承Do或Bo

* 大而复杂的查询，转换成多个小而简单的查询

  > 复杂查询转换为多个简单查询，查出多DO对象，然后在Service或Controller中再转换为Vo对象，然后传递给前端

* Lombok

  * 当属性类型为基本类型 boolean 时，属性名称不能以 is 开头，生成的 Getter 和 Setter 会有问题，例如属性名称为 isXxx，生成的 Getter 为 isXxx，可以使用 boolean 的包装类型：Boolean

* 与前端交互时，禁止使用基本类型，因为基本类型不能为null，会生成默认值，这个默认值可能导致错误

# 校验

* 编辑时不可修改的字段，需要进行校验，校验通过后在使用数据库数据进行覆盖，避免出现预期外的错误

