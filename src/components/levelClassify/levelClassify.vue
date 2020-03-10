<template>
  <div class="levelClassify-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/levelClassify/complete.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_1"
      class="stem-music"
      src="static/audio/levelClassify/stem_music_1.m4a"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_2"
      class="stem-music"
      src="static/audio/levelClassify/stem_music_2.m4a"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_3"
      class="stem-music"
      src="static/audio/levelClassify/stem_music_3.m4a"
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
      <div class="title">{{currentItem.title}}</div>
      <div class="top-container">
        <div
            class="top-item-wrapper"
            v-for="(item, index) in currentItem.topImgList"
            :key="index"
            :style="{'background-image': 'url(static/images/levelClassify/' + item.bgImg + '.png)'}"
        >
            <div class="drag-item-wrapper" v-for="img in item.imgList" :id="img">
                <img 
                    class="drag-item" 
                    :src="'static/images/levelClassify/'+img+'.png'" alt />
            </div> 
        </div>
        </div>
      <div
        class="target-item-wrapper"
        v-for="(item, index) in currentItem.targetList"
        :style="{'background-image': 'url(static/images/levelClassify/' + item.bgImg + '.png)'}"
      ></div>
    </div>
    <common-complete v-if="isFinish" @goBack="goBack" @initiate="initiate"></common-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import commonComplete from "@/common/commonComplete";
export default {
  name: 'levelClassify',
  data () {
    return {
        position: {x:0,y:0},
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
        {
          title: '按形状进行分类',
          topImgList: [
            {
                bgImg: 'border',
                imgList: ['rect_green_grape','rect_yellow_grape','rect_green_strawberry','rect_yellow_strawberry','triangle_green_grape','triangle_green_strawberry','triangle_green_strawberry','triangle_green_grape']
            }
            ],
            targetList: [
            {
                bgImg: 'triangle_blue',
                need: 'triangle',
                currentList: []
            },
            {
                bgImg: 'rect_blue',
                need: 'rect',
                currentList: []
            }]
        }]
    }
  },
  components: {
    commonHeader,
    commonComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
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
        _this.playAudio('complete')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('stem_music_'+(_this.currentIndex+1));
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
      let targetList = document.getElementsByClassName("target-item-wrapper");
      for (let i = 0; i < targetList.length; i++) {
            let imgLeft = targetList[i].offsetLeft;
            let imgRight = imgLeft + targetList[i].clientWidth;
            let imgTop = targetList[i].offsetTop + 30;
            let imgBottom = imgTop + targetList[i].clientHeight;
            console.log(imgLeft, imgRight, imgTop, imgBottom);
            if (
              mouseX > imgLeft &&
              mouseX < imgRight &&
              mouseY > imgTop &&
              mouseY < imgBottom
            ) {
              console.log(targetList[i].id);
              if (item.img == targetList[i].id) {
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
      _this.playAudio('stem_music_'+(_this.currentIndex+1));
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
        _this.gameList[i].isWrong = false;
      }
      _this.playAudio('stem_music_'+(_this.currentIndex+1));
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
.levelClassify-container {
  height: 100%;
  .body {
    height: @bodyHeight;
    background-image: url("../../../static/images/levelClassify/background.png");
    background-size: 100% 100%;;
    .title{
        background-image: url("../../../static/images/common/cloud.png");
        background-size: 100% 100%;
        width: 25%;
        line-height: 20vh;
        margin: 0 auto;
    }
    .top-container{
        height: 30%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .top-item-wrapper{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 100%;
            background-size: 100% 100%;
            padding: 0 20px;
        }
        .drag-item-wrapper{
            position: relative;
            width: 5vw;
            height: 5vw;
            display: flex;
            .drag-item{
                width: 100%;
                position: absolute;
            }
        }
    }
  }
}
</style>
