<template>
  <div class="all">
    <back></back>
    <div class="select">
      <div class="area">
        <span class="a">地区：</span>
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
      <div class="type">
        <span class="a">类型：</span>
        <span
          class="b"
          @click="change"
          style="background-color: rgb(252, 238, 238); color: #cd0200"
          >全部</span
        >
        <span class="b" @click="change">官方版</span>
        <span class="b" @click="change">原声</span>
        <span class="b" @click="change">现场版</span>
        <span class="b" @click="change">网易出品</span>
      </div>
      <div class="order">
        <span class="a">排序：</span>
        <span
          class="b c"
          @click="change"
          style="background-color: rgb(252, 238, 238); color: #cd0200"
          >上升最快</span
        >
        <span class="b" @click="change">最热</span>
        <span class="b" @click="change">最新</span>
      </div>
    </div>
    <div class="list" v-loading="loading">
      <mv
        :pic_url="item.cover"
        :name="item.name"
        :id="item.id"
        :art_id="item.artistId"
        v-for="item in mv"
        :key="item.id"
      ></mv>
    </div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="50"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'all_mv',
  components: { mv: () => import('../components/mv_one.vue') },
  data() {
    return {
      mv: [],
      page: 0,
      total: 800,
      now_area: '全部',
      now_type: '全部',
      now_order: '上升最快',
      loading: true,
    };
  },
  methods: {
    getMv(offset) {
      this.loading = true;
      this.$api
        .getAllMV(this.now_area, this.now_type, this.now_order, 50, offset)
        .then((res) => {
          this.mv = res.data;
        })
        .then(() => {
          this.loading = false;
        });
    },
    getTotal() {
      this.$api
        .getAllMV(this.now_area, this.now_type, this.now_order, 1000, 0)
        .then((res) => {
          this.total = res.data.length;
        });
    },
    change(e) {
      var str = e.target.innerText;
      this.page = 1;
      for (let i = 1; i < e.path[1].children.length; i++) {
        e.path[1].children[i].style = '';
      }
      e.target.style.backgroundColor = 'rgb(252, 238, 238)';
      e.target.style.color = '#cd0200';
      if (e.path[1]._prevClass === 'area') {
        this.now_area = str;
      } else if (e.path[1]._prevClass === 'type') {
        this.now_type = str;
      } else if (e.path[1]._prevClass === 'order') {
        this.now_order = str;
      }
      this.getTotal();
      this.getMv();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getMv((val - 1) * 50);
    },
  },
  created() {
    this.getTotal();
    this.getMv();
  },
};
</script>
<style scoped>
.all {
  padding-bottom: 54px;
  background-color: #fff;
}

.nav {
  position: fixed;
  width: 150px;
  height: 280px;
  margin: 10px 0;
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

.list {
  margin: 0 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.select {
  padding: 10px;
  padding-left: 16px;
  margin-bottom: 7px;
}

.select div {
  margin-top: 10px;
}

.select span {
  color: #5e5e5e;
  font-size: 12px;
  display: inline-block;
  padding: 6px 10px;
  margin-right: 6px;
  text-align: center;
  border-radius: 4px;
}

.select .a {
  padding: 8px 0 8px 10px;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #d45e5c;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #d45e5c;
}
</style>
