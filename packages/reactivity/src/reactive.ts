import { isObject } from "@vue/shared";

// const { isObject }
// 1)将数据转换为响应式的数据，只能做对象的代理
const reactiveMap = new WeakMap(); // 弱引用映射表, key只能是对象，value可以是任意类型
const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
}

// 1)实现同一个对象，代理多次，返回同一个代理
// 2）代理对象被再次代理，可以直接返回（如果已经是代理过的对象，就不要再代理了）
export function reactive(target) {
  console.log("target---", target);
  if (!isObject(target)) {
    return;
  }

  if (target[ReactiveFlags.IS_REACTIVE]) {
    // 如果目标是一个代理对象，那么一定被代理过了，会走get
    return target;
  }
  // 如果已经代理过了，就不要再代理了
  let existingProxy = reactiveMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  // 并没有重新定义属性， 只是代理，在取值的时候会调用get，当赋值的时候会调用set
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      console.log("get key---", key);
      // receiver 当前的代理对象
      // 去代理对象上取值，就走get
      // 这里可以监控到用户取值了
      if (key === ReactiveFlags.IS_REACTIVE) {
        return true;
      }
      console.log("here");
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      // 去代理对象上设置值，执行set
      // 这里可以监控到用户设置值了
      return Reflect.set(target, key, value, receiver);
    },
  });
  reactiveMap.set(target, proxy);
  return proxy;
}
