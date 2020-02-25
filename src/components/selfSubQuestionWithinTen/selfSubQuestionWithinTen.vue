<template>
  <div class="self-sub-question-within-ten-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/top_complete.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music" class="stem-music" src="static/audio/selfSubQuestionWithinTen/stem_music.m4a">您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      id="music"
      @click="broadcast()"
      @touchmove="touchMove('music')"
        @touchstart="down('music')"
      v-if="!musicActive && !isFinish"
      src="static/images/common/top_music.png"
    />
    <img
        id="music_active"
      class="music-img"
      @touchmove="touchMove('music_active')"
        @touchstart="down('music_active')"
      v-if="musicActive && !isFinish"
      src="static/images/common/top_music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
        <div class="flex-wrapper question-container">
            <span class="title">请你看图编减法应用题，并将数字拖进对应的格子里，使算式成立。</span>
            <div class="question-wrapper">
                <div class="right-wrapper">
                    <img :class="currentItem.isRight ? '': 'hide'" class="right-img" src="static/images/common/right.png" alt="">
                </div> 
                <div v-for="(item, index) in currentItem.questionList"
                    :style="{'background-image':'url(static/images/selfSubQuestionWithinTen/'+item.background+'.png)'}" 
                    :key="index" class="question-item-wrapper">
                    <img v-show="item.isRight" :src="'static/images/selfSubQuestionWithinTen/'+item.need+'.png'" alt="">
                </div>
            </div>
            
        </div>
        <div class="flex-wrapper middle-container">
            <img :src="'static/images/selfSubQuestionWithinTen/'+currentItem.leftImg" alt="">
            <img :src="'static/images/selfSubQuestionWithinTen/'+currentItem.rightImg" alt="">
        </div>
        <div class="ground-img"></div>
        <div class="flex-wrapper bottom-container">
            <div class="choice-item-wrapper" v-for="(img, index) in currentItem.chioceList" :key="index">
                <img 
                    class="choice-item"
                    @touchmove="touchMove(img+'_'+index)"
                    @touchstart="down(img+'_'+index)"
                    @touchend="check()"
                    :id="img+'_'+index"
                    :src="'static/images/selfSubQuestionWithinTen/'+img+'.png'" alt="">
            </div> 
        </div>

    </div>
    <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </top-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
export default {
  name: 'selfSubQuestionWithinTen',
  data () {
    return {
    currentIndex: 0,
    position: {x:0,y:0},
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [{
          leftImg: 'candy.png',
          rightImg: 'sub_candy.png',
          chioceList: ['sub','7','8','1','5'],
          isRight: false,
          questionList: [{
              background: 'number',
              need: '8',
              isRight: false,
          },{
              background: 'circle',
              need: 'sub',
              isRight: false,
          },{
              background: 'number',
              need: '1',
              isRight: false,
          },{
              background: '',
              need: 'equal',
              isRight: true,
          },{
              background: 'number',
              need: '7',
              isRight: false,
          }]
      },{
          leftImg: 'radish.png',
          rightImg: 'sub_radish.gif',
          chioceList: ['6','9','sub','10','1'],
          isRight: false,
          questionList: [{
              background: 'number',
              need: '10',
              isRight: false,
          },{
              background: 'circle',
              need: 'sub',
              isRight: false,
          },{
              background: 'number',
              need: '1',
              isRight: false,
          },{
              background: '',
              need: 'equal',
              isRight: true,
          },{
              background: 'number',
              need: '9',
              isRight: false,
          }]
      },{
          leftImg: 'sub_bee.png',
          rightImg: 'bee.png',
          chioceList: ['2','9','4','5','sub'],
          isRight: false,
          questionList: [{
              background: 'number',
              need: '9',
              isRight: false,
          },{
              background: 'circle',
              need: 'sub',
              isRight: false,
          },{
              background: 'number',
              need: '5',
              isRight: false,
          },{
              background: '',
              need: 'equal',
              isRight: true,
          },{
              background: 'number',
              need: '4',
              isRight: false,
          }]
      },{
          leftImg: 'sub_fish.png',
          rightImg: 'fish.png',
          chioceList: ['7','sub','9','6','3'],
          isRight: false,
          questionList: [{
              background: 'number',
              need: '9',
              isRight: false,
          },{
              background: 'circle',
              need: 'sub',
              isRight: false,
          },{
              background: 'number',
              need: '3',
              isRight: false,
          },{
              background: '',
              need: 'equal',
              isRight: true,
          },{
              background: 'number',
              need: '6',
              isRight: false,
          }]
      },{
          leftImg: 'box.png',
          rightImg: 'sub_box.png',
          chioceList: ['7','sub','8','3','10'],
          isRight: false,
          questionList: [{
              background: 'number',
              need: '10',
              isRight: false,
          },{
              background: 'circle',
              need: 'sub',
              isRight: false,
          },{
              background: 'number',
              need: '3',
              isRight: false,
          },{
              background: '',
              need: 'equal',
              isRight: true,
          },{
              background: 'number',
              need: '7',
              isRight: false,
          }]
      }, {
          leftImg: 'bike.png',
          rightImg: 'sub_bike.png',
          chioceList: ['sub','5','10','4','5'],
          isRight: false,
          questionList: [{
              background: 'number',
              need: '10',
              isRight: false,
          },{
              background: 'circle',
              need: 'sub',
              isRight: false,
          },{
              background: 'number',
              need: '5',
              isRight: false,
          },{
              background: '',
              need: 'equal',
              isRight: true,
          },{
              background: 'number',
              need: '5',
              isRight: false,
          }]
      },{
          leftImg: 'sub_bird.png',
          rightImg: 'bird.png',
          chioceList: ['sub','5','10','8','2'],
          isRight: false,
          questionList: [{
              background: 'number',
              need: '10',
              isRight: false,
          },{
              background: 'circle',
              need: 'sub',
              isRight: false,
          },{
              background: 'number',
              need: '8',
              isRight: false,
          },{
              background: '',
              need: 'equal',
              isRight: true,
          },{
              background: 'number',
              need: '2',
              isRight: false,
          }]
      }],
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
    let stemMusicList = document.getElementsByClassName("stem-music");
    let choiceList = document.getElementsByClassName("choice-item");
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

    stem_music.addEventListener("canplaythrough", function() {
      stem_music.play();
    });
    right_music.addEventListener("ended", function() {
        for(let i = 0; i < choiceList.length; i++){
            choiceList[i].style.display = 'block';
            choiceList[i].style.top= 'auto';
            choiceList[i].style.left= 'auto';
        }
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.musicActive = true;
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
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.isFinish = false;
      _this.canDrag = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
          for(let j = 0; j < _this.gameList[i].questionList.length; j++){
              if(_this.gameList[i].questionList[j].need != 'equal'){
                _this.gameList[i].questionList[j].isRight = false;
              }
        }
      }
      _this.playAudio('stem_music');
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
      let LightList = document.getElementsByClassName("question-item-wrapper");
      for (let i = 0; i < LightList.length; i++) {
            let imgLeft = LightList[i].offsetLeft;
            let imgRight = imgLeft + LightList[i].clientWidth;
            // let imgTop = getElementToPageTop(LightList[i]);
            let imgTop = LightList[i].offsetTop;
            let imgBottom = imgTop + LightList[i].clientHeight;
            console.log(imgLeft, imgRight, imgTop, imgBottom);
            if (
              mouseX > imgLeft &&
              mouseX < imgRight &&
              mouseY > imgTop &&
              mouseY < imgBottom
            ) {
                let moveContent = (moveDiv.id.split('_'))[0]
              if (_this.currentItem.questionList[i].need == moveContent) {
                console.log("对了");
                moveDiv.style.display = 'none';
                _this.currentItem.questionList[i].isRight = true;
                
              } else {
                console.log("错了");
                moveDiv.style.top = 'auto';
                moveDiv.style.left = 'auto';
                _this.canDrag = false;
                _this.playAudio("please_think");
              }
            }
      }
      for(let i = 0; i < _this.currentItem.questionList.length; i++){
          if(_this.currentItem.questionList[i].isRight == false){
              return
          }
      }
      _this.currentItem.isRight = true;
      _this.currentIndex++;
      _this.playAudio('right_music')
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
.self-sub-question-within-ten-container{
  height: 100%;
  .music-img{
      bottom: 20px;
      top: auto;
  }
  .body{
      background-image: url('../../../static/images/selfSubQuestionWithinTen/background.png');
      background-size: 100% 100%;
    height: 100%;
    img{
        // width: 5%;
    }
    .question-container{
        width: 100%;
        height: 30%;
        padding: 0 20px;
        align-items: center;
        box-sizing: border-box;
    }
    .title{
        width: 40%;
    }
    .question-wrapper{
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .right-wrapper{
            width: 5vw;
            height: 5vw;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .right-img{
                width: 100%;
            }
            .hide{
                visibility: hidden;
            }
        }
        .question-item-wrapper{
            width: 5vw;
            height: 5vw;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 50%;
            }
            
        }
    }
    .ground-img{
        width: 100%;
        height: 5vh;
        background-image: url('../../../static/images/selfSubQuestionWithinTen/ground.png')
    }
    .middle-container{
        height: 30%;
        img{
            height: 100%;
            max-width: 50%;
        }
    }
    .bottom-container{
        height: 30%;
        align-items: center;
        padding: 0 20%;
        .choice-item-wrapper{
            background-image: url('../../../static/images/selfSubQuestionWithinTen/border.png');
            background-size: 100% 100%;
            width: 5vw;
            height: 5vw;
            align-items: center;
            display: flex;
            justify-content: center;
            position: relative;
            img{
                position: absolute;
                width: 50%;
            }
        }
    }
  }
}
</style>
