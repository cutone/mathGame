<template>
  <div class="six-to-eight-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/sequenceFive/top_complete.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_1" class="stem-music" src="static/audio/sixToEight/stem_music_1.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_2" class="stem-music" src="static/audio/sixToEight/stem_music_2.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_3" class="stem-music" src="static/audio/sixToEight/stem_music_3.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_4" class="stem-music" src="static/audio/sixToEight/stem_music_4.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_5" class="stem-music" src="static/audio/sixToEight/stem_music_5.wav">您的浏览器不支持 audio 标签。</audio>
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
        <div class="game-title-wrapper">
            {{currentItem.title}}
        </div>
        <div class="table-container">
            <div class="totle-number">{{currentItem.total}}</div>
            <div class="row-wrapper" v-for="(img, index) in 7">
                <div class="img-wrapper table-cell">
                    <img v-for="(img, index) in index+1" :src="'static/images/sixToEight/'+currentItem.leftImg+'.png'"  /> 
                    <img v-for="(img, index) in currentItem.total-index-1" :src="'static/images/sixToEight/'+currentItem.rightImg+'.png'" alt="">
                </div>
                <div class="left-target-wrapper table-cell">
                    <img :src="'static/images/sixToEight/'+(index+1)+'.png'" alt="">
                </div>
                <div class="right-target-wrapper table-cell">
                    <img :src="'static/images/sixToEight/'+(currentItem.total-index-1)+'.png'" alt="">
                </div>
            </div>
        </div>
        <div class="drag-list-wrapper">
            <div v-for="(item, index) in currentItem.choiceList"></div><img src="" alt="">
        </div>
    </div>
    <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </top-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
export default {
  name: 'sixToEight',
  data () {
    return {
    currentIndex: 0,
    currentItem: {
          title: '数圆点，填组成',
          leftImg: 'circle_left',
          total: 8,
          rightImg: 'circle_right',
          choiceList: ''
    },
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [{
          title: '数圆点，填组成',
          leftImg: 'circle_left',
          total: 8,
          rightImg: 'circle_right',
          choiceList: ''
      }],
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

    stem_music_1.addEventListener("canplaythrough", function() {
      stem_music_1.play();
    });
    right_music.addEventListener("ended", function() {
      if(_this.currentIndex == _this.gameList.length){
        _this.isFinish = true;
        _this.playAudio('complete')
      }else{
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('stem_music');
        _this.musicActive = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canChoose = true
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
      _this.canChoose = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        _this.gameList[i].isWrong = false;
      }
      _this.playAudio('stem_music');
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.six-to-eight-container{
  height: 100%;
  .body{
      background-image: url('../../../static/images/common/background.png');
      background-size: 100% 100%;
    height: 100%;
    .game-title-wrapper{
        background-image: url('../../../static/images/common/cloud.png');
        background-size: 100% 100%;
        width: 25%;
        height: 20vh;
        line-height: 20vh;
    }
    .table-container{
        width: 80%;
        margin: 0 auto;
        position: relative;
        .totle-number{
            position: absolute;
            right: 0;
            bottom: 100%;
            height: 20vh;
            line-height: 20vh;
            border: 1px solid #47b1f0;
            float: right;
            box-sizing: border-box;
            width: 40%;
        }
        .row-wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            .table-cell{
                height: 10vh;
                border: 1px solid #47b1f0;
                box-sizing: border-box;
            }
            .img-wrapper{
                width: 60%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                img{
                    width: 30px;
                }
            }
            .left-target-wrapper{
                width: 20%;
                img{
                    height: 100%;
                }
            }
            .right-target-wrapper{
                width: 20%;
                img{
                    height: 100%;
                }
            }
        }
    }
    
  }
}
</style>
