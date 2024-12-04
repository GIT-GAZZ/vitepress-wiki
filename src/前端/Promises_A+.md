# Promises/A+

[Promises/A+ 规范官网](https://promisesaplus.com/)

[Promises/A+ GitHub](https://github.com/promises-aplus)

## 术语

- `promise` 是一个具有 `then` 方法的对象或函数，其行为符合此规范

- `thenable` 同样是一个具有 `then` 方法的对象或函数，但其行为不一定符合此规范（一个非标准的 `promise` 实现）

- `value` 是任何合法的 JavaScript 值（包括 `undefined`、`thenable` 或 `promise`）

- `exception` 是使用 `throw` 语句抛出的值

- `reason` 是一个表示承诺被拒绝的原因的值

## 要求

### Promise 状态

`promise` 必须处于以下三种状态之一：`pending`、`fulfilled` 或 `rejected`

- 处于 `pending` 时：
  - 可能会改变为 `fulfilled` 或 `rejected` 状态
- 处于 `fulfilled` 时：
  - 不得改变为任何其他状态
  - 必须有一个 `value`，并且该 `value` 不能改变
- 处于 `rejected` 时：
  - 不得改变为任何其他状态
  - 必须有一个 `reason`，并且该 `reason` 不能改变

### `then` 方法

`promise` 必须提供 `then `方法来访问其当前或最终的 `value` 或 `reason`

`promise` 的 `then` 方法接受两个参数

```javascript
promise.then(onFulfilled, onRejected)
```

- `onFulfilled` 和 `onRejected` 都是可选参数
  - 如果 `onFulfilled` 不是函数，则必须忽略它
  - 如果 `onRejected` 不是函数，则必须忽略它
- 如果 `onFulfilled` 是一个函数
  - 在 `promise` 被履行之后调用，并以 `promise` 的 `value` 作为第一个参数
  - 在 `promise` 被履行之前不能调用
  - 不能多次调用
- 如果 `onRejected` 是一个函数，
  - 在 `promise` 被拒绝之后调用，并以 `promise` 的 `reason` 作为第一个参数
  - 在 `promise` 被拒绝之前不能调用
  - 不能多次调用
- 在执行上下文堆栈仅包含平台代码之前，不得调用 `onFulfilled` 或 `onRejected`
  - 执行上下文堆栈：这是 JavaScript 执行引擎用来管理函数调用的一个栈结构，每当一个函数被调用时，它会被推入这个栈，函数执行完毕后再从栈中弹出
  - 平台代码：指的是 JavaScript 引擎内部和与 JavaScript 运行时环境相关的低级代码（如垃圾回收、事件循环机制等）
  - `promise` 的回调函数（`onFulfilled` 或 `onRejected`）的执行是异步的，意味着它们不会立即在 `promise` 被履行或拒绝时执行，而是会被安排到一个微任务队列中，在回调函数被执行之前，所有同步任务必须先完成，这是为了确保回调执行时不会受到当前执行栈中同步代码的影响，保持异步执行的顺序性和一致性
- `onFulfilled` 和 `onRejected` 必须作为函数调用（即没有 `this` 值）

- `then` 可能会针对同一个 `promise` 被多次调用

  - 在 `promise` 被履行之后，所有相应的 `onFulfilled` 回调必须按照其原始调用 `then` 的顺序执行
  - 在 `promise` 被拒绝之后，所有相应的 `onRejected` 回调必须按照其原始调用 `then` 的顺序执行

- `then` 必须返回一个承诺

  ```javascript
  promise2 = promise1.then(onFulfilled, onRejected);
  ```

  - 如果 `onFulfilled` 或 `onRejected` 返回值为 `x` ，则运行 Promise Resolution Procedure（解析过程）：`[[Resolve]](promise2, x)`
  - 如果 `onFulfilled `或 `onRejected` 抛出异常 `e` ，则 `promise2` 必须以 `e` 作为 `reason` 被拒绝
  - 如果 `onFulfilled` 不是函数并且 `promise1` 已实现， `promise2` 必须以与 `promise1` 相同的 `value` 来实现
  - 如果 `onRejected `不是函数并且 `promise1` 被拒绝， `promise2` 必须以与 `promise1` 相同的 `reason` 被拒绝

### Promise 解析过程

**Promise Resolution Procedure（解析过程）**是一个抽象操作，以 `promise` 和 `value` 作为输入，我们将其表示为 `[[Resolve]](promise, x)`

如果 `x` 是 `promise` 或 `thenable`，它会尝试让 `promise` 采用 `x` 的状态，否则它会以 `x` 值来解决 `promise`

Promise Resolution Procedure 执行步骤如下：

- 如果 `promise` 和 `x` 引用同一个对象，则拒绝 `promise` 并以 `TypeError` 作为 `reason`
- 如果 `x` 是一个 `promise`，则采用它的状态
  - 如果 `x` 处于 `pending` 状态，则 `promise` 必须保持 `pending` 状态，直到 `x` 被履行或拒绝
  - 当 `x` 被履行时，以相同的 `value` 履行 `promise`
  - 当 `x` 被拒绝时，以相同的 `reason` 拒绝 `promise`
- 如果 `x` 是对象或函数
  - 设 `then` 为 `x.then`
  - 如果检索属性 `x.then` 导致抛出异常 `e` ，则以 `e` 作为 `reason` 拒绝 `promise`
  - 如果 `then` 是一个函数，则使用 `x` 作为 `this`、`resolve` 作为第一个参数、`reject` 作为第二个参数来调用它
    - 当以 `y` 为 `value` 调用 `resolve` 时，运行 `[[Resolve]](promise, y)`
    - 当以 `r` 为 `reason` 调用 `reject` 时，则以 `r` 拒绝 `promise`
    - 如果同时调用了 `resolve` 和 `reject`，或者对同一参数进行了多次调用，则第一个调用优先，并且忽略任何其他调用
    - 如果调用 `then` 会抛出异常 `e`
      - 如果已调用 `resolvePromise` 或 `rejectPromise`，请忽略它
      - 否则，以 `e` 为 `reason` 拒绝 `promise`
  - 如果 `then` 不是函数，则用 `x` 履行 `promise`
- 如果 `x` 不是对象或函数，则用 `x` 履行 `promise`

