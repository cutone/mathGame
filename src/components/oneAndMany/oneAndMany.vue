<template>
  <div class="one-and-many-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/sequenceFive/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio
      id="select_one"
      class="stem-music"
      src="static/audio/oneAndMany/select_one.wav"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="select_many"
      class="stem-music"
      src="static/audio/oneAndMany/select_many.wav"
    >您的浏览器不支持 audio 标签。</audio>
    <img
      class="music-img"
      @click="broadcast()"
      v-if="!musicActive && !isFinish"
      src="static/images/common/bottom_music.png"
    />
    <img
      class="music-img"
      v-if="musicActive && !isFinish"
      src="static/images/common/bottom_music_active.gif"
    />
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
      <img
        :src="currentItem.one"
        alt
        class="one-img choose-img"
        :class="'one-img-' + [currentIndex+1]"
        @click="choose('one')"
      />

      <img
        src="static/images/oneAndMany/tablecloth.png"
        alt
        class="tablecloth-img"
        v-if="currentItem.other"
      />

      <div class="many-wrap" :class="'many-wrap-' + [currentIndex+1]">
        <img
          v-for="(animal, index) in currentItem.manyList"
          :key="index"
          :src="currentItem.many"
          alt
          class="many-img choose-img"
          :class="animal"
          @click="choose('many')"
        />
      </div>

      <img src="static/images/oneAndMany/submit.png" alt class="submit-btn" @click="check()" />
    </div>
    <bottom-class-complete
      v-if="isFinish"
      :background="background"
      :leftImg="leftImg"
      :rightImg="rightImg"
      @goBack="goBack"
      @initiate="initiate"
    ></bottom-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import bottomClassComplete from "@/common/bottomClassComplete";
export default {
  name: "HelloWorld",
  data() {
    return {
      background: "static/images/oneAndMany/background.jpg",
      leftImg: "static/images/oneAndMany/mickey1.png",
      rightImg: "static/images/oneAndMany/mickey.png",
      currentIndex: 0,
      currentItem: {},
      musicActive: true,
      canChoose: false,
      isFinish: false,
      gameList: [
        {
          isRight: false,
          many: "static/images/oneAndMany/flower.png",
          one: "static/images/oneAndMany/bird1.png",
          other: false,
          rightChoice: "one",
          audioType: "select_one",
          manyList: ["many-1", "many-2", "many-3", "many-4", "many-5", "many-6"]
        },
        {
          isRight: false,
          many: "static/images/oneAndMany/pomegranate.png",
          one: "static/images/oneAndMany/bird2.png",
          other: true,
          rightChoice: "many",
          audioType: "select_many",
          manyList: ["many-1", "many-2", "many-3", "many-4", "many-5"]
        },
        {
          isRight: false,
          many: "static/images/oneAndMany/bee1.png",
          one: "static/images/oneAndMany/sunflower.png",
          other: false,
          rightChoice: "many",
          audioType: "select_many",
          manyList: ["many-1", "many-2", "many-3", "many-4", "many-5"]
        },
        {
          isRight: false,
          many: "static/images/oneAndMany/wood.png",
          one: "static/images/oneAndMany/rabbit.png",
          other: false,
          rightChoice: "one",
          audioType: "select_one",
          manyList: ["many-1", "many-2", "many-3", "many-4", "many-5"]
        },
        {
          isRight: false,
          many: "static/images/oneAndMany/chick1.png",
          one: "static/images/oneAndMany/mashroom.png",
          other: false,
          rightChoice: "one",
          audioType: "select_one",
          manyList: ["many-1", "many-2", "many-3", "many-4", "many-5"]
        }
      ]
    };
  },
  components: {
    commonHeader,
    bottomClassComplete
  },
  mounted() {
    let _this = this;
    _this.currentIndex = 0;
    this.$nextTick(() => {
      let bg_music = document.getElementById("bg_music");
      let right_music = document.getElementById("right_music");
      let finish_five = document.getElementById("finish_five");
      let please_think = document.getElementById("please_think");
      let select_one = document.getElementById("select_one");
      let select_many = document.getElementById("select_many");
      bg_music.addEventListener("canplaythrough", function() {
        bg_music.play();
      });
      select_one.addEventListener("canplaythrough", function() {
        select_one.play();
      });
      select_one.addEventListener("ended", function() {
        _this.musicActive = false;
        _this.canChoose = true;
      });
      select_many.addEventListener("ended", function() {
        _this.musicActive = false;
        _this.canChoose = true;
      });
      //正确提示mp3播放后
      right_music.addEventListener("ended", function() {
        _this.currentIndex++;
        if (_this.currentIndex == _this.gameList.length) {
          _this.isFinish = true;
          _this.playAudio("complete");
        } else {
          //修改题目下标，播放题目
          _this.currentItem = _this.gameList[_this.currentIndex];
          let imgList = document.getElementsByClassName("choose-img");
          for (let i = 0; i < imgList.length; i++) {
            imgList[i].style.border = "none";
          }
          _this.playAudio(_this.gameList[_this.currentIndex].audioType);
          _this.musicActive = true;
          _this.canChoose = true;
        }
      });
      please_think.addEventListener("ended", function() {
        _this.canChoose = true;
      });
      _this.initiate();
    });
  },
  beforeDestroy() {
    let _this = this;
    _this.isFinish = false;
    _this.currentIndex = 0;
    _this.currentItem = _this.gameList[_this.currentIndex];
  },
  methods: {
    //播放游戏规则
    playAudio(id) {
      let audioBtn = document.getElementById(id);
      audioBtn.currentTime = 0;
      audioBtn.play();
    },
    goBack() {
      this.$router.go(-1);
    },
    //选择答案
    choose(choiceItem) {
      let _this = this;
      if (!_this.canChoose) {
        return;
      }
      let imgList = document.getElementsByClassName("choose-img");
      for (let i = 0; i < imgList.length; i++) {
        imgList[i].style.border = "none";
      }
      event.target.style.border = "1px dotted red";
      console.log(event.target);

      if (choiceItem == _this.currentItem.rightChoice) {
        console.log("对了");
        _this.currentItem.isRight = true;
      } else {
        console.log("错了");
        _this.currentItem.isRight = false;
      }
    },
    check() {
      let _this = this;
      _this.canChoose = false;
      if (_this.currentItem.isRight) {
        _this.playAudio("right_music");
      } else {
        _this.playAudio("please_think");
      }
    },
    //播放题目
    broadcast() {
      let _this = this;
      _this.musicActive = true;
      _this.canChoose = false;
      _this.playAudio(_this.gameList[_this.currentIndex].audioType);
    },

    //重做
    initiate() {
      let _this = this;
      _this.isFinish = false;
      _this.canChoose = false;
      _this.currentIndex = 0;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
      }
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.playAudio(_this.gameList[_this.currentIndex].audioType);
      _this.musicActive = true;
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.one-and-many-container {
  height: 100%;
  .body {
    height: calc(100% - 30px);
    background: url("../../../static/images/oneAndMany/background.jpg")
      no-repeat;
    background-size: 100% 100%;
    background-position: center;
  }
  .tablecloth-img {
    position: absolute;
    z-index: 1;
    width: 75%;
    bottom: 5%;
    right: 17%;
  }
  .submit-btn {
    position: absolute;
    z-index: 4;
    width: 12%;
    bottom: 1%;
    right: 2%;
  }
  .one-img {
    display: block;
    position: absolute;
    z-index: 3;
    &.one-img-1 {
      width: 21%;
      top: 19%;
      right: 7%;
    }
    &.one-img-2 {
      width: 21%;
      top: 15%;
      left: 19%;
    }
    &.one-img-3 {
      width: 20%;
      bottom: 2%;
      left: 36%;
    }
    &.one-img-4 {
      width: 15%;
      bottom: 33%;
      left: 20%;
    }
    &.one-img-5 {
      width: 40%;
      bottom: 29%;
      left: 28%;
    }
  }
  .many-wrap {
    .many-img {
      position: absolute;
      z-index: 2;
      &.shake-animation {
        animation-name: shaky-slow;
        animation-duration: 2s; // 动画执行时间
        animation-delay: 0s; // 动画等待时间
        animation-iteration-count: 1; // 动画执行次数，infinite为一直执行
        animation-timing-function: ease-in-out; // 动画执行速度
        animation-delay: 0s; // 动画延时时间
        animation-play-state: running; // 动画执行状态，一般没必要parse
      }
    }
    &.many-wrap-1 {
      .many-img {
        width: 11%;
        &.many-1 {
          top: 40%;
          left: 10%;
        }
        &.many-2 {
          top: 36%;
          left: 32%;
        }
        &.many-3 {
          top: 40%;
          left: 53%;
        }
        &.many-4 {
          top: 66%;
          left: 22%;
        }
        &.many-5 {
          top: 66%;
          left: 41%;
        }
        &.many-6 {
          top: 64%;
          left: 64%;
        }
      }
    }
    &.many-wrap-2 {
      .many-img {
        width: 9%;
        &.many-1 {
          top: 50%;
          left: 28%;
        }
        &.many-2 {
          top: 54%;
          left: 46%;
        }
        &.many-3 {
          top: 48%;
          left: 63%;
        }
        &.many-4 {
          top: 73%;
          left: 32%;
        }
        &.many-5 {
          top: 71%;
          left: 56%;
        }
      }
    }
    &.many-wrap-3 {
      .many-img {
        width: 12%;
        &.many-1 {
          top: 64%;
          left: 18%;
        }
        &.many-2 {
          top: 37%;
          left: 21%;
        }
        &.many-3 {
          top: 20%;
          left: 40%;
        }
        &.many-4 {
          top: 36%;
          left: 68%;
        }
        &.many-5 {
          top: 71%;
          left: 61%;
        }
      }
    }
    &.many-wrap-4 {
      .many-img {
        width: 12%;
        &.many-1 {
          top: 64%;
          left: 6%;
        }
        &.many-2 {
          top: 64%;
          left: 23%;
        }
        &.many-3 {
          top: 64%;
          left: 40%;
        }
        &.many-4 {
          top: 64%;
          left: 57%;
        }
        &.many-5 {
          top: 64%;
          left: 74%;
        }
      }
    }
    &.many-wrap-5 {
      .many-img {
        width: 11%;
        &.many-1 {
          top: 53%;
          left: 13%;
          transform: skewY();
        }
        &.many-2 {
          top: 73%;
          left: 23%;
        }
        &.many-3 {
          top: 77%;
          left: 46%;
        }
        &.many-4 {
          top: 80%;
          left: 64%;
        }
        &.many-5 {
          top: 56%;
          left: 74%;
        }
      }
    }
    .choose-img {
      box-sizing: border-box;
    }
  }
}
</style>
