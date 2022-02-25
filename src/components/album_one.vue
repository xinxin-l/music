<template>
    <div class='album'>
        <img :src="pic_url" alt="" @click='toAlbum'>
        <div class="tt">{{name}}</div>
    </div>
</template>
<script>
export default {
    props: ['pic_url', 'id', 'name'],
    methods: {
        toAlbum() {
            this.$emit('change',true)
            this.$api.getAlbumDetail(this.id).then(res => {
                this.$router.push({ name: 'album', params: { list: res.album, songs: res.songs } })
                this.$emit('change',false)
            })
        }
    }

}
</script>
<style scoped>
.album {
    padding: 8px;
    display: inline-block;
    min-height: 140px;
    width: 33%;
}

.album img {
    width: 100%;
    display: block;
}

.album img:hover {
    cursor: pointer;
}

.album:hover {
    background-color: #E6E6E6;
    border-radius: 5px;
}

.album>.tt {
    margin-top: 8px;
    font-size: 13px;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>