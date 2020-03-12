<template>
  <div class="sixToTen-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_1" class="stem-music" src="static/audio/sixToTen/stem_music_1.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_2" class="stem-music" src="static/audio/sixToTen/stem_music_2.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_3" class="stem-music" src="static/audio/sixToTen/stem_music_3.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_4" class="stem-music" src="static/audio/sixToTen/stem_music_4.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_5" class="stem-music" src="static/audio/sixToTen/stem_music_5.mp3">您的浏览器不支持 audio 标签。</audio>
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
    <img id="fish" class="fish" v-show="draging" src="static/images/sixToTen/fish.png" alt="">
    <div v-if="!isFinish" class="body">
        <img class="fishcan" 
            @touchmove="touchMove('fish')" 
            @touchstart="down('fish')" 
            @touchend="check()"   
            src="static/images/sixToTen/fishcan.png" alt="">
        <div class="cat-wrapper">
            <div class="alert-wrapper">{{'喂我'+currentItem.need+'条鱼'}}</div>  
            <img class="cat" id="cat" src="static/images/sixToTen/cat.png" alt="">
        </div>
        <div class="fishbone-wrapper">
            <img class="fishbone" v-for="(item, index) in currentItem.current" :key="index" src="static/images/sixToTen/fishbone.png" alt="">
        </div>
    </div>
    <complete v-if="isFinish" :img="completeImg" @goBack="goBack" @initiate="initiate">
    </complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import complete from "@/common/complete";
export default {
  name: 'HelloWorld',
  data () {
    return {
        completeImg: 'static/images/sixToTen/complete.gif',
        position: {x:0,y:0},
        draging: false,
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
          {
              need: 6,
              current: 0
          },
          {
              need: 7,
              current: 0
          },
          {
              need: 8,
              current: 0
          },
          {
              need: 9,
              current: 0
          },
          {
              need: 10,
              current: 0
          }
      ],
    }
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
      _this.isFinish = false;
      _this.canDrag = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        _this.gameList[i].isWrong = false;
      }
      _this.playAudio('stem_music_'+(_this.currentIndex+1));
    },
    check(item,index){
      let _this = this;
      if(!_this.canDrag){
        return;
      }
      let touch;
      if(event.touches){
        touch = event.touches[0];
      }else {
        touch = event;
      }
      let mouseX = event.changedTouches[0].pageX
      let mouseY = event.changedTouches[0].pageY
      //获取三个div的元素
      let catDiv = document.getElementById('cat');
      let catDivLeft = catDiv.x;
      let catDivRight = catDivLeft + catDiv.clientWidth;
      let catDivTop = catDiv.y;
      let catDivBottom = catDivTop + catDiv.clientHeight;
      _this.draging = false;
      _this.canDrag = false;
      console.log(mouseX,mouseY)
      console.log(catDivLeft,catDivRight,catDivTop,catDivBottom)
        if(mouseX > catDivLeft && mouseX < catDivRight && mouseY > catDivTop && mouseY < catDivBottom){
            _this.currentItem.current++
            if(_this.currentItem.current == _this.currentItem.need){
                _this.currentIndex++;
                _this.playAudio('right_music');
            }else{
                _this.canDrag = true;
            }
        }else{
            _this.canDrag = true;
        }
    },
    //鼠标按下触发
    down(el){
        let moveDiv = document.getElementById(el);
        this.flags = true;
        var touch;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
    },
    //拖动事件
    touchMove(el){
      const _this = this;
      if(!_this.canDrag){
          return;
      }
      _this.draging = true;
      let moveDiv = document.getElementById(el);
          var touch ;
          // || event.target.x > window.width-30 || event.target.y < 30 || event.target.y > window.height-30){
          if(event.touches){
              touch = event.touches[0];
          }else {
              touch = event;
          }
          //防止出屏
          if(touch.clientX < 15 || touch.clientX > window.innerWidth -15 || touch.clientY < 15 || touch.clientY > window.innerHeight-15){
            return;
          }
          let mouseX = event.changedTouches[0].pageX
            let mouseY = event.changedTouches[0].pageY
          moveDiv.style.left = mouseX+"px";
          moveDiv.style.top = mouseY +"px";
          //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
          document.addEventListener("touchmove",_this.preventDefault,{passive: false});
          document.addEventListener("touchend",function(){
              document.removeEventListener('touchmove',_this.preventDefault, false);
          },{passive: false});
    },
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.sixToTen-container{
    height: 100%;
    background-image: url('../../../static/images/sixToTen/background.png');
    background-size: 100% 100%;
    .fish{
        position: absolute;
        width: 20px;
        z-index:999;
    }
    .body{
        height: 100%;
        padding-top: 15%;
        .fishcan{
            display: inline-block;
            width: 80px;
            vertical-align: bottom;
            margin-right: 50px;
        }
        .cat-wrapper{
            display: inline-block;
            position: relative;
            vertical-align: bottom;
            .alert-wrapper{
                position: absolute;
                left: 30%;
                top: -45%;
                width: 200px;
                height: 100px;
                background-image: url('../../../static/images/sixToTen/alert.png');
                background-size: 100% 100%;
                line-height: 90px;
            }
            .cat{
                display: inline-block;
                width: 200px;
            }
        }
        
        .fishbone-wrapper{
            position: fixed;
            bottom: 0;
            width: 100%;
            .fishbone{
                width: 20px;
                margin: 0 20px;
            }
        }
    }
}


</style>
