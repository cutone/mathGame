<template>
  <div class="ring-counting-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music" src="static/audio/ringCounting/stem_music.mp3">您的浏览器不支持 audio 标签。</audio>
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
      <div class="left-container"></div>
      <div class="right-container">
        <div class="question-img-wrapper">
          <img class="question-img" :src="currentItem.img" alt="">
        </div>
        <div class="flex-wrapper">
          <div class="answer-item-wrapper" @click="check(answer)"  v-for="(answer, index) in currentItem.answerList" :key="index">
            <img class="answer-item" :src="'static/images/common/'+ answer + '.png'" alt="">
            <img v-if="currentItem.isRight && currentItem.answer == answer" class="right-img" src="static/images/common/right.png" alt=""> 
          </div>
        </div>
      </div>
      
    </div>
    <common-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </common-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import commonComplete from "@/common/commonComplete";
export default {
  name: 'HelloWorld',
  data () {
    return {
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canChoose: false,
      isFinish: false,
      gameList: [{
        isRight: false,
        img: 'static/images/ringCounting/flower_green.png',
        answer: 3,
        answerList: [2,3,4]
      },{
        isRight: false,
        img: 'static/images/ringCounting/flower_pink.png',
        answer: 7,
        answerList: [7,8,9]
      },{
        isRight: false,
        img: 'static/images/ringCounting/flower_blue.png',
        answer: 5,
        answerList: [5,6,7]
      },{
        isRight: false,
        img: 'static/images/ringCounting/flower_red.png',
        answer: 11,
        answerList: [9,10,11]
      },{
        isRight: false,
        img: 'static/images/ringCounting/flower_yellow.png',
        answer: 6,
        answerList: [5,6,7]
      }],
    }
  },
  components: {
    commonHeader,
    commonComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stem_music = document.getElementById("stem_music");
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    stem_music.addEventListener("canplaythrough", function() {
      stem_music.play();
    });
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.canChoose = true;
      }
    });
    stem_music.addEventListener("ended", function() {
      _this.canChoose = true;
      _this.musicActive = false;
    })
    please_think.addEventListener("ended", function() {
      _this.canChoose = true
    })
    _this.initiate();
  },
  methods: {
    check(item){
      let _this = this;
      if(!_this.canChoose){
        return;
      }
      _this.canChoose = false;
      if(item == _this.currentItem.answer){
        _this.currentItem.isRight = true;
        _this.currentIndex++;
        _this.playAudio('right_music')
      }else{
        _this.playAudio('please_think')
      }
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
      _this.canChoose = false;
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
	    _this.canChoose = false;
	    _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
      }
      _this.playAudio('stem_music');
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.ring-counting-container{
  height: 100%;
  .body{
    height: 100%;
    .left-container{
      width: 35%;
      height: 100%;
      background-image: url('../../../static/images/ringCounting/left_background.gif');
      background-size: 100% 100%;
      background-position-y: -30px;
      float: left;
    }
    .right-container{
      width: 65%;
      height: 100%;
      background-image: url('../../../static/images/ringCounting/right_background.png');
      background-size: 100% 100%;
      background-position-y: -30px;
      float: left;
      .question-img-wrapper{
        width: 50%;
        height: 60%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        overflow: hidden;
        .question-img{
          width: 80%;
          margin: 0 auto;
        }
      }
      .flex-wrapper{
        width: 80%;
        margin: 20px auto 0;
        .answer-item-wrapper{
          width: 70px;
          position: relative;
          .answer-item{
            width: 100%;
          }
          .right-img{
            width: 50px;
            left: 50%;
            bottom: 0;
            position: absolute;
            margin-left: -25px;
          }
        }
        
      }
    }
  }
}
</style>
