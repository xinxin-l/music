<template>
  <div class="play">
    <back></back>
    <div class="tit">
      <img :src="creator_backpic" alt="" id="one" />
      <div class="right">
        <div class="tem">
          <img :src="creator_pic" alt="" id="two" />
          <span>{{ creator_name }}</span>
        </div>
        <p v-show="tags.length">
          Tags：
          <span
            v-for="item in tags"
            :key="item.id"
            style="color: rgb(114, 151, 190)"
            >{{ item }}&nbsp;</span
          >
        </p>
        <p class="des">{{ description }}</p>
      </div>
    </div>
    <div class="song">
      <el-tabs v-model="activeName" stretch>
        <el-tab-pane label="歌曲列表" name="first">
          <el-table
            :data="tableData"
            :key="tableData.id"
            fit
            stripe
            style="width: 100%"
            @cell-click="toSong"
            class="temp"
          >
            <el-table-column prop="name" label="歌曲" align="center">
            </el-table-column>
            <el-table-column prop="ar[0].name" label="歌手" align="center">
            </el-table-column>
            <el-table-column prop="al.name" label="专辑" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
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
            <h3 style="margin: 20px">最新评论</h3>
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
          <!-- 分页器 -->
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  name: 'playList',
  data() {
    return {
      activeName: 'first',
      tableData: [],
      id: 0,
      hotcomment: [],
      newcomment: [],
      total: 1,
      page: 1,
      description: '',
      tags: [],
      creator_name: '',
      creator_pic: '',
      creator_backpic: '',
    };
  },
  components: { comment: () => import('../components/comment.vue') },
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
      this.$api.newcomment(this.id, (this.page - 1) * 6).then((res) => {
        this.newcomment = res.comments;
      });
    },
  },
  created() {
    this.tableData = this.$route.params.t;
    this.id = this.$route.params.id;
    this.description = this.$route.params.description;
    this.tags = this.$route.params.tags;
    this.creator_name = this.$route.params.creator_name;
    this.creator_pic = this.$route.params.creator_pic;
    this.creator_backpic = this.$route.params.creator_backpic;
    this.$api.hotcomment(this.id).then((res) => {
      this.hotcomment = res.hotComments;
    });
    this.$api.newcomment(this.id).then((res) => {
      this.total = res.total;
      this.newcomment = res.comments;
    });
    this.$parent.keep_arr.push('playList');
  },
};
</script>
<style scoped>
.play {
  padding-bottom: 54px;
}

.tit {
  display: flex;
  width: 100%;
  height: 170px;
  font-size: 12px;
  background-color: rgb(250, 250, 250);
}

#one {
  width: 120px;
  height: 120px;
  margin: auto 20px;
}

#two {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.right {
  flex: 1;
}

.tem {
  display: flex;
  margin: 25px 0 15px 20px;
  align-items: center;
}

/deep/ p {
  margin: 0 0 8px 10px;
}

.hot_com {
  width: 100%;
}

.head img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0 15px;
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

/deep/ .des {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* 显示三行，后面省略 */
  overflow: auto;
}

/deep/.cell {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* 显示三行，后面省略 */
  overflow: auto;
}
</style>
