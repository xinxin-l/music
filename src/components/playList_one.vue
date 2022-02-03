<template>
    <div class="pbox" @click='toList'>
        <img :src='pic_url' alt="">
        <div class="tt">{{name}}</div>
    </div>
</template>
<script>
export default {
    props: ['pic_url', 'id', 'name'],
    methods: {
        toList() {
            this.$api.playList(this.id).then(res => {
                const list = res.playlist
                const tem = list.tracks
                this.$router.push({ name: 'playList', params: { t: tem, id: this.id, description: list.description, tags: list.tags, creator_name: list.creator.nickname, creator_pic: list.creator.avatarUrl, creator_backpic: list.creator.backgroundUrl } })
            })
        }
    }
}
</script>
<style scoped>

.pbox {
    padding: 8px;
    display: inline-block;
    min-height: 140px;
    width: 33%;
}

.pbox img {
    width: 100%;
    display: block;
}

.pbox img:hover {
    cursor: pointer;
}

.pbox:hover {
    background-color: #E6E6E6;
    border-radius: 5px;
}

.pbox>.tt {
    margin-top: 8px;
    font-size: 12px;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    /* 显示两行，后面省略 */
    overflow: hidden;
}
</style>