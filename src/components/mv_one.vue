<template>
    <div class='mv_one'>
        <img :src="pic_url" alt="" @click='toMv'>
        <div class="tt">{{name}}</div>
    </div>
</template>
<script>
export default {
    props: ['pic_url', 'name', 'id', 'art_id'],
    methods: {
        toMv() {
            this.$emit('change',true)
            this.$api.toMv(this.id).then(res => {
                this.$router.push({ name: 'mv', params: { video_url: res.data.url, a_id: this.art_id, id: this.id } })
                this.$emit('change',false)
            })
        }
    }
}
</script>
<style scoped>
.mv_one {
    padding: 7px 8px 10px 8px;
    margin-bottom: 8px;
    display: inline-block;
    width: 50%;
    vertical-align: top;
}

.mv_one:hover {
    background-color: #E7E7E7;
    border-radius: 5px;
}

.mv_one img {
    width: 100%;
    display: block;
    margin: 0 auto;
}

.mv_one img:hover {
    cursor: pointer;
}

.mv_one>.tt {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>