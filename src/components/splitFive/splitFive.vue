<template>
  <div class="split-five-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music" src="static/audio/splitFive/stem_music.mp3">您的浏览器不支持 audio 标签。</audio>
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
      <div class="top-container">
        <img class="Doraemon" src="static/images/splitFive/Doraemon.gif" alt="">
      </div> 
      <div class="bottom-container">
        <div class="cake-wrapper flex-wrapper">
          <div class="cake-item-wrapper" v-for="item in currentItem.cakeNumber" :key="item">
            <img 
              class="cake-item"
              @touchmove="touchMove('cake'+item)" 
              @touchstart="down('cake'+item)"
              @touchend="check(item)" 
              :id="'cake'+item"
              :src="'static/images/splitFive/cake.png'" 
              alt="">
          </div>
        </div>
        <div class="plate-wrapper">
          <img class="plate-item" id="left_plate" :src="'static/images/splitFive/'+currentItem.leftPlate+'.png'" alt="">
          <img :class="currentItem.isRight?'right-img':'right-img-opacity'" src="static/images/common/right.png"/>
          <img class="plate-item" id="right_plate" :src="'static/images/splitFive/'+currentItem.rightPlate+'.png'" alt="">
        </div>
      </div>
    </div>
    <red-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </red-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import redComplete from "@/common/redComplete";
import { getElementToPageTop, getElementToPageLeft } from "@/common/js/common"
export default {
  name: 'HelloWorld',
  data () {
    return {
    position: {x:0,y:0},
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [{
        isRight: false,
        cakeNumber: 5,
        leftPlate: 2,
        rightPlate: 3,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      },{
        isRight: false,
        cakeNumber: 4,
        leftPlate: 1,
        rightPlate: 3,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      },{
        isRight: false,
        cakeNumber: 4,
        leftPlate: 2,
        rightPlate: 2,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      },{
        isRight: false,
        cakeNumber: 3,
        leftPlate: 2,
        rightPlate: 1,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      },{
        isRight: false,
        cakeNumber: 2,
        leftPlate: 1,
        rightPlate: 1,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      },{
        isRight: false,
        cakeNumber: 5,
        leftPlate: 1,
        rightPlate: 4,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      },{
        isRight: false,
        cakeNumber: 4,
        leftPlate: 3,
        rightPlate: 1,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      },{
        isRight: false,
        cakeNumber: 5,
        leftPlate: 3,
        rightPlate: 2,
        leftCurrentNumber: 0,
        rightCurrentNumber: 0,
        leftContainerList: [],
        rightContainerList: []
      }],
    }
  },
  components: {
    commonHeader,
    redComplete
  },
  mounted() {
    let _this = this;
    let cakeEleList = document.getElementsByClassName('cake-item')
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");

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
        for (let i = 0, len = cakeEleList.length; i < len; i++) {
          cakeEleList[i].style.left = '0px';
          cakeEleList[i].style.top = '0px';
        }
        _this.musicActive = true
        _this.canDrag = true;
      }
    });
    stem_music.addEventListener("ended", function() {
      _this.canDrag = true;
      _this.musicActive = false;
    })
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
      _this.canDrag = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        _this.gameList[i].leftCurrentNumber = 0;
        _this.gameList[i].rightCurrentNumber = 0;
      }
      _this.playAudio('stem_music');
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
      let leftPlateDiv = document.getElementById('left_plate');
      let rightPlateDiv = document.getElementById('right_plate');
      //左盘的四边
      let leftPlateDivLeft = leftPlateDiv.offsetLeft;
      let leftPlateDivRight = leftPlateDivLeft + leftPlateDiv.clientWidth;
      let leftPlateDivTop = leftPlateDiv.offsetTop;
      let leftPlateDivBottom = leftPlateDivTop + leftPlateDiv.clientHeight;
      //右盘的四边
      let rightPlateDivLeft = rightPlateDiv.offsetLeft;
      let rightPlateDivRight = rightPlateDivLeft + rightPlateDiv.clientWidth;
      let rightPlateDivTop = rightPlateDiv.offsetTop;
      let rightPlateDivBottom = rightPlateDivTop + rightPlateDiv.clientHeight;
      // console.log(mouseX,mouseY)
      // console.log('盘子',leftPlateDivLeft,leftPlateDivRight,leftPlateDivTop,leftPlateDivBottom )
      //左边盘子
      if(mouseX > leftPlateDivLeft && mouseX < leftPlateDivRight && mouseY > leftPlateDivTop && mouseY < leftPlateDivBottom){
        let index = _this.currentItem.leftContainerList.indexOf(moveDiv)
        if(index == -1){
          if(_this.currentItem.leftCurrentNumber < _this.currentItem.leftPlate){
            _this.currentItem.leftCurrentNumber++
            _this.currentItem.leftContainerList.push(moveDiv);
          }else{
            moveDiv.style.left = '0px';
            moveDiv.style.top = '0px';
            _this.canDrag = false;
            _this.playAudio('please_think')
          }
        }
      }else{
        let index = _this.currentItem.leftContainerList.indexOf(moveDiv)
        if(index != -1){
          _this.currentItem.leftCurrentNumber--
          _this.currentItem.leftContainerList.splice(index, 1)
        }
      }
      //右边盘子有没有装满
      if(mouseX > rightPlateDivLeft && mouseX < rightPlateDivRight && mouseY > rightPlateDivTop && mouseY < rightPlateDivBottom){
        let index = _this.currentItem.rightContainerList.indexOf(moveDiv)
        if(index == -1){
          if(_this.currentItem.rightCurrentNumber < _this.currentItem.rightPlate){
            _this.currentItem.rightCurrentNumber++
            _this.currentItem.rightContainerList.push(moveDiv);
          }else{
            moveDiv.style.left = '0px';
            moveDiv.style.top = '0px';
            _this.canDrag = false;
            _this.playAudio('please_think');
          }
        }
      }else{
        let index = _this.currentItem.rightContainerList.indexOf(moveDiv)
        if(index != -1){
          _this.currentItem.rightCurrentNumber--
          _this.currentItem.rightContainerList.splice(index, 1)
        }
      }
      if(_this.currentItem.leftCurrentNumber == _this.currentItem.leftPlate && _this.currentItem.rightCurrentNumber == _this.currentItem.rightPlate){
        _this.currentItem.isRight = true;
        _this.currentIndex++;
        _this.playAudio('right_music');
        _this.canDrag = false;
      }
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.split-five-container{
  height: 100%;
  .body{
    height: 100%;
    .top-container{
      height: 40%;
      background: #a1d8f7;
      .Doraemon{
        width: 160px;
        height: 100%;
      }
    }
    .bottom-container{
      height: 70%;
      background: url('../../../static/images/splitFive/background.png');
      .cake-wrapper{
        width: 50%;
        margin: 0 auto;
        border: 1px solid #fbd868;
        background: #fff;
        height: 60px;
        border-radius: 10px;
        z-index: 100;
        .cake-item-wrapper{
          position: relative;
          width: 60px;
          height: 60px;
          img{
            width: 100%;
            position: absolute;
            left: 0;
            z-index: 1;
          }
        }
      }
      .plate-wrapper{
        width: 80%;
        margin: 0 auto;
        .right-img{
          width: 70px;
          height: 60px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 30px;
        }
        .right-img-opacity{
          width: 70px;
          height: 60px;
          display: inline-block;
          vertical-align: middle;
          margin: 0 30px;
          opacity: 0;
        }
        .plate-item{
          width: 25%;
          height: 37vh;
          vertical-align: middle;
        }
      }
    }
  }
}

</style>
