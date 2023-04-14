<template>
  <div class="dir">
    <i class="el-icon-arrow-left" @click="back"></i>
  </div>
</template>
<script>
export default {
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.dir {
  height: 34px;
  line-height: 34px;
  background-color: rgb(249, 249, 249);
  /*word-spacing: 3px;*/
  font-size: 22px;
  text-indent: 0.5em;
  position: relative;
}

.dir i {
  position: absolute;
  top: 6px;
}
</style>
