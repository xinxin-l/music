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
        <span class="b" @click="change">其他</span>
      </div>
      <div class="type">
        <span class="a">类型：</span>
        <span
          class="b"
          @click="change"
          style="background-color: rgb(252, 238, 238); color: #cd0200"
          >全部</span
        >
        <span class="b" @click="change">男歌手</span>
        <span class="b" @click="change">女歌手</span>
        <span class="b" @click="change">乐队</span>
      </div>
    </div>
    <!-- 下面是歌手 -->
    <div>
      <div v-for="item in list" :key="item.id" class="s" ref="singer">
        <img :src="item.picUrl" alt="" />
        <div>
          <p style="font-size: 16px; margin-bottom: 6px">{{ item.name }}</p>
          <p style="font-size: 10px; color: #5e5e5e" v-if="item.alias.length">
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
  </div>
</template>
<script>
export default {
  created() {
    this.$api.getAllSinger().then((res) => {
      console.log(res.artists);
      this.list = res.artists;
    });
  },
  data() {
    return {
      list: [],
      text: ['全部', '华语', '欧美', '日本', '韩国', '其他'],
      text_2: ['全部', '男歌手', '女歌手', '乐队'],
      area: [-1, 7, 96, 8, 16, 0],
      type: [-1, 1, 2, 3],
      now_area: -1,
      now_type: -1,
      now_star: false,
    };
  },
  methods: {
    change(e) {
      for (let i = 1; i < e.path[1].children.length; i++) {
        e.path[1].children[i].style = '';
      }
      e.target.style.backgroundColor = 'rgb(252, 238, 238)';
      e.target.style.color = '#cd0200';
      if (e.path[1]._prevClass === 'area') {
        let num = this.text.indexOf(e.target.innerText);
        this.now_area = this.area[num];
      } else if (e.path[1]._prevClass === 'type') {
        let num = this.text_2.indexOf(e.target.innerText);
        this.now_type = this.type[num];
      }
      this.$api.getAllSinger(100, this.now_type, this.now_area).then((res) => {
        this.list = res.artists;
      });
    },
    toStar(e) {
      this.now_star = !this.now_star;
      if (this.now_star) {
        e.target.className = 'el-icon-star-on star';
      } else {
        e.target.className = 'el-icon-star-off star';
      }
    },
  },
};
</script>
<style scoped>
.all {
  padding-bottom: 54px;
  background-color: #fff;
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
