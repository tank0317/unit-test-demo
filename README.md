# unit-test-demo

[![travis-ci](https://travis-ci.org/tank0317/unit-test-demo.svg?branch=master)](https://travis-ci.org/tank0317/unit-test-demo)
[![codecov](https://codecov.io/gh/tank0317/unit-test-demo/branch/master/graph/badge.svg)](https://codecov.io/gh/tank0317/unit-test-demo)

一步一步介绍如何给项目添加单元测试。

---

**哇哦，你已经来到了最后一个环节**

前面四个环节已经介绍了如何给项目添加单元测试。包括使用 Mocha Chai 编写测试用例，基于 Karma 配置测试环境，引入 Travis-CI 自动执行测试代码，最后基于 istanbul 通过 Codecov 分析测试覆盖率。

这个环节我们给项目添加 Travis-CI 和 Codecov 徽章，顺带了解下如何做单元测试调试以及什么是 "github status checks" 。

## 先看结果

如上面所示，我们已经给项目添加了对应徽章。


## 我们都做了什么？

对于 Travis-CI ，点击项目中的徽章图标，可以得到链接，以图片的形式添加到项目 README.md 即可。

<p align="center"><img src="https://raw.githubusercontent.com/tank0317/imgs/master/unit-test-demo/chapter5/travis-ci-badge.png" width="70%" alt="travis-ci-badge" /></p>

对于 Codecov ，在项目设置里直接提供了完整的 markdown 直接复制即可。如下所示：

<p align="center"><img src="https://raw.githubusercontent.com/tank0317/imgs/master/unit-test-demo/chapter5/codecov-badge.png" width="70%" alt="codecov-badge" /></p>

## 其他

### 如何调试测试代码？

由于我们使用 Travis-CI 的原因，Karma 中浏览器都会配置成 Phantomjs，此时调试起来极不方便。我们正常开发过程中，都会在浏览器里借助 DevTools 进行调试，所以当需要调试代码的时候，最好将浏览器修改为 Chrome，此时和我们平时调试代码的方式是一样的。

### Github Status Checks ?

为什么每次 Travis-CI 和 Codecov 的结果能够直接显示在仓库的 Commit 或者 Pull Request 中？比如下面的样子？

<p align="center"><img src="https://raw.githubusercontent.com/tank0317/imgs/master/unit-test-demo/chapter4/codecov-commit.png" width="70%" alt="codecov-commit" /></p>

原因是：当我们 Push 或者 Pull Request 的时候 Github 会给 Travis-CI 和 Codecov 发送消息，告诉他们相应事件发生了。另外 Github 还提供了 [Statuses API](https://developer.github.com/v3/repos/statuses/) ，Travis-CI 和 Codecov 可以通过该接口对 Github 中的某个 Commit 添加 `error`, `failure`, `pending`, `success` 状态以及一些描述信息，类似上图所示。

Travis-CI 和 Codecov 是为什么会收到这些事件呢？两者还有点不一样，Travis-CI 是作为 [Github App](https://developer.github.com/apps/about-apps/) 存在的，而 Codecov 只是使用了 [Webhook](https://developer.github.com/webhooks/) 实现。在 Github 仓库设置中可以看到：

<p align="center"><img src="https://raw.githubusercontent.com/tank0317/imgs/master/unit-test-demo/chapter5/github-webhooks.png" width="70%" alt="github-webhooks" /></p>

[Webhook](https://developer.github.com/webhooks/) 相当于一种事件钩子，事件发生后，Codecov/Travis-CI 收到通知，然后将 覆盖率数据信息/测试执行结果 通过 Statuses API 体现在 Commit 中。

我们什么时候给 Codecov/Travis-CI 添加的 Webhook？就是我们通过 Github 账号注册并授权的时候。



