<template>
  <div class="compare-six-to-ten-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/sequenceFive/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music" class="stem-music" src="static/audio/common/stem_music.mp3">您的浏览器不支持 audio 标签。</audio>
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
        <img v-show="isDraging" id="tanghulu" src="/static/images/tanghulu.png" alt="">
        <div class="basket-wrapper">
            <img src="/static/images/compareSixToTen/basket.png" alt="">
        </div> 
        <div class="left-wrapper">
            <img class="person-img" :src="'/static/images/compareSixToTen/'+currentItem.leftImg+'.png'" alt="">
            <div class="tanghulu-wrapper">
                <img src="/static/images/compareSixToTen/stick.png" alt="">
                <img v-for="img in currentItem.leftNeed" src="/static/images/compareSixToTen/tanghulu.png" alt="">
            </div>
        </div>
        <div class="right-wrapper">
            <img class="person-img" :src="'/static/images/compareSixToTen/'+currentItem.rightImg+'.png'" alt="">
            <div class="tanghulu-wrapper">
                <img src="/static/images/stick.png" alt="">
                <img v-for="img in currentItem.leftNeed" src="/static/images/compareSixToTen/tanghulu.png" alt="">
            </div>
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
  name: 'compareSixToTen',
  data () {
    return {
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      isDraging: false,
      gameList: [{
          leftImg: 'girl_1',
          rightImg: 'boy_1',
          leftCurrent: 0,
          rightCurrent: 0,
          leftNeed: 6,
          rightNeed: 7,
      }

      ],
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
        _this.canChoose = true;
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
    check() {
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
      let moveDiv = event.target;
      let basketList = document.getElementsByClassName("basket-item-wrapper");
			if(_this.currentItem.type == 'boxToBasket'){
				for (let i = 0, len = basketList.length; i < len; i++) {
					//篮子的四边
					let basketDivLeft = basketList[i].offsetLeft;
					let basketDivRight = basketDivLeft + basketList[i].clientWidth;
					let basketDivTop = getElementToPageTop(basketList[i])-60;
					let basketDivBottom = basketDivTop + basketList[i].clientHeight;
					// console.log(mouseX,mouseY)
					// console.log('盘子',basketDivLeft,basketDivRight,basketDivTop,basketDivBottom )
					if (
						mouseX > basketDivLeft &&
						mouseX < basketDivRight &&
						mouseY > basketDivTop &&
						mouseY < basketDivBottom
					) {
						if (
							_this.currentItem.basketList[i].currentList.length <
							_this.currentItem.basketList[i].need
						) {
							_this.currentItem.basketList[i].currentList.push(moveDiv);
						} else {
							moveDiv.style.left = "0px";
							moveDiv.style.top = "0px";
							_this.canDrag = false;
							_this.playAudio("please_think");
						}
                    } 
                }
            }
    },
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.compare-six-to-ten-container{
  height: 100%;
  .body{
      position: relative;
    height: 100%;
    background-image: url('../../../static/images/compareSixToTen/background.png');
    background-size: 100% 100%;
    #tanghulu{
        position: absolute;
    }
    .basket-wrapper{
        display: inline-block;
        width: 20%;
        vertical-align: bottom;
        img{
            width: 100%;
        }
    }
    .right-wrapper,
    .left-wrapper{
        display: inline-block;
        width: 20%;
        vertical-align: bottom;
        position: relative;
        .person-img{
            width: 100%;
        }
        .tanghulu-wrapper{
            position: absolute;
            width: 10%;
        }
    }
  }
}
</style>
