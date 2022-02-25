<template>
    <div class='total'>
        <back></back>
        <img :src="imgUrl" alt="">
        <p style='text-align: center; margin-bottom: 15px;font-size:1.2em'>{{name}}</p>
        <div class='_icon'>
            <i class="el-icon-star-off"></i>
            <i class="el-icon-download"></i>
            <i class="el-icon-more"></i>
        </div>
        <div class="lrc" ref="lrc">
            <p v-for="(item,key,index) in lyric" :key="index" :class="{ 'active': currentTime > allKeys[index] && currentTime < allKeys[index+1] }">
                {{item}}{{ scrollLRC(index) }}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            imgUrl: '',
            lyric: {},
            allKeys: [],
            name:''
        }
    },
    methods: {
        filterLRC(values) {
            if (!values) return
            var lrc = {}
            var lyrics = values.split("\n") // 有问题，有的是 \n 有的是 空格
            var reg = /\[\d*:\d*(\.|:)\d*]/g
            for (var i = 0; i < lyrics.length; i++) {
                var timeRegArr = lyrics[i].match(reg)
                if (!timeRegArr) continue
                // 获取歌词
                var content = lyrics[i].replace(timeRegArr, "")
                // 获取时间
                var t = timeRegArr[0]
                var min = parseInt(t.match(/\[\d*/i).toString().slice(1))
                var sec = parseInt(t.match(/:\d*/i).toString().slice(1))
                var time = min * 60 + sec
                lrc[time] = content
            }
            this.lyric = lrc
            console.log("处理之后的：", this.lyric)
            this.getAllKeys(lrc)
        },
        getAllKeys(lrcArr) {
            for (var key in lrcArr) {
                this.allKeys.push(key)
            }
        },
        scrollLRC(index) {
            if (this.currentTime > this.allKeys[index] && this.currentTime < this.allKeys[index + 1]) {
                this.$refs.lrc.style.top = -(30 * (index - 2)) + "px"
            }
        }
    },
    created() {
        const id = this.getId()
        this.$api.getLyric(id).then(res => {
            this.lyric = res.lrc.lyric
            this.filterLRC(this.lyric)
        })
        this.$api.SongDetail(id).then(res => {
            this.imgUrl = res.songs[0].al.pcUirl
            this.name=res.songs[0].name
        })
    }
}
</script>
<style scoped>
.total {
    padding-bottom: 54px;
}

img {
    width: 200px;
    height: 200px;
    display: block;
    margin: 20px auto;
}

._icon {
    display: flex;
    justify-content: space-around;
    height: 30px;
    width: 100%;
}

._icon i {
    font-size: 23px;
}

.lrc {
    margin: 20px auto;
}

.lrc p {
    text-align: center;
}
</style>