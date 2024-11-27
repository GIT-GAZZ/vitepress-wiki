# Git网络代理

### HTTP代理

```shell
# 全局设置HTTP代理
git config --global http.proxy "http://127.0.0.1:7890"
git config --global https.proxy "http://127.0.0.1:7890"

# 全局设置Socks代理
git config --global http.proxy "socks5://127.0.0.1:7890"
git config --global https.proxy "socks5://127.0.0.1:7890"

# 临时代理
git clone https://huggingface.co/GanymedeNil/text2vec-large-chinese -c http.proxy="http://127.0.0.1:7890"
```

### 取消代理

```shell
# 查看配置
git config --global --get http.proxy
git config --global --get https.proxy

# 删除配置
git config --global --unset http.proxy
git config --global --unset https.proxy
```

