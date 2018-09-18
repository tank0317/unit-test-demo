# unit-test-demo

[![travis-ci](https://travis-ci.org/tank0317/unit-test-demo.svg?branch=master)](https://travis-ci.org/tank0317/unit-test-demo)
[![codecov](https://codecov.io/gh/tank0317/unit-test-demo/branch/master/graph/badge.svg)](https://codecov.io/gh/tank0317/unit-test-demo)

一步一步介绍如何给项目添加单元测试。

---

## 关于单元测试

为什么做单元测试？测试可以验证代码的正确性，当然手工也可以测试，但是这是一次性的事情，下次测试还需要从头来过，效率不能得到保证。通过编写测试用例，可以做到一次编写，多次运行。

单元测试是什么？意义？不是我们今天想讨论的重点，今天只是聊一聊怎么做单元测试。如果你最近也对单元测试是怎么做的感兴趣，这篇文章可能是你需要的。

## 这篇文章在讲什么？

该文章通过五个环节一步一步介绍了如何给项目添加单元测试。文章中会涉及到 Mocha, Chai, Karma, Travis-CI, Istanbul, Codecov 等，如果你还不知道这些名词是什么，或者还不知道他们是如何配合起来工作的，你可以通过以下几个环节逐步了解。

1. 第一个环节：使用 Mocha Chai 编写测试用例
2. 第二个环节：使用 Karma 配置测试环境。
3. 第三个环节： 配置 Travis-CI，每次 push 自动执行测试代码。
4. 第四个环节：添加 Codecov，自动上传测试覆盖率
5. 第五个环节：添加徽章，如何调试测试代码，Github Status

**以上的每一个环节与项目中的 Commit 一一对应**，

<p align="center"><img src="https://raw.githubusercontent.com/tank0317/imgs/master/unit-test-demo/master/unit-test-demo-commit.png" width="70%" alt="unit-test-demo-commit" /></p>

同时，**该项目是渐进增强的，每个环节会给项目添加新的能力，又都是独立可运行的完整示例。 每个环节都有对应的 README.md 介绍该环节执行的结果是什么以及是如何做到的。你也可以借助 Git 查看每个环节具体修改了哪些地方。**

<p align="center"><img src="https://raw.githubusercontent.com/tank0317/imgs/master/unit-test-demo/master/readme-example.png" width="70%" alt="readme-example" /></p>

## 如何快速查看每个环节的内容？

如果在 Github 上你可以直接通过 Tags 进入对应的环节，如下图所示。

<p align="center"><img src="https://raw.githubusercontent.com/tank0317/imgs/master/unit-test-demo/master/unit-test-tags.png" width="70%" alt="unit-test-tags" /></p>

如果已经将项目克隆到本地，你可以通过 `git checkout Chapter*` 检出你想要查看的环节。

## 推荐的学习方式

如果你跟我一样一开始并不了解单元测试，推荐将项目克隆到本地，检出每个环节对应的 Commit ，直观查看执行的结果。只有程序都跑通了，我们再谈是怎么做到的。

对于前两个环节你可以直接在本地运行命令查看结果，但是对于第三和第四个环节，需要 Push 代码到 Github 才能看到效果。所以你可以**fork 项目到自己的 Github，基于第二个环节对应的 Commit 新建一个分支，在新的分支上进行操作，然后 Push 代码到自己的仓库，查看是否有预期效果。**

## 通过这篇文章你能够学到什么？

通过该文章你不仅仅能够学会如何给项目添加单元测试，同时能够了解到：

* Mocha 和 Chai 的基本使用方式；
* Karma 是什么，如何配置 Karma；
* Travis-CI 是什么，怎么工作的，如何配置 Travis-CI；
* 如何获得测试覆盖率，Codecov 是什么，大致的工作原理；
* 大概了解 Travis-CI 和 Codecov 是怎么和 Github 配合工作的。

## 最后

一周之前我也不清楚单元测试是什么，怎么做的。查看了很多文档后感觉自己大致了解了这一套流程是怎么工作的，所以记录下来供大家参考。

如果文章里有哪些理解不对，欢迎指正。一起努力，共同进步~

