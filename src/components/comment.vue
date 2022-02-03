<template>
    <div class="cont">
        <div class="left_img">
            <img :src="url" alt="">
        </div>
        <div class="right_comment">
            <div class="comm">
                <span class='comm_person'>{{name}}：</span>
                <span>{{text}}</span>
            </div>
            <div class="recomm" v-if='bereplied.length!=0'>
                <span class='comm_person'>{{bereplied[0].user.nickname}}：</span>
                <span>{{bereplied[0].content}}</span>
            </div>
            <div class="dat">{{timestr}}</div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['url', 'name', 'text', 'timestr', 'bereplied']
}
</script>
<style scoped>
.cont {
    display: flex;
    padding: 10px;
}

.left_img img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
}

.right_comment {
    display: flex;
    flex-direction: column;
    padding-bottom: 15px;
    border-bottom: 2px solid #f1f1f1;
}

span {
    font-size: 13px;
}

.comm {
    margin-bottom: 10px;
    margin-right: 10px;
}

.comm_person {
    color: rgb(114, 151, 190);
}

.recomm {
    background-color: rgb(230, 229, 230);
    min-width: 50vw;  
    padding: 8px;
    padding-right: 20px;
    border-radius: 4px;
    margin: 0 10px 6px 0;
}

.recomm span {
    font-size: 12.5px;
}

.dat {
    color: rgb(204, 204, 204);
    font-size: 12px;
}
</style>