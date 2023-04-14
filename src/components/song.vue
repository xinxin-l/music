<template>
  <el-skeleton
    animated
    :loading="loading"
    style="
      width: 100%;
      display: flex;
      align-items: center;
      justify-items: center;
      padding-left: 16px;
    "
  >
    <template slot="template">
      <div class="song-template">
        <el-skeleton-item
          variant="h3"
          style="height: 48px; margin-bottom: 12px"
          v-for="(item, index) in arr"
          :key="index"
        />
      </div>
    </template>
    <template>
      <div class="song-box">
        <div class="frame" v-for="(item, index) in list" :key="index">
          <div
            v-for="(song_item, i) in item"
            :key="i"
            class="frame-item"
            @click="playSong(song_item.id)"
          >
            <v-lazy-image
              :src="handleImgUrl(song_item.album && song_item.album.picUrl)"
              alt=""
              width="48"
              height="48"
            />
            <div class="right">
              <p style="font-size: 14px">{{ song_item.name }}</p>
              <p style="font-size: 12px; margin-top: 6px">
                {{ song_item.artists && song_item.artists[0].name }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </el-skeleton>
</template>
<script>
import VLazyImage from 'v-lazy-image/v2';
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';
import myWorker from './2.worker.js';

const cldInstance = new Cloudinary({ cloud: { cloudName: 'du8xpmd0e' } });
const songWorker = myWorker();

export default {
  data() {
    return {
      nums: [96, 8, 16, 7],
      totalList: [],
      list: {},
      num: 0,
      loading: true,
      imageWidth: 10,
      imageHeight: 10,
      workList: {},
      arr: [1, 2, 3],
    };
  },
  components: { VLazyImage },
  methods: {
    getSong(n) {
      this.loading = true;
      this.$api.getNewSong(n).then((res) => {
        for (let i = 0; i < 3; i++) {
          this.list[i] = [];
          let arr = res.data.slice(i * 3, i * 3 + 3);
          this.list[i] = arr;
        }
        this.loading = false;
      });
    },
    changeSong() {
      this.num = (this.num + 1) % 4;
      this.getSong(this.nums[this.num]);
    },
    playSong(id) {
      this.$api.toSong(id).then((res) => {
        this.$parent.$parent.$refs.audio_ref.src = res.data[0].url;
        this.setId(id);
      });
    },
    getWorkList(list) {
      this.songWorker.postMessage(list);
      this.songWorker.onmessage = function (e) {
        this.workList = [...e.data];
        this.loading = false;
      };
    },
    handleImgUrl(url) {
      if (url) {
        let res = cldInstance
          .image(url)
          .setDeliveryType('fetch')
          .resize(Resize.fill().width(48).height(48));
        return res.toURL();
      }
      return '';
    },
  },
  created() {
    this.getSong(8);
  },
  beforeDestroy() {
    songWorker.terminate();
  },
};
</script>
<style scoped>
.r {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 240px;
}

.frame {
  display: inline-block;
  min-width: 95%;
}
.frame .frame-item {
  margin-bottom: 12px;
  padding-right: 4px;
}

img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: inline-block;
  vertical-align: middle;
  object-fit: cover;
}

.right {
  display: inline-block;
  margin-left: 8px;
  vertical-align: middle;
  width: 60%;
}

p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  /*width: 100px;*/
}
</style>
