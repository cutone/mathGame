<template>
  <div class="sequence-five-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music" class="stem-music" src="static/audio/sequenceFive2/stem_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish"
      src="static/images/common/music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish"
      src="static/images/common/music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
        <div class="animal-img-wrapper">
            <img class="animal-img"
                :class="showHow?'show-how':''"
                @touchmove="touchMove(currentItem.animal)"
                @touchstart="down(currentItem.animal)"
                @touchend="check()"  
                :id="currentItem.animal"
                ref="animal"
                :src="'static/images/sequenceFive2/'+currentItem.animal" alt="">
        </div>
        <img class="sian-img" :src="'static/images/sequenceFive2/'+currentItem.sign" alt="">
        <div class="arrow-wrapper" :class="isStart?'hide':''">
            <img class="top-arrow arrow-img" src="static/images/sequenceFive2/arrow_right.jpg" alt="">
            <img class="right-arrow arrow-img" src="static/images/sequenceFive2/arrow_right.jpg" alt="">
        </div>
        <div class="number-wrapper" :class="isStart?'hide':''">
            <img class="number-img" src="static/images/sequenceFive2/3.png" alt="">
            <img class="number-img number-2" src="static/images/sequenceFive2/2.png" alt="">
            <img class="number-img" src="static/images/sequenceFive2/1.png" alt="">
        </div>
        <div class="house-wrapper">
            <div class="row-number-wrapper" :class="isStart?'hide':''">
                <img class="number-img" src="static/images/sequenceFive2/1.png" alt="">
                <img class="number-img number-2" src="static/images/sequenceFive2/2.png" alt="">
            </div>
            <div class="window-wrapper">
                <img class="window-img" id="window_1" src="static/images/sequenceFive2/window.png" alt="">
                <img class="window-img" id="window_2" src="static/images/sequenceFive2/window.png" alt="">
                <img class="window-img" id="window_3" src="static/images/sequenceFive2/window.png" alt="">
            </div>
            <div class="window-wrapper middle-window-wrapper">
                <img class="window-img" id="window_4" src="static/images/sequenceFive2/window.png" alt="">
                <img class="window-img" id="window_5" src="static/images/sequenceFive2/window.png" alt="">
                <img class="window-img" id="window_6" src="static/images/sequenceFive2/window.png" alt="">
            </div>
            <div class="window-wrapper bottom-window-wrapper">
                <img class="window-img" id="window_7" src="static/images/sequenceFive2/window.png" alt="">
                <img class="window-img" id="window_8" src="static/images/sequenceFive2/window.png" alt="">
            </div>
        </div>
        
    </div>
    <red-complete v-if="isFinish" @goBack="goBack" @initiate="restart">
    </red-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import redComplete from "@/common/redComplete";
import { getElementToPageTop ,getElementToPageLeft} from '@/common/js/common'
export default {
  name: 'sequenceFive',
  data () {
    return {
        position: {x:0,y:0},
        isStart: false,
        showHow: false,
    currentIndex: 0,
    currentItem: {
        animal: 'dog.jpg',
        sign: 'sign_1.png'
    },
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
          {
              animal: 'snail.jpg',
              sign: 'sign_2.png',
              target: 'window_6'
          },
          {
              animal: 'cat.gif',
              sign: 'sign_3.png',
              target: 'window_5'
          },
          {
              animal: 'elephant.gif',
              sign: 'sign_4.png',
              target: 'window_1'
          },
          {
              animal: 'pig.gif',
              sign: 'sign_5.png',
              target: 'window_4'
          },
          {
              animal: 'yellow_person.png',
              sign: 'sign_6.png',
              target: 'window_8'
          }
      ],
    }
  },
  components: {
    commonHeader,
    redComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stemMusicList = document.getElementsByClassName("stem-music");
    let window_2 = document.getElementById("window_2");
    let animalImg = document.getElementById(_this.currentItem.animal);
    let windowLeft = window_2.offsetLeft;
    let windowTop = window_2.offsetTop;
    for(let i = 0, len = stemMusicList.length; i < len; i++){
      eval("let "+ stemMusicList[i].id + "=document.getElementById('"+stemMusicList.id+"');");
      stemMusicList[i].addEventListener("ended", function() {

        _this.canDrag = true;
        _this.musicActive = false;
        _this.currentItem = _this.gameList[_this.currentIndex];
      });
    }
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });

    stem_music.addEventListener("canplaythrough", function() {
      stem_music.play();      
      _this.showHow = true;
      let animalImg = document.getElementById(_this.currentItem.animal);
       setTimeout(()=>{
            animalImg.style.left = (window_2.offsetLeft) - (animalImg.offsetParent.offsetLeft) + 'px';
           animalImg.style.top = (window_2.offsetTop) - (animalImg.offsetParent.offsetTop) + 'px';
       },5000)
    });
    stem_music.addEventListener("ended", function() {
        _this.isStart = true;
        _this.showHow = false;
        animalImg.style.top = '0px';
        animalImg.style.left = '0px';
    })
    right_music.addEventListener("ended", function() {
        let animalImg = document.getElementById(_this.currentItem.animal);
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
          console.log('下一题')
          console.log(animalImg)
          
          console.log(animalImg)
           _this.currentItem = _this.gameList[_this.currentIndex];
              animalImg.style.left = '0px';
            animalImg.style.top = '0px';
            console.log(_this.$refs)
        _this.$forceUpdate()
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
      _this.isFinish = false;
      _this.canDrag = false;
      _this.isStart=false;
      _this.showHow = true;
      _this.musicActive = true;
      _this.currentItem  = {
        animal: 'dog.jpg',
        sign: 'sign_1.png'
        }
    },
    //重新开始
    restart(){
        let _this = this;
        _this.currentIndex = 0;
        _this.isFinish = false;
        _this.canDrag = true;
        _this.isStart=true;
        _this.showHow = false;
        _this.musicActive = true;
        _this.currentItem  = _this.gameList[_this.currentIndex];
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
      let LightList = document.getElementsByClassName("window-img");
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
              if (_this.currentItem.target == LightList[i].id) {
                console.log("对了");
                _this.currentIndex++;
                _this.canDrag = false;
                _this.playAudio("right_music");
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
@keyframes move {
  0% {
    left: auto;
    bottom: auto;
  }
  100%{
    left: 100px;
    bottom: 180.98px;
  }
}
.sequence-five-container{
  height: 100%;
  .hide{
      visibility: hidden;
  }
  .body{
      position: relative;
      background-image: url('../../../static/images/common/background.png');
      background-size: 100% 100%;
        height: 100%;
        padding-bottom: 30px;
        box-sizing: border-box;
        .animal-img-wrapper{
            position: relative;
            display: inline-block;
            width: 7%;
            height: 15vh;
            vertical-align: bottom;
            .animal-img{
                position: absolute;
                left: 0px;
                top: 0px;
                width: 100%; 
                height: 100%;               
            }
            .show-how{
                // animation-fill-mode: forwards;
                // transition: move 5s linear;
                transition: all 7s linear;
            }
        }
    
    .sian-img{
        width: 10%;
        vertical-align: bottom;
        display: inline-block;
        margin-left: 10px;
    }
    .arrow-wrapper{
        width: 10%;
        display: inline-block;
        vertical-align: middle;
        margin-left: 20%;
        .arrow-img{
            display: block;
            width: 100%;
        }
        .right-arrow{
            display: block;
            transform: rotate(-90deg);
            margin: 25vh 0 7vh;
        }
    }
    .number-wrapper{
        display: inline-block;
        vertical-align: bottom;
        width: 5%;
        padding-bottom: 3vh;
        .number-img{
            width: 100%;
        }
        .number-2{
            margin: 10vh 0;
        }
    }
    .row-number-wrapper{
        display: flex;
        padding: 0 10%;
        .number-img{
            width: 25%;
        }
        .number-2{
            margin-left: 15%;
        }
    }
    .house-wrapper{
        display: inline-block;
        width: 35%;
        height: 100%;
        background-image: url('../../../static/images/sequenceFive2/house.png');
        background-size: 100% 100%;
        padding: 5% 4% 0;
        box-sizing: border-box;
        vertical-align: bottom;
        .window-wrapper{
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .middle-window-wrapper{
            margin-top: 12%;
        }
        .bottom-window-wrapper{
            margin-top: 20%;
            justify-content: space-between;
            padding: 0 6%;
            img{
                width: 24%;
            }
        }
        .window-img{
            width: 20%;
            height: 15vh;
        }
    }
  }
}
</style>
