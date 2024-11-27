# OpenPDF

### 字体

```java
ClassPathResource fontResource = new ClassPathResource("/ttf/simsun.ttc");
String fontName = StrUtil.format("{},{}", fontResource.getAbsolutePath(), "1");
BaseFont baseFont = BaseFont.createFont(fontName, BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
Font font = new Font(baseFont, 12);
```

### 文本

```java
// 各类文本
Chunk chunk = new Chunk("文本", font);
Phrase phrase = new Phrase("标题asdASD", font);
Paragraph paragraph = new Paragraph("标题", font);

// 水平居中
paragraph.setAlignment(Paragraph.ALIGN_CENTER);
// 行高
paragraph.setLeading(20);
// 上边距
paragraph.setSpacingBefore(10);
// 下边距
paragraph.setSpacingAfter(10);
// 添加到文档中
document.add(paragraph);
```

### 页

```java
// 页大小
document.setPageSize(PageSize.A4);
// 页边距
document.setMargins(PAGE_LEFT_MARGIN, PAGE_RIGHT_MARGIN, PAGE_TOP_MARGIN, PAGE_BOTTOM_MARGIN);

// 页大小
float pageWidth = document.getPageSize().getWidth();
float pageHeight = document.getPageSize().getHeight();
// 页边距
float pageLeftMargin = document.leftMargin();
float pageRightMargin = document.rightMargin();
float pageTopMargin = document.topMargin();
float pageBottomMargin = document.bottomMargin();
// X轴和Y轴
float axisXMin = document.getPageSize().getLeft();
float axisXMax = document.getPageSize().getRight();
float axisYMin = document.getPageSize().getBottom();
float axisYMax = document.getPageSize().getTop();
```

