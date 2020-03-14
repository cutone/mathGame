<template>
   <div class="complete-finish-wrapper" :style="{'background': background}">
      <img class="finish-img" :src="img" alt />
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
        type: String,
        default: '#9bcfd3'
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
.complete-finish-wrapper {
    height: 100%;
    display: flex;
    padding-bottom: 20px;
    flex-direction: column;
    justify-content: space-around;
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