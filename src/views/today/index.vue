<template>
  <div class="today">
    <div style="height: 10px"></div>
    <!-- banner -->
    <el-carousel
      :interval="5000"
      arrow="always"
      height="150px"
      style="margin: 0 16px; border-radius: 12px; overflow: hidden"
    >
      <el-carousel-item
        v-for="(item, index) in banners"
        :key="index"
        class="ban"
      >
        <v-lazy-image
          :src="getPicUrl(item.imageUrl)"
          alt=""
          width="405"
          height="150"
          @click="toAplay(item.imageUrl)"
          class="ban_img"
        />
      </el-carousel-item>
    </el-carousel>
    <div class="container">
      <div class="top" style="margin-bottom: 0">
        <h3>
          新歌速递
          <i class="el-icon-refresh refresh" @click="refresh_song"></i>
        </h3>
        <a href="#/all_song">更多</a>
      </div>
      <song ref="song_ref"></song>
    </div>
    <div class="container">
      <div class="top">
        <h3>
          今日歌单
          <i class="el-icon-refresh refresh" @click="getNewList"></i>
        </h3>
        <a href="#/all_playList">更多</a>
      </div>
      <el-skeleton :loading="loading_pl" animated class="playlist-template">
        <template slot="template">
          <div class="playlist-template-box">
            <div
              v-for="(item, index) in arr"
              :key="index"
              class="playlist-box-outer"
            >
              <el-skeleton-item
                variant="image"
                style="width: 90px; height: 90px"
              />
              <el-skeleton-item
                variant="text"
                style="width: 90px; margin-top: 6px; height: 33px"
              />
            </div>
          </div>
        </template>
        <template>
          <div class="playlist">
            <playlist
              v-for="item in playlist"
              :key="item.id"
              :id="item.id"
              :name="item.name"
              :pic_url="item.coverImgUrl"
            ></playlist>
          </div>
        </template>
      </el-skeleton>
    </div>
    <div class="container">
      <div class="top">
        <h3>
          最新MV
          <!-- <i class="el-icon-refresh refresh" @click="getNewMV"></i> -->
        </h3>
        <a href="#/all_mv">更多</a>
      </div>

      <el-skeleton :loading="loading_mv" animated class="mv-template">
        <template slot="template">
          <div class="playlist-template-box">
            <div style="display: flex; overflow: hidden">
              <el-skeleton-item
                variant="image"
                style="width: 240px; height: 120px; margin-right: 12px"
              />
              <el-skeleton-item
                variant="image"
                style="width: 240px; height: 120px"
              />
            </div>
          </div>
        </template>
        <template>
          <div class="playlist">
            <mv
              v-for="item in mv"
              :key="item.id"
              :pic_url="item.cover"
              :name="item.name"
              :art_id="item.artistId"
              :id="item.id"
            ></mv>
          </div>
        </template>
      </el-skeleton>
    </div>
    <div class="container">
      <div class="top">
        <h3>
          最新专辑
          <i class="el-icon-refresh refresh" @click="getNewAlbum"></i>
        </h3>
        <a href="#/all_album">更多</a>
      </div>
      <el-skeleton :loading="loading_ab" animated class="playlist-template">
        <template slot="template">
          <div class="playlist-template-box">
            <div
              v-for="(item, index) in arr"
              :key="index"
              class="playlist-box-outer"
            >
              <el-skeleton-item
                variant="image"
                style="width: 90px; height: 90px"
              />
              <el-skeleton-item
                variant="text"
                style="width: 90px; margin-top: 6px; height: 33px"
              />
            </div>
          </div>
        </template>
        <template>
          <div class="playlist">
            <album
              v-for="item in album"
              :key="item.id"
              :id="item.id"
              :name="item.name"
              :pic_url="item.picUrl"
            ></album>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>
<script>
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import VLazyImage from 'v-lazy-image/v2';
// import myWorker from '../../components/2.worker.js';

const cldInstance = new Cloudinary({ cloud: { cloudName: 'du8xpmd0e' } });
// const worker = myWorker();

export default {
  name: 'today',
  components: {
    song: () => import('../../components/song.vue'),
    mv: () => import('../../components/mv_one.vue'),
    playlist: () => import('../../components/playList_one.vue'),
    album: () => import('../../components/album_one.vue'),
    VLazyImage,
  },
  data() {
    return {
      banners: [],
      playlist: [],
      album: [],
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
      loading_ab: true,
      arr: [1, 2, 3, 4],
    };
  },
  methods: {
    getPicUrl(url) {
      return cldInstance
        .image(url)
        .setDeliveryType('fetch')
        .resize(Resize.fill().width(405).height(150))
        .toURL();
    },

    // 调用接口获取数据
    get_banners() {
      this.$api.banners().then((data) => {
        this.banners = data.banners.slice(0, 5);
      });
    },
    getNewList() {
      this.loading_pl = true;
      this.$api
        .getNewList('', this.left, this.right)
        .then((res) => {
          this.playlist = res.playlists;
        })
        .then(() => {
          this.left = (this.left + 9) % 45;
          this.right = this.left + 9;
          this.loading_pl = false;
        });
    },
    getNewMV() {
      this.$api
        .getNewMV(6)
        .then((res) => {
          this.mv = res.data;
        })
        .then(() => {
          this.loading_mv = false;
        });
    },
    getNewAlbum() {
      this.loading_ab = true;
      this.$api
        .getNewAlbum('', this.al_left, this.al_right)
        .then((res) => {
          this.album = res.albums;
        })
        .then(() => {
          this.al_left = (this.al_left + 6) % 12;
          this.al_right = this.al_left + 6;
          this.loading_ab = false;
        });
    },
    // 点击banner播放相应歌曲
    play(item) {
      const id = item.targetId;
      this.$api.toSong(id).then((res) => {
        if (res.data[0].code === 404) {
          this.$message({
            message: '歌曲暂时无法播放',
            type: 'warning',
            center: true,
          });
        } else {
          this.$parent.$refs.audio_ref.src = res.data[0].url;
          this.setId(res.data[0].id); //修改全局变量 song的Id
        }
      });
    },
    // 点击刷新旋钮时加载数据（除歌曲外不需要调用接口）
    async refresh_song() {
      await this.$refs.song_ref.changeSong();
    },
    r_mv() {},
  },
  created() {
    this.get_banners();
    this.getNewList();
  },
  mounted() {
    // let mv = document.getElementById('r_mv');
    // let observer = new IntersectionObserver(this.r_mv);
    // observer.observe(mv);
    // this.worker.postMessage(true);
    // this.worker.onmessage = function (e) {
    //     if(e.banner) {}
    // };
    this.getNewMV();
    this.getNewAlbum();
  },
  activated() {
    // let num = this.$parent.keep_arr.indexOf('album');
    // if (num !== -1) {
    //   this.$parent.keep_arr.splice(num, 1);
    // }
    // this.$parent.keep_arr = [
    //   'all_playList',
    //   'home',
    //   'today',
    //   'all_album',
    //   'all_singer',
    // ];
  },
};
</script>
<style scoped>
.today {
  padding-bottom: 54px;
}

.ban_img {
  border-radius: 12px;
}

li {
  padding: 0;
  margin: 0 8px 15px 0;
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
<style>
.el-carousel__indicators--horizontal {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
