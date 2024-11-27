# C#

```c#
(a).  delegate:
delegate我们常用到的一种声明
Delegate至少0个参数，至多32个参数，可以无返回值，也可以指定返回值类型。
例：public delegate int MethodtDelegate(int x, int y);表示有两个参数，并返回int型。

(b).  Action:

     Action是无返回值的泛型委托。
Action 表示无参，无返回值的委托
Action<int,string> 表示有传入参数int,string无返回值的委托
  Action<int,string,bool> 表示有传入参数int,string,bool无返回值的委托
     Action<int,int,int,int> 表示有传入4个int型参数，无返回值的委托
Action至少0个参数，至多16个参数，无返回值。

(c). Func:

Func是有返回值的泛型委托
Func<int> 表示无参，返回值为int的委托
Func<object,string,int> 表示传入参数为object, string 返回值为int的委托
Func<object,string,int> 表示传入参数为object, string 返回值为int的委托
Func<T1,T2,,T3,int> 表示传入参数为T1,T2,,T3(泛型)返回值为int的委托
Func至少0个参数，至多16个参数，根据返回值泛型返回。必须有返回值，不可void

(d) .predicate:

    predicate 是返回bool型的泛型委托
predicate<int> 表示传入参数为int 返回bool的委托
Predicate有且只有一个参数，返回值固定为bool

IDisposable 
```

