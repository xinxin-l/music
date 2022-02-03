import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home'
import today from '../views/today'
import mine from '../views/mine/mine.vue'
import search from '../views/search/search.vue'
import layout from '../views/layout.vue'
import playList from '../views/playList.vue'
import mv from '../views/mv.vue'
import lyric from '../views/lyric.vue'
import singerDetail from '../views/singerDetail.vue'
import album from '../views/album.vue'
import all_playList from '../views/all_playList.vue'
import all_song from '../views/all_song.vue'
import all_mv from '../views/all_mv.vue'
import all_album from '../views/all_album.vue'
import all_singer from '../views/all_singer.vue'
import each_list from '../views/each_list.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/',
    name: 'layout',
    component: layout,
    children: [{
      path: '',
      name: 'total',
      redirect: '/today'
    }, {
      path: '/home',
      name: 'home',
      component: home
    }, {
      path: '/today',
      name: 'today',
      component: today
    }, {
      path: '/mine',
      name: 'mine',
      component: mine
    }, {
      path: '/search',
      name: 'search',
      component: search
    }, {
      path: '/playList',
      name: 'playList',
      component: playList
    }, {
      path: '/mv',
      name: 'mv',
      component: mv
    }, {
      path: '/lyric',
      name: 'lyric',
      component: lyric
    }, {
      path: '/singerDetail',
      name: 'singerDetail',
      component: singerDetail
    }, {
      path: '/album',
      name: 'album',
      component: album
    }, {
      path: '/all_playList',
      name: 'all_playList',
      component: all_playList
    }, {
      path: '/all_song',
      name: 'all_song',
      component: all_song
    }, {
      path: '/all_mv',
      name: 'all_mv',
      component: all_mv
    }, {
      path: '/all_album',
      name: 'all_album',
      component: all_album
    }, {
      path: '/all_singer',
      name: 'all_singer',
      component: all_singer
    }, {
      path: 'each_list',
      name: 'each_list',
      component: each_list
    }]
  }],
  linkActiveClass: 'active'
})

export default router