# Unity常用API

```c#
OnMouseEnter 鼠标移入物体
OnMouseOver 鼠标在物体上
OnMouseExit 鼠标移出物体
OnMouseDown 鼠标左键按下
OnMouseDrag 鼠标左键按住拖动
OnMouseUp 鼠标左键抬起

Input.GetKey 键盘按住 KeyCode.A
Input.GetKeyDown 键盘按下
Input.GetKeyUp 键盘抬起

Input.mousePosition 鼠标位置，屏幕坐标系，二维坐标
Input.GetMouseButton 鼠标按住返回True，0-左键，1-右键，2-中建
Input.GetMouseDown
Input.GetMouseUp
 Input.GetAxis 轴向，Horizontal-水平，Vertical-垂直

Ray ray = Camera.main.ScreenPointToRay(Input.mousePosition);
Physics.Raycast(ray)

Vector3.Distance
transform.LookAt

Application.wantsToQuit 应用程序想要退出时执行，返回false取消退出
Application.quitting 应用程序退出时执行

Object.DontDestroyOnLoad 切换场景时不销毁对象，包括子对象

Screen.currentResolution 当前屏幕的刷新率
Application.targetFrameRate 设置帧率，还有其他细节，待考究

对象?.方法或变量   对象不为null时调用方法或使用变量
```

