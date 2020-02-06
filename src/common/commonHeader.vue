<template>
      <div class="header">
            <img @click="goBack()" class="back-btn" src="static/images/trapezoid/back.png" alt="">
            <div class="grograss-wrapper">
                <img class="yellow-grograss" v-show="index1 < currentIndex" v-for="(item, index1) in gameList" src="static/images/trapezoid/grograss_yellow.png">
                <img class="grograss" v-show="currentIndex < index2 + 1" v-for="(item, index2) in gameList" src="static/images/trapezoid/prograss.png" >
            </div>
        </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
        currentIndex: Number,
        gameList: Array
    },
  data () {
    return {
      
    }
  },
  methods: {
      goBack(){
          this.$router.go(-1)
      }
  }
}
</script>

<style scoped lang='less'>
@headerHeight: 30px;
.header{
        display: block;
        width: 100%;
        height: @headerHeight;
        background: #69473d;
        text-align: left;
        .back-btn{
            display: inline-block;
            width: 30px;
            height: 30px;
            vertical-align: middle;
            border-right: 5px solid #7d5445;
            padding: 0 10px;
        }
        .grograss-wrapper{
            display: inline-block;
            vertical-align: middle;
            height: 20px;
            padding-left: 10px;
            font-size:0;
            .grograss{
                height: 20px;
                margin-right: 5px;
            }
            .yellow-grograss{
                height: 20px;
                margin-right: 5px;
            }
        }
    }
</style>
