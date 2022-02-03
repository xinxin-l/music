<template>
    <div class='s_box' v-loading='loading'>
        <div v-for='item in lists' :key='item.id' class='list_one' @click="toSong(item.id)">
            <img :src="item.coverImgUrl" alt="">
            <div class='tt'>{{item.name}}</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [],
            lists: [],
            loading:true
        }
    },
    methods: {
        toSong(Id) {
            this.$router.push({name:'each_list',params:{id:Id}})
        }
    },
    created() {
        this.$api.getList().then(result => {
            console.log(result)
            this.lists=result.list
        }).then(()=>{
            this.loading=false
        })
    }

}
</script>
<style scoped>
.s_box{
    display: flex;
    flex-flow: wrap;
    justify-content: center; 
}

.list_one {
    padding: 7px 8px 10px 8px;
    margin-bottom: 8px;
    display: inline-block;
    width: 30%;
    vertical-align: top;
}

.list_one:hover {
    background-color: #E7E7E7;
    border-radius: 5px;
}

.list_one img {
    width: 100%;
    display: block;
    margin: 0 auto;
}

.list_one img:hover {
    cursor: pointer;
}

.list_one>.tt {
    margin-top: 10px;
    font-size: 14px;
    text-align: center;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
</style>