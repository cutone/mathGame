<template>
    <div class="red-finish-wrapper">
        <img class="finish-img" src="static/images/common/success.gif" alt="">
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
<style lang="less" scoped>
.red-finish-wrapper{
        width: 100%;
        height: 100%;
        display: block;
        margin: 0 auto;
        background: #f09b88;
        .finish-img{
            display: block;
            width: 60%;
            margin: 0 auto;
        }
        .oprate-wrapper{
            margin-top: -5%;
            text-align: center;
            display: flex;
            justify-content: center;
            .complete-btn{
                display: inline-block;
                width: 80px;
                height: 40px;
                background: #fdf731;
                border-radius: 5px;
                line-height: 40px;
            }
            .restart-btn{
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
  