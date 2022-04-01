<template>
    <div class='today'>
        <div style='height:10px'></div>
        <!-- banner -->
        <el-carousel :interval="5000" arrow="always" height="120px">
            <el-carousel-item v-for="(item, index) in banners" :key="index" class='ban'>
                <img :src="item.imageUrl" alt="" @click='play(item)' class='ban_img' />
            </el-carousel-item>
        </el-carousel>
        <div class="container">
            <div class="top" style='margin-bottom:0'>
                <h3>新歌速递
                    <i class="el-icon-refresh refresh" @click='refresh_song'></i>
                </h3>
                <a href="#/all_song">更多</a>
            </div>
            <song ref='song_ref'></song>
        </div>
        <div class="container">
            <div class="top">
                <h3>今日歌单
                    <i class="el-icon-refresh refresh" @click='refresh_list'></i>
                </h3>
                <a href="#/all_playList">更多</a>
            </div>
            <el-skeleton variant="image" :loading="loading_pl" animated :throttle="500">
                <div class='playlist'>
                    <playlist v-for='item in playlist' :key='item.id' :id='item.id' :name='item.name' :pic_url='item.coverImgUrl' @change='change_pl'></playlist>
                </div>
            </el-skeleton>
        </div>
        <div class="container">
            <div class="top">
                <h3>最新MV
                    <i class="el-icon-refresh refresh" @click='refresh_mv'></i>
                </h3>
                <a href="#/all_mv">更多</a>
            </div>
            <el-skeleton variant="image" :loading="loading_mv" animated :throttle="500" id='r_mv'>
                <mv v-for='item in mv' :key='item.id' :pic_url='item.cover' :name='item.name' :art_id='item.artistId' :id='item.id' @change='change_mv'></mv>
            </el-skeleton>
        </div>
        <div class="container">
            <div class="top">
                <h3>最新专辑
                    <i class="el-icon-refresh refresh" @click='refresh_album'></i>
                </h3>
                <a href="#/all_album">更多</a>
            </div>
            <el-skeleton variant="image" :loading="loading_ab" animated :throttle="500">
                <div class='playlist' v-loading="loading_ab">
                    <album v-for='item in album' :key='item.id' :id='item.id' :name='item.name' :pic_url='item.picUrl' @change='change_ab'></album>
                </div>
            </el-skeleton>
        </div>
    </div>
</template>
<script>
import mv from '../../components/mv_one.vue'
import song from '../../components/song.vue'
import playlist from '../../components/playList_one.vue'
import album from '../../components/album_one.vue'
export default {
    name: 'today',
    components: { song, mv, playlist, album },
    data() {
        return {
            banners: [],
            playlists: [],
            playlist: [],
            album: [],
            albums: [],
            mvs: [],
            mv: [],
            program: [],
            left: 0,
            right: 9,
            mv_left: 0,
            mv_right: 6,
            al_left: 0,
            al_right: 6,
            loading_pl: true,
            loading_mv: true,
            loading_ab: true
        }
    },
    methods: {
        // 调用接口获取数据
        get_banners() {
            this.$api.banners().then(data => {
                this.banners = data.banners
                this.banners.length = 6
            })
        },
        getNewList() {
            this.$api.getNewList().then(res => {
                this.playlists = res.playlists
                this.refresh_list()
            }).then(() => {
                this.loading_pl = false
            })
        },
        getNewMV() {
            this.$api.getNewMV().then(res => {
                this.mvs = res.data
                this.mv = this.mvs.slice(0, 6)
            }).then(() => {
                this.loading_mv = false
            })
        },
        getNewAlbum() {
            this.$api.getNewAlbum().then(res => {
                this.albums = res.albums
                this.album = res.albums.slice(0, 6)
            }).then(() => {
                this.loading_ab = false
            })
        },
        // 点击banner播放相应歌曲
        play(item) {
            const id = item.targetId
            this.$api.toSong(id).then(res => {
                if (res.data[0].code === 404) {
                    this.$message({
                        message: '歌曲暂时无法播放',
                        type: 'warning',
                        center: true
                    });
                } else {
                    this.$parent.$refs.audio_ref.src = res.data[0].url
                    this.setId(res.data[0].id) //修改全局变量 song的Id
                }
            })
        },
        // 点击刷新旋钮时加载数据（除歌曲外不需要调用接口）
        async refresh_song() {
            await this.$refs.song_ref.changeSong()
        },
        async refresh_list() {
            this.playlist = this.playlists.slice(this.left, this.right)
            this.left = (this.left + 9) % 45
            this.right = this.left + 9
        },
        async refresh_mv() {
            this.mv_left = (this.mv_left + 6) % 30
            this.mv_right = this.mv_left + 6
            this.mv = this.mvs.slice(this.mv_left, this.mv_right)
        },
        async refresh_album() {
            this.al_left = (this.al_left + 6) % 12
            this.al_right = this.al_left + 6
            this.album = this.albums.slice(this.al_left, this.al_right)
        },
        // 跳转到歌单/mv/专辑界面之前显示加载
        change_pl(val) {
            this.loading_pl = val
        },
        change_mv(val) {
            this.loading_mv = val
        },
        change_ab(val) {
            this.loading_ab = val
        },
        r_mv(){
            console.log("duduud")
        }
    },
    created() {
        this.get_banners()
        this.getNewList()

        this.getNewMV()
        this.getNewAlbum()
    },
    mounted() {
        let mv = document.getElementById('r_mv')
        let observer = new IntersectionObserver(this.r_mv)
        observer.observe(mv)
    },
    activated() {
        this.$parent.keep_arr = ['all_playList', 'home', 'today', 'all_album', 'all_singer']
    }
}
</script>
<style scoped>
.today {
    padding-bottom: 54px;
}

.ban_img {
    width: 100vw;
    height: clac(1000vw/47);
}

/deep/ li {
    padding: 0;
    margin: 0 8px 15px 0;
}

/deep/ div .el-carousel__indicators--horizontal {
    width: 100%;
    text-align: center;
}

a:hover {
    text-decoration: none;
}

.top {
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin: 10px 20px 0 20px;
    line-height: 50px;
}

.refresh {
    font-size: 16px;
    margin-left: 10px;
}

img,
.ban,
.refresh:hover {
    cursor: pointer;
}

.pro {
    padding: 6px 0 12px 20px;
    width: 100%;
}

.pro img {
    width: 100px;
    height: 100px;
    display: inline-block;
    vertical-align: middle;
}

.pro_t {
    display: inline-block;
    vertical-align: middle;
    padding: 0 10px;
    width: 60vw;
}

.pro_t p {
    margin: 6px 0;
}
</style>