<template>
  <div class="mv">
    <back></back>
    <video controls :src="url" autoplay></video>
    <div class="detail">
      <p style="margin: 7px 10px 7px 0; font-size: 17px">
        <span>{{ name }}</span> &nbsp;&nbsp;
        <span style="font-size: 15px"></span>
      </p>
      <div class="middle">
        <img :src="img_url" alt="" />
        <span style="color: black">{{ art_name }}</span>
        <span>发布：{{ time }}</span>
        <span>播放量：{{ playconut }}次</span>
      </div>
      <p class="intro" v-if="intro.length != 0">简介：{{ intro }}</p>
    </div>
    <!-- 相关mv推荐 -->
    <div class="similar">
      <p style="margin-bottom: 10px">相关推荐：</p>
      <el-carousel :interval="4000" type="card" height="25vw">
        <el-carousel-item v-for="item in simi" :key="item.id">
          <p class="simi_text">{{ item.name }}</p>
          <img :src="item.cover" class="simi_img" @click="tosimimv(item.id)" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="hot_com">
      <h3 style="margin: 20px" v-if="hotcomment.length != 0">热门评论</h3>
      <comment
        v-for="item in hotcomment"
        :key="item.commentId"
        :name="item.user.nickname"
        :text="item.content"
        :url="item.user.avatarUrl"
        :timestr="item.timeStr"
        :bereplied="item.beReplied"
      ></comment>
    </div>
    <div class="new_com">
      <h3 style="margin: 20px" v-if="newcomment.length != 0">最新评论</h3>
      <comment
        v-for="item in newcomment"
        :key="item.commentId"
        :name="item.user.nickname"
        :text="item.content"
        :url="item.user.avatarUrl"
        :timestr="item.timeStr"
        :bereplied="item.beReplied"
      ></comment>
    </div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page="page"
        :page-size="6"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mv',
  components: { comment: () => import('../components/comment.vue') },
  data() {
    return {
      url: '',
      id: 0,
      art_id: 0,
      name: '',
      img_url: '',
      art_name: '',
      time: '',
      intro: '',
      playconut: 0,
      simi: [],
      newcomment: [],
      hotcomment: [],
      total: 0,
      page: 0,
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.$api.mv_comment(this.id, (this.page - 1) * 6).then((res) => {
        this.newcomment = res.comments;
      });
    },
    // 将当前mv的信息全修改为相似mv的信息
    tosimimv(id) {
      this.$api.toMv(id).then((r) => {
        this.id = r.data.id;
        this.url = r.data.url;
      });
      this.$api.MvDetail(id).then((result) => {
        const res = result.data;
        this.art_id = res.artists[0].id;
        this.name = res.name;
        this.time = res.publishTime;
        this.playconut = res.playCount;
        this.$api.getArtistInfo(res.artists[0].id).then((re) => {
          this.art_name = re.artist.name;
          this.img_url = re.artist.picUrl;
          this.intro = re.artist.briefDesc;
        });
        this.$api.getSimiMv(id).then((re) => {
          this.simi = re.mvs;
        });
        this.$api.mv_comment(id).then((re) => {
          this.total = re.total;
          this.hotcomment = re.hotComments;
          this.newcomment = re.comments;
        });
      });
    },
  },
  created() {
    this.url = this.$route.params.video_url;
    this.id = this.$route.params.id;
    this.art_id = this.$route.params.a_id;
    this.$api.MvDetail(this.id).then((res) => {
      this.name = res.data.name;
      this.time = res.data.publishTime;
      this.playconut = res.data.playCount;
    });
    this.$api.getArtistInfo(this.art_id).then((res) => {
      this.art_name = res.artist.name;
      this.img_url = res.artist.picUrl;
      this.intro = res.artist.briefDesc;
    });
    this.$api.getSimiMv(this.id).then((res) => {
      this.simi = res.mvs;
    });
    this.$api.mv_comment(this.id).then((res) => {
      this.total = res.total;
      this.hotcomment = res.hotComments;
      this.newcomment = res.comments;
    });
  },
};
</script>
<style scoped>
.mv {
  padding-bottom: 54px;
}

video {
  display: block;
  width: 90vw;
  margin: 14px auto;
}

.detail {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
}

.middle {
  display: flex;
  align-items: center;
  display: inline-block;
  margin: 10px 0;
  font-size: 12px;
  color: grey;
}

.middle img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  vertical-align: middle;
}

.middle span {
  margin-right: 10px;
}

.intro {
  font-size: 12px;
  margin: 6px 9px 10px 0;
  color: #555555;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 8;
  overflow: auto;
}

.similar {
  margin-top: 10px;
  margin-left: 20px;
  margin: 10px 20px 0 20px;
}

.simi_img {
  height: 100%;
  width: 100%;
}

.simi_text {
  position: fixed;
  bottom: 10px;
  color: white;
  font-size: 13px;
  left: 4%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.hot_com {
  width: 100%;
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
