<template>
  <div id="app">
    <!-- <div class="quit-btn" @click="quitApp()">退出</div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    quitApp(){
      this.$vux.confirm.show({
        title: '提示',
        content: '确定退出程序？',
        // 组件除show外的属性
        onCancel () {
        },
        onConfirm () {
          AgreeSDK.app.quitApp(true);
        }
      })
    }
  }
}
</script>

<style lang="less">
html,body{
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.quit-btn{
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  margin-right: 10px;
  width: 75px;
  height: 30px;
  background: green;
  color: #fff;
  text-align: center;
  line-height: 30px;
  border: none;
}
</style>
