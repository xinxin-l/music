<template>
  <div class="total">
    <div class="sear">
      <i class="el-icon-search"></i>
      搜索：<input
        type="text"
        v-model.lazy="song_name"
        class="search"
        placeholder="请输入关键词"
      />
    </div>
    <div class="result" v-show="song_name">
      <search_result
        :list="lists"
        :song_name="song_name"
        ref="search_res"
      ></search_result>
    </div>
    <div class="another" v-show="!song_name" ref="s_box">
      <search_list style="margin-top: 30px" ref="search_ref"></search_list>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search',
  components: {
    search_list: () => import('../../components/search_list.vue'),
    search_result: () => import('../../components/search_result.vue'),
  },
  data() {
    return {
      song_name: '',
      lists: [],
    };
  },
  watch: {
    song_name() {
      this.$refs.search_res.loading_song = true;
      this.$api.search(this.song_name).then((res) => {
        this.lists = res.result.songs;
        this.$refs.search_res.loading_song = false;
      });
    },
  },
  created() {
    this.$parent.keep_arr.push('search');
  },
  activated() {
    this.$parent.keep_arr = ['home', 'today', 'search'];
  },
};
</script>
<style scoped>
.total {
  padding-bottom: 54px;
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
</style>
