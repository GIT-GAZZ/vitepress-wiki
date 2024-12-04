'use strict';

import promisesAplusTests from "promises-aplus-tests";
import assert = require("node:assert");

enum MyPromiseStatus {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

class MyPromise {
  #promiseStatus = MyPromiseStatus.PENDING;
  #promiseResult = undefined;
  #handlers = []

  readonly #resolve: (value: any) => void;
  readonly #reject: (reason: any) => void;

  static deferred: () => any;

  constructor(executor: Function) {
    this.#resolve = (value: any) => {
      this.#setStatus(MyPromiseStatus.FULFILLED, value)
    }
    this.#reject = (reason: any) => {
      this.#setStatus(MyPromiseStatus.REJECTED, reason)
    }

    try {
      executor(this.#resolve, this.#reject);
    } catch (e) {
      this.#reject(e);
    }
  }

  #setStatus(promiseStatus: MyPromiseStatus, promiseResult: any) {
    if (this.#promiseStatus !== MyPromiseStatus.PENDING) {
      return;
    }
    assert(promiseStatus !== MyPromiseStatus.PENDING);
    this.#promiseStatus = promiseStatus;
    this.#promiseResult = promiseResult;
    this.#run();
  }

  #run() {
    if (this.#promiseStatus === MyPromiseStatus.PENDING) {
      return;
    }
    while (this.#handlers.length) {
      const { onResolved, onRejected, resolve, reject } = this.#handlers.shift();
      if (this.#promiseStatus === MyPromiseStatus.FULFILLED) {
        this.#runOne(onResolved, resolve, reject)
      } else {
        this.#runOne(onRejected, resolve, reject)
      }
    }
  }

  #runOne(callback: Function, resolve: Function, reject: Function) {
    this.#runMicroTask(() => {
      if (!(callback instanceof Function)) {
        const settled = this.#promiseStatus === MyPromiseStatus.FULFILLED ? resolve : reject;
        settled(this.#promiseResult);
        return;
      }
      try {
        const x = callback(this.#promiseResult);
        if (this.#isPromiseLike(x)) {
          if (x === this) {
            reject(new TypeError('Loop Error'));
            return;
          }
          x.then(resolve, reject);
        } else {
          resolve(x);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  #isPromiseLike(result: any) {
    if (result && (result instanceof Object || result instanceof Function)) {
      return result.then instanceof Function;
    }
    return false;
  }

  #runMicroTask(task: MutationCallback) {
    if (typeof process === 'object' && typeof process.nextTick === 'function') {
      process.nextTick(task);
    } else if (typeof MutationObserver === 'function') {
      const observer = new MutationObserver(task);
      const textNode = document.createTextNode('1');
      observer.observe(textNode, {
        characterData: true
      });
      textNode.data = '2';
    } else {
      setTimeout(task);
    }
  }

  then(onResolved?: Function, onRejected?: Function) {
    return new MyPromise((resolve: Function, reject: Function) => {
      this.#handlers.push({
        onResolved,
        onRejected,
        resolve,
        reject
      });
      this.#run();
    })
  }
}

const promise = new MyPromise((resolve: Function, _reject: Function) => {
  resolve(123);
});

const thenPromise = promise.then((value: any) => {
  console.log('promise履行：', value);
  return promise;
}, (reason: any) => {
  console.log('promise拒绝：', reason);
});

thenPromise.then((value: any) => {
  console.log('thenPromise履行：', value);
}, (reason: any) => {
  console.log('thenPromise拒绝：', reason);
});

console.log(promise);

const testAwait = async () => {
  const result = await new Promise((resolve: Function, _reject: Function) => {
    resolve(123);
  });
  console.log('async/await：', result);
}
testAwait().then((value: any) => {
  console.log(value);
}, (reason: any) => {
  console.log(reason);
});

MyPromise.deferred = () => {
  const dfd: any = {};

  dfd.promise = new MyPromise((resolve: Function, reject: Function) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  })
  return dfd;
}

// https://github.com/promises-aplus/promises-tests
promisesAplusTests(MyPromise, (err: any) => {
  // All done; output is in the console. Or check `err` for number of failures.
  console.log(err);
});
