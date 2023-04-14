<template>
  <div>
    <back></back>
    <div class="each_list" v-loading="loading">
      <el-table
        :data="list"
        :key="list.id"
        fit
        stripe
        style="width: 100%"
        @cell-click="toSong"
        class="song_list"
      >
        <el-table-column prop="name" label="歌曲" align="center">
        </el-table-column>
        <el-table-column prop="ar[0].name" label="歌手" align="center">
        </el-table-column>
        <el-table-column prop="al.name" label="专辑" align="center">
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="34"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'each_list',
  data() {
    return {
      list: [],
      lists: [],
      page: 1,
      total: 1,
      l: 0,
      r: 34,
      loading: true,
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
          this.$parent.$refs.audio_ref.src = res.data[0].url;
          this.setId(row.id);
        }
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      (this.l = (val - 1) * 33), (this.r = this.l + 33);
      this.list = this.lists.slice(this.l, this.r);
    },
  },
  created() {
    this.$api.playList(this.$route.params.id).then((res) => {
      this.total = res.playlist.tracks.length;
      this.lists = res.playlist.tracks;
      this.list = res.playlist.tracks.slice(0, 34);
      this.loading = false;
    });
  },
};
</script>
<style scoped>
.each_list {
  padding-bottom: 54px;
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
</style>
