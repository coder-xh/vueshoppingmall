import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import Element from 'element-ui'
import'element-ui/lib/theme-chalk/index.css'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(Element)
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyLoad,{
  // loading:"" //可选参数，加载前默认显示的图片
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
