<template>
    <div class="detail_content">
        <x-header>动漫资讯<icon slot="right" :name="favorite" :scale="2"></icon></x-header>
        <div class="detail_txt">
            <div class="txt_head">
                <p>{{ title }}</p>
                <p>{{ time }}</p>
                <p>{{ source }}</p>
            </div>
            <div class="txt_content">
                <p v-for="item in txts">
                    <template v-if="item == '#p'">
                        <img class="txtImages" :src="getImgUrl()">
                    </template>
                    <template v-else-if="item == '#v'">
                        <iframe v-if="getVideo(false) != 'undefined'" class="txtVideos" :src="getVideo(true)">
                            当前浏览器不支持iframe
                        </iframe>
                        <img  v-else class="txtImages" src="../assets/img_err.png" >
                    </template>
                    <template v-else>
                        {{ item }}
                    </template>
                </p>
            </div>
        </div>
    </div>
</template>

<script>

    var img_index = 0, videos_index = 0;

    export default{
        beforeRouteLeave(to, from, next) {
            if (to.path === '/anime'){
                to.meta.keepAlive = true;   //如果是返回到列表页，则设置列表页不刷新
            }
            next();
        },
        data(){
            return{
                //favorite: 'favorites-filling'
                favorite: 'favorite',
                title: '',
                time: '',
                source: '',
                txts: [],
                images: [],
                videos: []
            }
        },
        created(){
            this.getAnimeDetail();
        },
        methods:{
            //获取详情
            getAnimeDetail: function () {
                var _this = this;
                var params = {
                    urlId: this.$route.params.id
                };
                _this.$axios.fetch('/anime/detail', params).then(function (res) {
                    console.log(res);
                    _this.dealData(res.result[0])
                },function (err) {
                    console.log('err:'+err);
                });
            },

            //返回的数据中，内容为txts，每一段文字、图片、视频用‘/’隔开，#p代表此处有一张图片，#v代表此处有一个视频
            dealData: function (data) {
                console.log(data);
                this.title = data.title;
                this.time = data.time;
                this.source = data.source;
                this.txts = data.txt.split('/');
                this.images = data.images.split(',');
                this.videos = data.videos.split(',');
                img_index = 0;
                videos_index = 0;
            },

            //从图片数组中获取对应位置的图片
            getImgUrl: function () {
                var url = this.images[img_index];
                console.log(url);
                img_index++;
                return url;
            },

            //从视频数组中获取对应位置的视频
            getVideo: function (tab) {
                var url = this.videos[videos_index];
                console.log(url);
                if (tab){
                    videos_index++;
                }
                return url;
            }
        }
    }
</script>

<style scoped>
    .detail_txt{
        position: absolute;
        top: 46px;
        bottom: 0;
        overflow: auto;
    }

    .txt_head p{
        width: 6rem;
        text-align: center;
        margin: 0 auto;
    }

    .txt_head p:nth-child(1){
        font-size: 0.36rem;
        margin-top: 0.2rem;
    }

    .txt_head p:nth-child(2){
        font-size: 0.28rem;
        color: #7f7f7f;
        margin-top: 0.2rem;
    }

    .txt_head p:nth-child(3){
        font-size: 0.28rem;
        color: #7f7f7f;
    }

    .txt_content p{
        font-size: 0.28rem;
        margin-top: 0.1rem;
        margin-left: 0.2rem;
        margin-right: 0.2rem;
    }

    .txtVideos,.txtImages{
        width: 6.5rem;
        margin-left: 0.3rem;
    }
</style>
