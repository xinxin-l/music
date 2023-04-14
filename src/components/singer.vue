<template>
  <div @click="toSinger">
    <img :src="img_url" alt="" />
    <p>{{ name }}</p>
  </div>
</template>
<script>
export default {
  props: ['name', 'img_url', 'id'],
  methods: {
    toSinger() {
      this.$emit('change', true);
      this.$api.getSingerDetail(this.id).then((res) => {
        this.$router.push({ path: 'singerDetail', query: { res } });
        this.$emit('change', false);
      });
    },
  },
};
</script>
<style scoped>
img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  vertical-align: middle;
}

div {
  display: inline-block;
  width: 47%;
  margin: 0 0 15px 6px;
  padding-left: 5px;
  border-radius: 5px;
}

p {
  display: inline-block;
  vertical-align: middle;
  font-size: 14px;
  margin-left: 7px;
  overflow: hidden;
  width: 45%;
  /*设置宽度的话，就不会出现p换到下一行的情况了*/
}
</style>
