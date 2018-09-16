# unit-test-demo

一步一步介绍如何给项目添加单元测试。

——————

**OK，你已经来到了第一个环节**

这里环节我们会介绍如何使用 [Mocha](https://mochajs.org/) 和 [Chai](https://www.chaijs.com/) 来编写测试用例。

## 先看结果

在项目下，通过 `npm run test` 可以看到测试结果。

```shell
> unit-test-demo@1.0.0 test /Users/didi-feng/GitRepo/unit-test-demo
> mocha



  Array
    #indexOf()
      ✓ should return -1 when the value is not present


  1 passing (7ms)
```

## 我们都做了什么？

我们在 test/test.js 文件中编写了一个测试用例，判断数组`[1, 2, 3]`中是否存在`4`。然后我们通过`npm run test`执行 Mocha 命令。Mocha 会自动在项目中搜索 test 文件夹，并执行该文件夹下的所有 js 文件（[文档](https://mochajs.org/#the-test-directory)）。

test.js 文件的内容为 Macha 官网的一个[例子](https://mochajs.org/#getting-started)。如下：

```javascript
// var assert = require('assert');
var expect = require('chai').expect // 引入Chai

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      // assert.equal([1,2,3].indexOf(4), -1); // node 自带的断言库
      expect([1,2,3].indexOf(4)).to.equal(-1); // Chai expect 形式断言语句
    });
  });
});
```
`describe(string, function)`<br>
describe 块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"Array"），第二个参数是一个实际执行的函数。上面可以看到，describe 块可以嵌套使用。

`it(string, function)`<br>
it 块称为"测试用例"（test case），表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"should return -1 when the value is not present"），第二个参数是一个实际执行的函数。

`expect([1,2,3].indexOf(4)).to.equal(-1)`<br>
上面这句断言的意思是，调用`[1,2,3].indexOf(4)`，结果应该等于 2。所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误。

所有的测试用例（it 块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库。上面的例子中我们引入了 **[Chai](https://www.chaijs.com/)** 断言库的 [expect API](https://www.chaijs.com/api/bdd/),（注释部分代码是 node 自带断言库 assert）。Chai 支持 **expect, should, asset** 三种形式的断言 API 。

## 总结

Mocha 就是一个 Javascript 测试框架，我们会基于这个框架去写测试用的代码。那测试框架怎么知道一个测试用例是否通过？这就需要断言库了，比如：Chai 。如果一个测试用例中所有的 Chai 断言语句都没有抛出错误，那么测试框架就会判定这个测试用例通过，否则失败。

现在我们已经大概了解了如何编写一个简单的测试用例！想要了解 [Mocha](https://mochajs.org/) 和 [Chai](https://www.chaijs.com/) 更多的使用方式，可以自行去官网查看文档。

## 问题

如果我想在给我的 vue 项目添加测试用例，并在浏览器里执行验证，该怎么做？

## 下一个环节

```shell
git checkout 
```