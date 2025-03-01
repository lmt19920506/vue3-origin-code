const args = require("minimist")(process.argv.slice(2)); // node scripts/dev.js reactivity -f global
const { resolve } = require("path"); // node中的内置模块
const { build } = require("esbuild"); // esbuild的打包工具

// console.log(args); // { _: [ 'reactivity' ], f: 'global' }
// minimist 用来解析命令后参数的工具

const target = args._[0] || "reactivity"; // 打包的对象
const format = args.f || "global"; // 打包的格式

const pkg = require(resolve(__dirname, `../packages/${target}/package.json`)); // 获取package.json
// iife: 立即执行函数  (function() { ... })()
// cjs: commonjs  node中的模块  module.exports = ...
// esm: esmodule  浏览器中的esModule模块  export default ...
const outputFormat = format.startsWith("global")
  ? "iife"
  : format == "cjs"
  ? "csj"
  : "esm";

const outfile = resolve(
  __dirname,
  `../packages/${target}/dist/${target}.${format}.js`
); // 输出的文件路径

build({
  entryPoints: [resolve(__dirname, `../packages/${target}/src/index.ts`)],
  outfile,
  bundle: true, // 把所有的包都搭载一起
  sourcemap: true,
  format: outputFormat, // 输出的格式
  globalName: pkg.buildOptions?.name, // 打包的全局的名字
  platform: format === "cjs" ? "node" : "browser", // 打包的平台
  watch: {
    onRebuild(error) {
      if (!error) console.log(`rebuild~~~`);
    },
  },
}).then(() => {
  //   console.log(`Build ${pkg.name} successfully!`);
  console.log("watching~~~");
});
