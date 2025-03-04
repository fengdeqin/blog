// 防抖函数
export function debounce(fn, delay) {
  let timer = null;  //定时器
  return function (...args) {
    const context = this; // 保留 this 绑定
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}