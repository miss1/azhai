<template>
    <div class="home_content">
        <div class="bg"></div>
        <div class="content">
            <ul>
                <router-link tag="li" to="anime"><img src="../assets/logo_anime.png"><p>动漫资讯</p></router-link>
                <router-link tag="li" to="game"><img src="../assets/logo_game.png"><p>游戏资讯</p></router-link>
                <router-link tag="li" to="#"><img src="../assets/logo_other.png"><p>待定</p></router-link>
                <router-link tag="li" to="me"><img src="../assets/logo_me.png"><p>阿宅啊</p></router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
        beforeRouteLeave(to, from, next) {
            if (to.path === '/anime'){
                to.meta.keepAlive = false;   //若是跳到列表页，设置刷新该页面
            }
            next();
        }
    }
</script>

<style scoped>
    .bg{
        position:fixed;
        top: 0;
        left: 0;
        width:100%;
        height:100%;
        z-index:-10;
        zoom: 1;
        background: url("../assets/home_bg.png") no-repeat;
        background-size: 100% 100%;
        -webkit-background-size: 100% 100%;
        -o-background-size: 100% 100%;
    }

    .content{
        width: 5.9rem;
        height: 5.9rem;
        margin-top: 3.3rem;
        margin-left: 0.8rem;
        background: #FFE4E1;
        border-radius: 10px;
    }

    .content ul{
        width: 100%;
        height: 100%;
    }

    .content ul li{
        float: left;
        width: 2.9rem;
        height: 2.9rem;
        border: 1px solid #20a0ff;
        border-radius: 10px;
        text-align: center;
    }

    .content img{
        width: 2rem;
        height: 2rem;
    }

    .content p{
        font-size: 0.32rem;
        color: #7f7f7f;
    }

</style>
