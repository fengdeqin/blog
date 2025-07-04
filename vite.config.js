import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// 自动导入 组件
import AutoImport from 'unplugin-auto-import/vite'
// 自动导入 src/components 下的组件
import Components from 'unplugin-vue-components/vite'
// 自动导入element-plus组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 支持svg
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// unplugin-icons
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  server: {
    port: 8080,
    post: "0.0.0.0",
    https: false,
    open: true, //启动后自动打来浏览器
    // 热更新
    hmr: {
      overlay: false
    },
    proxy: {
      // 跨域处理，后端代理
      '/api': {
        // 跨域域名
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // minio代理
      '/blog-images': {
        target: 'http://mrzym.top:9000/blog-images',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/blog-images/, '')
      }
    },
    build: {
      sourcemap: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: resolve('index.html'),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].ext",
        }
      }
    }
  },
  plugins: [
    vue(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
    }),
    // 按需导入配置
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia'
      ],
      dts: 'src/auto-imports.d.ts', //告诉 ts 这些 API 是自动存在的，就不会报 “找不到名称 xx某个钩子"的错误
      // 第三方组件库的解析器
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/'],
      // dts: true, // 生成类型声明
      // 配置需要将哪些后缀类型的文件进行自动按需引入
      extensions: ['vue', 'md'],
      resolvers: [ElementPlusResolver(), IconsResolver({
        prefix: false, // 允许 `<material-symbols-android-chat />`
      }),],
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
    })
  ]
})
