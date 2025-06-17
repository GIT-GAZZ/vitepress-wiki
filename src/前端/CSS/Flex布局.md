# CSS Flex 布局

[Flex 布局语法教程 | 菜鸟教程](https://www.runoob.com/w3cnote/flex-grammar.html)

[Flex 布局教程：语法篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)

Flex 是 Flexible Box 的缩写，意为“弹性布局”，用来为盒状模型提供最大的灵活性

```css
.box {
  display: flex | inline-flex;
}
```

注意：设为 Flex 布局以后，子元素的 `float` 、`clear` 和 `vertical-align` 属性将失效

## 基本概念

采用 Flex 布局的元素，称为 Flex 容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称”项目”。

<img src="https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/3791e575c48b3698be6a94ae1dbff79d-8b402883445b842ca38727fc09f60d00.png" alt="img"  />

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做 main start，结束位置叫做 main end；交叉轴的开始位置叫做 cross start，结束位置叫做 cross end。

项目默认沿主轴排列。单个项目占据的主轴空间叫做 main size，占据的交叉轴空间叫做 cross size。

## 容器的属性

### flex-direction

flex-direction属性决定主轴的方向（即项目的排列方向）。

```css
.box {
  flex-direction: row | row-reverse | column | column-reverse;
}
```

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/0cbe5f8268121114e87d0546e53cda6e-0ac377493a33869f2829c4b1d3d70100.png)

### flex-wrap

默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行

```css
.box{
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

- nowrap（默认）：不换行。

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/9da1f23965756568b4c6ea7124db7b9a-7e8a06a9347193bcb4a969962ebfa3aa.png)

- wrap：换行，第一行在上方。

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/3c6b3c8b8fe5e26bca6fb57538cf72d9-6215cf568af888a6442517b68a2825d8.jpeg)

- wrap-reverse：换行，第一行在下方。

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/fb4cf2bab8b6b744b64f6d7a99cd577c-4a8a486060e81a05895277c987af5c96.jpeg)

### flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```css
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

### justify-content

justify-content属性定义了项目在主轴上的对齐方式。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/c55dfe8e3422458b50e985552ef13ba5-b1beedefc6a3eb52960a682ad0121926.png)

### align-items

align-items属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/2b0c39c7e7a80d5a784c8c2ca63cde17-0ec9e81c35c66f66b23e724c6063fce8.png)

### align-content

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/f10918ccb8a13247c9d47715a2bd2c33-aade7abc9eb8c177c66d0128b1cc6ca9.png)

## 项目的属性

### order

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/59e399c72daafcfcc20ede36bf32f266-70f89eba41edc0a70278c44b74747294.png)

### flex-grow

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/f41c08bb35962ed79e7686f735d6cd78-0c40e2971edc015685f43798e9a5b90f.png)

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

### flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/240d3e960043a729bb3ff5e34987904f-e24a8660e626cd488ee1e21645a92bb0.jpeg)

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

负值对该属性无效。

### flex-basis

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

### flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

### align-self

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

![img](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/55b19171b8b6b9487d717bf2ecbba6de-0d93c40b34a77529f71ddd927dd49c82.png)

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
