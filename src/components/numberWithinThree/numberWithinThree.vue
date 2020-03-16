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
      <!-- <div class="one" v-if="currentIndex==0">
        <div class="pthree">
          <img src="/static/images/numberWithinThree/pthree.png" v-if="!currentItem.pthree" class="oneP" />
          <img src="/static/images/numberWithinThree/1.png" v-if="!currentItem.pthree" class="num" />
        </div>
        <img src="/static/images/numberWithinThree/pthree.png" @touchmove="touchMove('pthree')"
          @touchstart="down('pthree')" @touchend="check('pthree','one')" id="pthree" v-if="currentItem.pthree"
          class="pthree1" />
      </div> -->
      <div class="content" v-if="currentIndex==1">
        <div v-for="(item,index) in currentItem.img" :key="index" :style="item.style" class="pst" :class="item.id">
          <img :src="item.imgSrc" v-if="!item.pthree" class="picture" :style="item.rotate" />
          <img :src="item.numSrc" v-if="!item.pthree" class="num" />
        </div>
        <img v-for="(item,index) in currentItem.img" :key="'i'+index" :src="item.imgSrc" :style="item.choiceStyle"
          v-show="item.pthree" class="choicePst" @touchmove="touchMove(item.id)" @touchstart="down(item.id)"
          @touchend="check(item)" :id="item.id" />
      </div>
    </div>
    <top-class-complete v-if="isFinish&&!isFirstPage" @goBack="goBack" @initiate="initiate">
    </top-class-complete>
  </div>
</template>

<script>
import { disOrderArr } from '@/common/js/common'
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
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
      gameList: [
        {
          backImg: { backgroundImage: "url('../../../static/images/numberWithinThree/background2.png')" },
          pthree: true,
          choiceImg: 1,
          currentImg: 0,
        },
        {
          backImg: { backgroundImage: "url('../../../static/images/numberWithinThree/background3.png')" },
          img: [
            {
              imgSrc: '/static/images/numberWithinThree/pFLeft.png',
              numSrc: '/static/images/numberWithinThree/1.png',
              style: { top: "2%", left: "40%", width: "24%", height: "40%", transform: "rotate(-3deg)" },
              rotate: { transform: "rotate(3deg)" },
              choiceStyle: {
                width: "24%", height: "40%", top: "50%", left: "40%"
              },
              pthree: true,
              id: 'pthree',
              num: 'one',
            },
            {
              imgSrc: '/static/images/numberWithinThree/pFRight.png',
              numSrc: '/static/images/numberWithinThree/2.png',
              style: { top: "6.5%", left: "73%", width: "24%", height: "32%", transform: "rotate(-11deg)" },
              rotate: { transform: "rotate(9deg)" },
              choiceStyle: { width: "24%", height: "32%", top: "50%", left: "70%" },
              pthree: true,
              id: 'pthree1',
              num: 'two'
            }
          ],
          choiceImg: 2,
          currentImg: 0,
        }
      ]
    }
  },
  components: {
    commonHeader,
    topClassComplete
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
      setTimeout(function () {
        _this.isFirstPage = false;
      }, 500);
      page.play();
    })
    page.addEventListener("ended", function () {
      _this.canDrag = false;
      if (typeof (this.currentIndex) == 'undefined' || this.currentIndex < this.gameList.length) {
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
      _this.currentIndex = 1;
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.isFinish = false;
      // _this.canDrag = false;
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
      console.log(Div);
      let DivLeft = Div[0].x;
      let DivRight = DivLeft + Div[0].clientWidth;
      let DivTop = Div[0].y;
      let DivBottom = DivTop + Div[0].clientHeight;
      console.log(item, mouseX, DivLeft, DivRight, mouseY, DivTop, DivBottom);
      if (mouseX > DivLeft && mouseX < DivRight && mouseY > DivTop && mouseY < DivBottom) {
        item.pthree = false;
        _this.playAudio(item.num);
        this.currentItem.currentImg++;
        if (this.currentItem.currentImg == this.currentItem.choiceImg) {
          _this.playAudio("right_music");
        }
      } else {
        this.initialPosition.forEach(item1 => {
          if (item == item1.key) {
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
    .one {
      position: absolute;
      height: 100%;
      width: 100%;
      .pthree {
        position: absolute;
        top: 2%;
        left: 44%;
        width: 25%;
        height: 40%;
        transform: rotate(-3deg);
        .oneP {
          transform: rotate(3deg);
        }
        .num {
          margin-top: 30%;
          height: 60%;
        }
      }
      .pthree1 {
        position: absolute;
        top: 48%;
        left: 72%;
        display: block;
        width: 25%;
        height: 40%;
        transform: rotate(3deg);
      }
    }
    .content {
      position: absolute;
      height: 100%;
      width: 100%;
    }
    .pst {
      position: absolute;
      border: 1px solid blue;
      .picture {
        display: block;
        width: 100%;
        height: 100%;
      }
      .num {
        margin-top: 30%;
        height: 60%;
      }
    }
    .choicePst {
      position: absolute;
    }
  }
}
</style>
