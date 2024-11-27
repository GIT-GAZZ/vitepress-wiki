# tkinter

[Tk Commands, version 8.6.15 (tcl.tk)](https://www.tcl.tk/man/tcl8.6/TkCmd/contents.htm)

## 窗口

### 主窗口

```python
import tkinter as tk

root = tk.Tk()
root.title("标题")
# 宽度、高度、左边距、上边距
root.geometry("900x600+200+200")

# 获取分辨率
root.maxsize()
# 禁止缩放宽高
root.resizable(False, False)
# 图标
root.iconbitmap("icon.ico")
# 背景颜色
root.configure(bg="red")

# 全屏
root.attributes("-fullscreen", True)
# 透明度
root.attributes("-alpha", 0.5)
# 置顶
root.attributes("-topmost", True)

def handel_close():
    print('Hello')
# 窗口关闭事件，会覆盖默认的销毁事件
root.protocol("WM_DELETE_WINDOW", handel_close)
# 销毁
root.destroy()

# 启动主循环
root.mainloop()
```

### 子窗口

```python
# 没有父子关系的窗口
tk.Toplevel()
# 有父子关系的窗口
tk.Toplevel(root)

# 其他的跟主窗口一样
```

## 容器

### Frame

```python
frame = tk.Frame(root, bd=1, relief=tk.SOLID, padx=5, pady=5)
frame.pack()
```



## 组件

### TK变量

```python
# 字符串变量
string_var = tk.StringVar()

# 获取值
string_var.get()
# 设置值
string_var.set('字符串')
```

### 标签

```python
label = tk.Label(root, text='标题', font=('黑体', 26), fg='red', bg='yellow')
label.pack()
```

### 输入框

```python
var = tk.StringVar()
entry = tk.Entry(root, textvariable=var, state='readonly')
entry = tk.Entry(root, textvariable=var, state='disabled')
entry.pack()
```

### 按钮

```python
def handle_button():
    print('Hello')
button = tk.Button(root, text='按钮', command=handle_button)
button.pack()
```

### 消息弹窗

```python
from tkinter import messagebox

# 不同类型的消息
messagebox.showinfo("标题", "内容")
messagebox.showwarning("标题", "内容")
messagebox.showerror("标题", "内容")
messagebox.askyesno("标题", "内容")
messagebox.askokcancel("标题", "内容")
messagebox.askquestion("标题", "内容")
...
```

## 布局

### 填充布局（pack）

```python
label = tk.Label(root, text='标题')
label.pack()
```

### 网格布局（grid）

```python
label = tk.Label(root, text='标题')
label.grid(row=1, column=1)
```

### 自定义布局（place）

```python
label = tk.Label(root, text='标题')
label.place(x=300, y=300)
```

