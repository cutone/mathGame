<template>
  <div class="left-and-right-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <common-header :game-list="[]" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
      <div class="choice-list-wrapper">
        <div
          class="choice-item-wrapper"
          v-for="(item, index) in currentItem.answerList"
          :key="index"
          :data-target="item.target"
        >
          <img class="game-img" 
            @touchmove="touchMove(item.img)"
            @touchstart="down(item.img)"
            @touchend="check(item)"  
            :id="item.img" 
            :src="'static/images/learnZero/'+item.img+'.png'" />
        </div>
      </div>
      <div class="right-container">
        <div class="flex-wrapper" v-for="(item, index) in currentItem.questionList" :key="index">
            <div class="light-img-wrapper"  :id="item.need" >
                <img
                    class="game-img light-img"
                    v-show="item.isRight"
                    :src="'static/images/learnZero/'+item.need+'.png'"
                />
          </div> 
          <img
            class="game-img"
            :data-target="item.target"
            :id="item.img"
            :key="index"
            :src="'static/images/learnZero/'+item.img+'.png'"
          />
        </div>
      </div>
    </div>
    <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate"></top-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
import { getElementToPageLeft, getElementToPageTop, disOrderArr } from "@/common/js/common";
export default {
  name: "learnZero",
  data() {
    return {
        position: {x: 0, y:0},
      currentIndex: 0,
      currentItem: {
        rightNumber: 0,
        answerList: [
            { img: "number_0", target: "flower_0"},
          { img: "number_1", target: "flower_1"},
          { img: "number_2", target: "flower_2"},
          { img: "number_3", target: "flower_3"},
          { img: "number_4", target: "flower_4"},
        ],
        questionList: [
          { img: "flower_0", need: "number_0", isRight: false },
          { img: "flower_1", need: "number_1", isRight: false },
          { img: "flower_2", need: "number_2", isRight: false },
          { img: "flower_3", need: "number_3", isRight: false },
          { img: "flower_4", need: "number_4", isRight: false }
        ]
      },
      musicActive: true,
      canDrag: false,
      isFinish: false
    };
  },
  components: {
    commonHeader,
    topClassComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let please_think = document.getElementById("please_think");
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });

    right_music.addEventListener("ended", function() {
      _this.isFinish = true;
      _this.playAudio("complete");
    });
    please_think.addEventListener("ended", function() {
      setTimeout(() => {
        _this.canDrag = true;
      }, 1000);
    });
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
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //游戏初始化
    initiate() {
      let _this = this;
      _this.currentItem.rightNumber = 0;
      _this.isFinish = false;
      _this.canDrag = true;
      _this.musicActive = true;
      _this.currentItem.answerList = disOrderArr(_this.currentItem.answerList)
      _this.currentItem.questionList = disOrderArr(_this.currentItem.questionList)
      for(let i=0; i<_this.currentItem.questionList.length; i++){
          _this.currentItem.questionList[i].isRight = false;
      }
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
      let LightList = document.getElementsByClassName("light-img-wrapper");
      for (let i = 0; i < LightList.length; i++) {
            let imgLeft = LightList[i].offsetLeft;
            let imgRight = imgLeft + LightList[i].clientWidth;
            let imgTop = LightList[i].offsetTop + 30;
            let imgBottom = imgTop + LightList[i].clientHeight;
            console.log(imgLeft, imgRight, imgTop, imgBottom);
            if (
              mouseX > imgLeft &&
              mouseX < imgRight &&
              mouseY > imgTop &&
              mouseY < imgBottom
            ) {
              console.log(LightList[i].id);
              if (item.img == LightList[i].id) {
                console.log("对了");
                moveDiv.style.display = 'none';
                _this.currentItem.questionList[i].isRight = true;
                _this.currentItem.rightNumber++;
                if (_this.currentItem.rightNumber == 5) {
                  _this.canDrag = false;
                  _this.playAudio("right_music");
                }

              } else {
                console.log("错了");
                moveDiv.style.top = '0px';
                moveDiv.style.left = '0px';
                _this.canDrag = false;
                _this.playAudio("please_think");
              }
            }
      }
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
};
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.left-and-right-container {
  height: 100%;
  .body {
    background-image: url('../../../static/images/common/background.png');
    background-size: 100% 100%;
    position: relative;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
    box-sizing: border-box;
    .choice-list-wrapper{
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        vertical-align: top;
        padding: 0 10px;
        box-sizing: border-box;
        .choice-item-wrapper{
            position: relative;
            width: 100%;
            height: 6vw;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0px;
            }
        }
    }
    .right-container{
        width: 70%;
        height: 100%;
        display: flex;
      flex-direction: column;
      justify-content: space-around;
        vertical-align: top;
    }
    .flex-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 20%;
      img {
        height: 100%;
        width: 17%;
      }
      .light-img{
          width: 80%;
          height: auto
      }
      .light-img-wrapper{
              display: flex;
            align-items: center;
            justify-content: center;
          border: 1px dotted #69473d;
          height: 7vw;
            width: 30%;
            border-radius: 10px;
            overflow: hidden;
      }
    }
  }
}
</style>
