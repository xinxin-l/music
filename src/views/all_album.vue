<template>
  <div class="total_album">
    <back></back>
    <div class="select">
      <div class="area">
        <span>地区：</span>
        <!-- <span class='b' @click='change'>全部</span> -->
        <span
          class="b"
          @click="change"
          style="background-color: rgb(252, 238, 238); color: #cd0200"
          >华语</span
        >
        <span class="b" @click="change">欧美</span>
        <span class="b" @click="change">韩国</span>
        <span class="b" @click="change">日本</span>
      </div>
      <div class="type">
        <span>类型：</span>
        <span
          class="b"
          @click="change"
          style="background-color: rgb(252, 238, 238); color: #cd0200"
          >全部</span
        >
        <span class="b" @click="change">热门</span>
      </div>
      <div class="time">
        <span>时间：</span>
        <el-date-picker
          v-model="year"
          type="year"
          placeholder="选择年"
          style="margin-right: 10px"
          value-format="yyyy"
        >
        </el-date-picker>
        <el-select v-model="value" placeholder="请选择" width="50px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="playlist" v-loading="loading">
      <album
        v-for="item in album"
        :key="item.id"
        :id="item.id"
        :name="item.name"
        :pic_url="item.picUrl"
      ></album>
    </div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="45"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'all_album',
  components: { album: () => import('../components/album_one.vue') },
  data() {
    return {
      album: [],
      albums: [],
      text: ['华语', '欧美', '韩国', '日本'],
      area: ['ZH', 'EA', 'KR', 'JP'],
      now_area: 'ZH',
      now_type: 'new',
      total: 0,
      year: '',
      left: 0,
      right: 45,
      loading: true,
      options: [
        {
          value: '选项1',
          label: '1月',
        },
        {
          value: '选项2',
          label: '2月',
        },
        {
          value: '选项3',
          label: '3月',
        },
        {
          value: '选项4',
          label: '4月',
        },
        {
          value: '选项5',
          label: '5月',
        },
        {
          value: '选项6',
          label: '6月',
        },
        {
          value: '选项7',
          label: '7月',
        },
        {
          value: '选项8',
          label: '8月',
        },
        {
          value: '选项9',
          label: '9月',
        },
        {
          value: '选项10',
          label: '10月',
        },
        {
          value: '选项11',
          label: '11月',
        },
        {
          value: '选项12',
          label: '12月',
        },
      ],
      value: '',
      month: 0,
    };
  },
  methods: {
    change(e) {
      this.loading = true;
      for (let i = 1; i < e.path[1].children.length; i++) {
        e.path[1].children[i].style = '';
      }
      e.target.style.backgroundColor = 'rgb(252, 238, 238)';
      e.target.style.color = '#cd0200';
      if (e.path[1]._prevClass === 'area') {
        let num = this.text.indexOf(e.target.innerText);
        this.now_area = this.area[num];
      } else if (e.path[1]._prevClass === 'type') {
        if (e.target.innerText === '全部') {
          this.now_type = 'new';
        } else {
          this.now_type = 'hot';
        }
      }
      this.month = this.value[2];
      this.$api
        .getAllAlbum(this.now_area, this.now_type, this.year, this.month)
        .then((res) => {
          this.albums = res.monthData;
          this.total = res.monthData.length;
          this.album = res.monthData.slice(0, 45);
        })
        .then(() => {
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.left = 45 * (val - 1);
      this.right = this.left + 45;
      this.album = this.albums.slice(this.left, this.right);
    },
  },
  created() {
    this.$api
      .getAllAlbum(this.now_area, this.now_type)
      .then((res) => {
        this.albums = res.monthData;
        this.album = res.monthData.slice(0, 45);
        this.total = res.monthData.length;
      })
      .then(() => {
        this.loading = false;
      });
    let d = new Date();
    this.year = String(d.getFullYear());
    this.month = d.getMonth() + 1;
    this.value = d.getMonth() + 1 + '月';
  },
  activated() {
    let num = this.$parent.keep_arr.indexOf('album');
    if (num !== -1) {
      this.$parent.keep_arr.splice(num, 1);
    }
  },
  watch: {
    year() {
      this.$api
        .getAllAlbum(this.now_area, this.now_type, this.year, this.month)
        .then((res) => {
          console.log(res);
          this.albums = res.monthData;
          this.total = res.monthData.length;
          this.album = res.monthData.slice(0, 45);
        });
    },
    value(n) {
      this.month = n[2];
      this.$api
        .getAllAlbum(this.now_area, this.now_type, this.year, n[2])
        .then((res) => {
          console.log(res);
          this.albums = res.monthData;
          this.total = res.monthData.length;
          this.album = res.monthData.slice(0, 45);
        });
    },
  },
};
</script>
<style scoped>
.total_album {
  padding-bottom: 54px;
}

.select {
  padding: 0 10px 10px 16px;
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

.area {
  margin-bottom: 10px;
}

/deep/ .active {
  border-bottom: 0;
}

.page {
  width: 100%;
  margin: 15px auto;
  display: flex;
  justify-content: center;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #d45e5c;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover {
  color: #d45e5c;
}

div.time {
  margin-top: 0;
}

/deep/ .time .el-input__inner {
  height: 30px;
  line-height: 30px;
  width: 110px;
  display: inline-block;
}

/deep/ .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 110px;
}

/deep/ .el-input__icon {
  line-height: 30px;
}

/deep/ .el-year-table td .cell:hover,
.el-year-table td.current:not(.disabled) .cell {
  color: #cd0200;
}

/deep/ .el-select-dropdown__item {
  display: inline-block;
}
</style>
