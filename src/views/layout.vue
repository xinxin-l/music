<template>
  <div class="layout">
    <top_nav></top_nav>
    <keep-alive :include="keep_arr">
      <router-view></router-view>
    </keep-alive>
    <div class="player">
      <audio :src="url" controls ref="audio_ref" autoplay></audio>
    </div>
  </div>
</template>
<script>
export default {
  components: { top_nav: () => import('../components/nav.vue') },
  data() {
    return {
      url: '',
      keep_arr: [
        'all_playList',
        'home',
        'search',
        'album',
        'singerDetail',
        'playList',
        'all_album',
        'today',
        'all_singer',
      ],
    };
  },
};
</script>
<style scoped>
.player {
  position: fixed;
  bottom: 0;
  width: 100vw;
}

audio {
  width: 100%;
  border-radius: 0;
  display: block;
}

.btn {
  position: fixed;
  top: 20px;
  right: 15px;
  z-index: 100;
}
</style>
