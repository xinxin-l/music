<template>
    <!-- 数据获取 -->
    <div class='home'>
        <div class='sear'>
            <i class="el-icon-service"></i>
            随心听：<input type="text" v-model.lazy='song_name' class='search'>
        </div>
        <list_view>
            <!-- 这里的三个div是list中留的slot -->
            <div class='song' v-loading="loading_song">
                <box :name='item.name' :picUrl='item.picUrl' :Id='item.id' v-for='item in list' :key='item.id'></box>
            </div>
            <template v-slot:hot>
                <div class="playlist" v-loading="loading_pl">
                    <playlist v-for='item in hot_list' :key='item.id' :id='item.id' :name='item.name' :pic_url='item.picUrl'></playlist>
                </div>
            </template>
            <template v-slot:mv>
                <mv v-for='item in mv_list' :key='item.id' :name='item.name' :pic_url='item.picUrl' :id='item.id' :art_id='item.artistId' v-loading="loading_mv"></mv>
            </template>
            <!-- 热门歌手 -->
            <template v-slot:singer>
                <el-carousel trigger="click" height="260px" v-loading="loading_singer">
                    <el-carousel-item v-for="(hot_singer,index) in hot_singers" :key="index">
                        <singer :name='item.name' :img_url='item.picUrl' :key='item.id' :id='item.id' v-for='item in hot_singer'></singer>
                    </el-carousel-item>
                </el-carousel>
            </template>
        </list_view>
    </div>
</template>
<script>
import list_view from './musicListView.vue'
import box from '../../components/box.vue'
import singer from '../../components/singer.vue'
// import radio from '../../components/radio.vue'
import mv from '../../components/mv_one.vue'
import playlist from '../../components/playList_one.vue'

export default {
    components: { list_view, box, singer, mv, playlist },
    name: 'home',
    data() {
        return {
            list: [],
            hot_list: [],
            mv_list: [],
            hot_topic: [],
            hot_singers: [],
            hot_radio: [],
            song_name: '',
            loading_song:true,
            loading_pl:true,
            loading_mv:true,
            loading_singer:true
        }
    },
    created() {
        this.$api.getMusic().then(data => {
                this.list = data.result
                console.log(data.result)
                this.list.length = 6
            }).then(()=>{
                this.loading_song=false
            }),
            this.$api.getHotList().then(data => {
                this.hot_list = data.result
            }).then(()=>{
                this.loading_pl=false
            }),
            this.$api.getMv().then(data => {
                console.log(data)
                this.mv_list = data.result
            }).then(()=>{
                this.loading_mv=false
            }),
            this.$api.getHotSinger().then(data => {
                this.hot_singers[0] = data.artists.slice(0, 6)
                this.hot_singers[1] = data.artists.slice(6, 12)
                this.hot_singers[2] = data.artists.slice(12, 18)
                console.log(data.artists)
            }).then(()=>{
                this.loading_singer=false
            })
    },
    methods: {},
    watch: {
        song_name() {
            this.$api.search(this.song_name).then(data => {
                console.log(data.result.songs)
                // 暂时选择搜索的第一条进行播放
                // 改了一下，搜索的时候在最后加一个数字，就表示搜索结果的第几条
                const number = parseInt(this.song_name[this.song_name.length - 1]) //这个就是选择的数字
                var num = data.result.songs[0].id
                // 如果是合理的数字，就按这个结果搜
                if ((!isNaN(number)) && (number < data.result.songs.length)) {
                    num = data.result.songs[number].id
                }
                this.$api.toSong(num).then(d => {
                    this.$parent.$refs.audio_ref.src = d.data[0].url
                })
            })
        }
    },
    activated() {
        let num = this.$parent.keep_arr.indexOf('singerDetail')
        if (num !== -1) {
            this.$parent.keep_arr.splice(num, 1)
        }
        let num1 = this.$parent.keep_arr.indexOf('album')
        if (num1 !== -1) {
            this.$parent.keep_arr.splice(num1, 1)
        }
        let num2 = this.$parent.keep_arr.indexOf('playList')
        if (num2 !== -1) {
            this.$parent.keep_arr.splice(num2, 1)
        }
        let num3 = this.$parent.keep_arr.indexOf('all_playList')
        if (num3 !== -1) {
            this.$parent.keep_arr.splice(num3, 1)
        }
        let num4 = this.$parent.keep_arr.indexOf('search')
        if (num4 !== -1) {
            this.$parent.keep_arr.splice(num4, 1)
        }
    }
}
</script>
<style scoped>
.song {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.sear {
    width: 100%;
    margin: 10px auto;
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
}

.search {
    height: 32px;
    width: 60vw;
    border-radius: 15px;
}

.singer {
    margin-left: 30px;
}

/deep/ a:hover {
    text-decoration: none;
}
</style>