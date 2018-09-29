import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/page/home'
import Anime from '@/page/anime'
import Game from '@/page/game'
import Me from '@/page/me'
import AnimeSearch from '@/page/animeSearch'
import AnimeDetail from '@/page/animeDetail'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Home',
        component: Home   //顶层路由，对应App.vue
    },{
        path: '/anime',
        name: 'Anime',
        component: Anime,
        meta: {
            keepAlive: true    //需要被缓存，返回这个页面时不刷新
        }
    },{
        path: '/game',
        name: 'Game',
        component: Game
    },{
        path: '/me',
        name: 'Me',
        component: Me
    },{
        path: '/anime/search',
        name: 'AnimeSearch',
        component: AnimeSearch
    },{
        path: '/anime/detail/:id',
        name: 'AnimeDetail',
        component: AnimeDetail
    }]
    
});

export default router
