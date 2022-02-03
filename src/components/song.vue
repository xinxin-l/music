<template>
    <div class='r' v-loading="loading">
        <div class="frame" v-for='item in list' :key='item.id' @click='playSong(item.id)'>
            <img :src="item.album.picUrl" alt="">
            <div class='right'>
                <p style='font-size:13px'>{{item.name}}</p>
                <p style='font-size: 9px;margin-top:6px'>{{item.artists[0].name}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            nums: [96,8,16,7],
            list: {},
            num: 0,
            loading:true
        }
    },
    methods: {
        getSong(n) {
            this.loading=true
            this.$api.getNewSong(n).then(res => {
                this.list = res.data.slice(0, 8)
            }).then(()=>{
                this.loading=false
            })
        },
        changeSong() {
            this.num = (this.num + 1) % 4
            this.getSong(this.nums[this.num])
        },
        playSong(id) {
            this.$api.toSong(id).then(res => {
                this.$parent.$parent.$refs.audio_ref.src = res.data[0].url
                this.setId(id)
            })
        }
    },
    created() {
        this.getSong(96)
    }
}
</script>
<style scoped>
.r {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.r:hover {
    cursor: pointer;
}

.frame {
    display: inline-block;
    width: 10em;
    height: 60px;
    padding: 5px;
    border-radius: 5px;
}

.frame:hover {
    background-color: #E6E6E6;
}

img {
    width: 3rem;
    height: 3em;
    display: inline-block;
    vertical-align: middle;
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