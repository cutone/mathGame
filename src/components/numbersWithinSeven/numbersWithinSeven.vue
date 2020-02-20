<template>
  <div class="number-within-seven-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/finish_five.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_1"
      class="stem-music"
      src="static/audio/numbersWithinSeven/stem_music_1.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_2"
      class="stem-music"
      src="static/audio/numbersWithinSeven/stem_music_2.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_3"
      class="stem-music"
      src="static/audio/numbersWithinSeven/stem_music_3.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_4"
      class="stem-music"
      src="static/audio/numbersWithinSeven/stem_music_4.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_5"
      class="stem-music"
      src="static/audio/numbersWithinSeven/stem_music_5.mp3"
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
      <div class="stick-wrapper">
          <div class="stick-item-wrapper"
            @touchmove="touchMove('stick'+index)"
            @touchstart="down('stick'+index)"
            @touchend="check('stick'+index)" 
            v-for="(img, index) in 3" 
            :key="index">  
            <img
            class="stick-img"
            :id="'stick'+index"
            src="static/images/numbersWithinSeven/stick.png"
            />
        </div> 
      </div>
      <img class="dingdang" src="static/images/numbersWithinSeven/dingdang.png" />
      <div class="table-wrapper" id="table_wrapper">
        <div class="circle-wrapper" v-for="(item, index) in currentItem.circleWrapper" :key="index">
            <img v-if="item.isRight" class="stick" src="static/images/numbersWithinSeven/stick.png" alt="" />
                <img
                class="circle-img"
                v-for="(item, index) in item.length"
                :key="index"
                src="static/images/numbersWithinSeven/circle.png"
                alt=""
            />
        </div>
      </div>
    </div>
    <complete :img="completeImg" v-if="isFinish" @goBack="goBack" @initiate="initiate"></complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import complete from "@/common/complete";
import { getElementToPageLeft, getElementToPageTop} from '@/common/js/common'
export default {
  name: "numbersWithinSeven",
  data() {
    return {
        completeImg: 'static/images/common/middle_complete.gif',
      position: { x: 0, y: 0 },
      currentIndex: 0,
      currentItem: {rightNumber: 0, circleWrapper: [{length: 4, need: false, isRight: false},{length: 3, need: true,isRight: false},{length: 3, need: true,isRight: false}]},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
        {rightNumber: 0, circleWrapper: [{length: 4, need: false, isRight: false},{length: 3, need: true,isRight: false},{length: 3, need: true,isRight: false}]},
        {rightNumber: 0, circleWrapper: [{length: 4, need: true, isRight: false},{length: 5, need: false,isRight: false},{length: 4, need: true,isRight: false}]},
        {rightNumber: 0, circleWrapper: [{length: 5, need: true, isRight: false},{length: 5, need: true,isRight: false},{length: 6, need: false,isRight: false}]},
        {rightNumber: 0, circleWrapper: [{length: 7, need: false, isRight: false},{length: 6, need: true,isRight: false},{length: 6, need: true,isRight: false}]},
        {rightNumber: 0, circleWrapper: [{length: 7, need: true, isRight: false},{length: 6, need: false,isRight: false},{length: 7, need: true,isRight: false}]}
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
        let table_wrapper = document.getElementById("table_wrapper");
        let stickList =  document.getElementsByClassName("stick-img");
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
        console.log(bg_music)
        bg_music.addEventListener("canplaythrough", function() {
        bg_music.play();
        });

        stem_music_1.addEventListener("canplaythrough", function() {
        stem_music_1.play();
        });
        right_music.addEventListener("ended", function() {
        if (_this.currentIndex == _this.gameList.length) {
            _this.isFinish = true;
            _this.playAudio("complete");
        } else {
            for(let i = 0,len = stickList.length; i < len; i++){
                stickList[i].style.display = 'block';
                stickList[i].style.top = '10px';
                stickList[i].style.left = '0px';
            }
            _this.currentItem = _this.gameList[_this.currentIndex];
            _this.playAudio("stem_music_" + (_this.currentIndex + 1));
            _this.musicActive = true;
        }
        });
        please_think.addEventListener("ended", function() {
            _this.canDrag = true;
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
      _this.playAudio("stem_music_" + (_this.currentIndex + 1));
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //游戏初始化
    initiate() {
      let _this = this;
      let stickList =  document.getElementsByClassName("stick-img");
      _this.currentIndex = 0;
      _this.currentItem = _this.gameList[_this.currentIndex];
      console.log(_this.currentItem)
      _this.isFinish = false;
      _this.canDrag = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
          _this.gameList[i].rightNumber = 0;
          for(let j= 0; j < _this.gameList[i].circleWrapper.length; j++){
                _this.gameList[i].circleWrapper[j].isRight = false;
          }
      }
      for(let i = 0,len = stickList.length; i < len; i++){
        stickList[i].style.display = 'block';
        stickList[i].style.top = '10px';
        stickList[i].style.left = '0px';
        }
      _this.playAudio("stem_music_" + (_this.currentIndex + 1));
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
    check(id) {
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
      //获取三个div的元素
      let moveDiv = document.getElementById(id);
      let circleWrappertList = document.getElementsByClassName("circle-wrapper");
      console.log(circleWrappertList)
        for (let i = 0, len = circleWrappertList.length; i < len; i++) {
          //篮子的四边
          let basketDivLeft = getElementToPageLeft(circleWrappertList[i]);
          let basketDivRight = basketDivLeft + circleWrappertList[i].clientWidth;
          let basketDivTop = getElementToPageTop(circleWrappertList[i]);
          let basketDivBottom = basketDivTop + circleWrappertList[i].clientHeight;
          console.log(mouseX,mouseY)
          console.log('盘子',basketDivLeft,basketDivRight,basketDivTop,basketDivBottom )
          if (
            mouseX > basketDivLeft &&
            mouseX < basketDivRight &&
            mouseY > basketDivTop &&
            mouseY < basketDivBottom
          ) {
              console.log(_this.currentItem.circleWrapper[i])
            if (
              _this.currentItem.circleWrapper[i].need
            ) {
              _this.currentItem.circleWrapper[i].isRight = true;
              moveDiv.style.display = 'none'
              _this.currentItem.rightNumber++;
              if(_this.currentItem.rightNumber == 2){
                //   对两个就做对了
                _this.currentItem.isRight = true;
                _this.currentIndex++;
                _this.playAudio("right_music");
                _this.canDrag = false;
              }
            } else {
              moveDiv.style.left = "0px";
              moveDiv.style.top = "10px";
              _this.canDrag = false;
              _this.playAudio("please_think");
            }
          }
        }
        
      }
  }
};
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.number-within-seven-container {
  height: 100%;
  background-image: url("../../../static/images/numbersWithinSeven/background.png");
  background-size: 100% 100%;
  .canvas {
    position: absolute;
    left: 0;
    z-index: 999;
  }
  .body {
    height: 100%;
    position: relative;
    .stick-wrapper {
      border: 1px solid green;
      border-radius: 10px;
      position: absolute;
      right: 20px;
      top: 20px;
      width: 40%;
      .stick-item-wrapper{
          position: relative;
          width: 90%;
        height: 5px;
        margin: 0 auto;
        padding: 10px 0;
      }
      img {
          position: absolute;
        width: 100%;
        left: 0;
        z-index: 999;
      }
    }
    .dingdang {
      position: absolute;
      width: 25%;
      left: 25%;
    }
    .table-wrapper {
      background-image: url("../../../static/images/numbersWithinSeven/table.png");
      background-size: 100% 100%;
      width: 65%;
      height: 55%;
      left: 20%;
      position: absolute;
      bottom: 30px;
      display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      .circle-wrapper {
          position: relative;
          width: 80%;
          .stick{
              height: 5px;
              width: 90%;
              position: absolute;
              top: 50%;
              margin-top: -5px;
              left: 5%
          }
        .circle-img {
          width: 7%;
          margin: 15px 10px;
        }
      }
    }
  }
}
</style>
