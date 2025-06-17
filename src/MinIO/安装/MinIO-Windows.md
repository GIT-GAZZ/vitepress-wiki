# MinIO-Windows

1. 下载二进制可执行文件：https://dl.minio.org.cn/server/minio/release/windows-amd64/minio.exe

2. 复制文件到 `E:\minio\bin\minio.exe`，并设置环境变量

3. 设置环境变量

   ```cmd
   setx MINIO_ROOT_USER minioadmin /M
   setx MINIO_ROOT_PASSWORD minioadmin /M
   ```

4. 启动命令

   ```cmd
   minio.exe server E:\minio\data --console-address ":9001" --address ":9000"
   
   # 带账号密码参数
   minio.exe server E:\minio\data --console-address ":9001" --address ":9000" MINIO_ROOT_USER=minioadmin MINIO_ROOT_PASSWORD=minioadmin
   ```

5. 使用 WinSW 安装服务

   1. 下载文件：https://github.com/winsw/winsw

   2. 重命名文件：minio-server.exe

   3. 添加配置文件：minio-server.xml，注意：必须与WinSW文件的名称相同，配置文件中通用可以指定环境变量

      ```xml
      <service>
          <!-- 指定Windows内部用户标识服务的唯一ID -->
          <id>minio-server</id>
          <!-- 指定Windows服务的简短唯一名称 -->
          <name>minio-server</name>
          <!-- 对服务的完整描述 -->
          <description>MinIO文件存储服务器</description>
          <!-- 可设置环境变量 -->
          <env name="MINIO_HOME" value="%BASE%"/>
          <env name="MINIO_ROOT_USER" value="minioadmin" />
          <env name="MINIO_ROOT_PASSWORD" value="minioadmin" />
          <!-- 执行命令 -->
          <executable>E:\minio\minio.exe</executable>
          <!-- 命令参数 -->
          <arguments>server E:\minio\data --address ":9000" --console-address ":9001"</arguments>
          <!-- 指定日志文件的目录,默认为配置文件所在的目录 -->
          <logpath>%BASE%\logs</logpath>
          <!-- 设置日志模式为按文件大小和时间滚动 -->
          <log mode="roll-by-size-time">
              <!-- 日志文件大小为10240kb生成新日志文件 -->
              <sizeThreshold>10240</sizeThreshold>
              <!-- 设置日志文件名按时间的格式 -->
              <pattern>yyyyMMdd</pattern>
              <!-- 设置每天按时间滚动日志的时间 -->
              <autoRollAtTime>00:00:00</autoRollAtTime>
              <!-- 文件保留天数(需要autoRollAtTime同时使用) -->
              <zipOlderThanNumDays>5</zipOlderThanNumDays>
              <!-- <zipDateFormat>yyyyMMdd</zipDateFormat> -->
          </log>
          <!-- 自动重启 -->
          <onfailure action="restart" delay="60 sec"/>
      </service>
      ```

   4. 执行命令

      ```xml
      minio-server.exe install
      minio-server.exe start
      minio-server.exe stop
      minio-server.exe uninstall
      ```

      