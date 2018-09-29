<template>
    <div class="anime_content">
        <x-header>动漫资讯<router-link slot="right" to="/anime/search"><icon name="search" :scale="2"></icon></router-link></x-header>
        <div class="list" id="list">
            <ul>
                <router-link :to="'/anime/detail/'+ item.href" tag="li" v-for="item in animeList" :key="item.href">
                    <p class="title">{{ item.title }}</p>
                    <div class="cons">
                        <x-img :src="item.imgurl" default-src="../static/img_err.png" container="#list"></x-img>
                        <div class="describe">
                            <p class="txt">{{ item.txt }}</p>
                            <p class="time">{{ item.time }}</p>
                        </div>
                    </div>
                </router-link>
            </ul>
        </div>
        <div class="footer">
            <div class="foot_content">
                <span @click="jumppage(true)">上一页</span>
                <span>{{ currentPage }}/{{ maxPage }}</span>
                <span @click="jumppage(false)">下一页</span>
            </div>
        </div>
    </div>
</template>

<script>

    import { XImg } from 'vux'

    export default{
        data(){
            return{
                animeList: [],
                maxPage: 1,
                currentPage: 1
            }
        },
        components:{
            XImg
        },
        created(){
            this.getAnimeList(1, 10);
        },
        updated:function () {
            console.log('update');
            //每次跳页个更新完数据后，滚动条跳到顶部
            var div = document.getElementById('list');
            div.scrollTop = 0;
        },
        methods:{
            //获取资讯列表
            getAnimeList: function (page, count) {
                var _this = this;
                var params = {
                    pageNo: page,
                    pageSize: count
                };
                _this.$axios.fetch('/anime/list', params).then(function (res) {
                    console.log(res);
                    _this.animeList = res.result.list;
                    _this.maxPage = res.result.pageCount;
                    _this.currentPage = page;
                },function (err) {
                    console.log('err:'+err);
                });
            },

            //翻页
            jumppage: function (tab) {
                var page = this.currentPage;
                if (tab){
                    //上一页
                    if(page == 1){
                        alert('当前已是第一页');
                    }else {
                        page = page - 1;
                        this.getAnimeList(page, 10);
                    }
                }else {
                    //下一页
                    page = page + 1;
                    if (page > this.maxPage){
                        alert('当前已是最后一页');
                    }else {
                        this.getAnimeList(page, 10);
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .list{
        position: absolute;
        top: 46px;
        bottom: 40px;
        overflow: auto;
    }

    .list li{
        margin-top: 0.2rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #E3E3E3;
    }

    .list .title{
        font-size: 0.32rem;
    }

    .cons{
        margin-top: 0.1rem;
    }

    .cons img{
        width: 3.2rem;
        float: left;
        margin-right: 0.1rem;
    }

    .cons .describe{
        margin-right: 0.1rem;
    }

    .describe p{
        font-size: 0.26rem;
    }

    .describe .txt{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        line-height: 0.4rem;
        margin-bottom: 0.28rem;
    }

    .footer{
        width: 100%;
        height: 40px;
        background: #FAF8FD;
        text-align: center;
        position: absolute;
        bottom: 0;
    }

    .foot_content span{
        height: 40px;
        line-height: 40px;
        font-size: 0.28rem;
    }
</style>