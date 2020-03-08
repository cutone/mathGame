<template>
  <div class="middle-class-menu-container">
    <audio id="bg_music" loop="loop" src="static/audio/splitAndCombination/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/splitAndCombination/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/splitAndCombination/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_keystone" src="static/audio/splitAndCombination/selt_keystone.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_rectangular" src="static/audio/splitAndCombination/selt_rectangular.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_square" src="static/audio/splitAndCombination/selt_square.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_triangle" src="static/audio/splitAndCombination/selt_triangle.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_house" src="static/audio/splitAndCombination/selt_house.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_fish" src="static/audio/splitAndCombination/selt_fish.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_chicken" src="static/audio/splitAndCombination/selt_chicken.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_car" src="static/audio/splitAndCombination/selt_car.mp3">您的浏览器不支持 audio 标签。</audio>
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div class="game-list" v-if="!isFinish">
      <div class="game-item">
        <div class="game-title">
          <div class="game-title-left" v-if="currentIndex<4">
            <img class="game-title-leftImg" :src="titleImgList[currentIndex]" alt="">
          </div>
          <div class="game-title-right">
            <span class="game-title-text">{{currentItem.title}}</span>
            <img class="game-title-img" src="static/images/splitAndCombination/question.png" alt="">
          </div>
        </div>
        <div class="choose-item-wrapper">
          <div class="topFour" v-if="currentIndex<4">
            <div class="choose-item left-item" @click="choose('left', currentItem)">
              <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.leftImg"
                alt="">
            </div>
            <img v-if="currentItem.isLeft=='left'" class="right-img" src="static/images/splitAndCombination/right.png"
              alt="">
          </div>
          <div class="topFour" v-if="currentItem.centerImg&&currentIndex<4">
            <div class="choose-item left-item" @click="choose('center', currentItem)">
              <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.centerImg"
                alt="">

            </div>
            <img v-if="currentItem.isCenter=='center'" class="right-img"
              src="static/images/splitAndCombination/right.png" alt="">
          </div>
          <div class="topFour" v-if="currentIndex<4">
            <div class="choose-item right-item" @click="choose('right', currentItem)">
              <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.rightImg"
                alt="">
            </div>
            <img v-if="currentItem.isRight=='right'" class="right-img" src="static/images/splitAndCombination/right.png"
              alt="">
          </div>
          <div class="topFive" v-if="currentIndex==4">
            <div class="left">
              <img class="one" :src="'static/images/splitAndCombination/'+gameList[currentIndex].img[0]+'.png'"
                @touchmove="touchMove(gameList[currentIndex].img[0])" @touchstart="down(gameList[currentIndex].img[0])"
                @touchend="check()" :id="gameList[currentIndex].img[0]">
              <img class="two" :src="'static/images/splitAndCombination/'+gameList[currentIndex].img[1]+'.png'"
                @touchmove="touchMove(gameList[currentIndex].img[1])" @touchstart="down(gameList[currentIndex].img[1])"
                @touchend="check()" :id="gameList[currentIndex].img[1]">
              <img class="three" :src="'static/images/splitAndCombination/'+gameList[4].img[2]+'.png'"
                @touchmove="touchMove(gameList[currentIndex].img[2])" @touchstart="down(gameList[currentIndex].img[2])"
                @touchend="check()" :id="gameList[currentIndex].img[2]">
              <img class="four" :src="'static/images/splitAndCombination/'+gameList[4].img[3]+'.png'"
                @touchmove="touchMove(gameList[currentIndex].img[3])" @touchstart="down(gameList[currentIndex].img[3])"
                @touchend="check()" :id="gameList[currentIndex].img[3]">
            </div>
            <div class="right">
              <img src='static/images/splitAndCombination/border2.png' class="back">
              <img src='static/images/splitAndCombination/rHouse.png' class="small">
              <img src='static/images/splitAndCombination/rHouse1.png' class="small1">
              <img src='static/images/splitAndCombination/rHouse2.png' class="small2">
              <img src='static/images/splitAndCombination/rHouse3.png' class="small3">
            </div>
          </div>
          <div class="topSix" v-if="currentIndex==5">
            <div class="left"></div>
            <div class="right">
              <img src='static/images/splitAndCombination/border2.png'>
            </div>
          </div>
          <div class="topSenven" v-if="currentIndex==6">
            <div class="left"></div>
            <div class="right">
              <img src='static/images/splitAndCombination/border2.png'>
            </div>
          </div>
          <div class="topEight" v-if="currentIndex==7">
            <div class="left"></div>
            <div class="right">
              <img src='static/images/splitAndCombination/border2.png'>
            </div>
          </div>
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
export default {
  name: 'splitAndCombination',
  data () {
    return {
      position: { x: 0, y: 0 },
      currentIndex: 0,
      currentItem: {},
      isFinish: true,
      musicActive: true,
      canChoose: false,
      selt_canChoose: [],
      canDrag: false,
      titleImgList: [
        'static/images/splitAndCombination/titleRectangular.png',
        'static/images/splitAndCombination/rectangular.png',
        'static/images/splitAndCombination/quad.png',
        'static/images/splitAndCombination/pinkTriangle.png'
      ],
      gameList: [
        {
          title: '正方形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/splitRectangular.png',
          rightImg: 'static/images/splitAndCombination/splitTriangle.png',
          rightChoice: ['left', '', 'right'],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 2,
          isWrong: false,
          audioType: 'selt_square'
        },
        {
          title: '长方形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/purpleKeystone.png',
          centerImg: 'static/images/splitAndCombination/purpleTriangle.png',
          rightImg: 'static/images/splitAndCombination/purpleSquare.png',
          rightChoice: ['', 'center', 'right'],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 2,
          isWrong: false,
          audioType: 'selt_rectangular'
        },
        {
          title: '梯形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/blueRectangular.png',
          centerImg: 'static/images/splitAndCombination/blueTriangle.png',
          rightImg: 'static/images/splitAndCombination/blueQuad.png',
          rightChoice: ['left', 'center', 'right'],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 3,
          isWrong: false,
          audioType: 'selt_keystone'
        },
        {
          title: '三角形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/pinkTriangle.png',
          centerImg: 'static/images/splitAndCombination/pinkKeystone.png',
          rightImg: 'static/images/splitAndCombination/pinkQuad.png',
          rightChoice: ['left', 'center', ''],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 2,
          isWrong: false,
          audioType: 'selt_triangle'
        },
        {
          title: '请用给出的图形拼出一座房子',
          img: ['house_one', 'house_two', 'house_three', 'house_four'],
          leftImg: 'static/images/trapezoid/box.png',
          rightImg: 'static/images/trapezoid/trapezoid5.png',
          rightChoice: 'right',
          isRight: false,
          isWrong: false,
          audioType: 'select_trapezoid'
        },
        {
          title: '请用给出的图形拼出两条鱼',
          leftImg: 'static/images/trapezoid/box.png',
          rightImg: 'static/images/trapezoid/trapezoid5.png',
          rightChoice: 'right',
          isRight: false,
          isWrong: false,
          audioType: 'select_trapezoid'
        },
        {
          title: '请用给出的图形拼出一只小鸡',
          leftImg: 'static/images/trapezoid/box.png',
          rightImg: 'static/images/trapezoid/trapezoid5.png',
          rightChoice: 'right',
          isRight: false,
          isWrong: false,
          audioType: 'select_trapezoid'
        },
        {
          title: '请用给出的图形拼出一辆车',
          leftImg: 'static/images/trapezoid/box.png',
          rightImg: 'static/images/trapezoid/trapezoid5.png',
          rightChoice: 'right',
          isRight: false,
          isWrong: false,
          audioType: 'select_trapezoid'
        },
      ]
    }
  },
  components: {
    commonHeader,
    redComplete
  },
  created () {
    let _this = this;
    _this.isFinish = false;
    _this.currentIndex = 0;
    for (let i = 0, len = _this.gameList.length; i < len; i++) {
      _this.gameList[i].isRight = false;
    }
    _this.currentItem = _this.gameList[_this.currentIndex];
  },
  mounted () {
    let _this = this;
    _this.currentIndex = 0;
    this.$nextTick(() => {
      let bg_music = document.getElementById('bg_music');
      let right_music = document.getElementById('right_music');
      let please_think = document.getElementById('please_think');
      let selt_keystone = document.getElementById('selt_keystone');
      let selt_rectangular = document.getElementById('selt_rectangular');
      let selt_square = document.getElementById('selt_square');
      let selt_triangle = document.getElementById('selt_triangle');
      bg_music.addEventListener("canplaythrough", function () {
        bg_music.play();
      });
      selt_square.addEventListener("canplaythrough", function () {
        selt_square.play();
      });

      //每次题目mp3后播放背景音乐
      selt_square.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      selt_rectangular.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      selt_keystone.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      selt_triangle.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      selt_house.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      selt_fish.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      selt_chicken.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      selt_car.addEventListener("ended", function () {
        _this.musicActive = false;
        _this.canChoose = true;
      })
      //正确提示mp3播放后
      right_music.addEventListener("ended", function () {
        _this.currentIndex++;
        if (_this.currentIndex == 7) {
          //播放答对五道题的mp3
          _this.playAudio('finish_five');
          _this.isFinish = true;
        } else {
          //修改题目下标，播放题目

          _this.currentItem = _this.gameList[_this.currentIndex];
          _this.playAudio(_this.gameList[_this.currentIndex].audioType)
          _this.musicActive = true;
          _this.canChoose = false;
        }
      })
      please_think.addEventListener("ended", function () {
        _this.canChoose = true;
      })
    })
  },
  beforeDestroy () {
    let _this = this;
    _this.isFinish = false;
    _this.currentIndex = 0;
    _this.currentItem = _this.gameList[_this.currentIndex];
  },
  methods: {
    //播放游戏规则
    playAudio (id) {
      let audioBtn = document.getElementById(id);
      audioBtn.currentTime = 0;
      audioBtn.play();
    },
    goBack () {
      this.$router.go(-1);
    },
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
      let mouseX = event.changedTouches[0].pageX;
      let mouseY = event.changedTouches[0].pageY;
      console.log(mouseX, mouseY)
      let moveDiv = event.target;
      let LightList = document.getElementsByClassName("target-ele");
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
          console.log(_this.currentItem.type + '_' + _this.colorList[i].color)
          console.log()
          if (_this.currentItem.type + '_' + _this.colorList[i].color == moveDiv.id) {
            console.log("对了");
            moveDiv.style.display = 'none';
            _this.colorList[i].isRight = true;

          } else {
            console.log("错了");
            moveDiv.style.top = '0px';
            moveDiv.style.left = '0px';
            _this.canDrag = false;
            _this.playAudio("please_think");
          }
        }
      }
      for (let i = 0; i < _this.colorList.length; i++) {
        if (_this.colorList[i].isRight == false) {
          return
        }
      }
      _this.currentIndex++;
      _this.playAudio('right_music')
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
      console.log(this.position.x, this.position.y)
    },
    //选择答案
    choose (choiceItem, item) {
      let _this = this;
      let selt_canChoose = _this.selt_canChoose.some(item1 => {
        return choiceItem == item1;
      })
      if (selt_canChoose) {
        return;
      }
      let result = item.rightChoice.some(item1 => {
        return choiceItem == item1
      })
      if (result) {
        _this.selt_canChoose.push(choiceItem);
        item.count++;
        switch (choiceItem) {
          case 'left':
            item.isLeft = choiceItem;

            break;
          case 'center':
            item.isCenter = choiceItem;
            break;
          case 'right':
            item.isRight = choiceItem;
            break;
        }
        if (item.count == item.right) {
          _this.selt_canChoose = [];
          _this.canChoose = false;
          _this.playAudio('right_music');
        }
      }
      else {
        item.isWrong = true;
        _this.playAudio('please_think');
      }
    },
    //拖动事件
    touchMove (el) {
      const _this = this;
      let moveDiv = document.getElementById(el);
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
    //播放题目
    broadcast () {
      let _this = this;
      _this.musicActive = true;
      _this.canChoose = false;
      _this.playAudio(_this.gameList[_this.currentIndex].audioType)
    },

    //重做
    initiate () {
      let _this = this;
      _this.isFinish = false;
      _this.currentIndex = 0;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
      }
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.playAudio(_this.gameList[_this.currentIndex].audioType)
      _this.musicActive = true;
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/doudong.css";
@headerHeight: 30px;
@bodyHeight: calc(~"100% - 30px");
.middle-class-menu-container {
  background-image: url("../../../static/images/splitAndCombination/background.png");
  background-size: 100% 100%;
  height: 100%;
  box-sizing: border-box;
  .game-list {
    height: @bodyHeight;
    .game-item {
      height: 100%;
    }
    .game-title {
      display: flex;
      width: 100%;
      height: 30%;
      margin: 0 auto;
      justify-content: center;
      &-left {
        height: 100%;
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        .game-title-leftImg {
          display: block;
          height: 80%;
          margin-left: 10%;
        }
      }
      &-right {
        height: 100%;
        width: 50%;
        position: relative;
        margin: 0 auto;
        .game-title-img {
          position: absolute;
          display: block;
          width: 80%;
          height: 80px;
          top: 18%;
          left: 10%;
        }
        .game-title-text {
          position: absolute;
          left: 0;
          z-index: 2;
          width: 80%;
          left: 10%;
          text-align: center;
          line-height: 100px;
          color: #69473d;
        }
      }
    }
    .choose-item-wrapper {
      width: 100%;
      height: 60%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .topFour {
        width: 30%;
        height: 100%;
        .choose-item {
          display: inline-block;
          padding: 6% 0;
          box-sizing: border-box;
          margin: 20px 30px;
          margin-bottom: 0;
          width: 70%;
          height: 60%;
          background-image: url("../../../static/images/splitAndCombination/border.png");
          background-size: 100% 100%;
          vertical-align: middle;
          .choice-img {
            margin-top: 20%;
            width: 50%;
          }
          .shake-animation {
            animation-name: shaky-slow;
            animation-duration: 2s; // 动画执行时间
            animation-delay: 0s; // 动画等待时间
            animation-iteration-count: 1; // 动画执行次数，infinite为一直执行
            animation-timing-function: ease-in-out; // 动画执行速度
            animation-delay: 0s; // 动画延时时间
            animation-play-state: running; // 动画执行状态，一般没必要parse
          }
        }
        .right-img {
          width: 50%;
        }
      }
      .topFive {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .left {
          position: relative;
          width: 40%;
          height: 80%;
          .one {
            position: absolute;
            width: 40%;
            height: 40%;
            top: 10px;
            left: 10px;
            z-index: 10;
          }
          .two {
            position: absolute;
            width: 50%;
            height: 40%;
            top: 10px;
            left: 50%;
            z-index: 10;
          }
          .three {
            position: absolute;
            width: 10%;
            height: 15%;
            top: 50%;
            left: 10px;
            z-index: 10;
          }
          .four {
            position: absolute;
            width: 10%;
            height: 40%;
            top: 50%;
            left: 50%;
            z-index: 10;
          }
        }
        .right {
          width: 40%;
          height: 80%;
          position: relative;
          .back {
            position: absolute;
            left: 0;
            width: 80%;
            height: 100%;
          }
          .small {
            position: absolute;
            left: 15%;
            top: 3%;
            width: 50%;
            height: 40%;
          }
          .small1 {
            position: absolute;
            left: 15%;
            top: 43%;
            width: 50%;
            height: 40%;
          }
          .small2 {
            position: absolute;
            left: 20%;
            top: 50%;
            width: 15%;
            height: 15%;
          }
          .small3 {
            position: absolute;
            left: 45%;
            top: 58%;
            width: 12%;
            height: 25%;
          }
        }
      }
    }
  }
}
</style>
