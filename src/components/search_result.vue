<template>
  <div>
    <el-tabs v-model="activeName" stretch @tab-click="change">
      <el-tab-pane label="单曲" name="first">
        <div class="list" v-loading="loading_song">
          <el-table
            :data="list"
            :key="list.id"
            fit
            stripe
            style="width: 100%"
            @cell-click="toSong"
            class="song_result"
          >
            <el-table-column prop="name" label="歌曲" align="center">
            </el-table-column>
            <el-table-column
              prop="artists"
              label="歌手"
              align="center"
              :formatter="art_name"
            >
            </el-table-column>
            <el-table-column prop="album.name" label="专辑" align="center">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="专辑" name="second">
        <div class="playlist" v-loading="loading_ab">
          <album
            v-for="item in album"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :pic_url="item.picUrl"
          ></album>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="third">
        <div class="mv" v-loading="loading_mv">
          <mv
            :pic_url="item.cover"
            :name="item.name"
            :id="item.id"
            :art_id="item.artistId"
            v-for="item in mv"
            :key="item.id"
          ></mv>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="fourth">
        <div class="playlist" v-loading="loading_pl">
          <playlist
            v-for="item in playlist"
            :key="item.id"
            :id="item.id"
            :name="item.name"
            :pic_url="item.coverImgUrl"
          ></playlist>
        </div>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="fifth">
        <div v-loading="loading_singer">
          <div v-for="item in singer" :key="item.id" class="s">
            <img :src="item.picUrl" alt="" @click="toSinger(item.id)" />
            <div @click="toSinger(item.id)">
              <p style="font-size: 16px; margin-bottom: 6px">{{ item.name }}</p>
              <p
                style="font-size: 10px; color: #5e5e5e"
                v-if="item.alias.length"
              >
                {{ item.alias[0] }}
              </p>
            </div>
            <i
              class="el-icon-star-off star"
              style="font-size: 20px; position: absolute; right: 25px"
              @click="toStar"
            ></i>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mv from './mv_one.vue';
import playlist from './playList_one.vue';
export default {
  props: ['list', 'song_name'],
  components: { album: () => import('./album_one.vue'), mv, playlist },
  data() {
    return {
      album: [],
      mv: [],
      playlist: [],
      singer: [],
      activeName: 'first',
      now_index: 0,
      now_star: false,
      loading_ab: true,
      loading_mv: true,
      loading_pl: true,
      loading_singer: true,
      loading_song: true,
    };
  },
  methods: {
    toSong(row) {
      this.$api.toSong(row.id).then((res) => {
        if (res.data[0].code === 404) {
          this.$message({
            message: '歌曲暂时无法播放',
            type: 'warning',
            center: true,
          });
        } else {
          this.$parent.$parent.$refs.audio_ref.src = res.data[0].url;
          this.setId(res.data[0].id);
        }
      });
    },
    toSinger(Id) {
      this.$api.getSingerDetail(Id).then((res) => {
        this.$router.push({ path: 'singerDetail', query: { res } });
      });
    },
    art_name(row) {
      var tem = row.artists[0].name;
      const num = row.artists.length;
      if (num === 1) {
        return tem;
      }
      for (let i = 1; i < num; i++) {
        tem = tem + '/' + row.artists[i].name;
      }
      return tem;
    },
    toStar(e) {
      this.now_star = !this.now_star;
      if (this.now_star) {
        e.target.className = 'el-icon-star-on star';
      } else {
        e.target.className = 'el-icon-star-off star';
      }
    },
    // 点击对应栏目时再请求数据
    change(e) {
      let tem = this.song_name;
      if (e) {
        this.now_index = e.index;
      }
      if (this.now_index === '1') {
        this.$api.search(tem, 10).then((res) => {
          this.album = res.result.albums;
          this.loading_ab = false;
        });
      } else if (this.now_index === '2') {
        this.$api.search(tem, 1004).then((res) => {
          this.mv = res.result.mvs;
          this.loading_mv = false;
        });
      } else if (this.now_index === '3') {
        this.$api.search(tem, 1000).then((res) => {
          this.playlist = res.result.playlists;
          this.loading_pl = false;
        });
      } else if (this.now_index === '4') {
        this.$api.search(tem, 100).then((res) => {
          this.singer = res.result.artists;
          this.loading_singer = false;
        });
      }
    },
  },
  watch: {
    // 搜索栏内容更改时，请求对应数据
    song_name() {
      this.change();
    },
  },
};
</script>
<style scoped>
.list {
  margin-top: 10px;
}

.mv {
  margin: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.s {
  padding-left: 25px;
  padding-right: 30px;
  display: flex;
  align-items: center;
  height: 65px;
  border-bottom: 2px solid #f1f1f1;
}

.s img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}
</style>
