<template>
  <div class="square-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/bottom_complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="select_circle" class="stem-music" src="static/audio/square/select_circle.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="select_square" class="stem-music" src="static/audio/square/select_square.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="first_page" src="static/audio/square/first_page.wav">您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish && !isFirstPage"
      src="static/images/common/bottom_music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish && !isFirstPage"
      src="static/images/common/bottom_music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div class="first-page" v-if="isFirstPage && !isFinish"></div> 
    <div v-if="!isFinish && !isFirstPage" class="body" :class="currentItem.bgImg">
        <img class="title-img" :src="'static/images/square/'+currentItem.titleImg+'.png'" alt="">
        <!-- 显示图片 -->
        <img class="top-img" :class="currentItem.isWrong ? 'shake-animation' : ''" @click="choose('top')" :src="'static/images/square/'+currentItem.top.img+'.png'" alt="">
        <img class="bottom-img" :class="currentItem.isWrong ? 'shake-animation' : ''" @click="choose('bottom')" :src="'static/images/square/'+currentItem.bottom.img+'.png'" alt="">
        <img class="left-img" :class="currentItem.isWrong ? 'shake-animation' : ''" @click="choose('left')" :src="'static/images/square/'+currentItem.left.img+'.png'" alt="">
        <img class="right-img" :class="currentItem.isWrong ? 'shake-animation' : ''" @click="choose('right')" :src="'static/images/square/'+currentItem.right.img+'.png'" alt="">
        <!-- 显示对号 -->
        <img v-show="currentItem.top.currentRight" class="top-right right-mask" :src="'static/images/common/right.png'" alt="">
        <img v-show="currentItem.bottom.currentRight" class="bottom-right right-mask" :src="'static/images/common/right.png'" alt="">
        <!-- <img class="left-right right-mask" :src="'static/images/common/right.png'" alt=""> -->
        <img v-show="currentItem.right.currentRight" class="right-right right-mask" :src="'static/images/common/right.png'" alt="">
    </div>
    <bg-complete :background="background" v-if="isFinish" @goBack="goBack" @initiate="restart">
    </bg-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import bgComplete from "@/common/bgComplete";
export default {
  name: 'square',
  data () {
    return {
        background: '../../../static/images/square/complete.png',
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      isFirstPage: true,
      gameList: [
        {
          isWrong: false,
          isRight: false,
          bgImg: 'bg_1',
          titleImg: 'select_circle',
          audioType: 'select_circle',
          rightChoice: ['bottom'],
          top: {
              img: 'oven',
              currentRight: false
            },
          bottom: {
              img:'circle_cake',
              currentRight: false
            },
          left: {
              img:'',
              currentRight: false
            },
          right: {
              img:'fridge',
              currentRight: false
            }
      },{
          isWrong: false,
          isRight: false,
          bgImg: 'bg_1',
          audioType: 'select_square',
          titleImg: 'select_square',
          rightChoice: ['bottom'],
          top: {
              img: 'clock',
              currentRight: false
            },
          bottom: {
              img:'cake',
              currentRight: false
            },
          left: {
              img:'',
              currentRight: false
            },
          right: {
              img:'cupboard',
              currentRight: false
            }
      },{
          isWrong: false,
          isRight: false,
          bgImg: 'bg_1',
          titleImg: 'select_circle',
          audioType: 'select_circle',
          rightChoice: ['top'],
          top: {
              img: 'circle_1',
              currentRight: false
            },
          bottom: {
              img:'triangle_1',
              currentRight: false
            },
          left: {
              img:'',
              currentRight: false
            },
          right: {
              img:'rect',
              currentRight: false
            }
      },{
          isWrong: false,
          isRight: false,
          bgImg: 'bg_2',
          audioType: 'select_square',
          titleImg: 'select_square',
          rightChoice: ['top','bottom'],
          top: {
              img: 'square_1',
              currentRight: false
            },
          bottom: {
              img:'square_2',
              currentRight: false
            },
          left: {
              img:'trapezoid_2',
              currentRight: false
            },
          right: {
              img:'parallelogram',
              currentRight: false
            }
      },{
          isWrong: false,
          isRight: false,
          bgImg: 'bg_2',
          audioType: 'select_square',
          titleImg: 'select_square',
          rightChoice: ['top','right'],
          top: {
              img: 'square_4',
              currentRight: false
            },
          bottom: {
              img:'trapezoid_1',
              currentRight: false
            },
          left: {
              img:'moon',
              currentRight: false
            },
          right: {
              img:'square_3',
              currentRight: false
            }
      }],
    }
  },
  components: {
    commonHeader,
    bgComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stemMusicList = document.getElementsByClassName("stem-music");
    let first_page = document.getElementById('first_page');
    for(let i = 0, len = stemMusicList.length; i < len; i++){
      eval("let "+ stemMusicList[i].id + "=document.getElementById('"+stemMusicList.id+"');");
      stemMusicList[i].addEventListener("ended", function() {
        _this.canChoose = true;
        _this.musicActive = false;
      });
    }
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });

    first_page.addEventListener("canplaythrough", function() {
      first_page.play();
    });
    first_page.addEventListener("ended", function() {
        setTimeout(function(){
            _this.playAudio('select_circle');
            _this.isFirstPage = false;
        },1000)
      
    })
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio(_this.gameList[_this.currentIndex].audioType)
        _this.musicActive = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canChoose = true
      _this.currentItem.isWrong = false;
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
      _this.canChoose = false;
      _this.playAudio(_this.gameList[_this.currentIndex].audioType)
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    choose(item){
        let _this = this;
        if(!_this.canChoose){
            return
        }
        if(_this.currentItem.rightChoice.indexOf(item) == -1){
            _this.canChoose = false;
            _this.currentItem.isWrong = true;
            _this.playAudio('please_think');
        }else{
            _this.currentItem[item].currentRight = true;
        }
        for(let i = 0; i < _this.currentItem.rightChoice.length; i++){
            if(_this.currentItem[_this.currentItem.rightChoice[i]].currentRight == false){
                return;
            }
        }
        _this.currentIndex++;
        _this.playAudio('right_music');
        _this.canChoose = false;
    },
    //第一次初始化
    initiate(){
        let _this = this;
        _this.isFinish = false;
        _this.isFirstPage = true;
        _this.currentIndex = 0;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isWrong = false;
            _this.gameList[i].isRight = false;
            for(let j = 0; j < _this.gameList[i].rightChoice.length; j++){
                _this.gameList[i][_this.gameList[i].rightChoice[j]].currentRight = false;
            }
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('first_page')
        _this.musicActive = true;
    },

    restart(){
        let _this = this;
        _this.isFinish = false;
        _this.currentIndex = 0;
        _this.isFirstPage = false;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isWrong = false;
            _this.gameList[i].isRight = false;
            for(let j = 0; j < _this.gameList[i].rightChoice.length; j++){
                _this.gameList[i][_this.gameList[i].rightChoice[j]].currentRight = false;
            }
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio(_this.gameList[_this.currentIndex].audioType)
        _this.musicActive = true;
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
@bodyHeight: calc(~"100% - 30px");
.square-container{
  height: 100%;
  .first-page{
        background-image: url('../../../static/images/square/firstPage.png');
        background-size: 100% 100%;
        height: @bodyHeight;
        margin-bottom: 30px;
    }
  .body{
      position: relative;
    height: @bodyHeight;
    background-size: 100% 100%;
    .title-img{
        position: absolute;
        bottom: 1%;
        right: 20%;
        width: 30vw;
    }
    .right-mask{
        width: 7%;
        position: absolute;
    }
    .top-img{
        position: absolute;
        height: 12vh;
        top: 6%;
        right: 31%;
    }
    .top-right{
        top: 6%;
        right: 20%;
    }
    .bottom-img{
        position: absolute;
        width: 10%;
        bottom: 47%;
        right: 27%;
    }
    .bottom-right{
        top: 55%;
        right: 28%;
    }
    .left-img{
        position: absolute;
        width: 10%;
        max-height: 14vh;
        top: 21%;
        left: 39%;
        transform: rotate(-13deg);
    }
    .right-img{
        position: absolute;
        width: 7%;
        max-height: 20vh;
        top: 41%;
        right: 5%;
    }
    .right-right{
        top: 65%;
        right: 5%;
    }
  }
  .bg_1{
      background-image: url('../../../static/images/square/bg_1.png')
  }
  .bg_2{
      background-image: url('../../../static/images/square/bg_2.png')
  }
}
</style>
