# RSA (Rivest-Shamir-Adleman)

为减少计算量，在传送信息时，常采用传统加密方法与[公开密钥加密](https://baike.baidu.com/item/公开密钥加密/8090774?fromModule=lemma_inlink)方法相结合的方式，即信息采用改进的DES或IDEA对话密钥加密，然后使用RSA密钥加密对话密钥和信息摘要。对方收到信息后，用不同的密钥解密并可核对信息摘要。

[RSA加密、解密、签名、验签（验证签名）&RSA算法原理_rsa签名-CSDN博客](https://blog.csdn.net/qq_44750892/article/details/120075922)

非对称加密算法，公钥用于加密数据或验证签名，私钥用于解密数据或生成签名

用途:

- 安全数据传输（如SSL/TLS协议）
- 数字签名和验证
- 密钥交换（如在混合加密系统中）

