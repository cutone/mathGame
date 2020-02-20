<template>
  <div class="left-and-right-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <common-header :game-list="[]" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
      <img class="police-img" src="static/images/leftAndRight/police.png" />
      <p class="title">以自身为中心区分左右</p>
      <div class="choice-list-wrapper">
        <div
          class="choice-item-wrapper"
          v-for="(item, index) in currentItem.lightList"
          :key="index"
          :data-target="item.target"
        >
          <img class="game-img" 
            @touchmove="touchMove(item.img)"
            @touchstart="down(item.img)"
            @touchend="check(item)"  
            :id="item.img" 
            :src="'static/images/leftAndRight/'+item.img+'.png'" />
        </div>
      </div>
      <div class="right-container">
        <div class="flex-wrapper">
            <div class="light-img-wrapper" v-for="(item, index) in currentItem.carList" :id="item.need" :key="index">
                <img
                    class="game-img light-img"
                    v-show="item.isRight"
                    :src="'static/images/leftAndRight/'+item.need+'.png'"
                />
          </div> 
        </div>
        <div class="flex-wrapper">
          <img
            class="game-img"
            v-for="(item, index) in currentItem.carList"
            :data-target="item.target"
            :id="item.img"
            :key="index"
            :src="'static/images/leftAndRight/'+item.img+'.png'"
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
import { getElementToPageLeft, getElementToPageTop } from "@/common/js/common";
export default {
  name: "leftAndRight",
  data() {
    return {
        position: {x: 0, y:0},
      currentIndex: 0,
      currentItem: {
        rightNumber: 0,
        lightList: [
          { img: "light_front", target: "car_front", isRight: false },
          { img: "light_left", target: "car_left", isRight: false  },
          { img: "light_right", target: "car_right",isRight: false  }
        ],
        carList: [
          { img: "car_left", need: "light_left", isRight: false },
          { img: "car_front", need: "light_front", isRight: false },
          { img: "car_right", need: "light_right", isRight: false }
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

      for(let i=0; i<_this.currentItem.carList.length; i++){
          _this.currentItem.carList[i].isRight = false;
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
                _this.currentItem.carList[i].isRight = true;
                _this.currentItem.rightNumber++;
                if (_this.currentItem.rightNumber == 3) {
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
    position: relative;
    height: 100%;
    padding-top: 10px;
    .choice-list-wrapper{
        width: 18%;
        display: inline-block;
        vertical-align: bottom;
        padding: 0 10px;
        box-sizing: border-box;
        .choice-item-wrapper{
            position: relative;
            width: 100%;
            height: 6vw;
            margin: 20% 0;
            img{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0px;
            }
        }
    }
    .right-container{
        width: 79%;
        display: inline-block;
        vertical-align: bottom;
        margin-top: 5%;
    }
    .police-img {
      position: absolute;
      left: 50px;
      top: 0px;
      width: 50px;
    }
    .title {
      margin: 0 auto;
    }
    .flex-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 8%;
      img {
        width: 20%;
      }
      .light-img{
          width: 100%;
      }
      .light-img-wrapper{
              display: flex;
            align-items: center;
          border: 1px dotted #69473d;
          height: 10vw;
            width: 20%;
            border-radius: 10px;
            overflow: hidden;
      }
    }
  }
}
</style>
