# glob匹配模式

glob 一般用来匹配路径的，也可以匹配字符串（匹配整个字符串），glob 默认不匹配隐藏文件（以点 `.` 开头的文件或目录）

## 基础语法

| 通配符               | 描述                             | 示例       | 匹配                     | 不匹配              |
| -------------------- | -------------------------------- | ---------- | ------------------------ | ------------------- |
| `*`                  | 匹配 0 个或多个字符，包含空串    | `Law*`     | `Law`，`Laws` 和 `Lawer` | `La`，`aw`          |
| `?`                  | 匹配 1 个字符                    | `?at`      | `cat`，`bat`             | `at`                |
| `[abc]`              | 匹配括号内字符集合中的单个字符   | `[cb]at`   | `cat`，`bat`             | `at`，`bcat`        |
| `[a-z]`              | 匹配括号内字符范围中的单个字符   | `[a-z]at`  | `aat`，`bat`，`zat`      | `at`，`bcat`，`Bat` |
| `[^abc]` 或 `[!abc]` | 匹配非括号内字符集合中的单个字符 | `[!CB]at`  | `cat`，`bat`             | `Cat`，`Bat`        |
| `[^a-z]` 或 `[!a-z]` | 匹配非括号内字符范围中的单个字符 | `[!A-Z]at` | `aat`，`bat`，`zat`      | `Aat`，`Bat`，`Zat` |

## 扩展语法

- Brace Expansion
- globstar
- extglob

| 通配符            | 描述                                                         | 示例              | 匹配                               | 不匹配           |
| ----------------- | ------------------------------------------------------------ | ----------------- | ---------------------------------- | ---------------- |
| `{x, y, ...}`     | Brace Expansion，展开花括号内容，支持展开嵌套括号            | `a.{png,jp{,e}g}` | `a.png`，`a.jpg`，`a.jpeg`         |                  |
| `**`              | globstar，匹配所有文件和任意层目录，如果`**`后面紧接着`/`则只匹配目录，不含隐藏目录 | `src/**`          | `src/a.js`，`src/b/a.js`，`src/b/` | `src/.hide/a.js` |
| `?(pattern-list)` | 匹配0次或1次给定的模式                                       | `a.?(txt|bin)`    | `a.`，`a.txt`，`a.bin`             | `a`              |
| `*(pattern-list)` | 匹配0次或多次给定的模式                                      | `a.*(txt|bin)`    | `a.`，`a.txt`，`a.bin`，`a.txtbin` | `a`              |
| `+(pattern-list)` | 匹配1次或多次给定的模式                                      | `a.+(txt|bin)`    | `a.txt`，`a.bin`，`a.txtbin`       | `a.`，`a`        |
| `@(pattern-list)` | 匹配给定的模式                                               | `a.@(txt|bin)`    | `a.txt`，`a.bin`                   | `a.`，`a.txtbin` |
| `!(pattern-list)` | 匹配非给定的模式                                             | `a.!(txt|bin)`    | `a.`，`a.txtbin`                   | `a.txt`，`a.bin` |

> pattern-list 是一组以`|`作为分隔符的模式集合，例如`abc|a?c|ac*`