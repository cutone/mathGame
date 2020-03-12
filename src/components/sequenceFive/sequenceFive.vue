<template>
  <div class="sequence-five-container">
    <audio id="bg_music" loop="loop" src="static/audio/trapezoid/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/trapezoid/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="finish_five" src="static/audio/common/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/trapezoid/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="dog_music" class="stem-music" src="static/audio/sequenceFive/dog.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="elephant_music" class="stem-music" src="static/audio/sequenceFive/elephant.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="fox_music" class="stem-music" src="static/audio/sequenceFive/fox.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="pig_music" class="stem-music" src="static/audio/sequenceFive/pig.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="snail_music" class="stem-music" src="static/audio/sequenceFive/snail.mp3">您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish"
      src="static/images/trapezoid/music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish"
      src="static/images/trapezoid/music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish">
      <div class="game-title">{{ currentItem.title }}</div>
      <div class="train-wrapper">
        <img v-show="currentItem.trainHead == 'left'" class="train-img" src="static/images/sequenceFive/left_train.png" alt />
		<img v-show="currentItem.trainHead == 'right'" class="train-img" src="static/images/sequenceFive/right_train.png" alt />
        <div
          class="animal-wrapper"
          :class="currentItem.trainHead == 'left' ? 'animal-wrapper-left' : 'animal-wrapper-right'"
        >
          <img
            :class="item.name == 'dog' ? 'dog-item' : ''"
            class="animal-item"
            :src="item.path"
            alt
            v-for="(item, index) in currentItem.animalList"
            :key="index"
          />
        </div>
      </div>
      <div class="choice-wrapper">
        <img
          :class="currentItem.isWrong ? 'shake-animation' : ''"
          class="choice-item"
          :src="(!currentItem.isRight || currentItem.answer == item) ? 'static/images/common/' + item + '.png' : 'static/images/sequenceFive/mask.png'"
          alt
          v-for="(item, index) in currentItem.answerList"
          :key="index"
          @click="check(item)"
        />
      </div>
    </div>
    <common-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </common-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import commonComplete from "@/common/commonComplete";
export default {
  name: "sequenceFive",
  data() {
    return {
      musicActive: false,
      canChoose: false,
      isFinish: true,
      currentItem: {},
      currentIndex: 0,
      gameList: [
        {
          title: "从火车头开始数，小狗排在第几车厢？",
          music: "dog_music",
          answer: 3,
          answerList: [3, 4, 5],
          bgPath: "static/images/sequenceFive/left_train.png",
          targetAnimal: "dog",
          isWrong: false,
          isRight: false,
          trainHead: "left",
          animalList: [
            { name: "fox", path: "static/images/sequenceFive/fox.gif" },
            { name: "pig", path: "static/images/sequenceFive/pig.gif" },
            { name: "dog", path: "static/images/sequenceFive/dog.jpg" },
            { name: "snail", path: "static/images/sequenceFive/snail.jpg" },
            {
              name: "elephant",
              path: "static/images/sequenceFive/elephant.gif"
            },
            { name: "bear", path: "static/images/sequenceFive/bear.gif" }
          ]
        },
        {
          title: "从火车头开始数，小象排在第几车厢？",
          music: "elephant_music",
          answer: 3,
          answerList: [2, 3, 4],
          bgPath: "static/images/sequenceFive/right_train.png",
          targetAnimal: "elephant",
          isWrong: false,
          isRight: false,
          trainHead: "right",
          animalList: [
            { name: "fox", path: "static/images/sequenceFive/fox.gif" },
            { name: "bear", path: "static/images/sequenceFive/bear.gif" },
            { name: "pig", path: "static/images/sequenceFive/pig.gif" },
            {
              name: "elephant",
              path: "static/images/sequenceFive/elephant.gif"
            },
            { name: "snail", path: "static/images/sequenceFive/snail.jpg" },
            { name: "dog", path: "static/images/sequenceFive/dog.jpg" }
          ]
        },
        {
          title: "从火车头开始数，小猪排在第几车厢？",
          music: "pig_music",
          answer: 4,
          answerList: [2, 3, 4],
          bgPath: "static/images/sequenceFive/right_train.png",
          targetAnimal: "pig",
          isWrong: false,
          isRight: false,
          trainHead: "right",
          animalList: [
            { name: "dog", path: "static/images/sequenceFive/dog.jpg" },
            { name: "snail", path: "static/images/sequenceFive/snail.jpg" },
            { name: "pig", path: "static/images/sequenceFive/pig.gif" },
            { name: "bear", path: "static/images/sequenceFive/bear.gif" },
            { name: "fox", path: "static/images/sequenceFive/fox.gif" },
            {
              name: "elephant",
              path: "static/images/sequenceFive/elephant.gif"
            }
          ]
        },
        {
          title: "从火车头开始数，小蜗牛排在第几车厢？",
          music: "snail_music",
          answer: 5,
          answerList: [3, 4, 5],
          bgPath: "static/images/sequenceFive/left_train.png",
          targetAnimal: "snail",
          isWrong: false,
          isRight: false,
          trainHead: "left",
          animalList: [
            { name: "fox", path: "static/images/sequenceFive/fox.gif" },
            { name: "pig", path: "static/images/sequenceFive/pig.gif" },
            {
              name: "elephant",
              path: "static/images/sequenceFive/elephant.gif"
            },
            { name: "bear", path: "static/images/sequenceFive/bear.gif" },
            { name: "snail", path: "static/images/sequenceFive/snail.jpg" },
            { name: "dog", path: "static/images/sequenceFive/dog.jpg" }
          ]
        },
        {
          title: "从火车头开始数，小狐狸排在第几车厢？",
          music: "fox_music",
          answer: 3,
          answerList: [2, 3, 4],
          bgPath: "static/images/sequenceFive/right_train.png",
          targetAnimal: "fox",
          isWrong: false,
          isRight: false,
          trainHead: "right",
          animalList: [
            { name: "bear", path: "static/images/sequenceFive/bear.gif" },
            { name: "pig", path: "static/images/sequenceFive/pig.gif" },
            {
              name: "elephant",
              path: "static/images/sequenceFive/elephant.gif"
            },
            { name: "fox", path: "static/images/sequenceFive/fox.gif" },
            { name: "snail", path: "static/images/sequenceFive/snail.jpg" },
            { name: "dog", path: "static/images/sequenceFive/dog.jpg" }
          ]
        }
      ]
    };
  },
  components: {
    commonHeader,
    commonComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let finish_five = document.getElementById("finish_five");
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
    dog_music.addEventListener("canplaythrough", function() {
      dog_music.play();
    });
    please_think.addEventListener("ended", function() {
      _this.currentItem.isWrong = false;
      _this.canChoose = true;
    });
    //正确提示mp3播放后
    right_music.addEventListener("ended", function() {
      if (_this.currentIndex == 5) {
        //播放答对五道题的mp3
        _this.playAudio("finish_five");
        _this.isFinish = true;
      } else {
        //修改题目下标，播放题目
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio(_this.currentItem.music);
        _this.musicActive = true;
      }
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
      _this.canChoose = false;
      _this.playAudio(_this.currentItem.music);
    },
    //检查答案是否正确
    check(item) {
      let _this = this;
      if (!_this.canChoose) {
        return;
      }
      let index = "";
      for (let i = 0, len = _this.currentItem.animalList.length; i < len; i++) {
        if (
          _this.currentItem.animalList[i].name == _this.currentItem.targetAnimal
        ) {
          if (_this.currentItem.trainHead == "left") {
            index = i + 1;
          } else {
            index = len - i;
          }
        }
      }
      if (item == index) {
        _this.playAudio("right_music");
        _this.currentIndex++;
        _this.currentItem.isWrong = false;
        _this.currentItem.isRight = true;
      } else {
        _this.currentItem.isWrong = true;
        _this.currentItem.isRight = false;
        _this.playAudio("please_think");
      }
      _this.canChoose = false;
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
      _this.playAudio(_this.currentItem.music);
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../static/css/doudong.css";
@import "../../../static/css/common.css";
.sequence-five-container {
  height: 100%;
  .game-title {
    width: 40%;
    border: 1px solid #f0f0f0;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 15px;
    height: 60px;
    line-height: 60px;
  }
  .train-wrapper {
    width: 80%;
    margin: 10px auto;
    position: relative;
    .train-img {
      width: 100%;
    }
    .animal-wrapper {
		width: 82%;
      position: absolute;
      top: 0px;
      right: 10px;
      .animal-item {
		width: 12%;
        display: inline-block;
        margin: 0 2%;
      }
      .dog-item {
        margin-bottom: -10px;
      }
    }
    .animal-wrapper-left {
      right: 10px;
    }
    .animal-wrapper-right {
      text-align: left;
      left: 10px;
    }
  }
  .choice-wrapper {
    .choice-item {
      width: 60px;
      height: 60px;
      margin: 0 30px;
    }
  }
  .finish-wrapper {
    height: 100%;
    display: block;
    padding-bottom: 20px;
    background: #9bcfd3;
    .finish-img {
      display: block;
      width: 40%;
      margin: 0 auto;
    }
    .oprate-wrapper {
      .complete-btn {
        display: inline-block;
        width: 80px;
        height: 40px;
        background: #fdf731;
        border-radius: 5px;
        line-height: 40px;
      }
      .restart-btn {
        display: inline-block;
        width: 80px;
        height: 40px;
        background: #47b1f0;
        border-radius: 5px;
        line-height: 40px;
        margin-left: 70px;
      }
    }
  }
}
</style>
