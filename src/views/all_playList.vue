<template>
    <div class='all'>
        <back></back>
        <i class="el-icon-s-unfold unfold" @click='unfold'></i>
        <div class="nav" @mouseout='fold(true)' @mouseover='fold(false)' ref='nav_ref'>
            <el-menu class="el-menu-vertical-demo" :collapse="true">
                <el-submenu v-for='(d,i) in category' :key='d.id' :index='i' tabindex='1'>
                    <template slot="title">
                        <i>{{d}}</i>
                    </template>
                    <el-menu-item v-for='it in sub_category[i]' :key='it.id' @click='toList' style='color:rgb(119, 117, 123);height:21px;font-size:12px;line-height: 21px;'>
                        {{it}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <div class='playlist' v-loading="loading">
            <playlist v-for='item in playlists' :key='item.id' :id='item.id' :name='item.name' :pic_url='item.coverImgUrl'></playlist>
        </div>
        <div class='page'>
            <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total" :current-page="page" :page-size="39">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import playlist from '../components/playList_one.vue'
export default {
    name: 'all_playList',
    components: { playlist },
    data() {
        return {
            category: [],
            sub_category: [
                [],
                [],
                [],
                [],
                []
            ],
            playlists: [],
            isCollapse: true,
            timer: '',
            all_box: 'all_box',
            now_category: '',
            page: 1,
            total: 0,
            loading:true
        }
    },
    methods: {
        fold(un) {
            if (!un && this.timer) {
                clearTimeout(this.timer)
                return
            }
            this.timer = setTimeout(() => {
                this.$refs.nav_ref.style = 'display:none'
            }, 1500)
        },
        unfold() {
            if (this.$refs.nav_ref.style.display === 'block') {
                this.$refs.nav_ref.style = 'display:none'
                return
            }
            setTimeout(() => {
                this.$refs.nav_ref.style = 'display:block'
            }, 100)
        },
        toList(d) {
            console.log(d.$slots.default[0].text)
            var t = d.$slots.default[0].text.trim()
            this.$api.getNewList(t, 39).then(res => {
                console.log(res)
                this.playlists = res.playlists
                this.now_category = t
                this.total = res.total
            })
        },
        handleCurrentChange(val) {
            this.page = val
            this.$api.getNewList(this.now_category, this.page * 39, 39).then(res => {
                this.playlists = res.playlists
            })
        }
    },
    created() {
        this.$api.getNewListCategory().then(res => {
            this.category = res.categories
            res.sub.forEach(item => {
                this.sub_category[item.category].push(item.name)
            })
            console.log(this.sub_category)
        })
        this.$api.getNewList('华语', 0, 39).then(res => {
            this.playlists = res.playlists
            this.now_category = '华语'
            this.total = res.total
        }).then(()=>{
            this.loading=false
        })
    },
    mounted() {
        this.$refs.nav_ref.style = 'display:none'
    },
    activated() {
        let num2 = this.$parent.keep_arr.indexOf('playList')
        if (num2 !== -1) {
            this.$parent.keep_arr.splice(num2, 1)
        }
    }
}
</script>
<style scoped>
.all {
    padding-bottom: 54px;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #D45E5C;
}

/deep/ .el-pagination.is-background .el-pager li:not(.disabled):hover{
    color: #D45E5C;
}

/deep/ .el-submenu__title:hover{
    background-color: #FFEAE9;
}

/deep/ .el-menu-item:focus, .el-menu-item:hover{
    background-color: #FFEAE9;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100px;
    height: 100%;
}

.el-menu {
    position: fixed;
}

.el-submenu__title i {
    color: #4E4D4D
}

.nav {
    position: fixed;
    top: 70px;
    width: 90px;
    height: 320px;
    padding: 20px 0;
}

.all_box {
    margin-top: 20px;
}

.page {
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
}

/deep/ .active {
    border-bottom: 0;
}

/deep/ .dir i {
    position: absolute;
    left: 50px;
}
</style>