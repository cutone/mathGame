<template>
    <div class="finish-wrapper">
        <img class="finish-img" src="static/images/common/top_success.gif" alt="">
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
.finish-wrapper{
        width: 100%;
        height: 100%;
        display: block;
        margin: 0 auto;
        background-image: url('../../static/images/common/top_complete_bg.png');
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .finish-img{
            display: block;
            width: 30%;
            margin: 0 auto 30px;
        }
        .oprate-wrapper{
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
                background: red;
                border-radius: 5px;
                line-height: 40px;
                margin-left: 70px;
            }
        }
    }
</style>
  