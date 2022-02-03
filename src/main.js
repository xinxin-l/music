import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './assets/css/common.css'
import api from './api'
import ElementUI from 'element-ui'
// 天 少引入了一行 找了半小时 哭了
// import 'element-ui/lib/theme-chalk/index.css'
import '../public/theme/element/index.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import back from './components/back.vue'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$id = 0
Vue.prototype.setId = function(id) {
    Vue.prototype.$id = id
}
Vue.prototype.getId = function() {
    return Vue.prototype.$id
}
Vue.component('back', back)
Vue.use(ElementUI)
Vue.use(Vant)

new Vue({
    render: h => h(App),
    router: router
}).$mount('#app')