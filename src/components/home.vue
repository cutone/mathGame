<template>
    <div class="home-container">
      <div class="class-wrapper">
        <img class="class-img" src="static/images/home/bottom_class.png" alt="">
        <img @click="toOtherPage('/bottomClassMenu')" class="class-img-btn" src="static/images/home/bottom_class_btn.png" alt="">
      </div>
      <div class="class-wrapper">
        <img class="class-img" src="static/images/home/middle_class.png" alt="">
        <img @click="toOtherPage('/middleClassMenu')" class="class-img-btn" src="static/images/home/middle_class_btn.png" alt="">
      </div>
      <div class="class-wrapper" >
        <img class="class-img" src="static/images/home/top_class.png" alt="">
        <img @click="toOtherPage('/topClassMenu')" class="class-img-btn" src="static/images/home/top_class_btn.png" alt="">
      </div> 
      <div class="low-font-wrapper">
        <p class="low-font-left">策划：陈淑文、林丽芳、张晓钰、孔宾、陈宝育、陈坊钦、林帆</p>
        <p class="low-font-right">顾问：黄海霞、王欢</p>
      </div>
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
    }
  }
}
</script>
<style scoped lang='less'>
.home-container{
    display: flex;
    height: 100%;
    background-image: url('../../static/images/home/background.png');
    background-size: 100% 100%;
    justify-content: center;
    .class-wrapper{
      display: flex;
      width: 33%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .class-img{
        height: 60vh;
      }
      .class-img-btn{
        width: 50%;
      }
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
    .low-font-wrapper{
      width: 100%;
      position: absolute;
      bottom: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: "child_font";
      padding: 0 5vw;
      box-sizing: border-box;
      left: 0;
      p{
        margin: 0;
      }
    }
}
</style>