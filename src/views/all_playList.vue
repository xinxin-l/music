<template>
  <div class="all">
    <back></back>
    <i class="el-icon-s-unfold unfold" @click="unfold"></i>
    <div class="nav" ref="nav_ref">
      <el-menu class="el-menu-vertical-demo" :collapse="true">
        <el-submenu
          v-for="(d, i) in category"
          :key="d.id"
          :index="i"
          tabindex="1"
        >
          <template slot="title">
            <i>{{ d }}</i>
          </template>
          <el-menu-item
            v-for="it in sub_category[i]"
            :key="it.id"
            @click="toList"
            style="
              color: rgb(119, 117, 123);
              height: 21px;
              font-size: 12px;
              line-height: 21px;
            "
          >
            {{ it }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="playlist" v-loading="loading">
      <playlist
        v-for="item in playlists"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :pic_url="item.coverImgUrl"
        @change="change_load"
      ></playlist>
    </div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="39"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'all_playList',
  components: { playlist: () => import('../components/playList_one.vue') },
  data() {
    return {
      category: [],
      sub_category: [[], [], [], [], []],
      playlists: [],
      isCollapse: true,
      timer: '',
      all_box: 'all_box',
      now_category: '',
      page: 1,
      total: 0,
      loading: true,
    };
  },
  methods: {
    // 折叠目录
    fold() {
      this.$refs.nav_ref.style = 'display:none';
    },
    // 展开目录
    unfold() {
      if (this.$refs.nav_ref.style.display === 'block') {
        this.$refs.nav_ref.style = 'display:none';
        return;
      }
      setTimeout(() => {
        this.$refs.nav_ref.style = 'display:block';
      }, 100);
    },
    // 根据歌单标签更新歌单数据
    toList(d) {
      this.fold();
      this.loading = true;
      var t = d.$slots.default[0].text.trim();
      this.$api.getNewList(t, 39).then((res) => {
        this.playlists = res.playlists;
        this.now_category = t;
        this.total = res.total;
        this.loading = false;
      });
    },
    // 页数，加载数据
    handleCurrentChange(val) {
      this.page = val;
      this.loading = true;
      this.$api
        .getNewList(this.now_category, this.page * 39, 39)
        .then((res) => {
          this.playlists = res.playlists;
          this.loading = false;
        });
    },
    // 转到歌单界面之前，在all_playlist界面显示加载
    change_load(val) {
      this.loading = val;
    },
  },
  created() {
    this.$api.getNewListCategory().then((res) => {
      this.category = res.categories;
      res.sub.forEach((item) => {
        this.sub_category[item.category].push(item.name);
      });
    });
    this.$api
      .getNewList('华语', 0, 39)
      .then((res) => {
        this.playlists = res.playlists;
        this.now_category = '华语';
        this.total = res.total;
      })
      .then(() => {
        this.loading = false;
      });
  },
  mounted() {
    this.$refs.nav_ref.style = 'display:none';
  },
  activated() {
    console.log('dudu');
    // 防止重复进入同一个歌单
    let num2 = this.$parent.keep_arr.indexOf('playList');
    if (num2 !== -1) {
      this.$parent.keep_arr.splice(num2, 1);
    }
  },
};
</script>
<style scoped>
.all {
  padding-bottom: 54px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  height: 100%;
}

.el-menu {
  position: fixed;
}

.el-submenu__title i {
  color: #4e4d4d;
}

.nav {
  position: fixed;
  top: 70px;
  width: 90px;
  height: 320px;
  padding: 20px 0;
}

.all_box {
  margin-top: 20px;
}

.page {
  width: 100%;
  margin: 10px auto;
  display: flex;
  justify-content: center;
}

/* /deep/ .active {
    border-bottom: 0;
}

/deep/ .dir i {
    position: absolute;
    left: 50px;
} */
</style>
