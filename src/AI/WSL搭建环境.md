# WSL搭建环境

### 参考文献

- https://zhuanlan.zhihu.com/p/621142457

- https://blog.csdn.net/iwanvan/article/details/122119595

- https://blog.csdn.net/qq_41094058/article/details/116207333

- https://blog.csdn.net/qq_40231723/article/details/134622935

- CUDA官网文档：https://docs.nvidia.com/cuda/

  ![image-20240322114431445](https://raw.githubusercontent.com/GIT-GAZZ/typora-cloud-image/master/image/image-20240322114431445-efae6e6419c57e4aeb7105b5145b0f44.png)

  - 发行说明、版本兼容性说明：https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html
  - 快速入门指南：https://docs.nvidia.com/cuda/cuda-quick-start-guide/index.html
  - CUDA安装指南-Windows：https://docs.nvidia.com/cuda/cuda-installation-guide-microsoft-windows/index.html
  - CUDA安装指南-Linux：https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.html

- 在WSL2上使用CUDA：https://docs.nvidia.com/cuda/wsl-user-guide/index.html

- 在Docker或VM上使用CUDA：https://docs.nvidia.com/ai-enterprise/deployment-guide-vmware/0.1.0/docker.html

### Windows-WSL环境准备

1. 更新Windows系统和WSL内核

   WSL文档：https://learn.microsoft.com/zh-cn/windows/wsl/

2. 更新Nvidia驱动

   下载驱动：https://www.nvidia.cn/Download/index.aspx?lang=cn

   下载GeForce Experience：https://www.nvidia.cn/geforce/geforce-experience/

   ```shell
   $ nvidia-smi
   ```

   > 注意：是更新Windows系统下的Nvidia驱动，不要在Linux中安装Nvidia驱动

### WSL-Ubuntu环境准备

1. 安装cuda-toolkit：# https://developer.nvidia.com/cuda-downloads、https://developer.nvidia.com/cuda-toolkit-archive

2. 安装cuDNN：https://developer.nvidia.com/cudnn、https://developer.nvidia.com/rdp/cudnn-archive

3. 安装Python环境

   - 方式一：直接在Linux上安装Python

     ```shell
     apt-get install -y gcc
     apt-get install -y python3.9
     apt-get install -y python3-pip
     
     # 创建符号链接
     ln -s /usr/bin/python3 /usr/bin/python
     ```

     

4. 安装Pytorch：https://pytorch.org/get-started/locally/

**tensorflow**