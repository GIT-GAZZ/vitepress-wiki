# Maven

## settings.xml

官方文档：https://maven.apache.org/settings.html

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">

    <!-- 本地仓库，默认：${user.home}/.m2/repository，${MAVEN_HOME}是环境变量 -->
    <!-- 最好不要使用${MAVEN_HOME}，IDEA自动识别仓库位置时，会出问题，所以直接写绝对路径 -->
    <localRepository>${MAVEN_HOME}/repository</localRepository>
    <!-- 交互模式，默认为true，为false时效果与-DinteractiveMode一样 -->
    <interactiveMode>true</interactiveMode>
    <!-- 脱机运行 -->
    <offline>false</offline>
    <!-- 插件组织：命令使用插件时，可以省略已经配置的groupId -->
    <pluginGroups>
        <!-- 默认配置的插件组织ID -->
        <pluginGroup>org.apache.maven.plugins</pluginGroup>
        <pluginGroup>org.codehaus.mojo</pluginGroup>
    </pluginGroups>
    <!-- 配置仓库的鉴权信息，这些敏感信息应在settings中配置 -->
    <servers>
        <server>
            <!-- 用于匹配其他地方配置的仓库 -->
            <id>server001</id>
            <!-- 用户名 -->
            <username>my_login</username>
            <!-- 密码，密码可以加密：https://maven.apache.org/guides/mini/guide-encryption.html -->
            <password>my_password</password>
            <!-- 访问存储库的ssh密钥路径，如果访问需要遵守ssh安全协议且采用密钥认证的话。 默认在本地的${user.home}/.ssh/id_dsa目录中，密码不为空时，私钥无效 -->
            <privateKey>${user.home}/.ssh/id_dsa</privateKey>
            <!-- 访问存储库的ssh口令，如果访问需要遵守ssh安全协议且采用口令认证的话 -->
            <passphrase>some_passphrase</passphrase>
            <!-- 发布时创建的文件的访问权限，采用*nix文件权限格式，也就是我们常用的linux文件权限一样。例如775等 -->
            <filePermissions>664</filePermissions>
            <!-- 发布时创建的目录的访问权限，采用*nix文件权限格式，也就是我们常用的linux文件权限一样。例如775等 -->
            <directoryPermissions>775</directoryPermissions>
            <!-- 其他设置 -->
            <configuration></configuration>
        </server>
    </servers>
    <!--镜像：https://maven.apache.org/guides/mini/guide-mirror-settings.html-->
    <!--pom中可以配置repository仓库，超级pom中默认配置了id为central的中央仓库（远程仓库）-->
    <!--settings.xml中可以配置镜像仓库，其配置的mirrorOf会匹配pom.xml中repository仓库，被匹配的远程仓库改成从对应的镜像仓库下载构件-->
    <mirrors>
        <!-- 阿里云镜像 -->
        <mirror>
            <!-- 镜像的唯一标识，可以取任意ID -->
            <id>aliyunmaven</id>
            <!-- 镜像的名称，可以取任意名称 -->
            <name>阿里云公共仓库</name>
            <!-- 镜像的地址 -->
            <url>https://maven.aliyun.com/repository/public</url>
            <!-- mirrorOf为*时，匹配所有远程仓库，为central时匹配超级pom中默认配置的中央仓库 -->
            <mirrorOf>*</mirrorOf>
        </mirror>
    </mirrors>
    <!-- 网络代理，网络不通时需要代理 -->
    <proxies></proxies>
    <!-- 预制文件，相当于精简版pom文件，在不同环境下可以使用不同的profile，优先级比pom还要高，会覆盖pom中的配置 -->
    <profiles>
        <profile>
            <id>test</id>
            <!-- activation中的所有条件（除了activeByDefault）都满足时才激活profile -->
            <activation>
                <!--是否默认激活-->
                <activeByDefault>false</activeByDefault>
                <!-- JDK版本，符合1.5及其子版本，例如1.5.0_06 也符合条件 -->
                <jdk>1.5</jdk>
                <os>
                    <!-- 操作系统名称，通过java系统属性os.name获取 -->
                    <name>Windows XP</name>
                    <!-- 操作系统类型：Unix、Windows、Mac，不区分大小写 -->
                    <family>Windows</family>
                    <!-- 计算机CPU架构，通过java系统属性os.arch获取 -->
                    <arch>x86</arch>
                    <!-- 操作系统版本号，通过java系统属性os.version获取 -->
                    <version>5.1.2600</version>
                </os>
                <!-- 根据属性值判断是否激活 -->
                <property>
                    <name>mavenVersion</name>
                    <value>2.0.3</value>
                </property>
                <!-- 根据文件是否存在判断激活 -->
                <file>
                    <exists>${basedir}/file2.properties</exists>
                    <missing>${basedir}/file1.properties</missing>
                </file>
            </activation>
            <properties></properties>
            <repositories></repositories>
            <pluginRepositories></pluginRepositories>
        </profile>
    </profiles>
    <!-- 激活profiles -->
    <activeProfiles>
        <!-- 通过id激活profile，优先级最高 -->
        <activeProfile>test</activeProfile>
    </activeProfiles>
</settings>
```

## pom.xml

官方文档：https://maven.apache.org/pom.html

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">

    <!-- POM模型版本，如何解析pom.xml，新版maven只支持4.0.0 -->
    <modelVersion>4.0.0</modelVersion>
    <!-- GAV -->
    <groupId>com.example</groupId>
    <artifactId>test</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!-- 打包方式：jar（默认）、war、pom，pom一般是父工程中使用 -->
    <packaging>jar</packaging>
    <name>test</name>
    <url>http://maven.apache.org</url>
    
    <!-- 其他信息BEGIN -->
    <!-- 开发者信息 -->
    <developers></developers>
    <!-- 许可证 -->
    <licenses>...</licenses>
    <!-- 其他信息END -->
    
    <!-- 自定义属性 -->
    <properties>
        <!-- 源码编码 -->
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <!-- 报告文档编码 -->
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <maven.compiler.encoding>UTF-8</maven.compiler.encoding>
        
        <!-- 打包后，在其他地方使用这个jar包，版本必须比下面指定的版本高，不然会报错 -->         
        <!-- 源码语法版本，由maven-compiler-plugin读取，相当于javac -source -->
        <maven.compiler.source>${java.version}</maven.compiler.source>
        <!-- 编译字节码版本，由maven-compiler-plugin读取，相当于javac -target -->
        <maven.compiler.target>${java.version}</maven.compiler.target>
        <!-- 指定编译器版本，由maven-compiler-plugin读取，插件不是使用javac进行编译，而是使用javax.tools.JavaCompiler进行编译 -->
        <maven.compiler.compilerVersion>${java.version}</maven.compiler.compilerVersion>
                        
        <!-- 自动下载源码和文档，这个配置放settings中，好像没有用 -->
        <downloadSources>true</downloadSources>
        <downloadJavadocs>true</downloadJavadocs>
    </properties>
    
    <!-- 依赖的远程仓库 -->
    <repositories>
        <repository>
            <!-- 快照 -->
            <snapshots>
                <!-- 禁止从这个仓库下载快照版本的构件 -->
                <enabled>false</enabled>
            </snapshots>
            <!-- 仓库ID，配置镜像仓库时会匹配这个ID -->
            <id>central</id>
            <name>Central Repository</name>
            <!-- 中央仓库 -->
            <url>https://repo.maven.apache.org/maven2</url>
        </repository>
    </repositories>
    
    <!-- 插件的远程仓库，配置信息和repositories一样 -->
    <pluginRepositories>
        <pluginRepository>
            <!-- 稳定版本 -->
            <releases>
                <!-- 下载稳定版本的构件-->
                <!-- <enabled>true</enabled> -->
                <!-- 更新策略：always（默认，总是检查更新）、daily（每天检查一次更新）、interval:X（每 X 分钟检查一次更新）、never（从不检查更新）-->
                <updatePolicy>never</updatePolicy>
            </releases>
            <!-- 快照 -->
            <snapshots>
                <!-- 禁止从这个仓库下载快照版本的构件-->
                <enabled>false</enabled>
            </snapshots>
            <id>central</id>
            <name>Central Repository</name>
            <!-- 中央仓库 -->
            <url>https://repo.maven.apache.org/maven2</url>
        </pluginRepository>
    </pluginRepositories>
    
    <!-- 依赖管理，不引入实际依赖，这里的配置会作为dependencies中同一依赖的缺省配置 -->
    <dependencyManagement>
        <dependencies>
            <!-- 具体一个依赖 -->
            <dependency>
                <!-- GAV -->
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!-- 依赖列表 -->
    <dependencies>
        <!-- 具体一个依赖 -->
        <dependency>
            <!-- GAV -->
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <!-- 这里的版本号有很多写法：https://maven.apache.org/pom.html#dependency-version-requirement-specification -->
            <!-- 版本号定义规范：https://maven.apache.org/pom.html#version-order-specification -->
            <version>3.8.1</version>
            
            <!-- 依赖类型：jar（默认） -->
            <type>jar</type>
            
            <!-- 依赖范围：compile（默认）、test、provided、system、runtime、import，具体信息查看脑图 -->
            <!-- provided：打包部署时不需要，这些依赖会以其他方式提供 -->
            <scope>test</scope>
            
            <!-- 标记为可选依赖，A依赖B，B依赖C，如果C是可选的，则A不会依赖C -->
            <optional>true</optional>
            
            <exclusions>
                <!-- 排除的依赖 -->
                <exclusion>
                    <!-- GA，可以使用通配符 -->
                </exclusion>
            </exclusions>
        </dependency>
                         
        <!-- system依赖范围示例，不建议使用 -->
        <dependency>
            <scope>system</scope>
            <!-- system依赖范围必须添加systemPath标签 -->
            <systemPath>${basedir}\src\lib\ldapjdk.jar</systemPath>
        </dependency>
    </dependencies>
             
    <!-- 继承父POM -->
    <parent>
        <!-- 父工程的GAV -->
        
        <!-- 指定父POM的（相对）路径，默认值：../pom.xml，查找顺序：relativePath > 本地仓库 > 远程仓库 -->
        <relativePath>../pom.xml</relativePath>
        <!-- 设定一个空值将始终从仓库中获取，不从本地路径获取 -->
        <relativePath/>
    </parent>
    
    <!-- 在父工程中配置 -->
    <modules>
        <module>子工程相对路径（子pom所在文件夹）</module>
    </modules>
    
    <build>        
        <pluginManagement></pluginManagement>
        <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.10.1</version>
                <executions>
                    <execution>
                        <id>default-compile</id>
                        <phase>compile</phase>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>default-testCompile</id>
                        <phase>test-compile</phase>
                        <goals>
                            <goal>testCompile</goal>
                        </goals>
                    </execution>
                </executions>
                <configuration>
                    <!-- 与maven.compiler.source属性的作用一样 -->
                    <source>${java.version}</source>
                    <!-- 与maven.compiler.target属性的作用一样 -->
                    <target>${java.version}</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
    
    <reporting>
        <plugins>
            <!-- 配置 reporting 插件 -->
        </plugins>
    </reporting>
</project>
```

## 超级POM

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <repositories>
        <repository>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
            <id>central</id>
            <name>Central Repository</name>
            <url>https://repo.maven.apache.org/maven2</url>
        </repository>
    </repositories>
    <pluginRepositories>
        <pluginRepository>
            <releases>
                <updatePolicy>never</updatePolicy>
            </releases>
            <snapshots>
                <enabled>false</enabled>
            </snapshots>
            <id>central</id>
            <name>Central Repository</name>
            <url>https://repo.maven.apache.org/maven2</url>
        </pluginRepository>
    </pluginRepositories>
    <build>
        <sourceDirectory>D:\projects\IdeaProjects\test\src\main\java</sourceDirectory>
        <scriptSourceDirectory>D:\projects\IdeaProjects\test\src\main\scripts</scriptSourceDirectory>
        <testSourceDirectory>D:\projects\IdeaProjects\test\src\test\java</testSourceDirectory>
        <outputDirectory>D:\projects\IdeaProjects\test\target\classes</outputDirectory>
        <testOutputDirectory>D:\projects\IdeaProjects\test\target\test-classes</testOutputDirectory>
        <resources>
            <resource>
                <directory>D:\projects\IdeaProjects\test\src\main\resources</directory>
            </resource>
        </resources>
        <testResources>
            <testResource>
                <directory>D:\projects\IdeaProjects\test\src\test\resources</directory>
            </testResource>
        </testResources>
        <directory>D:\projects\IdeaProjects\test\target</directory>
        <finalName>test-1.0-SNAPSHOT</finalName>
        <pluginManagement>
            <plugins>
                <plugin>
                    <artifactId>maven-antrun-plugin</artifactId>
                    <version>1.3</version>
                </plugin>
                <plugin>
                    <artifactId>maven-assembly-plugin</artifactId>
                    <version>2.2-beta-5</version>
                </plugin>
                <plugin>
                    <artifactId>maven-dependency-plugin</artifactId>
                    <version>2.8</version>
                </plugin>
                <plugin>
                    <artifactId>maven-release-plugin</artifactId>
                    <version>2.5.3</version>
                </plugin>
            </plugins>
        </pluginManagement>
        <plugins>
            <plugin>
                <artifactId>maven-clean-plugin</artifactId>
                <version>3.2.0</version>
                <executions>
                    <execution>
                        <id>default-clean</id>
                        <phase>clean</phase>
                        <goals>
                            <goal>clean</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-resources-plugin</artifactId>
                <version>3.3.0</version>
                <executions>
                    <execution>
                        <id>default-testResources</id>
                        <phase>process-test-resources</phase>
                        <goals>
                            <goal>testResources</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>default-resources</id>
                        <phase>process-resources</phase>
                        <goals>
                            <goal>resources</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-jar-plugin</artifactId>
                <version>3.3.0</version>
                <executions>
                    <execution>
                        <id>default-jar</id>
                        <phase>package</phase>
                        <goals>
                            <goal>jar</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.10.1</version>
                <executions>
                    <execution>
                        <id>default-compile</id>
                        <phase>compile</phase>
                        <goals>
                            <goal>compile</goal>
                        </goals>
                    </execution>
                    <execution>
                        <id>default-testCompile</id>
                        <phase>test-compile</phase>
                        <goals>
                            <goal>testCompile</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-surefire-plugin</artifactId>
                <version>3.0.0-M8</version>
                <executions>
                    <execution>
                        <id>default-test</id>
                        <phase>test</phase>
                        <goals>
                            <goal>test</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-install-plugin</artifactId>
                <version>3.1.0</version>
                <executions>
                    <execution>
                        <id>default-install</id>
                        <phase>install</phase>
                        <goals>
                            <goal>install</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-deploy-plugin</artifactId>
                <version>3.0.0</version>
                <executions>
                    <execution>
                        <id>default-deploy</id>
                        <phase>deploy</phase>
                        <goals>
                            <goal>deploy</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-site-plugin</artifactId>
                <version>3.12.1</version>
                <executions>
                    <execution>
                        <id>default-site</id>
                        <phase>site</phase>
                        <goals>
                            <goal>site</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>D:\projects\IdeaProjects\test\target\site</outputDirectory>
                            <reportPlugins>
                                <reportPlugin>
                                    <groupId>org.apache.maven.plugins</groupId>
                                    <artifactId>maven-project-info-reports-plugin</artifactId>
                                </reportPlugin>
                            </reportPlugins>
                        </configuration>
                    </execution>
                    <execution>
                        <id>default-deploy</id>
                        <phase>site-deploy</phase>
                        <goals>
                            <goal>deploy</goal>
                        </goals>
                        <configuration>
                            <outputDirectory>D:\projects\IdeaProjects\test\target\site</outputDirectory>
                            <reportPlugins>
                                <reportPlugin>
                                    <groupId>org.apache.maven.plugins</groupId>
                                    <artifactId>maven-project-info-reports-plugin</artifactId>
                                </reportPlugin>
                            </reportPlugins>
                        </configuration>
                    </execution>
                </executions>
                <configuration>
                    <outputDirectory>D:\projects\IdeaProjects\test\target\site</outputDirectory>
                    <reportPlugins>
                        <reportPlugin>
                            <groupId>org.apache.maven.plugins</groupId>
                            <artifactId>maven-project-info-reports-plugin</artifactId>
                        </reportPlugin>
                    </reportPlugins>
                </configuration>
            </plugin>
        </plugins>
    </build>
    <reporting>
        <outputDirectory>D:\projects\IdeaProjects\test\target\site</outputDirectory>
    </reporting>
</project>
```

