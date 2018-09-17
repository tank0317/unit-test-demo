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
