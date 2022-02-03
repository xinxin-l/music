<template>
    <div class='total'>
        <div class='sear'>
            <i class="el-icon-search"></i>
            搜索：<input type="text" v-model.lazy='song_name' class='search' placeholder="请输入关键词">
        </div>
        <div class="result" v-show='song_name'>
            <search_result :list='lists' :song_name='song_name'></search_result>
        </div>
        <div class="another" v-show='!song_name' ref='s_box'>
            <search_list style='margin-top:30px' ref='search_ref'></search_list>
        </div>
    </div>
</template>
<script>
import search_list from '../../components/search_list.vue'
import search_result from '../../components/search_result.vue'
export default {
    name: 'search',
    components: { search_list, search_result },
    data() {
        return {
            song_name: '',
            lists: []
        }
    },
    watch: {
        song_name() {
            this.$api.search(this.song_name).then(res => {
                this.lists = res.result.songs
            })
        }
    },
    created(){
        this.$parent.keep_arr.push('search')
    },
    activated(){
        let num = this.$parent.keep_arr.indexOf('singerDetail')
        if (num !== -1) {
            this.$parent.keep_arr.splice(num, 1)
        }
    }
}
</script>
<style scoped>
.total {
    padding-bottom: 54px;
}

.sear {
    width: 100%;
    margin: 10px auto;
    margin-top: 20px;
    text-align: center;
    font-size: 14px;
}

.search {
    height: 32px;
    width: 60vw;
    border-radius: 15px;
}
</style>