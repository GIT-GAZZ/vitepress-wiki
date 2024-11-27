# Jackson

## 自定义序列化器

继承 JsonSerializer，然后使用@JsonSerialize(using = NumberSerializer.class)
[SpringBoot中Jackson序列化处理自定义注解_jackson自定义注解-CSDN博客](https://blog.csdn.net/qq_18515155/article/details/129391729)

## 注解

- @JsonFormat

  - shape

    指定字段在序列化和反序列化时的形状

    - **`JsonFormat.Shape.ANY`**：这是默认值，允许使用任何形状。在序列化时，会根据字段的实际类型选择适当的序列化器。在反序列化时，也会根据 JSON 数据的结构进行选择。
    - **`JsonFormat.Shape.ARRAY`**：在序列化时，将使用数组序列化器将字段转换为 JSON 数组。在反序列化时，期望接收一个数组。
    - **`JsonFormat.Shape.OBJECT`**：在序列化时，将使用对象序列化器将字段转换为 JSON 对象。在反序列化时，期望接收一个对象。
    - **`JsonFormat.Shape.NUMBER`**：在序列化时，将使用数字序列化器将字段转换为 JSON 数字。在反序列化时，期望接收一个数字。
    - **`JsonFormat.Shape.STRING`**：在序列化时，将使用字符串序列化器将字段转换为 JSON 字符串。在反序列化时，期望接收一个字符串。

- @JsonSerialize

  用于指定字段或类的自定义序列化器，以控制对象在被序列化为 JSON 格式时的输出格式

  - using

    指定自定义的序列化器类，该类必须实现 `JsonSerializer` 接口，用于控制字段或类的序列化行为，注意：当数据为 null 时，Jackson 不会使用 using 指定的序列化器来处理，会使用 nullsUsing 指定的序列化器来处理

  - nullsUsing

    用于指定在序列化过程中处理 null 值的自定义序列化器。当字段值为 null 时，使用指定的自定义序列化器来处理

- @JsonDeserialize

  用于指定字段或类的自定义反序列化器，以控制 JSON 数据在被反序列化为 Java 对象时的处理方式