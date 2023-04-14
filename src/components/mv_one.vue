<template>
  <div class="mv_one" v-loading="loading" @click="toMv">
    <v-lazy-image :src="getPicUrl(pic_url)" alt="" width="240" height="120" />
  </div>
</template>
<script>
import VLazyImage from 'v-lazy-image/v2';
import { Cloudinary } from '@cloudinary/url-gen';
import { Resize } from '@cloudinary/url-gen/actions';

const cldInstance = new Cloudinary({ cloud: { cloudName: 'du8xpmd0e' } });
export default {
  props: ['pic_url', 'name', 'id', 'art_id'],
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
    toMv() {
      this.loading = true;
      this.$api.toMv(this.id).then((res) => {
        this.$router.push({
          name: 'mv',
          params: { video_url: res.data.url, a_id: this.art_id, id: this.id },
        });
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
.mv_one {
  vertical-align: top;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 240px;
  height: 120px;
  margin: 0 6px;
}

.mv_one img {
  width: 240px;
  height: 120px;
  object-fit: cover;
  display: block;
  border-radius: 8px;
}
</style>
