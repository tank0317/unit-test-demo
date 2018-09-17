# unit-test-demo

一步一步介绍如何给项目添加单元测试。

——————

**OK，你已经来到了第二个环节**

上一个环节里我们介绍了如何使用 [Mocha](https://mochajs.org/) 和 [Chai](https://www.chaijs.com/) 来编写测试用例。当时我们的测试代码是运行在 node 环境中的。如果我想把一个 Vue 项目在浏览器里运行测试代码，要怎么做呢？

这个环节里，我们会介绍如何使用 [Karma](https://karma-runner.github.io/2.0/index.html) 来配置测试环境，可以让我们的测试代码在实际浏览器里运行。

## 先看结果

在项目下，通过 `npm run test` 可以看到测试结果。

```shell
17 09 2018 19:54:07.410:INFO [karma]: Karma v3.0.0 server started at http://0.0.0.0:9876/
17 09 2018 19:54:07.413:INFO [launcher]: Launching browser Chrome with unlimited concurrency
17 09 2018 19:54:07.424:INFO [launcher]: Starting browser Chrome
17 09 2018 19:54:09.083:INFO [Chrome 68.0.3440 (Mac OS X 10.13.4)]: Connected on socket HvVkYqYm9NfvTy3xAAAA with id 29946103
INFO LOG: 'Download the Vue Devtools extension for a better development experience:
https://github.com/vuejs/vue-devtools'

  我的 Vue 测试
    #标题
      ✓ 标题应该为 Welcome to Your Vue.js App

Chrome 68.0.3440 (Mac OS X 10.13.4): Executed 1 of 1 SUCCESS (0.052 secs / 0.014 secs)
TOTAL: 1 SUCCESS
```

## 我们都做了什么？

首先通过 Vue-cli 初始化了一个 Vue 项目。

然后在 test/test.js 文件中编写了一个测试用例，判断我们 Vue 项目中 "h1" 标签中的内容是否为 "Welcome to Your Vue.js App"。

test.js 文件的内容如下：

```javascript
import Vue from 'vue'
import App from '../src/App'

Vue.config.productionTip = false

describe('我的 Vue 测试', function () {
  describe('#标题', function () {
    it('标题应该为 Welcome to Your Vue.js App', function () {
      // 示例化 Vue, 此时示例对应的 DOM 元素没有在页面中。
      const instance = new Vue({
        render: h => h(App),
        components: { App }
      }).$mount()

      // 手动将 DOM 添加到页面中。
      document.body.appendChild(instance.$el)

      let h1 = instance.$el.querySelector('.hello h1')
      expect(h1.textContent).to.equal('Welcome to Your Vue.js App')
    })
  })
})
```

之后的内容就是我们今天要了解的重点了，配置 Karma 让我们的测试用例可以在 Chrome 中执行。Karma 的配置文件位置为 `test/karma.conf.js`，具体内容为：

```javascript
const webpackConfig = require('../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    // 指定要运行测试的浏览器，可以指定多个。必须要安装对应的加载器(launcher)，karma 会在调起本地的浏览器。
    browsers: ['Chrome'],
    // 指定要使用的测试框架
    frameworks: ['mocha', 'chai'],
    // 这个插件会将每个测试用例的测试结果打印到命令行 console 中。
    reporters: ['spec'],
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
```

这个配置文件中，我们设置使用 **Mocha** 测试框架，**Chai** 断言库，指定了测试代码的入口 'test.js'，同时配置了预处理器 **webpack, sourcemap** 对测试代码进行预处理（编译打包）。Karma 会在本地启动一个 server （默认端口号为9876）托管测试文件。之后会调起本地 **Chrome** 浏览器打开一个测试页面，将处理后的测试代码通过 `<script>` 便签添加到页面中执行。默认情况下，Karma 会在页面中创建一个 iFrame 来运行测试代码。

另外需要注意的是：

> Most of the framework adapters, reporters, preprocessors and launchers need to be loaded as plugins.

针对这些 [Karma 插件](https://karma-runner.github.io/2.0/config/plugins.html) 我们都要安装对应的 npm 包，这些插件一般是以 `karma-` 开头，而 Karma 默认会自动加载 `karma-` 开头的 npm 包。比如上面的配置文件中涉及到的 Karma 插件有 Karma-mocha, Karma-chai, Karma-spec-reporter, Karma-webpack, Karma-sourcemap-loader, Karma-chrome-launcher。

最后我们配置 npm script，`test: karma start test/karma.conf.js`，就可以执行 Karma 命令在 Chrome 中执行测试代码了。

## 总结

Karma 是一个配置测试环境的工具。可以通过配置选择不同的测试框架，将我们的测试代码运行的不同的浏览器上。同时支持各种插件，比如通过 webpack 插件对我们的测试代码进行编译打包。在之后的环节中我们还会介绍，通过插件计算测试代码的覆盖率。

想要了解更多有关 Karma 的使用方式，可以自行去 [Karma 官网](https://karma-runner.github.io/2.0/index.html) 查看文档。

## 下一个环节

下一个环节我们会介绍如何配置 Travis-CI 当我们在 Github 上提交代码的时候自动运行测试代码。

```shell
git checkout 
```