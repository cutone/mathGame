<template>
  <div class="classificationByName-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/sequenceFive/bottom_complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_1" class="stem-music" src="static/audio/classificationByName/stem_music_1.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_2" class="stem-music" src="static/audio/classificationByName/stem_music_2.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_3" class="stem-music" src="static/audio/classificationByName/stem_music_3.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="isGather" src="static/audio/classificationByName/isGather.wav">您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish && !isGather"
      src="static/images/common/bottom_music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish && !isGather"
      src="static/images/common/bottom_music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish && !isGather" class="body">
        <div class="toy-list-wrapper">
            <span class="toy-img-wrapper" v-for="img in imgList">
                <img 
                    :id="img"
                    @touchmove="touchMove(img)" 
                    @touchstart="down(img)"
                    @touchend="check(img)"  
                    :src="'static/images/classificationByName/'+img+'.png'" alt="">    
            </span>    
        </div>
        <div class="bottom-wrapper">
            <img class="title-img" :src="'static/images/classificationByName/'+currentItem.titleImg+'.png'" /> 
            <div class="box-container">
                <div class="box-wrapper" v-for="item in currentItem.boxList">
                    <img class="box-img" v-show="item.isRight" :src="item.img" alt="">
                </div>
            </div> 
        </div>
    </div>
    <div class="body" v-if="!isFinish && isGather">
        <div class="bottom-wrapper" v-for="(item, index) in finishList">
            <img class="title-img" :src="'static/images/classificationByName/'+item.titleImg+'.png'" /> 
            <div class="box-container">
                <div class="box-wrapper" v-for="img in item.imgList">
                    <img class="box-img" :src="'static/images/classificationByName/'+img+'.png'" alt="">
                </div>
            </div> 
        </div>
    </div> 
    <bottom-class-complete :background="background" :leftImg="leftImg" :rightImg="rightImg"  v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </bottom-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import bottomClassComplete from "@/common/bottomClassComplete";
import { getElementToPageLeft,disOrderArr } from "@/common/js/common";
export default {
  name: 'classificationByName',
  data () {
    return {
        background: 'static/images/classificationByName/background.jpg',
        leftImg: 'static/images/classificationByName/complete_left.png',
        rightImg: 'static/images/classificationByName/complete_right.png',
        position: {x:0,y:0},
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      isGather: false,
      finishList: [{
          titleImg: 'wawa',
          imgList: ['wawa_1', 'wawa_2', 'wawa_3', 'wawa_4']
      },{
          titleImg: 'car',
          imgList: ['car_1', 'car_2', 'car_3', 'car_4']
      },{
          titleImg: 'juggle',
          imgList: ['juggle_1', 'juggle_2', 'juggle_3', 'juggle_4']
      }],
      imgList: [
          'car_1','car_2','car_3','car_4',
          'wawa_1', 'wawa_2', 'wawa_3', 'wawa_4',
          'juggle_1', 'juggle_2', 'juggle_3', 'juggle_4'],
        
      gameList: [
          {
            titleImg: 'wawa',
            currentNumber: 0,
            boxList: [{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            }]
          },
          {
            titleImg: 'car',
            currentNumber: 0,
            boxList: [{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            }]
          },
          {
            titleImg: 'juggle',
            currentNumber: 0,
            boxList: [{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            },{
                isRight: false,
                img: ''
            }]
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
    let isGather = document.getElementById("isGather");
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

    stem_music_1.addEventListener("canplaythrough", function() {
      stem_music_1.play();
    });
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isGather = true;
        _this.playAudio('isGather')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('stem_music_'+(_this.currentIndex+1));
        _this.musicActive = true;
      }
    });
    
    isGather.addEventListener("ended", function() {
        setTimeout(function(){
            _this.isFinish = true
        },1000)
    })
      
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
      _this.playAudio('stem_music_'+_this.currentIndex+1);
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
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
      let moveEle = event.target;
      console.log(mouseX,mouseY)
      let targetList = document.getElementsByClassName('box-wrapper');
      for (let i = 0; i < targetList.length; i++) {
            let imgLeft = targetList[i].offsetLeft;
            let imgRight = imgLeft + targetList[i].clientWidth;
            let imgTop = targetList[i].offsetTop;
            let imgBottom = imgTop + targetList[i].clientHeight;
            console.log(imgLeft, imgRight, imgTop, imgBottom);
            if (
              mouseX > imgLeft &&
              mouseX < imgRight &&
              mouseY > imgTop &&
              mouseY < imgBottom
            ) {
              if (moveEle.id.indexOf(_this.currentItem.titleImg) != -1 && _this.currentItem.boxList[i].isRight==false) {
                console.log("对了");
                moveEle.style.display = 'none';
                _this.currentItem.boxList[i].isRight = true;
                _this.currentItem.boxList[i].img = moveEle.src;
                
              } else {
                console.log("错了");
                moveEle.style.top = 'auto';
                moveEle.style.left = 'auto';
                _this.canDrag = false;
                _this.playAudio("please_think");
              }
            }
      }
      for(let i = 0; i < _this.currentItem.boxList.length; i++){
          if(_this.currentItem.boxList[i].isRight == false){
              return
          }
      }
      _this.currentIndex++;
      _this.canDrag = false;
        _this.playAudio('right_music');
    },
    //游戏初始化
    initiate() {
      let _this = this;
      _this.currentIndex = 0;
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.isFinish = false;
      _this.isGather = false;
      _this.canDrag = false;
      _this.musicActive = true;
      _this.imgList = disOrderArr(_this.imgList)
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
          for(let j = 0; j < _this.gameList[i].boxList.length; j++){
            _this.gameList[i].boxList[j].isRight = false,
            _this.gameList[i].boxList[j].img = ''
        }
      }
      _this.playAudio('stem_music_'+(_this.currentIndex+1));
    },
    //鼠标按下触发
    down(el){
        let moveEle = document.getElementById(el);
        this.flags = true;
        var touch;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveEle.offsetLeft;
        this.dy = moveEle.offsetTop;
    },
    //拖动事件
    touchMove(el){
      const _this = this;
      let moveEle = document.getElementById(el);
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
      moveEle.style.left = this.xPum+"px";
      moveEle.style.top = this.yPum +"px";
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
.classificationByName-container{
  height: 100%;
  .body{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    background-image: url('../../../static/images/classificationByName/background.jpg');
    background-size: 100% 100%;
    padding-bottom: 30px;
    box-sizing: border-box;
    
    .bottom-wrapper{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 30%;
        width: 80%;
        text-align: center;
        .title-img{
            height: 100%;
            margin-right: 50px;
        }
        .box-container{
            display: flex;
            justify-content: center;
            .box-wrapper{
                height: 30vh;
                width: 30vh;
                background-image: url('../../../static/images/classificationByName/box.png');
                background-size: 100% 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .box-img{
                    height: 80%;
                    max-width: 80%;
                }
            }
        }
    }
    .toy-list-wrapper{
      display: flex;
      flex-wrap: wrap;
      width: 80%;
        margin-left: 10%;
      .toy-img-wrapper{
          width: 26vh;
          height: 17vh;
          position: relative;
          border: 1px solid #69473d;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          box-sizing: border-box;
          img{
              height: 100%;
              width: auto;
              max-width: 80%;
              position: absolute;
          }
      }
    }
  }
  
}
</style>
