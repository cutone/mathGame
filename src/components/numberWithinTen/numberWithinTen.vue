<template>
  <div class="number-within-ten-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/top_complete.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <common-header :game-list="[]" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
        <div class="target-wrapper"> 
            <div class="target-item-wrapper" v-for="(item, index) in gameList" :key="index" :style="{'top':item.top,'left':item.left}">
                <img :src="item.img" alt="">
                <div class="target-ele" :title="index+1">
                    <span :class="item.isRight?'show-content':'opacity-content'">{{item.need}}</span>
                </div>
            </div>
        </div>
        <div class="drag-container">
            <div class="drag-item-wrapper" v-for="(item, index) in answerList" :key="index">
                <img 
                    :src="'static/images/numberWithinTen/'+(index+1)+'.png'"
                    class="drag-item" 
                    :id="'item'+index"
                    @touchmove="touchMove('item'+index)" 
                    @touchstart="down('item'+index)" 
                    @touchend="check(item)"   
                />
            </div>
        </div>
    </div>
    <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </top-class-complete>
  </div>
</template>

<script>
import { disOrderArr } from '@/common/js/common'
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
export default {
  name: 'HelloWorld',
  data () {
    return {
        position: {
            x: 0,
            y: 0
        },
    currentIndex: 0,
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [{
          img: 'static/images/numberWithinTen/lion.png',
          isRight: false,
            top: '71%',
            left: '11%'
      },{
          img: 'static/images/numberWithinTen/rabbit.png',
          isRight: false,
          top: '53%',
          left: '26%'
      },{
          img: 'static/images/numberWithinTen/yellow_person.png',
          isRight: false,
          top: '58%',
          left: '41%'
      },{
          img: 'static/images/numberWithinTen/tiger.png',
          isRight: false,
          top: '51%',
          left: '54%'
      },{
          img: 'static/images/numberWithinTen/horse.png',
          isRight: false,
          top: '46%',
          left: '66%'
      },{
          img: 'static/images/numberWithinTen/dog2.png',
          isRight: false,
          top: '9%',
          left: '67%'
      },{
          img: 'static/images/numberWithinTen/fox.png',
          isRight: false,
          top: '28%',
          left: '67%'
      }],
      oriAnswerList: [
            {img: '1',isRight: false},
            {img: '2',isRight: false},
            {img: '3',isRight: false},
            {img: '4',isRight: false},
            {img: '5',isRight: false},
            {img: '6',isRight: false},
            {img: '7',isRight: false},
        ],
        answerList: []
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

    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
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
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //游戏初始化
    initiate() {
      let _this = this;
      _this.currentIndex = 0;
      _this.isFinish = false;
      _this.canDrag = true;
      _this.musicActive = true;
      for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isRight = false
        }
        _this.answerList = disOrderArr(_this.oriAnswerList)
    },
    //检查是否正确
    check(item){
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
        let moveDiv = event.target;
        let mouseX = event.changedTouches[0].pageX
        let mouseY = event.changedTouches[0].pageY
        let targetList = document.getElementsByClassName('target-ele')
        for(let i=0, len=targetList.length; i < targetList.length; i++){
            let targetLeft = targetList[i].x;
            let targetRight = targetLeft + targetList[i].clientWidth;
            let targetTop = targetList[i].y;
            let targetBottom = targetTop + targetList[i].clientHeight;
            console.log(i+1)
            console.log(mouseX,mouseY)
            console.log(targetLeft,targetRight,targetTop,targetBottom)
            if(mouseX > targetLeft && mouseX < targetRight && mouseY > targetTop && mouseY < targetBottom){
                if(targetList[i].title == item.img){
                    _this.gameList[i].isRight = true;
                    moveDiv.style.display = 'none';
                }else{
                    _this.canDrag = false;
                    moveDiv.style.top = '0px';
                    moveDiv.style.left = '0px';
                    _this.playAudio('please_think')
                }
            }
        }
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            if(!_this.gameList[i].isRight){
                return
            }
        }
        _this.isFinish = true;
        _this.playAudio('complete')
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
      if(!_this.canDrag){
          return;
      }
      let moveDiv = document.getElementById(el);
          var touch ;
          // || event.target.x > window.width-30 || event.target.y < 30 || event.target.y > window.height-30){
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
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.number-within-ten-container{
    height: 100%;
    .body{
        position: relative;
        height: 100%;
        background-image: url('../../../static/images/numberWithinTen/background.png');
        background-size: 100% 110%;
        background-position: 0 150%;
        .target-item-wrapper{
            position: absolute;
            .target-ele{
                position: absolute;
                width: 10vw;
                height: 1vh;
                background: red;
                right: 100%;
            }
            img{
                position: absolute;
                width: 100px;
            }
        }
        .drag-container{
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: flex-start;
            height: 70%;
            .drag-item-wrapper{
                position: relative;
                .drag-item{
                    position: absolute;
                    width: 7vw;
                    left: 10px;
                }
            }
        }
    }
}
</style>
