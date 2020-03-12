<template>
  <div class="regular-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="regular" src="static/audio/common/regular.mp3">您的浏览器不支持 audio 标签。</audio>
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
        <div class="choice-wrapper" >
            <div class="flex-wrapper">
                <div class="choice-item-wrapper" v-for="(item, index) in currentItem.choiceList">
                    <img
                        class="choice-item"
                        :id="'game'+currentIndex+'-el'+index"
                        @touchmove="touchMove('game'+currentIndex+'-el'+index)" 
                        @touchstart="down('game'+currentIndex+'-el'+index)"
                        @touchend="check(item,index)"     
                        :src="item.img" alt="">
                </div>
            </div> 
        </div>
        <div class="regular-list-wrapper">
            <div class="flex-wrapper">
                <div class="regular-item-wrapper" v-for="(img, index) in currentItem.regularList" :key="index"> 
                    <img  :src="img" alt="">
                </div>
                <div class="regular-item-wrapper" id="question_box"> 
                    <img class="question-mark" v-if="!currentItem.isRight" src="static/images/regular/question_mark.png" alt="">
                    <img v-if="currentItem.isRight" :src="rightImgPath" alt="">
                    <img v-if="currentItem.isRight" class="right_mark" src="static/images/common/right.png" />
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
import { getElementToPageTop, getElementToPageLeft } from "@/common/js/common"
export default {
  name: 'HelloWorld',
  data () {
    return {
    position: {x: 0, y:0},
    currentIndex: 0,
    currentItem: {},
    rightImgPath: '',
        musicActive: true,
        canDrag: true,
        isFinish: false,
        gameList: [
            {
                isRight: false,
                choiceList: [
                    {isRight: false,img: 'static/images/regular/red_circle.png'},
                    {isRight: true,img: 'static/images/regular/triangle_blue.png'},
                ],
                regularList: [
                    'static/images/regular/red_circle.png',
                    'static/images/regular/triangle_blue.png',
                    'static/images/regular/red_circle.png',
                    'static/images/regular/triangle_blue.png',
                    'static/images/regular/red_circle.png',
                ]
            },{
                isRight: false,
                choiceList: [
                    {isRight: true,img: 'static/images/regular/fish_blue.png'},
                    {isRight: false,img: 'static/images/regular/fish_fink.png'},
                ],
                regularList: [
                    'static/images/regular/fish_fink.png',
                    'static/images/regular/fish_fink.png',
                    'static/images/regular/fish_blue.png',
                    'static/images/regular/fish_blue.png',
                    'static/images/regular/fish_fink.png',
                    'static/images/regular/fish_fink.png',
                    'static/images/regular/fish_blue.png',
                ]
            },{
                isRight: false,
                choiceList: [
                    {isRight: false,img: 'static/images/regular/ball.png'},
                    {isRight: true,img: 'static/images/regular/football.png'},
                ],
                regularList: [
                    'static/images/regular/ball.png',
                    'static/images/regular/ball.png',
                    'static/images/regular/football.png',
                    'static/images/regular/ball.png',
                    'static/images/regular/ball.png',
                ]
            },{
                isRight: false,
                choiceList: [
                    {isRight: false,img: 'static/images/regular/trapezoid_yellow.png'},
                    {isRight: false,img: 'static/images/regular/circle_yellow.png'},
                    {isRight: true,img: 'static/images/regular/trangle_yellow.png'},
                ],
                regularList: [
                    'static/images/regular/trapezoid_yellow.png',
                    'static/images/regular/trapezoid_yellow.png',
                    'static/images/regular/circle_yellow.png',
                    'static/images/regular/trangle_yellow.png',
                    'static/images/regular/trapezoid_yellow.png',
                    'static/images/regular/trapezoid_yellow.png',
                    'static/images/regular/circle_yellow.png',
                ]
            },{
                isRight: false,
                choiceList: [
                    {isRight: false,img: 'static/images/regular/triangle_blue.png'},
                    {isRight: true,img: 'static/images/regular/trapezoid_green.png'},
                    {isRight: false,img: 'static/images/regular/red_circle.png'},
                ],
                regularList: [
                    'static/images/regular/red_circle.png',
                    'static/images/regular/red_circle.png',
                    'static/images/regular/triangle_blue.png',
                    'static/images/regular/trapezoid_green.png',
                    'static/images/regular/red_circle.png',
                    'static/images/regular/red_circle.png',
                    'static/images/regular/triangle_blue.png',
                ]
            },{
                isRight: false,
                choiceList: [
                    {isRight: true,img: 'static/images/regular/strawberry.png'},
                    {isRight: false,img: 'static/images/regular/apple.png'},
                    {isRight: false,img: 'static/images/regular/watermelon.png'},
                ],
                regularList: [
                    'static/images/regular/apple.png',
                    'static/images/regular/watermelon.png',
                    'static/images/regular/strawberry.png',
                    'static/images/regular/strawberry.png',
                    'static/images/regular/apple.png',
                    'static/images/regular/watermelon.png',
                    'static/images/regular/strawberry.png',
                ]
            }
        ],
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
    let regular = document.getElementById("regular");
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    regular.addEventListener("ended", function() {
        _this.canDrag = true;
        _this.musicActive = false;
    });
    right_music.addEventListener("ended", function() {
        let choiceEleList = document.getElementsByClassName('choice-item');
        for(let i = 0; i < choiceEleList.length; i++){
            choiceEleList[i].style.display = 'block';
            choiceEleList[i].style.left = '10px';
            choiceEleList[i].style.top = '10px';
        }
        if(_this.currentIndex == _this.gameList.length){
            _this.isFinish = true;
            _this.playAudio('complete')
        }else{
            _this.canDrag = true;
            _this.currentItem = _this.gameList[_this.currentIndex];
        }        
    });
    please_think.addEventListener("ended", function() {
        _this.canDrag = true;
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
      console.log(_this.canDrag)
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
      if(event.touches){
        touch = event.touches[0];
      }else {
        touch = event;
      }
      let mouseX = event.changedTouches[0].pageX
      let mouseY = event.changedTouches[0].pageY;
      console.log(mouseX,mouseY)
      let moveDiv = event.target;
      let boxDiv = document.getElementById('question_box');
      //获取四边的值
      let boxLeft = boxDiv.offsetLeft;
    //   let boxLeft = getElementToPageLeft(boxDiv);
      let boxRight = boxLeft + boxDiv.clientWidth;
      let boxTop = getElementToPageTop(boxDiv)-30;
    //   let boxTop = boxDiv.offsetTop;
      let boxBottom = boxTop + boxDiv.clientHeight;
      console.log(boxLeft,boxRight,boxTop,boxBottom)
      if(mouseX > boxLeft && mouseX < boxRight && mouseY > boxTop && mouseY < boxBottom){
          _this.canDrag = false;
          if(item.isRight){
            console.log('对了');
            _this.currentItem.isRight = true;
            _this.playAudio('right_music')
            _this.rightImgPath = item.img;
            moveDiv.style.display = 'none'
            _this.currentIndex++;
          }else{
            console.log('错了')
            _this.playAudio('please_think')
            moveDiv.style.left = '10px';
            moveDiv.style.top = '10px'
          }
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
      _this.canDrag = false;
      _this.playAudio('regular');
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
      }
      _this.playAudio('regular');
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.regular-container{
    position: relative;
    height: 100%;
    .body{
        height: 100%;
        background-image: url('../../../static/images/regular/background.gif');
        background-size: 100% 130%;
        background-position-y: 110%;
        .choice-wrapper{
            position: absolute;
            bottom: 25%;
            width: 100%;
            .flex-wrapper{
                width: 50%;
                margin: 0 auto;
            }
            .choice-item-wrapper{
                position: relative;
                display: inline-block;
                width: 60px;
                height: 60px;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 60px;
                background: #fff;
                img{
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    left: 10px;
                    z-index: 10;
                }
            }
        }
        .regular-list-wrapper{
            position: absolute;
            bottom: 5%;
            width: 100%;
            .regular-item-wrapper{
                width: 60px;
                height: 60px;
                padding: 10px;
                box-sizing: border-box;
                border-radius: 60px;
                background: #fff;
            }
            .flex-wrapper{
                width: 70%;
                margin: 0 auto;
            }
            img{
                width: 100%;
                height: 40px;
            }
            .right_mark{
                position: relative;
                bottom: 30px;
                width: 40px;
            }
            .question-mark{
                width: 100%;
                height: auto;
                margin: -5px 0 0 2px;
            }
        }
    }
}
</style>
