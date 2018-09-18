// This is a karma config file. For more details see
//   http://karma-runner.github.io/2.0/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const webpackConfig = require('../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    // 指定要运行测试的浏览器，可以指定多个。必须要安装对应的加载器(launcher)，karma 会在调起本地的浏览器。
    browsers: ['PhantomJS'],
    // 指定要使用的测试框架
    frameworks: ['mocha', 'chai'],
    client: {
      useIframe: false
    },
    // spec 插件会将每个测试用例的测试结果打印到命令行 console 中,
    // coverage 插件会配合 babel-plugin-istanbul 生成覆盖率报告
    reporters: ['spec', 'coverage'],
    coverageReporter: {
    // 配置生成的代码覆盖率文件存放位置
      dir: './coverage',
      reporters: [
        // 生成 lcov.info 文件，该文件中包含了详细的每个文件，每行，每个函数的执行信息。
        { type: 'lcov', subdir: '.' },
        // 在命令行输出简要覆盖率数据
        { type: 'text-summary' }
      ]
    },
    // 希望执行的测试文件, 这里的文件会经过 preprocessor 处理后，通过 script 便签添加到测试页面中。
    // 更多设置可以查看 https://karma-runner.github.io/2.0/config/files.html
    files: [
      './test.js'
    ],
    // 使用 webapck 对文件进行编译打包，同时配置 sourcemap 方便调试代码
    preprocessors: {
      './test.js': ['webpack', 'sourcemap']
    },
    // wepack 配置项
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    // 运行一次后退出，如果设为 true，运行后会默认 watch "files" 中指定的文件，如果有修改会自动重新执行。
    singleRun: true
  })
}
