<template>
  <div class="multi-angle-classification-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <!-- <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish"
      src="static/images/common/music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish"
      src="static/images/common/music_active.gif"
    /> -->
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
        <p class="title">多角度分类</p>
        <div class="left-target target" :id="currentItem.leftImg"><img :src="'static/images/multiAngleClassification/'+currentItem.leftImg+'.png'" alt=""></div>
        <div class="right-target target" :id="currentItem.rightImg"><img :src="'static/images/multiAngleClassification/'+currentItem.rightImg+'.png'" alt=""></div>
        <div class="choice-list-wrapper">
            <div v-for="(item, index) in currentItem.imgList" :key="index" class="choice-item-wrapper">
                <img 
                    class="choice-item"
                    @touchmove="touchMove(item.img)"
                    @touchstart="down(item.img)"
                    @touchend="check(item)" 
                    :src="'static/images/multiAngleClassification/'+item.img+'.png'" alt=""
                    :id="item.img">
            </div>
        </div>
    </div>
    <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </top-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
export default {
  name: 'multiAngleClassification',
  data () {
    return {
        position: {x:0, y:0},
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
          {
              rightNumber: 0,
              leftImg: 'food',
              rightImg: 'toy', 
              imgList: [
                {img:'apple',target:'food'},
                {img:'balloon',target:'toy'},
                {img:'banana',target:'food'},
                {img:'basketball',target:'toy'},
                {img:'car',target:'toy'},
                {img:'chick',target:'toy'},
                {img:'pear',target:'food'},
                {img:'candy',target:'food'},
              ]
          },{
              rightNumber: 0,
              leftImg: 'red',
              rightImg: 'yellow', 
              imgList: [
                {img:'apple',target:'red'},
                {img:'balloon',target:'red'},
                {img:'banana',target:'yellow'},
                {img:'basketball',target:'yellow'},
                {img:'car',target:'red'},
                {img:'chick',target:'yellow'},
                {img:'pear',target:'yellow'},
                {img:'candy',target:'red'},
              ]
          }
      ],
    }
  },
  components: {
    commonHeader,
    topClassComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let imgList = document.getElementsByClassName('choice-item');
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
          for(let i = 0; i < imgList.length; i++){
              imgList[i].style.display = 'block';
              imgList[i].style.left = 'auto';
              imgList[i].style.top = 'auto';
          }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.musicActive = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true
    })
    _this.initiate();
  },
  methods: {
    //播放mp3
    playAudio(id) {
      let audioBtn = document.getElementById(id);
      audioBtn.currentTime = 0;
      audioBtn.play();
    },
    //播放当前题目
    broadcast() {
      let _this = this;
      _this.musicActive = true;
      _this.canDrag = false;
      _this.playAudio('stem_music');
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //游戏初始化
    initiate() {
      let _this = this;
      _this.currentIndex = 0;
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.isFinish = false;
      _this.canDrag = true;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        _this.gameList[i].isWrong = false;
      }
    },
    check(item) {
      let _this = this;
      if (!_this.canDrag) {
        return;
      }
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      let mouseX = event.changedTouches[0].pageX;
      let mouseY = event.changedTouches[0].pageY;
      console.log(mouseX,mouseY)
      let moveDiv = event.target;
      let LightList = document.getElementsByClassName("target");
      for (let i = 0; i < LightList.length; i++) {
            let imgLeft = LightList[i].offsetLeft;
            let imgRight = imgLeft + LightList[i].clientWidth;
            let imgTop = LightList[i].offsetTop + 30;
            let imgBottom = imgTop + LightList[i].clientHeight;
            console.log(imgLeft, imgRight, imgTop, imgBottom);
            if (
              mouseX > imgLeft &&
              mouseX < imgRight &&
              mouseY > imgTop &&
              mouseY < imgBottom
            ) {
                console.log(item.target)
                console.log(LightList[i].id)
              if (item.target == LightList[i].id) {
                console.log("对了");
                moveDiv.style.display = 'none'
                _this.currentItem.rightNumber++;
                if(_this.currentItem.rightNumber == 8){
                    
                    _this.currentIndex++;
                    _this.playAudio("right_music");
                }
              } else {
                console.log("错了");
                moveDiv.style.top = '0px';
                moveDiv.style.left = '0px';
                _this.canDrag = false;
                _this.playAudio("please_think");
              }
            }
      }
    },
    //鼠标按下触发
    down(el) {
      let moveDiv = document.getElementById(el);
      this.flags = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
    },
    //拖动事件
    touchMove(el) {
      const _this = this;
      let moveDiv = document.getElementById(el);
      console.log(_this.canDrag);
      if (!_this.canDrag) {
        return;
      }
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      //防止出屏
      if (
        touch.clientX < 15 ||
        touch.clientX > window.innerWidth - 15 ||
        touch.clientY < 15 ||
        touch.clientY > window.innerHeight - 15
      ) {
        return;
      }
      this.nx = touch.clientX - this.position.x;
      this.ny = touch.clientY - this.position.y;
      this.xPum = this.dx + this.nx;
      this.yPum = this.dy + this.ny;
      moveDiv.style.left = this.xPum + "px";
      moveDiv.style.top = this.yPum + "px";
      //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
      document.addEventListener("touchmove", _this.preventDefault, {
        passive: false
      });
      document.addEventListener(
        "touchend",
        function() {
          document.removeEventListener(
            "touchmove",
            _this.preventDefault,
            false
          );
        },
        { passive: false }
      );
    },
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.multi-angle-classification-container{
  height: 100%;
  .body{
      background-image: url('../../../static/images/common/background.png');
      background-size: 100% 100%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
    .title{
        font-weight: bolder;
        margin: 0;
    }
    .left-target{
        width: 30vw;
        height: 25vw;
        display: inline-block;
        vertical-align: middle;
        img{
            height: 100%;
            width: 100%;
        }

    }
    .right-target{
        width: 30vw;
        height: 25vw;
        display: inline-block;
        vertical-align: middle;
        margin-left: 50px;
        img{
            height: 100%;
            width: 100%;
        }
    }
    .choice-list-wrapper{
        width: 80%;
        margin: 30px auto 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .choice-item-wrapper{
            position: relative;
            width: 6vw;
            margin: 0 10px;
            height: 5vw;
            .choice-item{
                position: absolute;
                width: 100%;
            }
        }
    }
  }
}
</style>
