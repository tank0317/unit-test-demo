# unit-test-demo

一步一步介绍如何给项目添加单元测试。

---

**OK，你已经来到了第三个环节**

上一个环节里我们介绍了如何使用 [Karma](https://karma-runner.github.io/2.0/index.html) 来配置测试环境，可以方便的让我们的测试代码在实际浏览器里运行。

这个环节我们会介绍如何配置 [Travis-CI](https://travis-ci.org/) ，当我们提交代码的时候可以自动执行测试。

## 先看结果

配置完成后，当我们 push 代码，或者提交 pull request 时，Travis-CI 会自动执行测试代码。

![travis-ci-commit](http://om0jxp12h.bkt.clouddn.com/travis-ci-commit.png)


![travis-ci-pr](http://om0jxp12h.bkt.clouddn.com/travis-ci-pr.PNG)

## 我们都做了什么？

1. 去 [Travis-ci.com](https://travis-ci.com/) ，通过 Github 账号进行注册并授权。
2. 你会看到你在 Github 上所有的 repo, 选择其中一个启用 Travis-CI 。
3. 在项目中添加 `.travis.yml` 配置文件。
   比如我们项目中的配置文件为：
```yaml
# 指定语言 https://docs.travis-ci.com/user/languages/javascript-with-nodejs/
language: node_js
# 缓存 node_modules 文件夹，不需要每次都下载安装全部 npm 包。
cache:
  directories:
    - node_modules
# 指定 node 版本
node_js:
  - "6"
# 只对指定的分支执行构建  https://docs.travis-ci.com/user/customizing-the-build/#building-specific-branches
branches:
  only:
    - master
# 要执行的脚本
script:
  - npm test
# 配置当构建失败的时候发送通知 https://docs.travis-ci.com/user/notifications
notifications:
# 设置 TravisBuddy，每当 pull request 构建失败的时候，TravisBuddy 会收到通知
# 同时会将 构建失败的日志 以评论的形式添加到 pull request ，方便 PR 的提交者查看错误原因。
  webhooks:
    urls:
      - https://www.travisbuddy.com/
    on_success: never # 构建成功不发送邮件。默认是 change，即默认只有上次失败这次修复的成功构建才会发送邮件
    on_failure: always # 构建失败总是发送邮件。默认就是 always
```

4. 之后每次 push 和 pull request 都会自动执行测试。

## Travis-CI 是怎么工作的呢？

我们每次 push 代码的时候，Travis-CI 主要做了两个工作：

* install: 安装所有的依赖
* script: 执行构建脚本

如果我们指定了项目语言是 **node_js**，那么 Travis-CI 默认会使用 `npm install` 命令安装依赖；同时，默认的构建脚本的命令是：`npm test`，因此对我们的项目来说，会执行测试代码。

另外，Travis-CI 同时预留了一些钩子比如 before_install, before_script 等可以让我们在 install 和 script 之前执行一些其他工作。感兴趣的可以看下 Travis-CI 的[生命周期](https://docs.travis-ci.com/user/customizing-the-build/#the-build-lifecycle)。

## 配置文件的简单介绍

我们是通过 .travis.yml 告诉 Travis-CI 要做哪些事情，通常 .travis.yml 中配置会包含：

* 项目所使用的语言；
* 你希望在构建之前执行哪些命令或者脚本，比如安装依赖；
* 使用什么命令运行测试代码；
* 设置邮件等当构建失败时获取相应通知。

在上面的配置文件可以看到，我们还可以指定分支，只对 **mater** 分支执行构建。具体可以参考[这里](https://docs.travis-ci.com/user/customizing-the-build/#safelisting-or-blocklisting-branches)。

关于通知的配置，默认情况下如果构建失败或者上一次构建失败这次构建成功后，会给提交 commit 的作者或者仓库的管理者发送邮件。**需要注意，pull request 不会触发 email 通知。**

如果你 push 代码后没有收到邮件通知，你需要检查

* 邮件是否被拦截进入垃圾邮箱；
* 你在项目中设置的 git 邮箱是否已经注册 Github 或者已经添加到 Github 的[验证邮箱](https://github.com/settings/emails)。

在上面的通知配置中，我们添加了一个 Webhook 来接收通知。这个 Webhook 是 [TravisBuddy](https://www.travisbuddy.com/) ，它会在每次 pull request 构建失败时将错误日志以评论的方式添加到 PR 中，方便 PR 的提交者查看失败原因。就像下面图片中显示的样子：

![travis-ci-pr-fail](http://om0jxp12h.bkt.clouddn.com/travis-pr-fail.PNG)

同时 TravisBuddy 还会将失败结果通过邮件的形式通知 PR 的发起者，这个配置刚好弥补了，默认状态下 pull request 构建失败不会发送邮件的缺点。

> **注意: 之前 Karma 配置中执行测试的浏览器为 Chrome，当我们启用 Travis-CI 后，Travis-CI 是在虚拟机里执行测试代码的，此时环境没有Chrome 可以运行。因此我们将浏览器改为 [PhantomJS](http://phantomjs.org/)（同时记得安装对应的 launcher ）**


## 总结

通过注册 Travis-CI 同时给项目添加 .travis.yml 配置文件，我们就可以在每次提交代码时自动执行单元测试，如果构建失败还会将失败结果通知我们。

Travis-CI 还可以做很多事情，想要了解更多有关 Travis-CI 的使用方式，可以自行去 [Travis-CI 官网](https://docs.travis-ci.com/) 查看文档。

## 下一个环节

下一个环节我们会介绍如何如何获得 **测试覆盖率**。

```shell
git checkout 
```



