import Toast from './Toast.vue'
const obj = {}

obj.install = function (Vue){
  console.log(Vue)

  // 1.创建组件构造器
  const ToastConstructor = Vue.extend(Toast)

  // 2.new 的方式根据组件构造器，创建出来一个组件对象
  const toast = new ToastConstructor()

  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj