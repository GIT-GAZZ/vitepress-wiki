# Chromium

https://chromium.googlesource.com/chromium/src/+/main/docs/windows_build_instructions.md

https://www.bilibili.com/video/BV1zT421X768/?share_source=copy_web&vd_source=00c6485ad992a827bd2d5c0fefccc71c

1. 安装 Windows 11 虚拟机

2. 安装 VMware Tools

3. 设置任务栏

   1. 搜索按钮
   2. 关闭任务视图
   3. 关闭小组件

4. 激活系统

5. 设置主题

6. 桌面图标设置

   1. 添加此电脑
   2. 小图标
   3. 排序：项目类型

7. 关闭更新

8. 卸载无用软件

9. 安装 Clash

10. 电池设置

11. VS

    <img src="https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20250217181152440-685d8ee6221db4aa551b101317e859d1.png" alt="image-20250217181152440" style="zoom:50%;" />

12. 设置VS环境变量：Path+=D:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE

13. 如果在VS里安装Windows 11 SDK，且改变里安装位置，则需要设置环境变量：WINDOWSSDKDIR=D:\Windows Kits\10

14. 下载depot_tools：https://storage.googleapis.com/chrome-infra/depot_tools.zip

15. 解压，并添加环境变量：D:\chromium\depot_tools

16. 执行命令：`gclient`，更新depot_tools

17. 环境变量：

    1. DEPOT_TOOLS_WIN_TOOLCHAIN=0
    2. vs2022_install=D:\Program Files\Microsoft Visual Studio\2022\Community

18. 运行一下命令

    ```cmd
    git config --global user.name 薛征鹏
    git config --global user.email 1306964897@qq.com
    
    git config --global core.autocrlf false
    git config --global core.filemode false
    git config --global core.preloadindex true
    git config --global core.fscache true
    git config --global branch.autosetuprebase always
    
    git config --global core.longpaths true
    ```

19. 创建一个项目目录，然后在目录中运行一下命令

    ```cmd
    fetch chromium
    
    # 如果上面的命令运行失败，或者没运行完就关闭了，可以用以下命令重新运行
    gclient sync
    ```

20. 运行命令：`cd src`，进入src目录，然后再执行命令：`gn args out\Default`

21. 会跳出一个文本编辑器，输出以下参数，然后关闭编辑器

    ```cmd
    is_debug = true
    enable_nacl = false
    is_component_build = true
    proprietary_codecs = true
    ffmpeg_branding = "Chrome"
    # target_cpu = "x86"
    blink_symbol_level = 0
    v8_symbol_level = 0
    ```

22. 命令：`gn gen --ide=vs --ninja-executable=D:\chromium\src\third_party\ninja\ninja.exe --winsdk="10.0.26100.0" --filters=//chrome --no-deps out/Default`

23. 使用VS打开：`"D:\chromium\src\out\Default\all.sln"`

24. 打开VS后，Windows SDK 选择对应版本，平台工具集选择：无升级

25. 在VS的解决方案资源管理器中，将 `chrome(Visual Studio 2019)` 右击设置为启动项目

26. 点击VS上方的 `本地 Windows 调试器` 编译项目