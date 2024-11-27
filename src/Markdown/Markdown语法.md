[TOC]

# 链接

## 文档

* [Markdown Guide 英文文档](https://www.markdownguide.org/)
* [Markdown Guide 中文文档](https://www.markdown.xyz/)
* [Markdown国内镜像站](https://markdown.com.cn/)
* [GitHub文档](https://docs.github.com/zh/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/quickstart-for-writing-on-github)
* [GFM](https://github.github.com/gfm/)

## 编辑器

* [Typora](https://www.typora.io/)

## 在线编辑器

* [Markdown.com.cn（中文）](https://markdown.com.cn/editor/)
* [MaHua（中文）](http://mahua.jser.me/)
* [CodeMirror（英文）](http://codemirror.net/)
* [Dillinger（英文）](http://dillinger.io/)
* [Markgiu](https://github.com/bianchimro/markgiu)

## 解析器

这里的解析器可以是任意形式的，包括一个应用程序、插件、代码、网站、命令行工具等，解析器将解析Markdown文档，可以将Markdown文档渲染展示出来，也可以转换为其他文档，例如：HTML文档、PDF文档等，这个[链接](https://github.com/markdown/markdown.github.com/wiki/Implementations)中列出了Markdown文档转换成其他文档的工具

### 前端

- [commonmark.js](https://github.com/commonmark/commonmark.js)

- [marked](https://www.npmjs.com/package/marked)

# Markdown超集

有些轻量型标记语言是Markdown的超集，他们包含Markdown的基础语法，并在此基础上进行扩展，例如：

- [CommonMark](https://commonmark.org/)
  - [CommonMark解析器](https://github.com/commonmark/commonmark-spec/wiki/List-of-CommonMark-Implementations)（任何形式的工具）

- [GitHub Flavored Markdown (GFM)](https://github.github.com/gfm/)
- [Markdown Extra](https://michelf.ca/projects/php-markdown/extra/)
- [MultiMarkdown](https://fletcherpenney.net/multimarkdown/)
- [R Markdown](https://rmarkdown.rstudio.com/)

# 基础语法

## 段落和换行

一个连续的文本就是一个段落，多个段落由空行进行分隔

> Typora按一下`Enter`会生成两个换行，从而新建一个段落，而按下`Shift` + `Enter`只会生成一个换行，这样就能实现在段落内换行，[点击查看](#ap_段落内换行)兼容性

## 标题

```markdown
# 1级标题
## 2级标题
### 3级标题
#### 4级标题
##### 5级标题
###### 6级标题
```

[点击查看](#ap_标题的可选语法)可选语法

## 列表

### 无序列表

```markdown
* 无序元素1
  * 子元素
* 无序元素2
* 无序元素3
```

* 无序元素1
  * 子元素
* 无序元素2
* 无序元素3

> 无序列表除了`*`，还能用`+`或`-`

### 有序列表

```markdown
1. 有序元素1
   1. 子元素
2. 有序元素2
3. 有序元素3
```

1. 有序元素1
   1. 子元素
2. 有序元素2
3. 有序元素3

> 左侧的数字可以不用按顺序写，渲染器会自动优化
>
> 部份编辑器支持`1)`、`2)`这种写法

### 任务列表

在无序列表的基础上添加[ ]或[x]

```markdown
* [ ] 任务1
* [X] 任务2
* [ ] 任务3
```

* [ ] 任务1
* [x] 任务2
* [ ] 任务3

## 表格

```markdown
| 表格标题1 | 表格标题2 |
| --------- | --------- |
| 表格内容1 | 表格内容2 |
```

| 表格标题1 | 表格标题2 |
| --------- | --------- |
| 表格内容1 | 表格内容2 |

### 左对齐

```markdown
| 表格标题1 | 表格标题2 |
| :-------- | :-------- |
| 表格内容1 | 表格内容2 |
```

| 表格标题1 | 表格标题2 |
| :-------- | :-------- |
| 表格内容1 | 表格内容2 |

### 居中对齐

```markdown
| 表格标题1 | 表格标题2 |
| :-------: | :-------: |
| 表格内容1 | 表格内容2 |
```

| 表格标题1 | 表格标题2 |
| :-------: | :-------: |
| 表格内容1 | 表格内容2 |

### 右对齐

```markdown
| 表格标题1 | 表格标题2 |
| --------: | --------: |
| 表格内容1 | 表格内容2 |
```

| 表格标题1 | 表格标题2 |
| --------: | --------: |
| 表格内容1 | 表格内容2 |

## 链接

Ctrl+左键点击打开链接，[官方文档](https://support.typoraio.cn/Links/)

* 普通链接：<https://www.baidu.com>

* 内联链接：
  * [跳转至百度](https://www.baidu.com "鼠标悬浮显示的文本")
  * [跳转至列表](#列表 "鼠标悬浮显示的文本")

* 引用链接：

  ```markdown
  第一部分：定义链接
  [链接标识]: URL "链接标题"
  
  第二部份：使用链接（链接标识可以不写，缺省值为链接文本）
  [链接文本][链接标识]
  ```

  [跳转至百度][1]
  
  [跳转至列表][2]
  
  [1]: https://www.baidu.com	"百度"
  
  [2]: #列表	"列表"

## 斜体

```markdown
*斜体文本1*
_斜体文本2_
```

*斜体文本1*

_斜体文本2_

> 推荐使用*号，避免与单词或变量名中的下划线冲突

## 粗体

```markdown
**粗体文本1**
__粗体文本2__
```

**粗体文本1**

__粗体文本2__

> 统一使用`**`表示粗体
>
> 使用`***`同时表示斜体和粗体：***又斜又粗***

## 下划线

* 源码：

  ```
  <u>下划线</u>
  ```

* 效果：

  <u>下划线</u>

## 删除线

* 源码：

  ```markdown
  ~~删除的文本~~
  ```

* 效果：

  ~~删除的文本~~

> 标准语法不支持，GFM[^1]支持

## 代码

### 行内代码

* 源码：

  ```markdown
  这段`代码`包含在行内部
  这段``代`码``包含反引号
  ```

* 效果：

  这段`代码`包含在行内部
  这段``代`码``包含反引号

> 单反引号<code>\`</code>和双反引号<code>\`\`</code>都表示一个行内代码，当行内代码本身包含<code>\`</code>时，不能使用单反引号<code>\`</code>，需要通过双反引号<code>\`\`</code>实现
>
> 行内代码还能使用`<code>`标签实现

### 代码块

使用`三反引号`表示代码块

* 源码：

  ~~~markdown
  ```java
  String text = "这是一个代码块";
  ```
  ~~~

* 效果：

  ```java
  String text = "这是一个代码块";
  ```

> 三反引号<code>\`\`\`</code>表示一个代码块
>
> 注意：Typora仅支持GFM[^1]中的栅栏式代码块，不支持标准语法中的缩进式代码块（代码块前面缩进四个空格或一个制表符）















***

# 进阶语法

## 锚点

### 定义锚点

* 方式一：使用HTML来定义锚点

  <a id="html_ap_1">这是HTML锚点1</a>

  <a name="html_ap_2">这是HTML锚点2</a>

* 方式二：Markdown标题就是一个锚点，锚点ID就是标题名称

  ###### 这是标题锚点

  ###### 自定义标题锚点ID {#ap_custom}

  > 大多数编辑器都支持自定义标题锚点ID，但Typeora不支持

* 方式三：混合使用

  ###### <a id="ap_mixed">这是混合锚点</a>

### 使用锚点

* 方式一：使用`<a>`标签

  <a href="#html_ap_1">点击跳转至HTML锚点1</a>

  <a href="#html_ap_2">点击跳转至HTML锚点2</a>

* 方式二：使用Markdown链接语法

  [点击跳转至标题锚点](#这是标题锚点-1)

  [点击跳转至标题锚点](#这是标题锚点-2)

  > 注意：如果有多个相同名称的标题，链接锚点时需要在后面加上`-1`、`-2`...

  [点击跳转至自定义锚点](#ap_custom)（这里点击**无效**，因为Typora不支持）
  
  [点击跳转至混合锚点](#ap_mixed)

## 脚注

```markdown
这里使用脚注[^1]
[^1]: 这里是脚注描述
```

这里使用脚注[^999]

[^999]: 这里是脚注描述

## 图片

[图片进阶教程](https://support.typora.io//Images/)

* 方式一：Markdown语法实现

  ![MD测试图片](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/MD%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%87-db7b3297f4f1bfa09790341c6d6c54fd.png)

  > 图片的语法跟链接的语法类似，在前面加上!就行了

* 方式二：使用HTML的`<img>`标签实现

  <img src="https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/MD%E6%B5%8B%E8%AF%95%E5%9B%BE%E7%89%87-db7b3297f4f1bfa09790341c6d6c54fd.png" alt="MD测试图片" />

* 带链接的图片：在外面套一层链接

  [![MD测试图片](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/MD测试图片-db7b3297f4f1bfa09790341c6d6c54fd.png)](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/MD测试图片-db7b3297f4f1bfa09790341c6d6c54fd.png)

> 小技巧：图片默认是居中的，如果想左对齐，则在图片前面或则后面添加空格就行了

## 视频

Markdown不支持视频，需要使用HTML的`<video>`标签实现

<video src="https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/MD测试视频.mp4"></video>

<video src="https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/MD%E6%B5%8B%E8%AF%95%E8%A7%86%E9%A2%91.mp4"></video>

## 图表

[点击查看教程](https://support.typora.io/Draw-Diagrams-With-Markdown/)

[图标选项](https://support.typora.io/Diagram-Options/)

## 目录

```
[TOC]
```

## 表情

> Typora中可以按`Win` + `.`来添加表情、颜文字、特殊符号等等

### Emoji[^2]表情

```
😄这是一个Emoji表情，在代码块中也能正常显示
```

Emoji表情网站：

* [Unicode官方网站](https://unicode.org/emoji/charts/full-emoji-list.html)

* [Emojipedia](https://emojipedia.org/)

### 表情简码

```
:smile:这是一个表情简码，在代码块中不能正常显示
```

:smile:

> 在Typora中，输入表情简码时，按`SEC`键可以触发表情的自动完成建议

## 数学公式

* 块级公式（块元素）

​	[点击查看教程](https://support.typoraio.cn/zh/Markdown-Reference/#%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F%E5%9D%97)

* 行级公式（行元素）

​	[点击查看教程](https://support.typoraio.cn/zh/Markdown-Reference/#%E5%86%85%E8%81%94%E6%95%B0%E5%AD%A6%E5%85%AC%E5%BC%8F)

## YAML Front Matter

[点击查看教程](https://jekyllrb.com/docs/front-matter/)

## HTML

可以使用HTML来实现Markdown不支持的语法，例如：视频、嵌入网页等等，[点击查看](https://support.typora.io/HTML/)支持哪些HTML语法























***

# 不常用语法

## <span id="ap_标题的可选语法">标题的可选语法</span>

* 源码：

  ```
  这也是一级标题
  ==
  这也是二级标题
  --
  ```

* 效果

  一级标题
  ==
  二级标题
  --

> 通过在文本底下添加至少两个`=`或`-`来表示一级标题或二级标题

## 引用文字

```markdown
>这是一块引用文字
>>嵌套的引用文字
```

> 这是一块引用文字
>
> >嵌套的引用文字

## 水平线

```markdown
***
```

***

> 水平线除了使用`***`来表示外，还能使用`---`和`___`来表示，但Typora不支持使用`___`来表示水平线

## 上标和下标

* 源码：

  ```
  上标：X^2^
  下标：H~2~O, X~long\ text~
  ```

* 效果：

  上标：X^2^
  下标：H~2~O, X~long\ text~

> Typora的上标和下标功能需要在**偏好设置**中开启
>
> 注意：上标和下标中的空格要使用转义字符`\ `表示（一个斜杠加一个空格），示例：X~AB\ CD~

## 高亮

* 源码：

  ```markdown
  ==高亮文本==
  ```

* 效果：

  ==高亮文本==

> Typora的高亮功能需要在**偏好设置**中开启

















***

# 兼容性

## <span id="ap_段落内换行">段落内换行</span>

不同编辑器实现段落内换行的方式可能各不相同，一下是常见的几种方式：

* 在行尾添加两个空格和一个换行（几乎所有编辑器都支持）
* 在行尾添加一个换行（Typora支持）
* 在行尾添加一个`<br />`（几乎所有编辑器都支持）
* 在行尾添加一个`\`（少部分编辑器支持、CommonMark支持）

推荐使用`<br />`来实现段落内换行，兼容性最强















[^1]: GFM表示[GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown/)语法，Typora就是使用这个语法
[^2]: Emoji表情是Unicode编码中[定义](https://unicode.org/emoji/charts/full-emoji-list.html)的表情，该表情在不同应用程序中的显示结果可能不一样（特别是颜色）

