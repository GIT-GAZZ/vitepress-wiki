# Vicuna

基于Llama 2微调的模型

### 链接

官网：https://lmsys.org/

在线体验：https://chat.lmsys.org/

HuggingFace：https://huggingface.co/lmsys

GitHub：https://github.com/lm-sys

### 模型

| Size    | Chat Command                                                 | Hugging Face Repo                                            |
| ------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 7B      | `python3 -m fastchat.serve.cli --model-path lmsys/vicuna-7b-v1.5` | [lmsys/vicuna-7b-v1.5](https://huggingface.co/lmsys/vicuna-7b-v1.5) |
| 7B-16k  | `python3 -m fastchat.serve.cli --model-path lmsys/vicuna-7b-v1.5-16k` | [lmsys/vicuna-7b-v1.5-16k](https://huggingface.co/lmsys/vicuna-7b-v1.5-16k) |
| 13B     | `python3 -m fastchat.serve.cli --model-path lmsys/vicuna-13b-v1.5` | [lmsys/vicuna-13b-v1.5](https://huggingface.co/lmsys/vicuna-13b-v1.5) |
| 13B-16k | `python3 -m fastchat.serve.cli --model-path lmsys/vicuna-13b-v1.5-16k` | [lmsys/vicuna-13b-v1.5-16k](https://huggingface.co/lmsys/vicuna-13b-v1.5-16k) |
| 33B     | `python3 -m fastchat.serve.cli --model-path lmsys/vicuna-33b-v1.3` | [lmsys/vicuna-33b-v1.3](https://huggingface.co/lmsys/vicuna-33b-v1.3) |

| Model          | Chat Command                                                 | Hugging Face Repo                                            |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| LongChat-7B    | `python3 -m fastchat.serve.cli --model-path lmsys/longchat-7b-32k-v1.5` | [lmsys/longchat-7b-32k](https://huggingface.co/lmsys/longchat-7b-32k-v1.5) |
| FastChat-T5-3B | `python3 -m fastchat.serve.cli --model-path lmsys/fastchat-t5-3b-v1.0` | [lmsys/fastchat-t5-3b-v1.0](https://huggingface.co/lmsys/fastchat-t5-3b-v1.0) |