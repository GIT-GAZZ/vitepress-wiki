# BoosRoom

```c#
ApplicationController
    UpdateRunner
    GameNetPortal
    ClientGameNetPortal
    ServerGameNetPortal
    LocalLobby
    LobbyServiceFacade
    
    Awake    首先设置了Application.wantsToQuit，待探究，设置帧率
    Start    SceneManager.LoadScene("MainMenu"); 立马切换到主菜单场景
    QuitGame 退出游戏的方法：Application.Quit();
UpdateRunner 委托订阅，订阅后以一定周期执行委托，如果周期小于帧率，则每帧都执行，委托的方法必须带有一个float参数，用于超时判断，超时时打断执行
    Subscribe 订阅，参数：委托，周期
    Unsubscribe 取消订阅
```

