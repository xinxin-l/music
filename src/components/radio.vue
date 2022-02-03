<template>
    <div class='tt'>
        <img :src="pic_url" alt="">
        <div class='cont'>
            <p style='font-size: 15px'>【{{category}}】{{content}}</p>
            <p style='font-size: 14px;margin: 8px 0 0 10px'>{{name}}</p>
        </div>
    </div>
</template>
<script>
export default {
    props: ['category', 'id', 'name', 'content', 'pic_url', 'playCount']
}
</script>
<style scoped>
.tt {
    margin-left: 25px;
    margin-bottom: 13px;
    width: 94vw;
}

img {
    width: 100px;
    height: 100px;
    display: inline-block;
    vertical-align: middle;
}

.cont {
    display: inline-block;
    vertical-align: middle;
    margin:0 10px;
    width: 60vw;
}
</style>