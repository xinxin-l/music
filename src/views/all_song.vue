<template>
  <div class="all">
    <back></back>
    <div class="select">
      <div class="area">
        <span>地区：</span>
        <span
          class="b"
          @click="change"
          style="background-color: rgb(252, 238, 238); color: #cd0200"
          >全部</span
        >
        <span class="b" @click="change">华语</span>
        <span class="b" @click="change">欧美</span>
        <span class="b" @click="change">韩国</span>
        <span class="b" @click="change">日本</span>
      </div>
    </div>
    <div class="list" v-loading="loading">
      <div v-for="item in song" :key="item.id" class="s">
        <div @click="toSong(item.id)">
          <p style="font-size: 16px; margin-bottom: 6px">{{ item.name }}</p>
          <p style="font-size: 10px; color: #5e5e5e">
            <span>{{ item.artists[0].name }}</span>
            <span>- {{ item.album.name }}</span>
          </p>
        </div>
        <i class="el-icon-video-play" style="font-size: 20px"></i>
      </div>
    </div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="30"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'all_song',
  data() {
    return {
      song: [],
      category: ['全部', '华语', '欧美', '日本', '韩国'],
      types: [0, 7, 96, 8, 16],
      left: 0,
      right: 30,
      page: 0,
      total: 50,
      loading: true,
    };
  },
  methods: {
    toSong(id) {
      this.$api.toSong(id).then((res) => {
        // 若歌曲无法播放，则弹出弹窗
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
    change(e) {
      this.loading = true;
      var str = e.target.innerText;
      for (let i = 1; i < e.path[1].children.length; i++) {
        e.path[1].children[i].style = '';
      }
      e.target.style.backgroundColor = 'rgb(252, 238, 238)';
      e.target.style.color = '#cd0200';
      var num = this.category.indexOf(str);
      this.$api.getNewSong(this.types[num]).then((res) => {
        this.songs = res.data;
        this.total = res.data.length;
        this.song = res.data.slice(0, 30);
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.song = this.songs.slice(
        this.left + 30 * (val - 1),
        this.right + 30 * (val - 1)
      );
    },
  },
  created() {
    this.$api
      .getNewSong()
      .then((res) => {
        this.songs = res.data;
        this.song = res.data.slice(0, 30);
        this.total = res.data.length;
      })
      .then(() => {
        this.loading = false;
      });
  },
};
</script>
<style scoped>
.all {
  padding-bottom: 54px;
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

.select {
  padding: 10px 10px 0 30px;
}

.select span {
  color: #5e5e5e;
  font-size: 15px;
  display: inline-block;
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.area {
  margin-bottom: 10px;
}

.tt {
  margin-top: 10px;
  font-size: 14px;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.page {
  width: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
}

/deep/ .active {
  border-bottom: 0;
}

/*/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #D45E5C;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #D45E5C;
}*/
</style>
