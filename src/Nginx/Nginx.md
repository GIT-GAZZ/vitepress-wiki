# Nginx

[Nginx 配置文件详解 (w3schools.cn)](https://www.w3schools.cn/nginx/nginx_command_conf.html)

## 配置文件

Nginx 默认编译安装后，配置文件都会保存在 /usr/local/nginx/conf 目录下，在配置文件目录下，Nginx 默认的主配置文件是 nginx.conf，这也是 Nginx 唯一的默认配置入口

- 配置指令

  在配置文件中，由 Nginx 约定的内部固定字符串，Nginx 官方文档中的英文单词为 directive，本教程中则统一称为配置指令，简称指令。指令是 Nginx 中功能配置的最基本元素，Nginx 的每个功能配置都是通过多个不同的指令组合来实现的。

- 配置指令值

  每个配置指令都有对应的内容来表示该指令的控制参数，本教程中约定其对应的内容为配置指令值，简称指令值。指令值可以是字符串、数字或变量等多种类型。

- 配置指令语句

  指令与指令值组合构成指令语句。一条指令语句可以包含多个配置指令值，在 Nginx 配置文件中，每条指令语句都要用`;`作为语句结束的标识符。

- 配置指令域

  配置指令值有时会是由`{ }`括起来的指令语句集合，本教程中约定`{ }`括起来的部分为配置指令域，简称指令域。指令域既可以包含多个指令语句，也可以包含多个指令域。

- 配置全局域

  配置文件 nginx.conf 中上层没有其他指令域的区域被称为配置全局域，简称全局域。

### 配置指令域

| 域名称   | 域类型 | 域说明                                                       |
| :------- | :----- | :----------------------------------------------------------- |
| main     | 全局域 | Nginx 的根级别指令区域。该区域的配置指令是全局有效的，该指令名为隐性显示，nginx.conf 的整个文件内容都写在该指令域中 |
| events   | 指令域 | Nginx 事件驱动相关的配置指令域                               |
| http     | 指令域 | Nginx HTTP 核心配置指令域，包含客户端完整 HTTP 请求过程中每个过程的处理方法的配置指令 |
| upstream | 指令域 | 用于定义被代理服务器组的指令区域，也称"上游服务器"           |
| server   | 指令域 | Nginx 用来定义服务 IP、绑定端口及服务相关的指令区域          |
| location | 指令域 | 对用户 URI 进行访问路由处理的指令区域                        |
| stream   | 指令域 | Nginx 对 TCP 协议实现代理的配置指令域                        |
| types    | 指令域 | 定义被请求文件扩展名与 MIME 类型映射表的指令区域             |
| if       | 指令域 | 按照选择条件判断为真时使用的配置指令域                       |

```nginx
#指定运行nginx的用户，默认nobody，表示没有用户
#user  nobody;

#指定nginx应该启动多少个工作进程来处理请求，默认1个，auto会自动检测服务器的CPU核心数量，为每个核心启动一个工作进程
worker_processes  1;

#指定错误日志文件的路径和日志级别，日志级别：debug、info、notice、warn、error（默认）、crit、alert、emerg
#该指令在全局块、http块、server块下都可以配置
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#当nginx启动时，它会将其主进程的PID写入这个文件
#pid        logs/nginx.pid;

#----------------上方是全局块，下方是events块----------------

events {
    #最大连接数，默认为512
    worker_connections  1024;
    #设置网路连接序列化，防止惊群现象发生，默认为on
    #accept_mutex on;
    #设置一个进程是否同时接受多个网络连接，默认为off
    #multi_accept off;
    #事件驱动模型：epoll（默认）、kqueue、select、poll
    #use epoll;
}


http {
    #文件扩展名与文件类型映射表，nginx默认提供一套映射表
    include       mime.types;
    #默认文件类型，默认为text/plain
    default_type  application/octet-stream;

    #日志格式，其中main表示这个格式的名称
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #关闭日志
    #access_log off;
    #日志文件位置，采用main日志格式
    #access_log  logs/access.log  main;

    #允许sendfile方式传输文件，默认为off，可以在http块，server块，location块配置
    sendfile        on;
    #每个进程每次调用传输数量不能大于设定的值，默认为0，即不设上限
    #sendfile_max_chunk 100k;
    
    #nginx会尝试发送更大的数据包，通过减少发送的数据包数量来提高网络传输效率
    #tcp_nopush     on;

    #连接超时时间，0表示不限制时间，可以在http，server，location块配置
    keepalive_timeout  65;

    # 压缩
    #gzip  on;

    server {
        #监听端口
        listen       80;
        #监听地址
        server_name  localhost;

        #编码字符集
        #charset koi8-r;

        #access_log  logs/host.access.log  main;

        #请求的url过滤，正则匹配，~为区分大小写，~*为不区分大小写
        location / {
            #网站根目录的位置，这里的html是相对路径，相对nginx安装目录，通常指向/usr/share/nginx/html
            root   html;
            #默认首页文件名
            index  index.html index.htm;
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        # 内部错误的反馈页面
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```

