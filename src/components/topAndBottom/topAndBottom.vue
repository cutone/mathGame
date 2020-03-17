<template>
  <div class="top-and-bottom-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/bottom_complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_1" class="stem-music" src="static/audio/topAndBottom/topAndBottom_1.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_2" class="stem-music" src="static/audio/topAndBottom/topAndBottom_2.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_3" class="stem-music" src="static/audio/topAndBottom/topAndBottom_3.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_4" class="stem-music" src="static/audio/topAndBottom/topAndBottom_4.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_5" class="stem-music" src="static/audio/topAndBottom/topAndBottom_5.wav">您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish"
      src="static/images/common/bottom_music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish"
      src="static/images/common/bottom_music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">

      <img 
        src="static/images/topAndBottom/minnie.png" 
        class="minnie-img" 
        @touchmove="touchMove('currentReference')" 
        @touchstart="down('currentReference')"
        @touchend="check('currentReference')" 
        id="currentReference"
        alt="" >

      <img 
        class="reference-item"
        :class="currentItem.reference"
        :src="'static/images/topAndBottom/' + currentItem.reference + '.png'" 
        alt="">

      <!-- <img class="reference-item reference-5" src="static/images/topAndBottom/reference-5.png" alt=""> -->

      <div class="correct-wrap" :class="currentItem.correct" id="correctWrap"></div>

    </div>
    <bottom-class-complete 
        v-if="isFinish" 
        :background="background" 
        :leftImg="leftImg" 
        :rightImg="rightImg"
        @goBack="goBack" 
        @initiate="initiate"
    >
    </bottom-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import bottomClassComplete from "@/common/bottomClassComplete";
import {getElementToPageLeft, getElementToPageTop} from '@/common/js/common'
export default {
  name: 'HelloWorld',
  data () {
    return {
      background: 'static/images/topAndBottom/background.jpg',
      leftImg: 'static/images/topAndBottom/minnie.png',
      rightImg: 'static/images/topAndBottom/minnie2.png',
      position: {x:0,y:0},
      currentIndex: 0,
      currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
        {
          reference: 'reference-1',
          correct: 'correct-1',
          isRight: false
        },
        {
          reference: 'reference-2',
          correct: 'correct-2',
          isRight: false
        },
        {
          reference: 'reference-3',
          correct: 'correct-3',
          isRight: false
        },
        {
          reference: 'reference-4',
          correct: 'correct-4',
          isRight: false
        },
        {
          reference: 'reference-5',
          correct: 'correct-5',
          isRight: false
        }
      ],
    }
  },
  components: {
    commonHeader,
    bottomClassComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let currentReference = document.getElementById("currentReference");
    let stemMusicList = document.getElementsByClassName("stem-music");
    for(let i = 0, len = stemMusicList.length; i < len; i++){
      eval("let "+ stemMusicList[i].id + "=document.getElementById('"+stemMusicList.id+"');");
      stemMusicList[i].addEventListener("ended", function() {
        _this.canDrag = true;
        _this.musicActive = false;
      });
    }
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    //播放第一个题目要求
    stem_music_1.addEventListener("canplaythrough", function() {
      stem_music_1.play();
    });
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
        //切换到下一题
        _this.currentItem = _this.gameList[_this.currentIndex];
        //重置被拖动元素的定位
        currentReference.style.right = 'auto'
        currentReference.style.top = 'auto'
        currentReference.style.left = '13%';
        currentReference.style.bottom = '13%';
        //播放下一题的音频
        _this.playAudio('stem_music_'+(_this.currentIndex+1));
        _this.musicActive = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true
    })
    _this.initiate();
  },
  methods: {
    //鼠标按下触发
    down(el){
        let moveDiv = document.getElementById(el);
        this.flags = true;
        var touch;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
    },
    //拖动事件
    touchMove(el){
      const _this = this;
      let moveDiv = document.getElementById(el);
      if(!_this.canDrag){
        return;
      }
      var touch ;
      if(event.touches){
          touch = event.touches[0];
      }else {
          touch = event;
      }
      //防止出屏
      if(touch.clientX < 15 || touch.clientX > window.innerWidth -15 || touch.clientY < 15 || touch.clientY > window.innerHeight-15){
        return;
      }
      this.nx = touch.clientX - this.position.x;
      this.ny = touch.clientY - this.position.y;
      this.xPum = this.dx+this.nx;
      this.yPum = this.dy+this.ny;
      moveDiv.style.left = this.xPum+"px";
      moveDiv.style.top = this.yPum +"px";
      //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
      document.addEventListener("touchmove",_this.preventDefault,{passive: false});
      document.addEventListener("touchend",function(){
          document.removeEventListener('touchmove',_this.preventDefault, false);
      },{passive: false});
    },
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
      _this.playAudio('stem_music_'+(_this.currentIndex+1));
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
      _this.canDrag = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        _this.gameList[i].isWrong = false;
      }
      _this.playAudio('stem_music_1')
    },
    check(){
      let _this = this;
      if(!_this.canDrag){
        return;
      }
      let touch;
      if(event.touches){
        touch = event.touches[0];
      }else {
        touch = event;
      }
      let mouseX = event.changedTouches[0].pageX
      let mouseY = event.changedTouches[0].pageY
      //获取元素
      let moveDiv = event.target;
      let correctWrap = document.getElementById('correctWrap');
      //正确区域的四边
      let correctWrapLeft = getElementToPageLeft(correctWrap);
      let correctWrapRight = correctWrapLeft + correctWrap.clientWidth;
      let correctWrapTop = getElementToPageTop(correctWrap);
      let correctWrapBottom = correctWrapTop + correctWrap.clientHeight;
      console.log(mouseX,mouseY)
      console.log('正确区域的四边',correctWrapLeft,correctWrapRight,correctWrapTop,correctWrapBottom )
      //左边线框检验
      if(mouseX > correctWrapLeft && mouseX < correctWrapRight && mouseY > correctWrapTop && mouseY < correctWrapBottom){
        _this.currentIndex++;
        _this.canDrag = false;
        _this.playAudio('right_music');
      }
      else {
        moveDiv.style.left = '13%';
        moveDiv.style.bottom = '13%';
        moveDiv.style.right = 'auto';
        moveDiv.style.top = 'auto';
        _this.canDrag = false;
        _this.playAudio('please_think');
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.top-and-bottom-container {
  height: 100%;
  .body{
    height: calc(100% - 30px);
    background: url('../../../static/images/topAndBottom/background.jpg') no-repeat;
    background-size: 100% 100%;
    background-position: center;
    .minnie-img {
      display: block;
      width: 12%;
      position: absolute;
      bottom: 13%;
      left: 13%;
      z-index: 3;
    }
    .reference-item {
      display: block;
      position: absolute;
      z-index: 1;
      &.reference-1 {
        width: 23%;
        bottom: 8%;
        left: 56%;
      }
      &.reference-2 {
        width: 40%;
        bottom: 14%;
        left: 51%;
        height: 72%;
      }
      &.reference-3 {
        width: 15%;
        bottom: 63%;
        left: 61%;
      }
      &.reference-4 {
        width: 44%;
        bottom: 11%;
        left: 47%;
      }
      &.reference-5 {
        width: 21%;
        bottom: 7%;
        left: 60%;
      }
    }
    .correct-wrap {
      // border: 1px solid red;
      display: block;
      width: 40%;
      height: 200px;
      position: absolute;
      left: 50%;
      z-index: 2;
      &.correct-1 {
        bottom: 28%;
        width: 21%;
        left: 58%;
      }
      &.correct-2 {
        bottom: 2%;
        width: 42%;
        height: 240px;
      }
      &.correct-3 {
        bottom: 8%;
        width: 24%;
        left: 57%;
      }
      &.correct-4 {
        bottom: 25%;
      }
      &.correct-5 {
        bottom: 28%;
        width: 26%;
        left: 57%;
      }
    }
  }
}
</style>
