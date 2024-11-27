# Nginx-SSL

[HTTP 与 HTTPS 的区别 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/http-vs-https.html)

```
server {
    listen          80;
    server_name     www.xinhesupplychain.com;
    return          301 https://$server_name$request_uri;
}

server {
    listen          443 ssl http2;
    server_name     www.xinhesupplychain.com;

    # HTTPS教程：https://www.runoob.com/w3cnote/http-vs-https.html
    # SSL证书文件路径（可以公开）
    ssl_certificate             /usr/share/nginx/cert/9673433_xinhesupplychain.com.pem;
    # SSL私钥文件路径（不能公开）
    ssl_certificate_key         /usr/share/nginx/cert/9673433_xinhesupplychain.com.key;
    # 安全链接可选的加密协议
    ssl_protocols               TLSv1.1 TLSv1.2 TLSv1.3;
    # 密钥交换算法，可以配置多组加密算法，每组加密算法之间使用冒号‘:’分隔，Nginx会依次尝试这些加密算法，直到找到客户端和服务器都支持的加密算法为止
    ssl_ciphers                 EECDH+CHACHA20:EECDH+CHACHA20-draft:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5;
    # 使用服务器端的首选算法
    ssl_prefer_server_ciphers   on;
    # 开启SSL会话缓存，会话缓存数量最多1000个，缓存大小最多10MB，1MB大约能缓存4000个会话，只使用shared:SSL:10m性能会高一点
    # ssl_session_cache           builtin:1000 shared:SSL:10m;
    ssl_session_cache           shared:SSL:10m;
    # 缓存有效期
    ssl_session_timeout         10m;
}
```

