import Vue from 'vue';
import VueRouter from 'vue-router';
import layout from '../views/layout.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '',
          name: 'total',
          redirect: '/today',
        },
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home/index.vue'),
        },
        {
          path: '/today',
          name: 'today',
          component: () => import('../views/today/index.vue'),
        },
        {
          path: '/search',
          name: 'search',
          component: () => import('../views/search/search.vue'),
        },
        {
          path: '/playList',
          name: 'playList',
          component: () => import('../views/playList.vue'),
        },
        {
          path: '/mv',
          name: 'mv',
          component: () => import('../views/mv.vue'),
        },
        {
          path: '/singerDetail',
          name: 'singerDetail',
          component: () => import('../views/singerDetail.vue'),
        },
        {
          path: '/album',
          name: 'album',
          component: () => import('../views/album.vue'),
        },
        {
          path: '/all_playList',
          name: 'all_playList',
          component: () => import('../views/all_playList.vue'),
        },
        {
          path: '/all_song',
          name: 'all_song',
          component: () => import('../views/all_song.vue'),
        },
        {
          path: '/all_mv',
          name: 'all_mv',
          component: () => import('../views/all_mv.vue'),
        },
        {
          path: '/all_album',
          name: 'all_album',
          component: () => import('../views/all_album.vue'),
        },
        {
          path: '/all_singer',
          name: 'all_singer',
          component: () => import('../views/all_singer.vue'),
        },
        {
          path: 'each_list',
          name: 'each_list',
          component: () => import('../views/each_list.vue'),
        },
      ],
    },
  ],
  linkActiveClass: 'active',
});

export default router;
