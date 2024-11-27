# Git行尾符号风格

```shell
git config --global core.autocrlf true 签出Windows风格（CRLF），提交Unix风格（LF）
git config --global core.autocrlf input 原样签出，提交Unix风格（LF）
git config --global core.autocrlf false 原样签出，原样提交，不转换
```

