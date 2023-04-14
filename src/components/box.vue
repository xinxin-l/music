<template>
  <div class="box">
    <img :src="picUrl" alt="" @click="toSong" />
    <div class="t">{{ name }}</div>
  </div>
</template>
<script>
export default {
  props: ['name', 'picUrl', 'Id'],
  methods: {
    toSong() {
      this.$api.toSong(this.Id).then((res) => {
        this.$parent.$parent.$parent.$refs.audio_ref.src = res.data[0].url;
        this.setId(this.Id);
      });
    },
  },
};
</script>
<style scoped>
.box {
  padding: 8px;
  display: inline-block;
  min-height: 140px;
  width: 33%;
}

.box:hover {
  border-radius: 5px;
}

img {
  width: 100%;
  display: block;
  margin: 0 auto;
}

.t {
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 显示两行，后面省略 */
  overflow: hidden;
}
</style>
