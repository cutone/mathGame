<template>
   <div class="bottom-class-finish-wrapper" :style="{'background-image': 'url('+background+')'}">
      <img class="left-img" :src="leftImg"/>
      <div class="oprate-wrapper">
        <span class="complete-btn" @click="goBack()">完成</span>
        <span class="restart-btn" @click="initiate()">重做</span>
      </div>
      <img class="right-img" :src="rightImg" alt="">
    </div> 
</template>
<script>
export default {
  name: 'complete',
  data(){
      return {

      }
  },
  props:{
      background: String,
      leftImg: String,
      rightImg: String
  },
  methods: {
      goBack(){
          this.$emit('goBack')
      },
      initiate(){
          this.$emit('initiate')
      }
  }
}
</script>
<style lang="less">
.bottom-class-finish-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 20px;
    background-size: 100% 100%;

    .left-img {
      display: inline-block;
      width: 20%;
    }
    .right-img{
        display: inline-block;
        width: 20%;
    }
    .oprate-wrapper {
        display: inline-block;
      .complete-btn {
        display: block;
        width: 80px;
        height: 40px;
        background: #fdf731;
        border-radius: 5px;
        line-height: 40px;
      }
      .restart-btn {
        display: block;
        width: 80px;
        height: 40px;
        background: #47b1f0;
        border-radius: 5px;
        line-height: 40px;
        margin-top: 30px;
      }
    }
}
</style>