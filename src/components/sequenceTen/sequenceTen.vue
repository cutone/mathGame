<template>
  <div class="sequence-ten-container">
    <audio id="bg_music" loop="loop" src="static/audio/trapezoid/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete_music" src="static/audio/sequenceTen/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/trapezoid/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem" src="static/audio/sequenceTen/stem.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="likeThis" src="static/audio/sequenceTen/likeThis.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number1" src="static/audio/sequenceTen/1.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number2" src="static/audio/sequenceTen/2.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number3" src="static/audio/sequenceTen/3.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number4" src="static/audio/sequenceTen/4.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number5" src="static/audio/sequenceTen/5.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number6" src="static/audio/sequenceTen/6.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number7" src="static/audio/sequenceTen/7.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number8" src="static/audio/sequenceTen/8.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number9" src="static/audio/sequenceTen/9.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="number-audio" id="number10" src="static/audio/sequenceTen/10.mp3">您的浏览器不支持 audio 标签。</audio>
    <img
      id="music-img"
      class="music-img"
      @click="broadcast()"
      @touchmove="touchMove('music-img')" 
      @touchstart="down('music-img')"
      v-if="!musicActive && !isFinish"
      src="static/images/trapezoid/music.png"
    />
    <img
      id="music-active-img"
      class="music-img"
      @touchmove="touchMove('music-active-img')" 
      @touchstart="down('music-active-img')"
      v-if="musicActive && !isFinish"
      src="static/images/trapezoid/music_active.gif"
    />
    <common-header :game-list="gameList" v-if="!isFinish"></common-header>
    <div class="body" v-if="!isFinish">
      <div class="box-wrapper" id="boxWrapper">
        <div :id="'box'+index" class="top-card-item" v-for="(item,index) in oriCardList">
          <img v-if="item.isRight" class="card-item" :src="item.path">
        </div>
      </div>
      <div class="number-card-item" v-for="(item, index) in oriCardList">
        <img v-if="item.isRight" class="number" :src="'static/images/sequenceTen/'+item.value+'.png'" alt="">
      </div>
      <div class="card-wrapper" >
        <div 
          :class="{'opacity': item.isRight}"
          class="card-item-wrapper"      
          v-for="(item,index) in cardList">
          <img 
            @touchmove="touchMove('card'+index)" 
            @touchstart="down('card'+index)"
            @touchend="check(item,index)"     
            :class="{'show-how': showHow && item.value == 1}"
            class="card-item" 
            :id="'card'+index"
            :src="item.path" alt=""
            >
        </div>
          <!-- :style="{left: (10 + cardWidth) * index + 'px'}"  -->
      </div>
      <div class="cry-wrapper">
        <img v-show="musicActive" src="static/images/sequenceTen/cry.gif" alt="">
        <img v-show="!musicActive" src="static/images/sequenceTen/no_cry.png" alt="">
      </div>
    </div>
    <common-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </common-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import commonComplete from "@/common/commonComplete";
import {disOrderArr} from "@/common/js/common"
export default {
  name: 'HelloWorld',
  data () {
    return {
      firstTime: true,
      position: {x: 0, y:0},
      musicActive: true,
      isFinish: true,
      showHow: false,
      canDrag: false,
      gameList: [],
      flags: true,
      firstCard: {value: 1, path: 'static/images/sequenceTen/card1.png', isRight: false},
      oriCardList: [
        {value: 2, path: 'static/images/sequenceTen/card2.png', isRight: false},
        {value: 3, path: 'static/images/sequenceTen/card3.png', isRight: false},
        {value: 4, path: 'static/images/sequenceTen/card4.png', isRight: false},
        {value: 5, path: 'static/images/sequenceTen/card5.png', isRight: false},
        {value: 6, path: 'static/images/sequenceTen/card6.png', isRight: false},
        {value: 7, path: 'static/images/sequenceTen/card7.png', isRight: false},
        {value: 8, path: 'static/images/sequenceTen/card8.png', isRight: false},
        {value: 9, path: 'static/images/sequenceTen/card9.png', isRight: false},
        {value: 10, path: 'static/images/sequenceTen/card10.png', isRight: false}
      ],
      cardList: [],
      cardWidth: window.innerWidth * 0.08,
      currentIndex: 0,
      currentItem: {}
    }
  },
  components: {
    commonHeader,
    commonComplete
  },
  mounted(){
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete_music = document.getElementById("complete_music");
    let stem = document.getElementById("stem");
    let like_this = document.getElementById("likeThis");
    let numberAudioList = document.getElementsByClassName('number-audio');
    for(let i = 0, len = numberAudioList.length; i < len; i++){
      eval("let number"+(i+1) + "=document.getElementById('number"+(i+1)+"');");
      eval("number"+(i+1)).addEventListener("ended", function() {
        if(i == 0){
          _this.canDrag = true;
          return;
        }
        _this.playAudio('right_music')
      });
    }
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    stem.addEventListener("canplaythrough", function() {
      _this.musicActive = true;
      //第一次播放演示动画
      if(_this.firstTime){
        stem.play();
      }else{
        _this.musicActive = false;
      }
    });
    stem.addEventListener("ended", function() {
      _this.musicActive = false;
      like_this.play();
      _this.showHow = true;
      setTimeout(()=>{
        _this.oriCardList[0].isRight = true;
        _this.cardList[0].isRight = true;
        number1.play();
      },2000);
    });
    right_music.addEventListener("ended", function() {
      _this.canDrag = true;
      let count = 0;
      for(let i = 0, len = _this.oriCardList.length; i < len; i++){
        if(_this.oriCardList[i].isRight){
          count++
        }
      }
      if(count == 10){
        _this.isFinish = true;
        complete_music.play();
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true;
    });
    _this.initiate();
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    //返回元素距离屏幕顶部的距离
    getElementToPageTop(el) {
      let _this = this;
      if(el.parentElement) {
        return _this.getElementToPageTop(el.parentElement) + el.offsetTop
      }
      return el.offsetTop
    },
    //播放mp3
    playAudio(id) {
      let audioBtn = document.getElementById(id);
      audioBtn.currentTime = 0;
      audioBtn.play();
    },
    broadcast(){
      this.musicActive = true;
      this.playAudio('stem');
    },
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
    check(item,index){
      let _this = this;
      if(!_this.canDrag){
        return;
      }
      let touch;
      _this.currentIndex = item.value;
      _this.currentItem = _this.cardList[_this.currentIndex];
      if(event.touches){
        touch = event.touches[0];
      }else {
        touch = event;
      }
      let mouseX = event.changedTouches[0].pageX
      let mouseY = event.changedTouches[0].pageY
      //获取三个div的元素
      let cardDiv = document.getElementById('card'+index);
      let boxDiv = document.getElementById('box'+(_this.currentIndex-1));
      let boxWrapperDiv = document.getElementById('boxWrapper');
      console.log('检查的')
      console.log(cardDiv)
      //正确位置的边
      let boxWidth = boxDiv.clientWidth;
      let boxHeight = boxDiv.clientHeight;
      let boxLeft = boxDiv.clientWidth * (_this.currentIndex - 1);
      let boxRight = boxLeft + boxWidth;
      let boxBottom = 30 + boxHeight
      //拖动卡片的边
      let cardDivTop = _this.getElementToPageTop(cardDiv);
      //判断是否拖动到规定位置
      if(mouseY > boxBottom){
        return;
      }
      _this.canDrag = false;
      if(mouseX > boxLeft && mouseX < boxRight && mouseY > 30 && mouseY < 30 + boxHeight){
        console.log('对了')
        _this.oriCardList[_this.currentIndex-1].isRight = true;
        _this.cardList[index].isRight = true;
        _this.playAudio('number' + _this.currentIndex);

      }else{
        cardDiv.style.left = 0 + 'px';
        cardDiv.style.top = 0 + 'px';
        _this.playAudio('please_think');
      }
    },
    initiate() {
      let _this = this;
      _this.currentIndex = 0;
      _this.currentItem = _this.oriCardList[_this.currentIndex];
      _this.isFinish = false;
      _this.canDrag = false;
      for(let i = 0, len = _this.oriCardList.length; i < len; i++){
        _this.oriCardList[i].isRight = false;
      }
      _this.cardList = disOrderArr(_this.oriCardList);
      if(_this.oriCardList.indexOf(_this.firstCard) == -1){
        _this.oriCardList.unshift(_this.firstCard);
        _this.cardList.unshift(_this.firstCard);
        _this.canDrag = false;
      }else{
        //重做
        _this.firstTime = false;
        _this.canDrag = true;
        _this.showHow = false;
      }
    }
  }
}
</script>

<style scoped lang="less">
@keyframes move {
  0% {
    left: 0px;
    top: 0px;
  }
  100%{
    left: -27px;
    top: -180.98px;
  }
}
  .sequence-ten-container{
    height: 100%;
    .music-img {
      position: absolute;
      top: 30px;
      left: 20px;
      width: 100px;
    }
    .body{
      height: 100%;
    }
    .box-wrapper{
      height: 25%;
      .top-card-item{
        width: 10%;
        height: 100%;
        display: inline-block;
        border: 1px solid #fff;
        background: #bbe0e3;
        box-sizing: border-box;
        vertical-align: middle;
        .card-item{
          width: 60%;
          margin-top: 15px;
        }
      }
    }
    .number-card-item{
      width: 10%;
      height: 20%;
      display: inline-block;
      border: 1px solid #fff;
      background: #e7f3f4;
      box-sizing: border-box;
      vertical-align: middle;
      .number{
        width: 80%;
        margin: 0 auto;
      }
    }
    .card-wrapper{
      position: relative;
      display: inline-block;
      width: 60%;
      margin-top: 10px;
      height: 35%;
      .card-item-wrapper{
        display: inline-block;
        position: relative;
        width: 10%;
        margin: 0 4%;
      }
      .opacity{
        opacity: 0;
      }
      .card-item{
        position: relative;
        width: 100%;
      }
      .show-how{
        animation:  move 2s;
        animation-fill-mode:forwards;
      }
    }
    .cry-wrapper{
      width: 39%;
      display: inline-block;
      img{
        width: 50%;
      }
    }
    .finish-wrapper {
      display: block;
      padding-bottom: 20px;
      background: #9bcfd3;
      height: 100%;
      .finish-img {
        display: block;
        width: 40%;
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
  }
</style>
