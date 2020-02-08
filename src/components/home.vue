<template>
    <div class="home-container">
      <button class="homeBtn bottom-btn" @click="toOtherPage('/bottomClassMenu')">小班</button>
      <button class="homeBtn middle-btn" @click="toOtherPage('/middleClassMenu')">中班</button>
      <button class="homeBtn top-btn" @click="toOtherPage('/topClassMenu')">大班</button>  
    </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return {}
  },
  methods: {
    toOtherPage(path){
      this.$router.push(path);
    },
    sorry(){
      alert('敬请期待')
    }
  }
}
</script>
<style scoped lang='less'>
.home-container{
    display: flex;
    height: 100%;
    justify-content: center;
    .homeBtn{
      width: 100%;
      border: none;
    }
    .bottom-btn{
      background: red;
    }
    .middle-btn{
      background: green;
    }
    .top-btn{
      background: blue;
    }
}
</style>