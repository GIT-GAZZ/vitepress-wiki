# pip

### 配置

[Configuration - pip documentation v24.0 (pypa.io)](https://pip.pypa.io/en/stable/topics/configuration/)

[pip config - pip documentation v24.0 (pypa.io)](https://pip.pypa.io/en/stable/cli/pip_config/)

pip的配置有三个级别：

- global：全局级别的配置，优先级低，文件位置：$XDG_CONFIG_DIRS 或 /etc/pip.conf
- user：用户级别的配置，优先级中，文件位置：$HOME/.config/pip/pip.conf
- site：环境级别的配置，优先级高，文件位置：$VIRTUAL_ENV/pip.conf

每个配置文件，都可以设置“命名”，例如[global]或[install]，其中[global]下的配置对所有pip命令生效，[install]只对pip install命令生效

#### 配置相关命令

```shell
# 列出所有配置项
$ pip config list
# 列出配置文件及其配置，并显示配置文件是否存在，可用于分析配置文件
$ pip config debug

# 默认使用用户级别的配置
$ pip config get <配置>
	--global
	--user
	--site
$ pip config set <配置>
$ pip config unset <配置>
```



### 镜像仓库

- 常见镜像仓库
  - 官方：https://pypi.org/simple/
  - 阿里云：https://mirrors.aliyun.com/pypi/simple/
  - 清华：https://pypi.tuna.tsinghua.edu.cn/simple/

- 修改配置

  ```shell
  $ pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
  $ pip config set install.trusted-host mirrors.aliyun.com
  ```

- 安装时指定（一次性）

  ```shell
  # 根据requirements.txt安装依赖包
  pip install -r requirements.txt
  	-i https://mirrors.aliyun.com/pypi/simple/ # 镜像仓库
  	--trusted-host mirrors.aliyun.com # 信任来源
  ```

  

### 代理

- 方式一：使用Linux全局代理

- 方式二：安装时指定（一次性）

  ```shell
  # 根据requirements.txt安装依赖包
  pip install -r requirements.txt
  	--proxy=http://192.168.10.9:7890 # 代理
  ```

  