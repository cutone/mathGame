<template>
   <div class="finish-wrapper" :style="{'background-image': 'url('+background+')'}">
      <!-- <img class="finish-img" :src="img" alt /> -->
      <div class="oprate-wrapper">
        <span class="complete-btn" @click="goBack()">完成</span>
        <span class="restart-btn" @click="initiate()">重做</span>
      </div>
    </div> 
</template>
<script>
export default {
  name: 'complete',
  data(){
      return {

      }
  },
  props: {
      img: String,
      background: {
        type: String
      }
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
.finish-wrapper {
    background-size: 100% 100%;
    height: 100%;
    display: flex;
    padding-bottom: 20px;
    justify-content: center;
    padding: 20px 0;
    box-sizing: border-box;
    .finish-img {
      display: block;
      width: 30%;
      margin: 0 auto;
    }
    .oprate-wrapper {
      .complete-btn {
        display: inline-block;
        width: 80px;
        height: 40px;
        background: #fdf731;
        border-radius: 5px;
        line-height: 40px;
      }
      .restart-btn {
        display: inline-block;
        width: 80px;
        height: 40px;
        background: #47b1f0;
        border-radius: 5px;
        line-height: 40px;
        margin-left: 70px;
      }
    }
  }
</style>