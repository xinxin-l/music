<template>
  <div class="album" v-loading="loading" @click="toAlbum">
    <v-lazy-image
      :src="
        getPicUrl(pic_url) ||
        'http://p4.music.126.net/XIkyCsEAeYPOtrBXxY1FRA==/109951168504979803.jpg'
      "
      :alt="name"
      width="90"
      height="90"
    />
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
        .image(url, {
          fetchFormat: 'jpeg',
          format: 'jpeg',
        })
        .setDeliveryType('fetch')
        .resize(Resize.fill().width(240).height(120))
        .toURL();
    },
    toAlbum() {
      //   let num = this.$parent.$parent.$parent.keep_arr.indexOf('album');
      //   if (num !== -1) {
      //     this.$parent.$parent.$parent.keep_arr.splice(num, 1);
      //   }

      this.loading = true;
      this.$api.getAlbumDetail(this.id).then((res) => {
        this.$router.push({
          name: 'album',
          params: { list: res.album, songs: res.songs },
        });
        this.loading = false;
      });
    },
  },
};
</script>
<style scoped>
.album {
  padding: 6px;
  display: flex;
  flex-direction: column;
  min-height: 140px;
  align-items: flex-start;
  min-width: 28%;
}

.album img {
  display: block;
  border-radius: 8px;
  width: 90px;
  height: 90px;
  object-fit: cover;
}

.album > .tt {
  margin-top: 8px;
  font-size: 12px;
  text-align: left;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
