import vue from 'vue'
import Toast from './Toast.vue'
 
const ToastConstructor = vue.extend(Toast)
 
function showToast(text, duration = 3000) {
 
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data () {
      return {
        text,
        showWrap: true,
        showContent: true
      }
    }
  })
 
  document.body.appendChild(toastDom.$el)
 
  setTimeout(() => { toastDom.showContent = false }, duration - 1250)

  setTimeout(() => { toastDom.showWrap = false }, duration)
}
 
function registryToast() {
  vue.prototype.$toast = showToast
}
 
export default registryToast