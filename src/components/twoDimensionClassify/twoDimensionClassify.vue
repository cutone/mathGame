<template>
  <div class="two-dimension-classify-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/twoDimensionClassify/complete.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music" class="stem-music" src="static/audio/twoDimensionClassify/stem_music.m4a">您的浏览器不支持 audio 标签。</audio>
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
        <div class="title">
            根据提示，将图形放到对应的格子里
        </div>
        <div class="img-list">
            <div class="shape-item-wrapper" v-for="(item, index) in imgList" :key="index" >
                <img class="shape-img" 
                    :src="'static/images/twoDimensionClassify/'+item+'.png'"
                    @touchmove="touchMove(item)"
                    @touchstart="down(item)"
                    @touchend="check()"  
                    :id="item" />
            </div> 
        </div>
        <div class="table-wrapper">
            <div class="table-title">
                <div class="cell-item"><img class="corner-img" src="static/images/twoDimensionClassify/table_background.png" alt=""></div>
                <div class="cell-item" v-for="item in colorList">
                    <img :src="'static/images/twoDimensionClassify/'+item.color+'.png'" alt="">
                </div>
            </div>
            <div class="table-body">
                <div class="cell-item"><img :src="'static/images/twoDimensionClassify/'+currentItem.type+'.png'" alt=""></div>
                <div class="cell-item target-ele" v-for="item in colorList">
                    <img v-show="item.isRight"  :src="'static/images/twoDimensionClassify/'+currentItem.type+'_'+item.color+'.png'" alt="">
                </div>
            </div>
        </div>
    </div>
    <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </top-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
import { getElementToPageLeft, getElementToPageTop, disOrderArr } from "@/common/js/common";
export default {
  name: 'twoDimensionClassifyWorld',
  data () {
    return {
        position: {x:0,y:0},
    currentIndex: 0,
    currentItem: {},
    colorList: [{color:'red',isRight: false},{color:'yellow',isRight: false},{color:'blue',isRight:false}],
    imgList: ['circle_blue','circle_purple','circle_red','circle_yellow','heart_red','rect_blue','rect_pink','rect_red','rect_yellow','triangle_red','triangle_blue','triangle_green','triangle_yellow','star_yellow'],
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
          {
              type: 'triangle',
          },
          {
              type: 'circle',
          },
          {
              type: 'rect',
          }
      ],
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
    let stemMusicList = document.getElementsByClassName("stem-music");
    let shapeList = document.getElementsByClassName('shape-img')
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

    stem_music.addEventListener("canplaythrough", function() {
      stem_music.play();
    });
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.musicActive = true;
        for(let i = 0; i < shapeList.length; i++){
            shapeList[i].style.display = 'inline-block';
            shapeList[i].style.left = '0px';
            shapeList[i].style.top = '0px'
        }
        for(let i = 0; i < _this.colorList.length; i++){
            _this.colorList[i].isRight = false
        }
        _this.colorList = disOrderArr(_this.colorList)
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true
    })
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
      _this.playAudio('stem_music');
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
      _this.imgList = disOrderArr(_this.imgList);
      _this.isFinish = false;
      _this.canDrag = false;
      _this.musicActive = true;
      for(let i = 0; i < _this.colorList.length; i++){
        _this.colorList[i].isRight = false
      }
      _this.playAudio('stem_music');
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
                console.log(_this.currentItem.type+'_'+_this.colorList[i].color)
                console.log()
              if (_this.currentItem.type+'_'+_this.colorList[i].color == moveDiv.id) {
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
      for(let i = 0; i < _this.colorList.length; i++){
          if(_this.colorList[i].isRight == false){
              return
          }
      }
      _this.currentIndex++;
      _this.playAudio('right_music')
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
.two-dimension-classify-container{
  height: 100%;
  .body{
    height: 100%;
    background: #fde9a6;
    padding-top: 10px;
    padding-bottom: 30px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    box-sizing: border-box;
    .title{
        width: 30%;
        height: 25vh;
        background-image: url('../../../static/images/twoDimensionClassify/cloud.png');
        background-size: 100% 100%;
        margin: 0 auto;
        padding: 30px 32px 0;
        box-sizing: border-box;
    }
    .img-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        width: 80%;
        margin: 10px auto;
        .shape-item-wrapper{
            position: relative;
            width: 5%;
            height: 10vh;
            .shape-img{
                position: absolute;
                left: 0;
                width: 100%;
                z-index: 999;
            }
        }
    }
    .table-wrapper{
        width: 100%;
    }
    .table-title{
        display: flex;
        background: #fff;
    }
    .table-body{
        display: flex;
        background: #fff;
    }
    .cell-item{
        width: 25%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #000;
        .corner-img{
            width: 100%;
        }
        img{
            width: 50%;
        }
    }
  }
}
</style>
