import promisesAplusTests from "promises-aplus-tests";

enum MyPromiseStatus {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

function MyPromise(executor: Function) {
  this.promiseStatus = MyPromiseStatus.PENDING;
  this.promiseResult = undefined;
  this.callbacks = []

  const self = this;

  function resolve(value: any) {
    if (self.promiseResult !== MyPromiseStatus.PENDING) {
      return;
    }

    self.promiseStatus = MyPromiseStatus.FULFILLED;
    self.promiseResult = value;

    self.callbacks.forEach((callback: { onResolved: Function, onRejected: Function }) => {
      callback.onResolved(value);
    })
  }

  function reject(reason: any) {
    if (self.promiseResult !== MyPromiseStatus.PENDING) {
      return;
    }

    self.promiseStatus = MyPromiseStatus.REJECTED;
    self.promiseResult = reason;

    self.callbacks.forEach((callback: { onResolved: Function, onRejected: Function }) => {
      callback.onRejected(reason);
    })
  }

  try {
    executor(resolve, reject);
  } catch (e) {
    resolve(e);
  }
}

MyPromise.prototype.then = function (onResolved: Function, onRejected: Function) {
  return new MyPromise((resolve: Function, reject: Function) => {
    switch (this.promiseStatus) {
      case MyPromiseStatus.PENDING:
        this.callbacks.push({
          onResolved: function(value: any) {
            try {
              const result = onResolved(value);
              if (result === Function) {
                result.then((value: any) => {
                  resolve(value)
                }, (reason: any) => {
                  reject(reason);
                })
              } else {
                resolve(result);
              }
            } catch (e) {
              reject(e);
            }
          },
          onRejected: function(reason: any) {
            try {
              const result = onRejected(reason);
              if (result === MyPromise) {
                result.then((value: any) => {
                  resolve(value)
                }, (reason: any) => {
                  reject(reason);
                })
              } else {
                resolve(result);
              }
            } catch (e) {
              reject(e);
            }
          }
        });
        break;
      case MyPromiseStatus.FULFILLED:
        try {
          const result = onResolved(this.promiseResult);
          if (result === MyPromise) {
            result.then((value: any) => {
              resolve(value)
            }, (reason: any) => {
              reject(reason);
            })
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
        break;
      case MyPromiseStatus.REJECTED:
        try {
          const result = onRejected(this.promiseResult);
          if (result === MyPromise) {
            result.then((value: any) => {
              resolve(value)
            }, (reason: any) => {
              reject(reason);
            })
          } else {
            resolve(result);
          }
        } catch (e) {
          reject(e);
        }
        break;
      default:
        throw 'PromiseStatus Error';
    }
  })
}

promisesAplusTests(MyPromise, function (err) {
  console.log(err);
});