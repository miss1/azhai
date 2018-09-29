<template>
  <div id="app">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
              <!-- 这里是会被缓存的视图组件，比如 anime！ -->
          </router-view>
      </keep-alive>

      <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 home！ -->
      </router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
    html,body{
        min-height: 100%;
        width: 100%;
        margin:0;
        padding:0;
    }

    ul,li{
        margin: 0;
        padding: 0;
        list-style: none;
    }

    p{
        margin: 0;
        padding: 0;
    }

    a{
        text-decoration: none;
    }
</style>
