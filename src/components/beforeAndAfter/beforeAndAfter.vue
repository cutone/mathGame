<template>
  <div class="before-and-after-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/bottom_complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_1" class="stem-music" src="static/audio/beforeAndAfter/beforeAndAfter_1.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_2" class="stem-music" src="static/audio/beforeAndAfter/beforeAndAfter_2.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_3" class="stem-music" src="static/audio/beforeAndAfter/beforeAndAfter_3.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_4" class="stem-music" src="static/audio/beforeAndAfter/beforeAndAfter_4.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_5" class="stem-music" src="static/audio/beforeAndAfter/beforeAndAfter_5.wav">您的浏览器不支持 audio 标签。</audio>
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

      <img src="static/images/beforeAndAfter/mushroom.png" alt="" class="mushroom-img">

      <img 
        class="animal-item"
        @touchmove="touchMove('currentAnimal')" 
        @touchstart="down('currentAnimal')"
        @touchend="check('currentAnimal')" 
        id="currentAnimal"
        :src="'static/images/beforeAndAfter/' + currentItem.animal+ '.png'" 
        alt="">

      <div class="redline-wrap">
        <img class="redline" id="left_redline" src='static/images/beforeAndAfter/redline.png' alt="">
        <img class="minnie-img" src='static/images/beforeAndAfter/minnie-1.png' alt="">
        <img class="redline" id="right_redline" src='static/images/beforeAndAfter/redline.png' alt="">
      </div>

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
      background: 'static/images/beforeAndAfter/background.jpg',
      leftImg: 'static/images/beforeAndAfter/minnie-2.png',
      rightImg: 'static/images/beforeAndAfter/minnie-1.png',
      position: {x:0,y:0},
      currentIndex: 0,
      currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
        {
          animal: 'animal-1',
          isRight: false,
          direction: 'left'
        },
        {
          animal: 'animal-2',
          isRight: false,
          direction: 'right'
        },
        {
          animal: 'animal-3',
          isRight: false,
          direction: 'right'
        },
        {
          animal: 'animal-4',
          isRight: false,
          direction: 'left'
        },
        {
          animal: 'animal-5',
          isRight: false,
          direction: 'right'
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
    let currentAnimal = document.getElementById("currentAnimal");
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
        let currentAnimal = document.getElementById("currentAnimal");
        //重置被拖动元素的定位
        currentAnimal.style.right = 'auto'
        currentAnimal.style.bottom = 'auto'
        currentAnimal.style.left = '79%';
        currentAnimal.style.top = '62%';
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
      //获取三个div的元素
      let moveDiv = event.target;
      let leftPlateDiv = document.getElementById('left_redline');
      let rightPlateDiv = document.getElementById('right_redline');
      //左线框的四边
      let leftPlateDivLeft = getElementToPageLeft(leftPlateDiv);
      let leftPlateDivRight = leftPlateDivLeft + leftPlateDiv.clientWidth;
      let leftPlateDivTop = getElementToPageTop(leftPlateDiv);
      let leftPlateDivBottom = leftPlateDivTop + leftPlateDiv.clientHeight;
      //右线框的四边
      let rightPlateDivLeft = getElementToPageLeft(rightPlateDiv);
      let rightPlateDivRight = rightPlateDivLeft + rightPlateDiv.clientWidth;
      let rightPlateDivTop = getElementToPageTop(rightPlateDiv);
      let rightPlateDivBottom = rightPlateDivTop + rightPlateDiv.clientHeight;
      console.log(mouseX,mouseY)
      console.log('左线框',leftPlateDivLeft,leftPlateDivRight,leftPlateDivTop,leftPlateDivBottom )
      console.log('右线框',rightPlateDivLeft,rightPlateDivRight,rightPlateDivTop,rightPlateDivBottom )
      //左边线框检验
      if(mouseX > leftPlateDivLeft && mouseX < leftPlateDivRight && mouseY > leftPlateDivTop && mouseY < leftPlateDivBottom){
          _this.canDrag = false;
          if(_this.currentItem.direction == 'left'){
            _this.currentIndex++
            _this.playAudio('right_music')
          }else{
            console.log(222);
            moveDiv.style.left = '79%';
            moveDiv.style.top = '62%';
            _this.playAudio('please_think')
          }
      }
      //右边线框检验
      else if(mouseX > rightPlateDivLeft && mouseX < rightPlateDivRight && mouseY > rightPlateDivTop && mouseY < rightPlateDivBottom){
          _this.canDrag = false;
          if(_this.currentItem.direction == 'right'){
            _this.currentIndex++;
            _this.playAudio('right_music')
          }else{
            moveDiv.style.left = '79%';
            moveDiv.style.top = '62%';
            _this.playAudio('please_think');
          }
      }
      else {
        moveDiv.style.left = '79%';
        moveDiv.style.top = '62%';
        _this.canDrag = false;
        _this.playAudio('please_think');
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.before-and-after-container {
  height: 100%;
  .body{
    height: 100%;
    background-image: url('../../../static/images/beforeAndAfter/background.jpg');
    background-size: 100% 100%;
    .mushroom-img {
      display: block;
      width: 28%;
      position: absolute;
      height: 65%;
      bottom: 7%;
      right: 0;
      z-index: 1;
    }
    .redline-wrap {
      display: block;
      width: 60%;
      position: absolute;
      bottom: 7%;
      left: 2%;
      z-index: 1;
      font-size: 0;
      img {
        display: inline-block;
        vertical-align: bottom;
      }
      .redline {
        width: 30%;
      }
      .minnie-img {
        width: 34%;
      }
    }
    .animal-item {
      display: block;
      width: 14.5%;
      position: absolute;
      top: 62%;
      left: 79%;
      z-index: 2;
    }
  }
}
</style>
