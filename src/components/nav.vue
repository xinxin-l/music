<template>
    <div>
        <ul class='top-nav'>
            <li>
                <router-link to='/home' class='a'>List</router-link>
            </li>
            <li>
                <router-link to='/today' class='a'>Today</router-link>
            </li>
            <li>
                <router-link to='/search' class='a'>Search</router-link>
            </li>
        </ul>
    </div>
</template>
<style scoped>
.top-nav {
    display: flex;
    background-color: rgb(249, 249, 249);
}

li {
    flex: 1;
    text-align: center;
    padding-top: 10px;
}

.a {
    display: block;
    padding-bottom: 8px;
    text-decoration: none;
}
</style>