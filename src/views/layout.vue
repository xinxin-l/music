<template>
    <div class="layout">
        <top_nav></top_nav>
        <keep-alive :include='keep_arr'>
            <router-view></router-view>
        </keep-alive>
        <div class="player">
            <audio :src="url" controls ref='audio_ref' autoplay>
            </audio>
        </div>
        <el-button circle class='btn' @click='toLyric'>词</el-button>
    </div>
</template>
<script>
import top_nav from '../components/nav.vue'
export default {
    components: { top_nav },
    data() {
        return {
            url: '',
            keep_arr: ['all_playList', 'home', 'search', 'album', 'singerDetail', 'playList', 'today', 'all_album', 'today']
        }
    },
    methods: {
        toLyric() {
            let num = this.getId()
            if (!num) {
                return
            }
            this.$router.push({ name: 'lyric' })
        }
    }
}
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