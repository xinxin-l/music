<template>
  <div class="detail">
    <back style="height: 22px"></back>
    <div class="up">
      <img :src="pic_url" alt="" />
      <div class="right">
        <p style="font-size: 23px; margin-bottom: 10px">{{ name }}</p>
        <p style="font-size: 15px">{{ alias_name }}</p>
      </div>
    </div>
    <div class="down">
      <el-tabs v-model="activeName" @tab-click="handleClick" stretch>
        <el-tab-pane label="热门歌曲" name="second">
          <div v-for="item in hotSongs" :key="item.id" class="s">
            <div @click="toSong(item.id)">
              <p style="font-size: 16px; margin-bottom: 6px">{{ item.name }}</p>
              <p style="font-size: 10px; color: #5e5e5e">
                <span>{{ item.al.name }}</span>
                <span v-show="item.alia.length">- {{ item.alia[0] }}</span>
              </p>
            </div>
            <i class="el-icon-video-play" style="font-size: 20px"></i>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="third">
          <div class="mv">
            <mv
              :pic_url="item.imgurl"
              :name="item.name"
              :id="item.id"
              :art_id="item.artistId"
              v-for="item in mv"
              :key="item.id"
            ></mv>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="fourth">
          <div
            class="album"
            v-for="item in album"
            :key="item.id"
            @click="toAlbum(item.id)"
          >
            <img :src="item.picUrl" alt="" />
            <div class="rig">
              <p>{{ item.name }}</p>
              <p style="color: grey; font-size: 13px; margin-top: 10px">
                {{ item.size }}首
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="简介" name="fifth">
          <div class="intro">
            {{ intro }}
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'singerDetail',
  components: { mv: () => import('../components/mv_one.vue') },
  data() {
    return {
      hotSongs: [],
      mv: [],
      album: [],
      simiSinger: [],
      id: 0,
      pic_url: '',
      name: '',
      alias_name: '',
      activeName: 'second',
      intro: '',
    };
  },
  methods: {
    handleClick() {},
    toSong(id) {
      this.$api.toSong(id).then((res) => {
        if (res.data[0].code === 404) {
          this.$message({
            message: '歌曲暂时无法播放',
            type: 'warning',
            center: true,
          });
        } else {
          this.$parent.$refs.audio_ref.src = res.data[0].url;
          this.setId(id);
        }
      });
    },
    toMv(id) {
      this.$api.toMv(id).then((res) => {
        console.log(res);
        this.$router.push({
          name: 'mv',
          params: { video_url: res.data.url, a_id: this.id, id },
        });
      });
    },
    toAlbum(id) {
      this.$api.getAlbumDetail(id).then((res) => {
        console.log(res);
        this.$router.push({
          name: 'album',
          params: { list: res.album, songs: res.songs },
        });
      });
    },
  },
  created() {
    this.hotSongs = this.$route.query.res.hotSongs;
    this.id = this.$route.query.res.artist.id;
    this.pic_url = this.$route.query.res.artist.picUrl;
    this.name = this.$route.query.res.artist.name;
    this.alias_name = this.$route.query.res.artist.alias[0];
    this.intro = this.$route.query.res.artist.briefDesc;
    this.$api.getSingerMv(this.id).then((d) => {
      // console.log(d)
      this.mv = d.mvs;
    });
    this.$api.getSingerAlbum(this.id).then((d) => {
      // console.log(d)
      this.album = d.hotAlbums;
    });
    this.$parent.keep_arr.push('singerDetail');
  },
};
</script>
<style scoped>
.detail {
  padding-bottom: 54px;
}

.up {
  display: flex;
  height: 164px;
  align-items: center;
  margin: 2px auto;
  padding: 0 20px;
}

img {
  width: 120px;
  height: 120px;
  display: inline-block;
}

.right {
  flex: 1;
  margin-left: 40px;
}

.s {
  padding-left: 25px;
  padding-right: 30px;
  height: 65px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f1f1f1;
}

.out {
  margin-top: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
}

.mv {
  margin: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.rig {
  display: flex;
  flex-direction: column;
  padding: 25px 15px;
}

.album {
  display: flex;
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 20px;
  border-bottom: 2px solid #f1f1f1;
}

.album img {
  width: 100px;
  height: 100px;
}

.intro {
  padding: 20px;
  padding-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>
