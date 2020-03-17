<template>
  <div class="compare-six-to-ten-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="question1" src="static/audio/compareSixToTen/question1.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="question2" src="static/audio/compareSixToTen/question2.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem" src="static/audio/compareSixToTen/stem_music.mp3">您的浏览器不支持 audio
      标签。</audio>
    <audio id="sixSeven" class="stem-music" src="static/audio/compareSixToTen/67.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="sevenSix" class="stem-music" src="static/audio/compareSixToTen/76.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="eightSeven" class="stem-music" src="static/audio/compareSixToTen/87.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="eightNine" class="stem-music" src="static/audio/compareSixToTen/89.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="nineTen" class="stem-music" src="static/audio/compareSixToTen/910.mp3">您的浏览器不支持 audio 标签。</audio>
    <img class="music-img" @click="broadcast()" v-if="!musicActive && !isFinish" src="static/images/common/music.png" />
    <img class="music-img" v-if="musicActive && !isFinish" src="static/images/common/music_active.gif" />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <!-- 一个糖葫芦 -->
    <img src="/static/images/compareSixToTen/tanghulu.png" alt="" class="thlImg" id="thl" v-show="draging">
    <div v-if="!isFinish" class="body">
      <!-- 篮子 -->
      <img src="/static/images/compareSixToTen/basket.png" alt="" class="bask" @touchmove="touchMove('thl')"
        @touchstart="down('thl')" @touchend="check()">
      <!-- 左边人物 -->
      <div class="left-wrapper" @click="clickCompare(currentItem.canChoice,currentItem.rightChoice,'left')">
        <img :src="'/static/images/compareSixToTen/'+currentItem.leftImg+'.png'" alt="" :style="currentItem.leftCss"
          class="personImg">
        <img src="/static/images/compareSixToTen/stick.png" :style="currentItem.leftGCss" class="thlGImg" id="left" />
        <div :style="currentItem.leftGCss" class="stickImg">
          <img src="/static/images/compareSixToTen/tanghulu.png" alt="" v-for="item in currentItem.leftNeed" :key="item"
            v-show="item<=currentItem.leftCurrent"
            :class="(item==1)&&(currentItem.animation=='left')&&(currentItem.isWrong)? 'shake-ampliflvation' : ''"
            class="rThlImg">
        </div>
      </div>
      <!-- 右边人物 -->
      <div class="right-wrapper" @click="clickCompare(currentItem.canChoice,currentItem.rightChoice,'right')">
        <img :src="'/static/images/compareSixToTen/'+currentItem.rightImg+'.png'" alt="" :style="currentItem.rightCss"
          class="personImg">
        <img src="/static/images/compareSixToTen/stick.png" :style="currentItem.rightGCss" class="thlGImg" id="right" />
        <div :style="currentItem.rightGCss" class="stickImg">
          <img src="/static/images/compareSixToTen/tanghulu.png" alt="" class="rThlImg"
            v-for="item in currentItem.rightNeed" :key="item" v-show="item<=currentItem.rightCurrent"
            :class="(item==1)&&(currentItem.animation=='right')&&(currentItem.isWrong)? 'shake-ampliflvation' : ''">
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
  name: 'compareSixToTen',
  data () {
    return {
      position: { x: 0, y: 0 },
      currentIndex: 0,
      currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      draging: false,
      gameList: [
        {
          leftCss: {
            width: "120%",
            left: "10%",
            top: "5%"
          },
          leftGCss: {
            top: "5%",
            left: "108%",
          },
          rightCss: {
            width: "100%",
            left: "50%",
            top: "10%",
          },
          rightGCss: {
            top: "10%",
            left: "52%",
          },
          isWrong: false,
          rightChoice: 'left',
          animation: 'right',
          canChoice: false,
          leftImg: 'left1',
          audio: 'sixSeven',
          rightImg: 'right1',
          question: 'question2',
          leftCurrent: 0,
          rightCurrent: 0,
          leftNeed: 6,
          rightNeed: 7,
        }, {
          leftCss: {
            width: "120%",
            left: "10%",
            top: "20%"
          },
          leftGCss: {
            top: "2%",
            left: "25%",
            height: "42%",
          },
          rightCss: {
            width: "120%",
            left: "50%",
            top: "10%",
          },
          rightGCss: {
            top: "4%",
            left: "55%",
            height: "48%"
          },
          isWrong: false,
          rightChoice: 'left',
          animation: 'right',
          canChoice: false,
          leftImg: 'left2',
          audio: 'nineTen',
          rightImg: 'right2',
          question: 'question2',
          leftCurrent: 0,
          rightCurrent: 0,
          leftNeed: 9,
          rightNeed: 10,
        }, {
          leftCss: {
            width: "120%",
            left: "10%",
            top: "20%"
          },
          leftGCss: {
            top: "28%",
            left: "118%",
            height: "42%",
          },
          rightCss: {
            width: "140%",
            left: "50%",
            top: "20%",
          },
          rightGCss: {
            top: "15%",
            left: "78%",
            height: "45%"
          },
          isWrong: false,
          rightChoice: 'left',
          animation: 'right',
          canChoice: false,
          leftImg: 'left3',
          audio: 'eightNine',
          rightImg: 'right3',
          question: 'question2',
          leftCurrent: 8,
          rightCurrent: 9,
          leftNeed: 8,
          rightNeed: 9,
        }, {
          leftCss: {
            width: "120%",
            left: "10%",
            top: "10%"
          },
          leftGCss: {
            top: "25%",
            left: "105%",
            height: "40%",
          },
          rightCss: {
            width: "130%",
            left: "50%",
            top: "10%",
          },
          rightGCss: {
            top: "20%",
            left: "70%",
            height: "40%"
          },
          isWrong: false,
          rightChoice: 'left',
          animation: 'left',
          canChoice: false,
          leftImg: 'left4',
          audio: 'eightSeven',
          rightImg: 'right4',
          question: 'question1',
          leftCurrent: 0,
          rightCurrent: 0,
          leftNeed: 8,
          rightNeed: 7,
        }, {
          leftCss: {
            width: "140%",
            left: "10%",
            top: "10%"
          },
          leftGCss: {
            top: "10%",
            left: "125%",
            height: "40%",
          },
          rightCss: {
            width: "130%",
            left: "50%",
            top: "10%",
          },
          rightGCss: {
            top: "28%",
            left: "65%",
            height: "40%"
          },
          isWrong: false,
          rightChoice: 'left',
          animation: 'left',
          canChoice: false,
          leftImg: 'left5',
          audio: 'sevenSix',
          rightImg: 'right5',
          question: 'question1',
          leftCurrent: 0,
          rightCurrent: 0,
          leftNeed: 7,
          rightNeed: 6,
        }
      ],
    }
  },
  components: {
    commonHeader,
    commonComplete
  },
  mounted () {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stem = document.getElementById("stem");
    let stemMusicList = document.getElementsByClassName("stem-music");
    for (let i = 0, len = stemMusicList.length; i < len; i++) {
      eval("let " + stemMusicList[i].id + "=document.getElementById('" + stemMusicList.id + "');");
      stemMusicList[i].addEventListener("ended", function () {
        if (_this.currentIndex == _this.gameList.length) {
          _this.isFinish = true;
        } else {
          _this.currentItem = _this.gameList[_this.currentIndex];
          _this.currentItem.isWrong = false;
          _this.currentItem.canChoice = false;
          _this.currentItem.leftCurrent = 0;
          _this.currentItem.rightCurrent = 0;
          _this.playAudio('stem');
          _this.musicActive = true;
        }
      });
    }
    bg_music.addEventListener("canplaythrough", function () {
      bg_music.play();
    });
    stem.addEventListener("ended", function () {
      _this.canDrag = true;
      _this.musicActive = false;
    });
    please_think.addEventListener("ended", function () {
      _this.canDrag = true
    })
    _this.initiate();
  },
  methods: {
    //播放mp3
    playAudio (id) {
      let audioBtn = document.getElementById(id);
      audioBtn.currentTime = 0;
      audioBtn.play();
    },
    //播放当前题目
    broadcast () {
      let _this = this;
      _this.musicActive = true;
      _this.canDrag = false;
      _this.playAudio('stem');
    },
    //返回上一级
    goBack () {
      this.$router.go(-1);
    },
    //游戏初始化
    initiate () {
      let _this = this;
      _this.currentIndex = 0;
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.isFinish = false;
      _this.canDrag = false;
      _this.musicActive = true;
      _this.currentItem.isWrong = false;
      _this.currentItem.canChoice = false;
      _this.currentItem.leftCurrent = 0;
      _this.currentItem.rightCurrent = 0;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
      }
      _this.broadcast();
    },
    // 比较谁都谁少
    clickCompare (choice, right, id) {
      if (!choice) {
        return;
      }
      if (right == id) {
        this.currentItem.isWrong = true;
        this.playAudio(this.currentItem.audio);
        this.currentIndex++;
      } else {
        this.playAudio('please_think');
      }
    },
    // 拖动结束事件
    check () {
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
      let mouseY = event.changedTouches[0].pageY
      // 获取当前糖葫芦的位置
      let thlDiv = document.getElementById('thl');
      let thlDivLeft = thlDiv.x;
      let thlDivRight = thlDiv.x + thlDiv.clientHeight;
      // 糖葫芦棍的位置
      let thlGDiv = document.getElementsByClassName('thlGImg');
      for (let i = 0; i < thlGDiv.length; i++) {
        let thlGDivLeft = thlGDiv[i].x;
        let thlGDivRight = thlGDivLeft + thlGDiv[i].clientWidth;
        let thlGDivTop = thlGDiv[i].y;
        let thlGDivBottom = thlGDivTop + thlGDiv[i].clientHeight;
        _this.draging = false;
        _this.canDrag = false;
        if (thlDivLeft < thlGDivLeft && thlDivRight > thlGDivRight && mouseY > thlGDivTop && mouseY < thlGDivBottom) {
          // 判断移动到哪一个糖葫芦棍
          if (thlGDiv[i].id == 'left') {
            _this.currentItem.leftCurrent++;
            if (_this.currentItem.leftCurrent > _this.currentItem.leftNeed) {
              _this.currentItem.leftCurrent--;
              _this.playAudio('please_think');
            }
          } else {
            _this.currentItem.rightCurrent++;
            if (_this.currentItem.rightCurrent > _this.currentItem.rightNeed) {
              _this.currentItem.rightCurrent--;
              _this.playAudio('please_think');
            }
          }
          // 判断是否已经完成
          if (_this.currentItem.leftCurrent == _this.currentItem.leftNeed && _this.currentItem.rightCurrent == _this.currentItem.rightNeed) {
            // _this.currentIndex++;
            _this.playAudio(_this.currentItem.question);
            _this.currentItem.canChoice = true;
            _this.canDrag = false;
          } else {
            _this.canDrag = true;
          }
        } else {
          _this.canDrag = true;
        }
      }
    },
    //鼠标按下触发
    down (el) {
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
      console.log()
    },
    //拖动事件
    touchMove (el) {
      const _this = this;
      if (!_this.canDrag) {
        return;
      }
      _this.draging = true;
      let moveDiv = document.getElementById(el);
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      //防止出屏
      if (touch.clientX < 15 || touch.clientX > window.innerWidth - 15 || touch.clientY < 15 || touch.clientY > window.innerHeight - 15) {
        return;
      }
      let mouseX = event.changedTouches[0].pageX
      let mouseY = event.changedTouches[0].pageY
      moveDiv.style.left = mouseX + "px";
      moveDiv.style.top = mouseY + "px";
      //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
      document.addEventListener("touchmove", _this.preventDefault, { passive: false });
      document.addEventListener("touchend", function () {
        document.removeEventListener('touchmove', _this.preventDefault, false);
      }, { passive: false });
    },
  }
}
</script>

<style scoped lang='less'>
.compare-six-to-ten-container {
  height: 100%;
  background-image: url("../../../static/images/compareSixToTen/background.png");
  background-size: 100% 100%;
  .thlImg {
    position: absolute;
    width: 15px;
    z-index: 999;
  }
  .body {
    height: 100%;
    padding-top: 20%;
    .bask {
      display: inline-block;
      width: 20%;
      vertical-align: top;
      margin-top: 5%;
    }
    .right-wrapper,
    .left-wrapper {
      display: inline-block;
      width: 20%;
      vertical-align: top;
      position: relative;
      margin-top: -20%;
      height: 100%;
      .personImg {
        position: absolute;
      }
      .stickImg {
        position: absolute;
        width: 3%;
        height: 40%;
      }
      .thlGImg {
        position: absolute;
        width: 3%;
        height: 40%;
      }
      .rThlImg {
        width: 400%;
        margin-left: -135%;
        display: block;
        margin-top: 1px;
      }
    }
  }
}
</style>
