# NetCode

GoldenPath.exe -logfile log-server.txt -mlapi server & GoldenPath.exe -logfile log-client.txt -mlapi client

Element.exe -logfile log-server.txt & Element.exe -logfile log-client.txts

```c#
NetworkManager.Singleton.StartClient();
NetworkManager.Singleton.StartServer();
NetworkManager.Singleton.StartHost();

NetworkManager.Singleton.StopClient();
NetworkManager.Singleton.StopServer();
NetworkManager.Singleton.StopHost();
NetworkManager.Singleton.Shutdown(); 上面三个方法已弃用

NetworkManager.Singleton.IsClient
NetworkManager.Singleton.IsServer
NetworkManager.Singleton.IsHost

NetworkManager.Singleton.NetworkConfig.NetworkTransport.GetType().Name

NetworkBehaviour.IsOwner
NetworkBehaviour.IsLocalPlayer

NetworkVariable<> 单向同步，服务端修改，然后同步至所有客户端，在客户端修改，会马上被服务端的原值覆盖，相当于没有效果

NetworkManager.Singleton.GetComponent<UNetTransport>().ConnectAddress = "127.0.0.1";
NetworkManager.Singleton.GetComponent<UNetTransport>().ConnectPort = 12345;

GetComponent<NetworkObject>().ChangeOwnership(clientId);
GetComponent<NetworkObject>().RemoveOwnership();

NetworkManager.Singleton.ConnectedClients[clientId].PlayerObject;

NetworkManager.RunInBackground  设置是否后台运行

Unity.Netcode.NetworkSpawnManager 待学习
Avatar 待学习

[ServerRpc] 在Server端执行代码，方法名称后缀必须是ServerRpc，方法有ServerRpcParams参数
[ClientRpc] 在Client端执行代码，方法名称后缀必须是ClientRpc

NetworkBehaviour.OnNetworkSpawn 网络对象生成时执行，服务器和所有客户端都会执行，使用IsOwner来只让所有者执行

NetworkObject Spawn 在网络中绑定网络对象，该对象归服务器所有，只能由服务器调用
NetworkObject SpawnAsPlayerObject 指定一个客户端绑定，并设置为Player对象
NetworkObject SpawnWithOwnership 知道一个客户端绑定，该对象归指定客户端所有

NetworkObject playerNO = NetworkManager.Singleton.LocalClient.PlayerObject;
NetworkManager.Singleton.SpawnManager.GetLocalPlayerObject();
```

