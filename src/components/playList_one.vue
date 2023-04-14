<template>
  <div class="pbox" @click="toList" v-loading="loading">
    <!-- <img :src="pic_url" alt="" width="90" height="90" /> -->
    <v-lazy-image :src="getPicUrl(pic_url)" alt="" width="90" height="90" />
    <div class="tt">{{ name }}</div>
  </div>
</template>
<script>
import VLazyImage from 'v-lazy-image/v2';
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';

const cldInstance = new Cloudinary({ cloud: { cloudName: 'du8xpmd0e' } });
export default {
  props: ['pic_url', 'id', 'name'],
  data() {
    return {
      loading: false,
    };
  },
  components: { VLazyImage },
  methods: {
    getPicUrl(url) {
      return cldInstance
        .image(url)
        .setDeliveryType('fetch')
        .resize(Resize.fill().width(240).height(120))
        .toURL();
    },
    toList() {
      // 向父组件传值，修改loading
      this.loading = true;
      this.$api.playList(this.id).then((res) => {
        const list = res.playlist;
        const tem = list.tracks;
        this.$router.push({
          name: 'playList',
          params: {
            t: tem,
            id: this.id,
            description: list.description,
            tags: list.tags,
            creator_name: list.creator.nickname,
            creator_pic: list.creator.avatarUrl,
            creator_backpic: list.creator.backgroundUrl,
          },
        });
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
.pbox {
  padding: 6px;
  display: flex;
  flex-direction: column;
  min-height: 140px;
  align-items: flex-start;
  min-width: 28%;
}

.pbox img {
  display: block;
  border-radius: 8px;
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.pbox > .tt {
  margin-top: 8px;
  font-size: 12px;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 显示两行，后面省略 */
  overflow: hidden;
}
</style>
