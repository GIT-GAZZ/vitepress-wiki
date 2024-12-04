# Promise

ES6 引入的异步编程的解决方案，支持链式调用，可以解决回调地狱问题

[使用 Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

[Promise - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

构造函数 `Promise` 的 `resolve` 和 `reject` 可以接收一个普通的值，也可以接收一个 `Promise`，将一个 `Promise` 传递给
`resolve` 或 `reject` 时，当前 `Promise` 会等待传入的 `Promise` 完成，并且会根据传递的 `Promise` 的最终状态来决定当前
`Promise` 的状态

构造函数 `Promise` 的 `executor` 函数的返回值没有任何作用

`Promise` 的回调函数是异步任务，且会等待所有同步任务（同步代码，也就是 `then` 函数后面的其他业务代码）执行完成

## 代码示例和测试

<button :class="$style.button" @click=test_1_1>点击测试：</button>

```javascript-vue
{{ test_1_1.toString() }}
```

<button :class="$style.button" @click=test_1_2>点击测试：</button>

```javascript-vue
{{ test_1_2.toString() }}
```

<button :class="$style.button" @click=test_1_3>点击测试</button>：同一个 `Promise` 多个 `then` 回调

```javascript-vue
{{ test_1_3.toString() }}
```

<button :class="$style.button" @click=test_1_4>点击测试</button>：同一个 `Promise` 多个 `catch` 回调

```javascript-vue
{{ test_1_4.toString() }}
```

<button :class="$style.button" @click=test_2_1>点击测试：</button>嵌套 `Promise`，成功 => 成功

```javascript-vue
{{ test_2_1.toString() }}
```

<button :class="$style.button" @click=test_2_2>点击测试：</button>嵌套 `Promise`，成功 => 失败

```javascript-vue
{{ test_2_2.toString() }}
```

<button :class="$style.button" @click=test_2_3>点击测试：</button>嵌套 `Promise`，失败 => 成功

```javascript-vue
{{ test_2_3.toString() }}
```

<button :class="$style.button" @click=test_2_4>点击测试：</button>嵌套 `Promise`，失败 => 失败

```javascript-vue
{{ test_2_4.toString() }}
```

<button :class="$style.button" @click=test_3_1>点击测试：</button>`then` 的成功回调函数的返回值

```javascript-vue
{{ test_3_1.toString() }}
```

<button :class="$style.button" @click=test_3_2>点击测试：</button>`then` 的成功回调函数的返回值

```javascript-vue
{{ test_3_2.toString() }}
```

<button :class="$style.button" @click=test_3_3>点击测试：</button>`then` 的成功回调函数的返回值

```javascript-vue
{{ test_3_3.toString() }}
```

<button :class="$style.button" @click=test_3_4>点击测试：</button>`then` 的成功回调函数的返回值

```javascript-vue
{{ test_3_4.toString() }}
```

<button :class="$style.button" @click=test_4_1>点击测试：</button>`then` 的成功回调函数的返回值

```javascript-vue
{{ test_4_1.toString() }}
```

<script setup lang="ts">
const randomBoolean = () => Math.random() < 0.5;
const randomInteger = (m, n) => Math.ceil(Math.random() * (n - m + 1)) + m - 1;

const randomPromise = (tag) => {
  tag = tag || '';
  return new Promise((resolve, reject) => {
    randomBoolean() ? resolve(tag + '成功') : reject(tag + '失败');
  });
};

const test_1_1 = () => {
  randomPromise().then((value) => {
    console.log(value);
  }, (reason) => {
    console.log(reason);
  });
};

const test_1_2 = () => {
  randomPromise().then((value) => {
    console.log(value);
  }).catch((reason) => {
    console.log(reason);
  });
};

const test_1_3 = () => {
  const promise =  Promise.resolve('成功');

  promise.then((value) => {
    console.log('第一次回调：' + value);
  });
  promise.then((value) => {
    console.log('第二次回调：' + value);
  });
};

const test_1_4 = () => {
  const promise =  Promise.reject('失败');

  promise.catch((reason) => {
    console.log('第一次回调：' + reason);
  });
  promise.catch((reason) => {
    console.log('第二次回调：' + reason);
  });
};

const test_2_1 = () => {
  new Promise((resolve, reject) => {
    resolve(Promise.resolve(true));
  }).then((value) => {
    console.log('测试成功：' + value);
  }).catch((reason) => {
    console.log('测试失败：' + reason);
  });
};

const test_2_2 = () => {
  new Promise((resolve, reject) => {
    resolve(Promise.reject(false));
  }).then((value) => {
    console.log('测试成功：' + value);
  }).catch((reason) => {
    console.log('测试失败：' + reason);
  });
};

const test_2_3 = () => {
  new Promise((resolve, reject) => {
    reject(Promise.resolve(true));
  }).then((value) => {
    console.log('测试成功：' + value);
  }).catch((reason) => {
    console.log('测试失败：' + reason);
  });
};

const test_2_4 = () => {
  new Promise((resolve, reject) => {
    reject(Promise.reject(false));
  }).then((value) => {
    console.log('测试成功：' + value);
  }).catch((reason) => {
    console.log('测试失败：' + reason);
  });
};

const test_3_1 = () => {
  const thenPromise = Promise.resolve('第一层成功').then((value) => {
    console.log(value);
  }).then((value) => {
    console.log(value);
  }).then((value) => {
    console.log(value);
  });
  console.log(thenPromise);
};

const test_3_2 = () => {
  const thenPromise = Promise.resolve('第一层成功').then((value) => {
    console.log(value);
    return '第二层成功';
  }).then((value) => {
    console.log(value);
    return '第三层成功';
  }).then((value) => {
    console.log(value);
    return '第四层成功';
  });
  console.log(thenPromise);
};

const test_3_3 = () => {
  const thenPromise = Promise.resolve('第一层成功').then((value) => {
    console.log(value);
    return Promise.resolve('第二层成功');
  }).then((value) => {
    console.log(value);
    return Promise.resolve('第三层成功');
  }).then((value) => {
    console.log(value);
    return Promise.resolve('第四层成功');
  });
  console.log(thenPromise);
};

const test_3_4 = () => {
  const thenPromise = Promise.resolve('第一层成功').then((value) => {
    console.log(value);
    return Promise.resolve('第二层成功');
  }).then((value) => {
    console.log(value);
    return Promise.reject('第三层失败');
  }).then((value) => {
    console.log(value);
    return Promise.resolve('第四层成功');
  });
  console.log(thenPromise);
};

const test_4_1 = () => {
  const promise = randomPromise('第一层');

  const thenPromise = promise.then((value) => {
    console.log(value);
  }, (reason) => {
    console.log(reason);
  });

  const catchPromise = promise.catch((reason) => {
    console.log(reason);
  });

  console.log(promise);
  console.log(thenPromise);
  console.log(catchPromise);
};
</script>

<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
