<template>
    <!-- 视图渲染 -->
    <div>
<!--         <div class="container">
            <div class="top">
                <h3>热门新歌</h3>
                <a href="#/all_song">更多</a>
            </div>
            <slot></slot>
        </div> -->
        <div class="container">
            <div class="top">
                <h3>热门歌单</h3>
                <a href="#/all_playList">更多</a>
            </div>
            <slot name='hot'></slot>
        </div>
        <div class="container">
            <div class="top">
                <h3>热门MV</h3>
                <a href="#/all_mv">更多</a>
            </div>
            <slot name='mv'></slot>
        </div>
        <div class="container">
            <div class="top">
                <h3>热门歌手</h3>
                <a href="#/all_singer">更多</a>
            </div>
            <slot name='singer'></slot>
        </div>
        <div class="play"></div>
    </div>
</template>
<script>
export default {}
</script>
<style scoped>
.top {
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin: 10px 20px 0 20px;
    line-height: 50px;
}

.play {
    height: 54px;
    width: 100%;
}
</style>