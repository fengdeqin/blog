module.exports = {
  // 所有 Tailwind 工具类都会自动添加 !important，保证它们的优先级最高
  // 只作用于其他 非 animate- 开头的类名
  important: (selector) => selector.startsWith(".animate-") ? false : true,
  // 替换 purge 为 content
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
