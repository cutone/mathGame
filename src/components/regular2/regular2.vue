<template>
  <div class="regular-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/finish_five.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_star"
      class="stem-music"
      src="static/audio/regular2/stem_music_star.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_circle"
      class="stem-music"
      src="static/audio/regular2/stem_music_circle.mp3"
    >您的浏览器不支持 audio 标签。</audio>

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
      <div class="regular-list-wrapper">
          <div class="line"></div>   
        <div class="flex-wrapper">
          <div
            class="regular-item-wrapper"
            v-for="(img, index1) in currentItem.regularList"
          >
            <img :src="'static/images/regular2/'+img+'.png'" alt />
          </div>
          <div
            class="regular-item-wrapper blank-item"
            v-for="(item, index2) in currentItem.blankList"
          >
            <img :src="'static/images/regular2/'+item.img+'.png'" alt />
          </div>
        </div>
      </div>
      <div class="choice-wrapper">
        <div class="flex-wrapper">
          <div
            class="choice-item-wrapper"
            v-for="(item, index) in currentItem.choiceList"
            :key="index"
          >
            <img
              class="choice-item"
              :id="'game'+currentIndex+'-el'+index"
              @touchmove="touchMove('game'+currentIndex+'-el'+index)"
              @touchstart="down('game'+currentIndex+'-el'+index)"
              @touchend="check(item,index)"
              :src="'static/images/regular2/'+item.img+'.png'"
              alt
            />
          </div>
        </div>
        <img class="corner" src="static/images/regular2/corner.png" />
      </div>
    </div>
    <complete v-if="isFinish" :img="completeImg" @goBack="goBack" @initiate="initiate"></complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import complete from "@/common/complete";
import { getElementToPageTop, getElementToPageLeft } from "@/common/js/common";
export default {
  name: "HelloWorld",
  data() {
    return {
        completeImg: 'static/images/common/middle_complete.gif',
      position: { x: 0, y: 0 },
      currentIndex: 0,
      currentItem: {},
      musicActive: true,
      canDrag: true,
      isFinish: false,
      gameList: [
        {
          audio: "stem_music_circle",
          isRight: false,
          choiceList: [
            { color: "circle_red", img: "circle_red" },
            { color: "circle_red", img: "circle_red" },
            { color: "circle_green", img: "circle_green" },
            { color: "circle_green", img: "circle_green" },
            { color: "circle_green", img: "circle_green" },
            { color: "circle_green", img: "circle_green" },
            { color: "circle_green", img: "circle_green" }
          ],
          regularList: [
            "circle_red",
            "circle_green",
            "circle_green",
            "circle_red",
            "circle_green"
          ],
          blankList: [
            { need: "circle_green", img: "" },
            { need: "circle_red", img: "" },
            { need: "circle_green", img: "" },
            { need: "circle_green", img: "" },
            { need: "circle_red", img: "" },
            { need: "circle_green", img: "" },
            { need: "circle_green", img: "" }
          ]
        },
        {
          audio: "stem_music_circle",
          isRight: false,
          choiceList: [
            { color: "circle_red", img: "circle_red" },
            { color: "circle_red", img: "circle_red" },
            { color: "circle_red", img: "circle_red" },
            { color: "circle_red", img: "circle_red" },
            { color: "circle_green", img: "circle_green" },
            { color: "circle_green", img: "circle_green" },
            { color: "circle_green", img: "circle_green" }
          ],
          regularList: [
            "circle_red",
            "circle_red",
            "circle_green",
            "circle_red",
            "circle_red",
          ],
          blankList: [
            { need: "circle_green", img: "" },
            { need: "circle_red", img: "" },
            { need: "circle_red", img: "" },
            { need: "circle_green", img: "" },
            { need: "circle_red", img: "" },
            { need: "circle_red", img: "" },
            { need: "circle_green", img: "" }
          ]
        },
        {
          audio: "stem_music_circle",
          isRight: false,
          choiceList: [
            { color: "circle_blue", img: "circle_blue" },
            { color: "circle_blue", img: "circle_blue" },
            { color: "circle_blue", img: "circle_blue" },
            { color: "circle_blue", img: "circle_blue" },
            { color: "circle_pink", img: "circle_pink" },
            { color: "circle_pink", img: "circle_pink" },
            { color: "circle_pink", img: "circle_pink" },
            { color: "circle_pink", img: "circle_pink" }
          ],
          regularList: [
            "circle_blue",
            "circle_blue",
            "circle_pink",
            "circle_pink",
          ],
          blankList: [
            { need: "circle_blue", img: "" },
            { need: "circle_blue", img: "" },
            { need: "circle_pink", img: "" },
            { need: "circle_pink", img: "" },
            { need: "circle_blue", img: "" },
            { need: "circle_blue", img: "" },
            { need: "circle_pink", img: "" },
            { need: "circle_pink", img: "" }
          ]
        },
        {
          audio: "stem_music_star",
          isRight: false,
          choiceList: [
            { color: "star_green", img: "star_green" },
            { color: "star_pink", img: "star_pink" },
            { color: "star_pink", img: "star_pink" },
            { color: "star_pink", img: "star_pink" },
            { color: "star_pink", img: "star_pink" },
          ],
          regularList: [
            "star_green",
            "star_pink",
            "star_pink",
            "star_green",
          ],
          blankList: [
            { need: "star_pink", img: "" },
            { need: "star_pink", img: "" },
            { need: "star_green", img: "" },
            { need: "star_pink", img: "" },
            { need: "star_pink", img: "" },
          ]
        },{
          audio: "stem_music_star",
          isRight: false,
          choiceList: [
            { color: "star_green", img: "star_green" },
            { color: "star_green", img: "star_green" },
            { color: "star_purple", img: "star_purple" },
            { color: "star_purple", img: "star_purple" },
          ],
          regularList: [
            "star_green",
            "star_green",
            "star_purple",
            "star_purple",
          ],
          blankList: [
            { need: "star_green", img: "" },
            { need: "star_green", img: "" },
            { need: "star_purple", img: "" },
            { need: "star_purple", img: "" },
          ]
        }
      ]
    };
  },
  components: {
    commonHeader,
    complete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stemMusicList = document.getElementsByClassName("stem-music");
    for (let i = 0, len = stemMusicList.length; i < len; i++) {
      eval(
        "let " +
          stemMusicList[i].id +
          "=document.getElementById('" +
          stemMusicList.id +
          "');"
      );
      stemMusicList[i].addEventListener("ended", function() {
        _this.canDrag = true;
        _this.musicActive = false;
      });
    }
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    stem_music_circle.addEventListener("canplaythrough", function() {
      stem_music_circle.play();
    });
    right_music.addEventListener("ended", function() {
      let choiceEleList = document.getElementsByClassName("choice-item");
      for (let i = 0; i < choiceEleList.length; i++) {
        choiceEleList[i].style.display = "block";
        choiceEleList[i].style.left = "0px";
        choiceEleList[i].style.top = "0px";
      }
      if (_this.currentIndex == _this.gameList.length) {
        _this.isFinish = true;
        _this.playAudio("complete");
      } else {
        _this.canDrag = true;
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio(_this.currentItem.audio)
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true;
    });
    _this.initiate();
  },
  methods: {
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
    check(item, index) {
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
      console.log(mouseX, mouseY);
      let moveDiv = event.target;
      let boxDiv = document.getElementsByClassName("blank-item");
      for (let i = 0, len = _this.currentItem.blankList.length; i < len; i++) {
        //获取四边的值
        let boxLeft = boxDiv[i].offsetLeft;
        // let boxLeft = getElementToPageLeft(boxDiv[i]);
        let boxRight = boxLeft + boxDiv[i].clientWidth;
        let boxTop = boxDiv[i].offsetTop;
        //   let boxTop = boxDiv.offsetTop;
        let boxBottom = boxTop + boxDiv[i].clientHeight;
        console.log(boxDiv[i].offsetLeft,getElementToPageLeft(boxDiv[i]))
        console.log(boxLeft, boxRight, boxTop, boxBottom);
        if (
          mouseX > boxLeft &&
          mouseX < boxRight &&
          mouseY > boxTop &&
          mouseY < boxBottom
        ) {
            console.log(_this.currentItem.blankList[i].need,item.color)
            if(_this.currentItem.blankList[i].need == item.color){
                console.log("对了");
                _this.currentItem.isRight = true;
                moveDiv.style.display = "none";
                _this.currentItem.blankList[i].img = item.color;
            } else {
                _this.canDrag = false;
                console.log("错了");
                _this.playAudio("please_think");
                moveDiv.style.left = "0px";
                moveDiv.style.top = "0px";
            }
        }
      }
      //如果blankList里的img有空的，就退出此方法
      for(let i = 0, len = _this.currentItem.blankList.length; i < len; i++){
          if(_this.currentItem.blankList[i].img == ''){
              return
          }
      }
      _this.currentIndex++;
      _this.playAudio('right_music')
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
      _this.playAudio("regular");
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
        for(let j = 0, blankLen = _this.gameList[i].blankList.length; j < blankLen; j++){
            _this.gameList[i].blankList[j].img = ''
        }
      }
      _this.playAudio(_this.currentItem.audio);
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.regular-container {
  position: relative;
  height: 100%;
  .body {
    height: 100%;
    background-image: url("../../../static/images/regular2/background.png");
    background-size: 100% 100%;
    .choice-wrapper {
      height: 50%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .flex-wrapper {
        background-image: url("../../../static/images/regular2/border.png");
        background-size: 100% 100%;
        width: 50%;
        height: 80px;
        align-items: center;
      }
      .corner {
        height: 100%;
      }
      .choice-item-wrapper {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 60px;
        img {
          position: absolute;
          width: 100%;
          left: 0;
          z-index: 10;
        }
      }
    }
    .regular-list-wrapper {
      width: 90%;
      height: 50%;
      margin: 0 auto;
      .line{
          width: 90%;
          height: 2px;
          background: #000;
          position: absolute;
            top: 32%;
      }
      .regular-item-wrapper {
        width: 40px;
        height: 40px;
        box-sizing: border-box;
        border-radius: 60px;
        background: #fff;
        z-index: 10;
      }
      .flex-wrapper {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        align-items: center;
      }
      img {
        width: 100%;
      }
      .right_mark {
        position: relative;
        bottom: 30px;
        width: 40px;
      }
      .question-mark {
        width: 100%;
        height: auto;
        margin: -5px 0 0 2px;
      }
    }
  }
}
</style>
