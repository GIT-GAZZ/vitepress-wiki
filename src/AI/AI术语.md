# AI术语

- CUDA Core：CUDA Core 是 NVIDIA GPU上的计算核心单元，用于执行通用的并行计算任务，是最常看到的核心类型。NVIDIA 通常用最小的运算单元表示自己的运算能力，CUDA Core 指的是一个执行基础运算的处理元件，我们所说的 CUDA Core 数量，通常对应的是 FP32 计算单元的数量。
- Tensor Core：Tensor Core 是 NVIDIA Volta 架构及其后续架构（如Ampere架构）中引入的一种特殊计算单元。它们专门用于深度学习任务中的张量计算，如矩阵乘法和卷积运算。Tensor Core 核心特别大，通常与深度学习框架（如 TensorFlow 和 PyTorch）相结合使用，它可以把整个矩阵都载入寄存器中批量运算，实现十几倍的效率提升。
- RT Core：RT Core 是 NVIDIA 的专用硬件单元，主要用于加速光线追踪计算。正常数据中心级的 GPU 核心是没有 RT Core 的，主要是消费级显卡才为光线追踪运算添加了 RTCores。RT Core 主要用于游戏开发、电影制作和虚拟现实等需要实时渲染的领域。
- TensorFlow：
- PyTorch：

- Huggingface Transformers

- Quantization（量化）

- QLoRA
- 分位数量化技术





- Transformer

  [Transformer模型详解（图解最完整版） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/338817680)

  - Encoder
    - Embedding
    - Feature
  - Decoder

- Tensorflow

- Tensor2Tensor

- PyTorch