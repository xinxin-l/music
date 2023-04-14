import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/css/common.css';
import api from './api';
// import ElementUI from 'element-ui';
// 天 少引入了一行 找了半小时 哭了
// import 'element-ui/lib/theme-chalk/index.css'
import '../public/theme/element/index.css';
import back from './components/back.vue';

import {
  Pagination,
  Menu,
  Submenu,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Icon,
  Carousel,
  CarouselItem,
  Loading,
  Message,
  Skeleton,
  SkeletonItem,
} from 'element-ui';

Vue.use(Pagination);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Icon);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$message = Message;

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$id = 0;
Vue.prototype.setId = function (id) {
  Vue.prototype.$id = id;
};
Vue.prototype.getId = function () {
  return Vue.prototype.$id;
};
Vue.component('back', back);
// Vue.use(ElementUI);

new Vue({
  render: (h) => h(App),
  router: router,
}).$mount('#app');
