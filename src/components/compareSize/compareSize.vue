<template>
  <div class="compare-size-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/compareSize/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/compareSize/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="stem_music_1" src="static/audio/compareSize/stem_music_1.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="stem_music_2" src="static/audio/compareSize/stem_music_2.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="stem_music_3" src="static/audio/compareSize/stem_music_3.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="stem_music_4" src="static/audio/compareSize/stem_music_4.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="stem_music_5" src="static/audio/compareSize/stem_music_5.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="stem_music_6" src="static/audio/compareSize/stem_music_5.wav">您的浏览器不支持 audio 标签。</audio>

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
      <div class="click-img-wrapper" v-show="currentItem.type=='click'">
        <img @click="clickCeck(img)" :style="{'width':img.width,'height':img.height}" v-for="(img,index) in currentItem.imgList" :src="img.img" :key="index"/>
      </div>
      <div class="drag-img-wrapper" v-show="currentItem.type=='drag'">
        <div class="star-wrapper">
          <div class="big-star-item-wrapper">
            <img
              @touchmove="touchMove('big_star')" 
              @touchstart="down('big_star')"
              @touchend="checkDrag('big_star')"   
              id="big_star" class="big-star" 
              src="static/images/compareSize/star.png" alt="">
          </div>
          <div class="small-star-item-wrapper">
            <img 
              @touchmove="touchMove('small_star')" 
              @touchstart="down('small_star')"
              @touchend="checkDrag('small_star')"   
              id="small_star" class="small-star" 
              src="static/images/compareSize/star.png" alt="">
          </div>
        </div>
        <img class="img-item" :id="img.id" :style="{'width':img.width,'height':img.height}" v-for="(img,index) in currentItem.imgList" :src="img.img" :key="index"/>
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
export default {
  name: 'HelloWorld',
  data () {
    return {
      background: 'static/images/compareSize/background.jpg',
      leftImg: 'static/images/compareSize/mickey_left.png',
      rightImg: 'static/images/compareSize/mickey_right.png',
      position: {x:0,y:0},
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canChoose: false,
      isFinish: false,
      gameList: [{
        type: 'click',
        isRight: false,
        imgList: [
          {
          isRight: false,
          id: 'small',
          img: 'static/images/compareSize/football.png',
          width: '20%'
        },{
          isRight: true,
          id: 'big',
          img: 'static/images/compareSize/football.png',
          width: '30%'
        }],
      },{
        type: 'click',
        isRight: false,
        imgList: [{
          isRight: true,
          id: 'big',
          img: 'static/images/compareSize/dog.png',
          width: '30%'
        },{
          isRight: false,
          id: 'small',
          img: 'static/images/compareSize/dog.png',
          width: '20%'
        }],
      },{
        type: 'click',
        isRight: false,
        imgList: [{
          isRight: false,
          id: 'small',
          img: 'static/images/compareSize/mushroom.png',
          width: '20%'
        },{
          isRight: true,
          id: 'big',
          img: 'static/images/compareSize/mushroom.png',
          width: '30%'
        },{
          isRight: false,
          id: 'middle',
          img: 'static/images/compareSize/mushroom.png',
          width: '15%'
        }],
      },{
        type: 'click',
        isRight: false,
        imgList: [{
          isRight: true,
          id: 'big',
          img: 'static/images/compareSize/bear.png',
          width: '30%'
        },{
          isRight: false,
          id: 'middle',
          img: 'static/images/compareSize/bear.png',
          width: '10%'
        },{
          isRight: false,
          id: 'small',
          img: 'static/images/compareSize/bear.png',
          width: '20%'
        }],
      },{
        type: 'drag',
        isRight: false,
        isBigRight: false,
        isSmallRight: false,
        imgList: [{
          id: 'middle',
          img: 'static/images/compareSize/motor.png',
          width: '30%'
        },{
          id: 'small',
          img: 'static/images/compareSize/airplane.png',
          width: '20%'
        },{
          id: 'big',
          img: 'static/images/compareSize/car.png',
          width: '50%'
        }],
      },{
        type: 'drag',
        isRight: false,
        isBigRight: false,
        isSmallRight: false,
        imgList: [{
          id: 'big',
          img: 'static/images/compareSize/bear1.png',
          width: '25%'
        },{
          id: 'middle',
          img: 'static/images/compareSize/boat.png',
          width: '25%'
        },{
          id: 'small',
          img: 'static/images/compareSize/apple.png',
          width: '10%'
        }],
      }]
    }
  },
  components: {
    commonHeader,
    bottomClassComplete
  },
  mounted() {
    let _this = this;
    let small_star = document.getElementById('small_star')
    let big_star = document.getElementById('big_star')
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stem_music_list = document.getElementsByClassName('stem_music');

    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    for(let i = 0, len = stem_music_list.length; i < len; i++){
      eval("let stem_music_" +(i+1) + "= document.getElementsByClassName('stem_music_"+ (i+1)+ "')")
      eval('stem_music_'+(i+1)).addEventListener("ended", function() {
        console.log('语音播放完毕')
        _this.canChoose = true;
        _this.musicActive = false;
      })
    }
    stem_music_1.addEventListener("canplaythrough", function() {
      stem_music_1.play();
    });
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        if(_this.currentItem.type == 'drag'){
          small_star.style.top = '0px'
          small_star.style.left = '0px'
          big_star.style.top = '0px'
          big_star.style.left = '0px'
        }
        console.log(_this.currentIndex)
        console.log(_this.currentItem)
        _this.playAudio('stem_music_'+(_this.currentIndex+1));
        _this.musicActive = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canChoose = true
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
      _this.canChoose = false;
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
      _this.canChoose = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        _this.gameList[i].isWrong = false;
      }
      _this.playAudio('stem_music_1');
    },
    //点击选择时判断对错
    clickCeck(img){
      let _this = this;
      console.log(_this.canChoose)
      if(!_this.canChoose){
        return;
      }
      
      _this.canChoose = false;
      if(img.isRight){
        _this.currentIndex++;
        _this.playAudio('right_music');
      }else{
        _this.playAudio('please_think')
      }
    },
    //鼠标松开,检测是否做对
    checkDrag(){
      let _this = this;
      let touch;
      if(event.touches){
        touch = event.touches[0];
      }else {
        touch = event;
      }
      if(!_this.canChoose){
        return;
      }
      _this.canChoose = false;
      let mouseX = event.changedTouches[0].pageX
      let mouseY = event.changedTouches[0].pageY
      let moveDiv = event.target;
      let bigDiv = document.getElementById('big')
      console.log(moveDiv.className)
      let middleDiv = document.getElementById('middle')
      let smallDiv = document.getElementById('small')
      //大的物体的边界
      let bigDivLeft = bigDiv.offsetLeft;
      let bigDivRight = bigDivLeft + bigDiv.clientWidth;
      let bigDivTop = bigDiv.offsetTop;
      let bigDivBottom = bigDivTop + bigDiv.clientHeight;
      //中的物体边界
      let middleDivLeft = middleDiv.offsetLeft;
      let middleDivRight = middleDivLeft + middleDiv.clientWidth;
      let middleDivTop = middleDiv.offsetTop;
      let middleDivBottom = middleDivTop + middleDiv.clientHeight;
      //小物体的边界
      let smallDivLeft = smallDiv.offsetLeft;
      let smallDivRight = smallDivLeft + smallDiv.clientWidth;
      let smallDivTop = smallDiv.offsetTop;
      let smallDivBottom = smallDivTop + smallDiv.clientHeight;
      // console.log(mouseX,mouseY)
      // console.log(bigDivLeft,bigDivRight,bigDivTop,bigDivBottom)
      //判断大的对不对
      if(mouseX > bigDivLeft && mouseX < bigDivRight && mouseY > bigDivTop && mouseY < bigDivBottom){
        // console.log('大')
        if(moveDiv.className == 'big-star'){
          _this.currentItem.isBigRight = true;
          _this.canChoose = true
        }else{
          _this.currentItem.isSmallRight = false;
          moveDiv.style.left = '0px'
          moveDiv.style.top = '0px'
          _this.playAudio('please_think')
        }
      }else if(mouseX > middleDivLeft && mouseX < middleDivRight && mouseY > middleDivTop && mouseY < middleDivBottom){
        // console.log('中')
        moveDiv.style.left = '0px'
        moveDiv.style.top = '0px'
        _this.playAudio('please_think')
        if(moveDiv.className == 'big-star'){
          _this.currentItem.isBigRight = false;
        }else{
          _this.currentItem.isSmallRight = false;
        }
      }else if(mouseX > smallDivLeft && mouseX < smallDivRight && mouseY > smallDivTop && mouseY < smallDivBottom){
        // console.log('小')
        //判断是不是小的
        if(moveDiv.className == 'small-star'){
          _this.currentItem.isSmallRight = true;
          _this.canChoose = true
        }else{
          _this.currentItem.isBigRight = false;
          moveDiv.style.left = '0px'
          moveDiv.style.top = '0px'
          _this.playAudio('please_think')
        }
      }else{
        if(moveDiv.className == 'big-star'){
          _this.currentItem.isBigRight = false;
        }else{
          _this.currentItem.isSmallRight = false;
        }
        _this.canChoose = true
      }
      if(_this.currentItem.isSmallRight && _this.currentItem.isBigRight){
        _this.currentIndex++;
        _this.playAudio('right_music');
      }
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
      if(!_this.canChoose){
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
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.compare-size-container{
  height: 100%;
  .body{
    height: 100%;
    background-image: url('../../../static/images/compareSize/background.jpg');
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .click-img-wrapper{
      width: 70%;
      height: 70%;
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .drag-img-wrapper{
      width: 70%;
      height: 70%;
      .star-wrapper{
        width: 120px;
        height: 60px;
        background: url('../../../static/images/compareSize/cloud.png');
        background-size: 100% 100%;
        position: absolute;
        right: 15%;
        // align-items: center;
        .big-star-item-wrapper{
          position: relative;
          width: 30%;
          display: inline-block;
          vertical-align: middle;
        }
        .small-star-item-wrapper{
          position: relative;
          width: 20%;
          display: inline-block;
          vertical-align: middle;
        }
        .big-star{
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }
        .small-star{
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
        }
      }
      .img-item{
        margin: 0 20px;
      }
    }
  }
}
</style>
