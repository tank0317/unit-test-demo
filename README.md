# unit-test-demo

一步一步介绍如何给项目添加单元测试。

---

**OK，你已经来到了第四个环节**

上一个环节里我们介绍了如何配置 [Travis-CI](https://travis-ci.org/) ，当我们提交代码的时候可以自动执行测试。

这个环节我们会介绍如何获取测试覆盖率数据，同时每次 Push 或者 Pull Request 时能够将数据上传到 [Codecov](https://codecov.io/) ，在 Github 中看到当次提交的覆盖率。

## 先看结果

配置完成后，当我们 Push 代码或者提交 Pull Request 时，能够看到当次提交的测试覆盖率。

<p align="center"><img src="http://om0jxp12h.bkt.clouddn.com/codecov-commit.PNG" width="70%" alt="codecov-commit" /></p>

<p align="center"><img src="http://om0jxp12h.bkt.clouddn.com/coverage-pull-request.PNG" width="70%" alt="codecov-pull-request" /></p>

## 我们都做了什么？

### 1. 添加 babel 插件 [babel-plugin-istanbul](https://github.com/istanbuljs/babel-plugin-istanbul) 

该插件会在源码中插入统计代码；同时设置只在 BABEL_ENV 为 "test" 时启用该插件。

```javascript
{
  // .babelrc
  ...
  "env": {
    "test": {
      "plugins": [ "istanbul" ]
    }
  }
}
```

### 2. 添加 Karma 插件 [karma-coverage](https://github.com/karma-runner/karma-coverage) ，该插件会生成测试覆盖率报告；

```javascript
module.exports = function (config) {
  config.set({
    ...
    // spec 插件会将每个测试用例的测试结果打印到命令行 console 中,
    // coverage 插件会配合 babel-plugin-istanbul 生成覆盖率报告
    reporters: ['spec', 'coverage'],
    coverageReporter: {
    // 配置生成的代码覆盖率文件存放位置
      dir: './coverage',
      reporters: [
        // 生成 lcov.info 以及 html 文件，lcov.info 该文件中包含了详细的每个文件，每行，每个函数的执行信息。
        { type: 'lcov', subdir: '.' },
        // 在命令行输出简要覆盖率数据
        { type: 'text-summary' }
      ]
    },
    ...
  )}
}
```

现在执行 `npm run test` 会在命令行看到简要覆盖率信息，同时在 test 文件夹下会生成 coverage 文件夹，包含了生成的测试覆盖率报告，其中包含 lcov.info 文件，该文件中包含了详细的每个文件，每行，每个函数的执行信息，之后会上传 Codecov 。该文件夹下还有一些 html 形式的覆盖率报告，可以在本地用浏览器打开查看。打开后看到我们的覆盖率为 100%， 同时能够看到，项目中只有一行代码并且被执行了。其中 'HelloWorld.vue' 文件第 90 行有一个 **1x** 字标，表示该行被执行了一次（这其实是我们这个项目中唯一一行，我们自己写的可能会被执行的 JS 代码，其他都是 html css 以及传递给 Vue 配置项）。

此时我们只能在本地查看覆盖率，但是我们希望更能够在每次 Push 或 Pull Request 中看到覆盖率信息。引入 [Codecov](https://codecov.io/) ！

### 3. 使用 Github 账号注册 [Codecov](https://codecov.io/) 并同意授权。

添加相应的 repo ，此时会给出一个 CODECOV_TOKEN ，然后告诉你上传你的 reports (覆盖率报告) 即可。

安装 codecov 命令， `npm install codecov --save-dev`，通过 `./node_modules/.bin/codecov --token ****` codecov 会自动在当前目录下搜索覆盖率报告文件，并上传。

现在你能够在 [codecov.io](https://codecov.io/) 上看到当次提交的测试覆盖率（代码必须提交到 Github）。引入 Codecov 的好处是，我们能够在 Github 的 Commit 和 Pull Request 中看到覆盖率信息，同时 Codecov 提供了更加清晰的视觉 UI 展示哪些代码被覆盖或未被覆盖， Codecov 还会将当次提交与上次提交进行比较，告诉你本次修改的部分覆盖率是多少，哪些地方覆盖率变化了等信息，根据这些信息可以快速定位是否需要修改源代码或者补充修改测试代码。

### 4. 设置 npm script

通过 Travis-CI 每次执行单元测试后自动上传覆盖率信息。npm script 修改如下：

```javascript
{
  // package.json
  ...
  "scripts": {
    ...
    // cross-env 每次执行测试时，指定 Babel 环境为 "test" ，启用 babel-plugin-istanbul
    "unit": "cross-env BABEL_ENV=test karma start test/karma.conf.js",
    "codecov": "codecov",
    "test": "npm run unit && npm run codecov"
  },
  ...
}
```

然后将 CODECOV_TOKEN 添加到 Travis-CI 的环境变量中即可，Travis-CI 执行 codecov 命令是会从环境变量中拿到 CODECOV_TOKEN 。

<p align="center" ><img src="http://om0jxp12h.bkt.clouddn.com/travis-ci-env-var.PNG" width="70%" alt="travis-ci-env-var" /></p>

此后每次 Push 或者 Pull Request 就可以自动执行测试代码并上传测试覆盖率报告。Excellent !

## 关于 Codecov

实际上我们可以在项目中添加 [codecov.yml](https://docs.codecov.io/docs/codecov-yaml) 文件自定义 Codecov 行为。不过，庆幸的是默认情况下，Codecov 就可以很好的满足我们的需求。

比如默认情况下 ：

* Codecov 会在 commit 和 Pull Request 中提供项目整体（project）以及 修改部分（patch）覆盖率。
* 对于整体覆盖率，当次提交不能低于上次提交的覆盖率，否则给出警告。
* 对于修改部分覆盖率，只要不是 100% 就会给警告。
* 每次 pull request，Codecov 会将当次提交与主干分支覆盖率进行比较，并且将信息以评论的形式添加到 Pull Request 中。

## 总结

通过引入 babel-plugin-istanbul 和 karma-coverage 插件我们能够得到单元测试的覆盖率信息。其次将覆盖率报告上传 Codecov 能够更好的对单元测试的覆盖情况进行分析，最后我们把 codecov 添加到 Travis-CI 中，每次执行测试代码都会更新测试覆盖率。

想要了解更多有关 Codecov 的信息，可以自行去 [codecov](https://docs.codecov.io/docs) 查看文档。

## 下一个环节

现在为止，我们已经基本了解了如何给项目添加单元测试，并且统计测试覆盖率，同时将这些工作集成到 Travis-CI 中自动完成，还可以在 Codecov 中查看分析测试代码覆盖详情。

下一环节会轻松一点，我们介绍怎么在项目中添加 Travis-CI 和 Codecov 的徽章，如下所示。同时了解下如何对测试代码进行调试以及什么是 "github status checks"。

<p align="center"><img src="http://om0jxp12h.bkt.clouddn.com/travis-ci-coverage-badge.PNG" width="230" alt="travis-ci-coverage-badge" /></p>

