"scripts": {
"dev": "node scripts/dev.js reactivity -f global"
},
当 npm run dev 的时候，我就用 node 去执行 scripts 夏的 dev.js，在执行这个文件的时候，我要打包的是谁（我要打包的是 reactivity），同时我们要告诉他，打包的格式是哪个（打包的格式只能在 html 去用）。一句话：我要去打包 reactivity 这个模块，格式用 global
