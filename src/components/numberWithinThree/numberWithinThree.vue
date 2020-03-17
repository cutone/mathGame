<template>
  <div class="number-within-ten-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="finish_five" src="static/audio/common/bottom_complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="first_page" src="static/audio/numberWithinThree/first.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="page" src="static/audio/numberWithinThree/page.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="tTF" src="static/audio/numberWithinThree/tTF.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem_music" id="six" src="static/audio/numberWithinThree/six.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem" id="one" src="static/audio/numberWithinThree/one.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem" id="two" src="static/audio/numberWithinThree/two.wav">您的浏览器不支持 audio 标签。</audio>
    <audio class="stem" id="three" src="static/audio/numberWithinThree/three.wav">您的浏览器不支持 audio 标签。</audio>
    <div class="first" v-if="isFirstPage">
      <img src="/static/images/numberWithinThree/tips2.png" class="shake-opacity" />
    </div>
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish&&!isFirstPage"></common-header>
    <div v-if="!isFinish&&!isFirstPage" class="body" :style="currentItem.backImg">
      <div class="content">
        <div v-for="(item,index) in currentItem.img" :key="index" :style="item.style" class="pst" :class="item.id">
          <img :src="item.imgSrc" v-if="!item.pthree" class="picture" :style="item.rotate" />
          <img :src="item.numSrc" v-if="!item.pthree" class="num" :style="item.numStyle" />
        </div>
        <img v-for="(item,index) in currentItem.img" :key="'i'+index" :src="item.imgSrc" :style="item.choiceStyle"
          v-show="item.pthree" class="choicePst" @touchmove="touchMove(item.id)" @touchstart="down(item.id)"
          @touchend="check(item)" :id="item.id" />
      </div>
    </div>
    <miqi-complete v-if="isFinish&&!isFirstPage" @goBack="goBack" @initiate="initiate">
    </miqi-complete>
  </div>
</template>

<script>
import { disOrderArr } from '@/common/js/common'
import commonHeader from "@/common/commonHeader";
import miqiComplete from "@/common/miqiComplete";
export default {
  name: 'numberWithinThree',
  data () {
    return {
      position: {
        x: 0,
        y: 0
      },
      currentIndex: 0,
      canDrag: false,
      isFinish: false,
      isFirstPage: true,
      currentItem: {},
      initialPosition: [],
      gameList2: [],
      gameList: [
        {
          backImg: { backgroundImage: "url('../../../static/images/numberWithinThree/background2.png')" },
          img: [
            {
              imgSrc: '/static/images/numberWithinThree/pT.png',
              numSrc: '',
              style: { top: "2%", left: "44%", width: "25%", height: "40%", transform: "rotate(-3deg)" },
              rotate: { transform: "rotate(3deg)" },
              choiceStyle: {
                width: "25%", height: "40%", top: "45%", left: "70%"
              },
              pthree: true,
              id: 'pthree',
            }
          ],
          choiceImg: 1,
          currentImg: 0,
        },
        {
          backImg: { backgroundImage: "url('../../../static/images/numberWithinThree/background3.png')" },
          img: [
            {
              imgSrc: '/static/images/numberWithinThree/pFLeft.png',
              numSrc: '',
              style: { top: "2%", left: "40%", width: "24%", height: "40%", transform: "rotate(-3deg)" },
              rotate: { transform: "rotate(3deg)" },
              choiceStyle: {
                width: "24%", height: "40%", top: "50%", left: "40%"
              },
              pthree: true,
              id: 'pthree',
            },
            {
              imgSrc: '/static/images/numberWithinThree/pFRight.png',
              numSrc: '',
              style: { top: "6.5%", left: "73%", width: "24%", height: "32%", transform: "rotate(-11deg)" },
              rotate: { transform: "rotate(9deg)" },
              choiceStyle: { width: "24%", height: "32%", top: "50%", left: "70%" },
              pthree: true,
              id: 'pthree1',
            }
          ],
          choiceImg: 2,
          currentImg: 0,
        },
        {
          backImg: { backgroundImage: "url('../../../static/images/numberWithinThree/background4.png')" },
          img: [
            {
              imgSrc: '/static/images/numberWithinThree/pFvLeft.png',
              numSrc: '',
              style: { top: "19%", left: "5.5%", width: "22%", height: "52%", transform: "rotate(-14.8deg)" },
              rotate: { transform: "rotate(16deg)" },
              numStyle: { height: "30%", marginTop: "12%" },
              choiceStyle: { width: "22%", height: "52%", top: "40%", left: "40%", transform: "rotate(-2deg)" },
              pthree: true,
              id: 'pthree',
            },
            {
              imgSrc: '/static/images/numberWithinThree/pFvRight.png',
              numSrc: '',
              style: { top: "8.5%", left: "29%", width: "22%", height: "52%", transform: "rotate(-14.8deg)" },
              rotate: { transform: "rotate(16deg)" },
              numStyle: { height: "30%", marginTop: "12%" },
              choiceStyle: { width: "22%", height: "52%", top: "35%", left: "60%", transform: "rotate(-2deg)" },
              pthree: true,
              id: 'pthree1',
            }
          ],
          choiceImg: 2,
          currentImg: 0,
        },
        {
          backImg: { backgroundImage: "url('../../../static/images/numberWithinThree/background5.png')" },
          img: [
            {
              imgSrc: '/static/images/numberWithinThree/pSLeft.png',
              numSrc: '',
              style: { top: "10%", left: "18%", width: "21%", height: "37%", transform: "rotate(13deg)" },
              rotate: { transform: "rotate(-10deg)" },
              choiceStyle: { width: "22%", height: "37%", top: "50%", left: "20%", transform: "rotate(-4deg)" },
              pthree: true,
              id: 'pthree',
            },
            {
              imgSrc: '/static/images/numberWithinThree/pSCenter.png',
              numSrc: '',
              style: { top: "2%", left: "47%", width: "21.5%", height: "40%", transform: "rotate(-3deg)" },
              rotate: { transform: "rotate(4deg)" },
              choiceStyle: { width: "21.5%", height: "40%", top: "50%", left: "50%", transform: "rotate(-2deg)" },
              pthree: true,
              id: 'pthree1',
            },
            {
              imgSrc: '/static/images/numberWithinThree/pSRight.png',
              numSrc: '/',
              style: { top: "7%", left: "76.5%", width: "21.5%", height: "32%", transform: "rotate(-10deg)" },
              rotate: { transform: "rotate(9deg)" },
              choiceStyle: { width: "21.5%", height: "32%", top: "50%", left: "80%", transform: "rotate(-0deg)" },
              pthree: true,
              id: 'pthree2',
            }
          ],
          choiceImg: 3,
          currentImg: 0,
        }
      ]
    }
  },
  components: {
    commonHeader,
    miqiComplete
  },
  mounted () {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stemMusicList = document.getElementsByClassName("stem_music");
    let page = document.getElementById("page");
    for (let i = 0, len = stemMusicList.length; i < len; i++) {
      eval("let " + stemMusicList[i].id + "=document.getElementById('" + stemMusicList.id + "');");
      stemMusicList[i].addEventListener("ended", function () {
        _this.canDrag = true;
      });
    }
    let stemList = document.getElementsByClassName("stem");
    for (let i = 0, len = stemList.length; i < len; i++) {
      eval("let " + stemList[i].id + "=document.getElementById('" + stemList.id + "');");
    }
    bg_music.addEventListener("canplaythrough", function () {
      bg_music.play();
    });
    first_page.addEventListener("canplaythrough", function () {
      first_page.play();
    });
    first_page.addEventListener("ended", function () {
      _this.isFirstPage = false;
    })
    page.addEventListener("ended", function () {
      _this.canDrag = false;
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.currentItem.currentImg = 0;
      _this.currentItem.img.forEach(item => {
        item.pthree = true;
      })
      if (_this.currentIndex + 1 < _this.gameList.length) {
        stemMusicList[0].play();
      } else {
        stemMusicList[1].play();
      }
    })
    please_think.addEventListener("ended", function () {
      _this.canDrag = true;
    })
    right_music.addEventListener("ended", function () {
      _this.currentIndex++;
      if (_this.currentIndex == _this.gameList.length) {
        _this.isFinish = true;
      } else {
        _this.initialPosition = [];
        page.play();
      }
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
    //返回上一级
    goBack () {
      this.$router.go(-1);
    },
    //游戏初始化
    initiate () {
      let _this = this;
      _this.gameList2 = _this.gameList;
      _this.currentIndex = 0;
      _this.isFirstPage = true;
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.currentItem.currentImg = 0;
      _this.currentItem.img.forEach(item => {
        item.pthree = true;
      })
      _this.isFinish = false;
      _this.playAudio("first_page")
      setTimeout(function () {
        _this.playAudio("page");
      }, 3000);
    },
    //检查是否正确
    check (item) {
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
      let moveDiv = event.target;
      let mouseX = event.changedTouches[0].pageX;
      let mouseY = event.changedTouches[0].pageY;
      let Div = document.getElementsByClassName(item.id);
      let DivLeft = Div[0].offsetLeft;
      let DivRight = DivLeft + Div[0].clientWidth;
      let DivTop = Div[0].offsetTop;
      let DivBottom = DivTop + Div[0].clientHeight;
      console.log(item, mouseX, DivLeft, DivRight, mouseY, DivTop, DivBottom);
      if (mouseX > DivLeft && mouseX < DivRight && mouseY > DivTop && mouseY < DivBottom) {
        item.pthree = false;
        this.currentItem.currentImg++;
        if (this.currentItem.currentImg == 1) {
          item.numSrc = "/static/images/numberWithinThree/1.png";
          _this.playAudio("one");
        } else if (this.currentItem.currentImg == 2) {
          item.numSrc = "/static/images/numberWithinThree/2.png";
          _this.playAudio("two");
        } else if (this.currentItem.currentImg == 3) {
          item.numSrc = "/static/images/numberWithinThree/3.png";
          _this.playAudio("three");
        }
        if (this.currentItem.currentImg == this.currentItem.choiceImg) {
          _this.playAudio("right_music");
        }
      } else {
        this.initialPosition.forEach(item1 => {
          if (item.id == item1.key) {
            moveDiv.style.top = item1.y;
            moveDiv.style.left = item1.x;
            _this.canDrag = false;
            _this.playAudio("please_think");
          }
        })
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
      let result = this.initialPosition.some(item => {
        return el == item.key;
      })
      if (!result) {
        this.initialPosition.push({
          key: el,
          x: this.dx + 'px',
          y: this.dy + 'px',
          isCanChoice: true,
        })
      }
    },
    //拖动事件
    touchMove (el) {
      const _this = this;
      let moveDiv = document.getElementById(el);
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
        function () {
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
.number-within-ten-container {
  height: 100%;
  .first {
    position: relative;
    height: 100%;
    background-image: url("../../../static/images/numberWithinThree/background1.png");
    background-size: 100% 100%;
    background-position: 0 150%;
    img {
      position: absolute;
      display: flex;
      width: 30%;
      top: 25%;
      left: 40%;
    }
  }
  .body {
    position: relative;
    height: 100%;
    background-size: 100% 110%;
    background-position: 0 150%;
    .content {
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .pst {
      position: absolute;
    }
    .picture {
      display: block;
      width: 100%;
      height: 100%;
    }
    .num {
      margin-top: 30%;
      height: 60%;
    }
    .choicePst {
      position: absolute;
    }
  }
}
</style>
