<template>
  <!-- 数据获取 -->
  <div class="home">
    <div class="sear">
      <i class="el-icon-service"></i>
      随心听：<input type="text" v-model.lazy="song_name" class="search" />
    </div>
    <list_view>
      <template v-slot:hot>
        <el-skeleton
          variant="image"
          :loading="loading_pl"
          animated
          :rows="12"
          :throttle="500"
        >
          <div class="playlist">
            <playlist
              v-for="item in hot_list"
              :key="item.id"
              :id="item.id"
              :name="item.name"
              :pic_url="item.picUrl"
              @change="change_pl"
            ></playlist>
          </div>
        </el-skeleton>
      </template>
      <template v-slot:mv>
        <el-skeleton
          variant="image"
          :loading="loading_mv"
          animated
          :rows="12"
          :throttle="500"
        >
          <mv
            v-for="item in mv_list"
            :key="item.id"
            :name="item.name"
            :pic_url="item.picUrl"
            :id="item.id"
            :art_id="item.artistId"
            @change="change_mv"
          ></mv>
        </el-skeleton>
      </template>
      <!-- 热门歌手 -->
      <template v-slot:singer>
        <el-skeleton
          variant="image"
          :loading="loading_singer"
          animated
          :rows="12"
          :throttle="500"
        >
          <el-carousel
            trigger="click"
            height="260px"
            v-loading="loading_singer"
          >
            <el-carousel-item
              v-for="(hot_singer, index) in hot_singers"
              :key="index"
            >
              <singer
                :name="item.name"
                :img_url="item.picUrl"
                :key="item.id"
                :id="item.id"
                v-for="item in hot_singer"
                @change="change_singer"
              ></singer>
            </el-carousel-item>
          </el-carousel>
        </el-skeleton>
      </template>
    </list_view>
  </div>
</template>
<script>
export default {
  components: {
    list_view: () => import('./musicListView.vue'),
    singer: () => import('../../components/singer.vue'),
    mv: () => import('../../components/mv_one.vue'),
    playlist: () => import('../../components/playList_one.vue'),
  },
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
      loading_song: true,
      loading_pl: true,
      loading_mv: true,
      loading_singer: true,
    };
  },
  created() {
    // 显示加载
    this.$api
      .getMusic()
      .then((data) => {
        this.list = data.result;
        this.list.length = 6;
      })
      .then(() => {
        this.loading_song = false;
      }),
      this.$api
        .getHotList()
        .then((data) => {
          this.hot_list = data.result;
        })
        .then(() => {
          this.loading_pl = false;
        }),
      this.$api
        .getMv()
        .then((data) => {
          this.mv_list = data.result;
        })
        .then(() => {
          this.loading_mv = false;
        }),
      this.$api
        .getHotSinger()
        .then((data) => {
          this.hot_singers[0] = data.artists.slice(0, 6);
          this.hot_singers[1] = data.artists.slice(6, 12);
          this.hot_singers[2] = data.artists.slice(12, 18);
        })
        .then(() => {
          this.loading_singer = false;
        });
  },
  methods: {
    // 跳转到歌单界面或mv界面之前显示加载ing
    change_pl(val) {
      this.loading_pl = val;
    },
    change_mv(val) {
      this.loading_mv = val;
    },
    change_singer(val) {
      this.loading_singer = val;
    },
  },
  watch: {
    // 随心听
    song_name() {
      this.$api.search(this.song_name).then((data) => {
        // 暂时选择搜索的第一条进行播放
        // 改了一下，搜索的时候在最后加一个数字，就表示搜索结果的第几条
        const number = parseInt(this.song_name[this.song_name.length - 1]); //这个就是选择的数字
        var num = data.result.songs[0].id;
        // 如果是合理的数字，就按这个结果搜
        if (!isNaN(number) && number < data.result.songs.length) {
          num = data.result.songs[number].id;
        }
        this.$api.toSong(num).then((d) => {
          this.$parent.$refs.audio_ref.src = d.data[0].url;
        });
      });
    },
  },
  activated() {
    this.$parent.keep_arr = [
      'all_playList',
      'home',
      'today',
      'all_album',
      'all_singer',
    ];
    this.loading_pl = false;
    this.loading_mv = false;
    this.loading_singer = false;
  },
};
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

a:hover {
  text-decoration: none;
}
</style>
