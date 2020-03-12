<template>
  <div class="six-to-eight-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="finish_five" src="static/audio/common/top_finish_five.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_1"
      class="stem-music"
      src="static/audio/sixToEight/stem_music_1.wav"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_2"
      class="stem-music"
      src="static/audio/sixToEight/stem_music_2.wav"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_3"
      class="stem-music"
      src="static/audio/sixToEight/stem_music_3.wav"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_4"
      class="stem-music"
      src="static/audio/sixToEight/stem_music_4.wav"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_5"
      class="stem-music"
      src="static/audio/sixToEight/stem_music_5.wav"
    >您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish"
      src="static/images/common/top_music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish"
      src="static/images/common/top_music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
      <div v-show="currentItem.type == 'first'">
        <div class="table-container">
          <div class="row-wrapper">
            <div class="img-wrapper">
              <div class="game-title-wrapper">{{currentItem.title}}</div>
            </div>
            <div class="total-number"><img class="total-img" :src="'static/images/sixToEight/'+currentItem.total+'.png'" alt=""></div>
          </div>
          <div class="row-wrapper" v-for="(img, index) in currentItem.rowNumber">
            <div class="img-wrapper table-cell">
              <img
                v-for="(img, index) in index+1"
                :src="'static/images/sixToEight/'+currentItem.leftImg+'.png'"
              />
              <img
                v-for="(img, index) in currentItem.total-index-1"
                :src="'static/images/sixToEight/'+currentItem.rightImg+'.png'"
                alt
              />
            </div>
            <div class="left-target-wrapper table-cell target" :name="index+1">
              <img
                class="right-img"
                :name="index+1"
                :src="'static/images/sixToEight/'+(index+1)+'.png'"
                alt
              />
            </div>
            <div class="right-target-wrapper table-cell target" :name="currentItem.total-index-1">
              <img
                class="right-img"
                :name="currentItem.total-index-1"
                :src="'static/images/sixToEight/'+(currentItem.total-index-1)+'.png'"
                alt
              />
            </div>
          </div>
        </div>
        <div class="drag-list-wrapper">
          <div class="drag-item-wrapper" v-for="(img, index) in currentItem.choiceList">
            <img
              :id="img+'_'+index"
              @touchmove="touchMove(img+'_'+index)"
              @touchstart="down(img+'_'+index)"
              @touchend="check(img)"
              class="drag-item"
              :src="'static/images/sixToEight/'+img+'.png'"
              alt
            />
          </div>
        </div>
      </div>
      <div v-show="currentItem.type == 'second'">
        <div class="game-title-wrapper">{{currentItem.title}}</div>
        <div class="question-wrapper">
          <div
            class="question-item-wrapper target"
            v-for="(item, index) in currentItem.questionList"
            :name="item.need"
          >
            <img
              v-show="!item.isRight"
              :id="item.img+'_'+index"
              class="drag-item"
              :src="'static/images/sixToEight/'+item.img+'.png'"
              alt
            />
            <img
              v-show="item.isRight"
              :id="item.img+'_'+index"
              class="drag-item"
              :src="'static/images/sixToEight/'+item.righrImg+'.png'"
              alt
            />
          </div>
        </div>
        <div class="answer-wrapper">
          <div class="answer-item-wrapper" :class="currentIndex==4?'last-game-answer-item':''" v-for="(img, index) in currentItem.answerList">
            <img
              :id="img+'_'+index"
              @touchmove="touchMove(img+'_'+index)"
              @touchstart="down(img+'_'+index)"
              @touchend="check(img)"
              class="drag-item"
              :src="'static/images/sixToEight/'+img+'.png'"
              alt
            />
          </div>
        </div>
      </div>
    </div>
    <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate"></top-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
import {getElementToPageLeft,getElementToPageTop} from '@/common/js/common'
export default {
  name: 'sixToEight',
  data () {
    return {
      position: {x: 0,y:0},
      currentIndex: 0,
      currentItem: {
            title: '数圆点，填组成',
            leftImg: 'circle_left',
            total: 8,
            rightImg: 'circle_right',
            choiceList: ''
      },
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
      {
          type: 'first',
          title: '数圆点，填组成',
          leftImg: 'circle_left',
          total: 6,
          rightImg: 'circle_right',
          rowNumber: 3,
          choiceList: ['1','2','3','3','4','5'],
          rightNumber: 6,
          currentRight: 0
      },{
          type: 'first',
          title: '数小兔，填组成',
          leftImg: 'rabit_left',
          total: 7,
          rightImg: 'rabit_right',
          rowNumber: 3,
          choiceList: ['1','2','3','4','5','6'],
          rightNumber: 6,
          currentRight: 0
      },{
          type: 'first',
          title: '数小鱼，填组成',
          leftImg: 'fish_left',
          total: 8,
          rightImg: 'fish_right',
          rowNumber: 4,
          choiceList: ['1','2','3','4','4','5','6','7'],
          rightNumber: 8,
          currentRight: 0
      },{
          type: 'second',
          title: '拖动点数到正确位置',
          questionList: [{img:'question_1',need:'answer_2',isRight: false,righrImg: 'question_1_finish'},{img: 'question_2',need: 'answer_1',isRight: false,righrImg: 'question_2_finish'},{img: 'question_3',need: 'answer_3',isRight: false,righrImg: 'question_3_finish'}],
          answerList: ['answer_1','answer_2','answer_3'],
          rightNumber: 3,
          currentRight: 0
      },{
          type: 'second',
          title: '拖动点数到正确位置',
          questionList: [{img:'question_4',need:'answer_4',isRight: false,righrImg: 'question_4_finish'},{img: 'question_5',need: 'answer_5',isRight: false,righrImg: 'question_5_finish'},{img: 'question_6',need: 'answer_6',isRight: false,righrImg: 'question_6_finish'}],
          answerList: ['answer_4','answer_5','answer_6'],
          rightNumber: 3,
          currentRight: 0
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
    let finish_five = document.getElementById("finish_five");
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
        _this.isFinish = true;
        _this.playAudio('finish_five')
      }else{
        let dragList = document.getElementsByClassName("drag-item");
        let rightImg = document.getElementsByClassName("right-img");
        for(let i = 0; i<dragList.length; i++){
          dragList[i].style.display = 'block';
          dragList[i].style.left= 'auto'
          dragList[i].style.top= 'auto'
        }
        for(let i = 0; i<rightImg.length; i++){
          rightImg[i].style.display = 'none';
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('stem_music_'+(_this.currentIndex+1))
        _this.musicActive = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true
    })
    _this.initiate();
  },
  methods: {
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
      let targetList = document.getElementsByClassName("target");
      for (let i = 0; i < targetList.length; i++) {
        let imgLeft = getElementToPageLeft(targetList[i]);
        let imgRight = imgLeft + targetList[i].clientWidth;
        let imgTop = targetList[i].offsetTop + 30 + 20;
        let imgBottom = imgTop + targetList[i].clientHeight;
        console.log(imgLeft, imgRight, imgTop, imgBottom);
        if (
          mouseX > imgLeft &&
          mouseX < imgRight &&
          mouseY > imgTop &&
          mouseY < imgBottom
        ) {
          console.log(item , targetList[i].getAttribute('name'))
          if (item == targetList[i].getAttribute('name')) {
            console.log("对了");
            moveDiv.style.display = 'none';
            targetList[i].firstChild.style.display = 'block'
            _this.currentItem.currentRight++;
            if(_this.currentItem.type=='second'){
              _this.currentItem.questionList[i].isRight = true
            }
            if (_this.currentItem.currentRight == _this.currentItem.rightNumber) {
              _this.canDrag = false;
              _this.playAudio("right_music");
              _this.currentIndex++;
            }

          } else {
            console.log("错了");
            moveDiv.style.top = 'auto';
            moveDiv.style.left = 'auto';
            _this.canDrag = false;
            _this.playAudio("please_think");
          }
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
      _this.playAudio('stem_music_'+(_this.currentIndex+1))
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
          _this.gameList[i].questionList[j].isRight = false;
        }
        _this.gameList[i].currentRight = 0;
      }
      _this.playAudio('stem_music_'+(_this.currentIndex+1))
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
@bodyHeight: calc(~"100% - 30px");
.six-to-eight-container {
  height: 100%;
  .body {
    background-image: url("../../../static/images/common/background.png");
    background-size: 100% 100%;
    height: @bodyHeight;
    padding-top: 20px;
    box-sizing: border-box;
    .game-title-wrapper {
      background-image: url("../../../static/images/common/cloud.png");
      background-size: 100% 125%;
      background-position: 0;
      width: 30vw;
      height: 20vh;
      line-height: 20vh;
      margin: 0 auto;
    }
    .table-container {
      width: 80%;
      margin: 0 auto;
      position: relative;
      .total-number {
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        bottom: 100%;
        height: 20vh;
        border: 1px solid #47b1f0;
        float: right;
        box-sizing: border-box;
        width: 40%;
        .total-img{
          width: 13%;
        }
      }
      .row-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        .table-cell {
          height: 10vh;
          border: 1px solid #47b1f0;
          box-sizing: border-box;
        }
        .img-wrapper {
          width: 60%;
          display: flex;
          align-items: center;
          justify-content: space-around;
          img {
            width: 30px;
            max-height: 100%;
          }
        }
        .left-target-wrapper {
          width: 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 100%;
          }
        }
        .right-target-wrapper {
          display: flex;
          width: 20%;
          justify-content: center;
          align-items: center;
          img {
            height: 100%;
          }
        }
      }
    }
    .drag-list-wrapper {
      width: 80%;
      display: flex;
      justify-content: space-around;
      align-content: center;
      margin: 20px auto 0;
      .drag-item-wrapper {
        display: flex;
        position: relative;
        width: 4vw;
        height: 15vh;
        .drag-item {
          position: absolute;
          width: 100%;
        }
      }
    }
    .answer-wrapper,
    .question-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .answer-item-wrapper{
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 15vw;
      height: 25vh;
      margin: 0 5vw;
      .drag-item {
        position: absolute;
        width: 100%;
      }
    }
    .last-game-answer-item{
      width: 6.7vw !important;
    }
    .question-item-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 15vw;
      height: 33.5vh;
      margin: 0 5vw;
      .drag-item {
        position: absolute;
        height: 100%;
      }
      .second-right-img{
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
    
    .target {
      .right-img {
        display: none;
      }
    }
  }
}
</style>
