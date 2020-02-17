<template>
  <div class="compare-number-within-five-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/sequenceFive/complete.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_1"
      class="stem-music"
      src="static/audio/compareNumberWithinFive/stem_music_1.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_2"
      class="stem-music"
      src="static/audio/compareNumberWithinFive/stem_music_2.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_3"
      class="stem-music"
      src="static/audio/compareNumberWithinFive/stem_music_3.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_4"
      class="stem-music"
      src="static/audio/compareNumberWithinFive/stem_music_4.mp3"
    >您的浏览器不支持 audio 标签。</audio>
    <audio
      id="stem_music_5"
      class="stem-music"
      src="static/audio/compareNumberWithinFive/stem_music_5.mp3"
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
      <div class="compare-number-within-five-wrapper" v-if="currentItem.type=='basketFlower'">
        <div class="top-container">
          <img class="corner" src="static/images/compareNumberWithinFive/corner.png" alt />
          <div class="flower-wrapper flex-wrapper">
            <div class="flower-item-wrapper" v-for="item in currentItem.flowerNumber" :key="item">
              <img
                class="flower-item"
                @touchmove="touchMove('flower'+item)"
                @touchstart="down('flower'+item)"
                @touchend="check(item)"
                :id="'flower'+item"
                :src="'static/images/compareNumberWithinFive/flower.png'"
                alt
              />
            </div>
          </div>
        </div>
        <div class="bottom-container">
          <div class="basket-wrapper">
            <img
              v-for="(item, index) in currentItem.basketList"
              :key="index"
              class="basket-item"
              id="left_basket"
              :src="'static/images/compareNumberWithinFive/'+item.img+'.png'"
              alt
            />
          </div>
        </div>
      </div>
      <div class="compare-number-within-five-wrapper" v-if="currentItem.type=='butterflyFlower'">
        <div class="top-container fourth-top-wrapper">
          <img class="corner" src="static/images/compareNumberWithinFive/corner.png" alt />
          <div class="butterfly-wrapper flex-wrapper">
            <div class="butterfly-item-wrapper" v-for="item in 2" :key="item">
              <img
                class="butterfly-item"
                @touchmove="touchMove('butterfly'+item)"
                @touchstart="down('butterfly'+item)"
                @touchend="check(item)"
                :id="'butterfly'+item"
                :src="'static/images/compareNumberWithinFive/butterfly.png'"
                alt
              />
            </div>
          </div>
        </div>
        <div class="bottom-container">
					<div class="flower_butterfly_wrapper">
						<img
							class="flower_wrapper"
							src="static/images/compareNumberWithinFive/flower_wrapper.png"
							alt
						/>
						<img class="butterfly-item" :style="{'top': item.top, 'left': item.left}" src="static/images/compareNumberWithinFive/butterfly.png" v-for="(item, index) in currentItem.butterflyList" :key="index" alt="">
					</div>
        </div>
      </div>
    </div>
    <red-complete v-if="isFinish" @goBack="goBack" @initiate="initiate"></red-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import redComplete from "@/common/redComplete";
import { getElementToPageTop, getElementToPageLeft } from "@/common/js/common";
export default {
  name: "HelloWorld",
  data() {
    return {
      position: { x: 0, y: 0 },
      currentIndex: 0,
      currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [
        {
          type: "basketFlower",
          basketList: [
            { img: "basket1", currentList: [], need: 1 },
            { img: "basket2", currentList: [], need: 1 },
            { img: "basket3", currentList: [], need: 1 }
          ],
          isRight: false,
          flowerNumber: 5
        },
        {
          type: "basketFlower",
          basketList: [
            { img: "basket2", currentList: [], need: 1 },
            { img: "basket3", currentList: [], need: 1 },
            { img: "basket4", currentList: [], need: 1 }
          ],
          isRight: false,
          flowerNumber: 5
        },
        {
          type: "basketFlower",
          basketList: [
            { img: "basket3", currentList: [], need: 1 },
            { img: "basket4", currentList: [], need: 1 },
            { img: "basket5", currentList: [], need: 1 }
          ],
          isRight: false,
          flowerNumber: 5
        },
        {
					type: "butterflyFlower",
					butterflyList: [{top: '25%',left: '0%'},{top: '50%',left: '25%'},{top: '0%',left: '35%'},{top: '50%',left: '55%'}]
				},{
					type: "butterflyFlower",
					butterflyList: [{top: '25%',left: '0%'},{top: '50%',left: '25%'},{top: '0%',left: '35%'},{top: '50%',left: '55%'},{top: '50%',left: '55%'},{top: '50%',left: '55%'}]
				}
      ]
    };
  },
  components: {
    commonHeader,
    redComplete
  },
  mounted() {
    let _this = this;
    let flowerEleList = document.getElementsByClassName("flower-item");
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stemMusicList = document.getElementsByClassName("stem-music");
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
        _this.currentItem = _this.gameList[_this.currentIndex];
        for (let i = 0, len = flowerEleList.length; i < len; i++) {
          flowerEleList[i].style.left = "0px";
          flowerEleList[i].style.top = "0px";
        }
        _this.musicActive = true;
        _this.canDrag = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true;
    });
    _this.initiate();
  },
  methods: {
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
      _this.currentIndex = 3;
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.isFinish = false;
      _this.canDrag = false;
      _this.musicActive = true;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        for (let j = 0; j < _this.gameList[i].basketList.length; j++) {
          _this.gameList[i].basketList[j].currentList = [];
        }
      }
      _this.playAudio("stem_music_" + (_this.currentIndex + 1));
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
      let basketList = document.getElementsByClassName("basket-item");
			console.log(basketList);
			if(_this.currentItem.type == 'basketFlower'){
				for (let i = 0, len = basketList.length; i < len; i++) {
					//篮子的四边
					let basketDivLeft = basketList[i].offsetLeft;
					let basketDivRight = basketDivLeft + basketList[i].clientWidth;
					let basketDivTop = basketList[i].offsetTop;
					let basketDivBottom = basketDivTop + basketList[i].clientHeight;
					// console.log(mouseX,mouseY)
					// console.log('盘子',basketDivLeft,basketDivRight,basketDivTop,basketDivBottom )
					console.log(
						"篮子" + i,
						_this.currentItem.basketList[i].currentList.length
					);
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
					} else {
						let index = _this.currentItem.basketList[i].currentList.indexOf(
							moveDiv
						);
						if (index != -1) {
							_this.currentItem.basketList[i].currentList.splice(index, 1);
						}
					}
				}
				for (let i = 0, len = basketList.length; i < len; i++) {
					//如果花篮的花不够，直接退出方法
					if (_this.currentItem.basketList[i].currentList.length != 1) {
						return;
					}
				}
				_this.currentItem.isRight = true;
				_this.currentIndex++;
				_this.playAudio("right_music");
				_this.canDrag = false;
			}else{
				
			}
    }
  }
};
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.compare-number-within-five-container {
  height: 100%;
  .body {
    background-image: url("../../../static/images/compareNumberWithinFive/background.png");
    background-size: 100% 100%;
    height: 100%;
    .compare-number-within-five-wrapper {
      height: 100%;
    }

    .top-container {
      height: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .corner {
        height: 90%;
      }
      .flower-wrapper {
        background-image: url("../../../static/images/compareNumberWithinFive/border.png");
        background-size: 100% 100%;
        width: 50%;
        height: 100px;
        border-radius: 10px;
        z-index: 100;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .flower-item-wrapper {
          position: relative;
          width: 45px;
          height: 60px;
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            z-index: 1;
          }
        }
      }
      .butterfly-wrapper {
        background-image: url("../../../static/images/compareNumberWithinFive/border.png");
        background-size: 100% 100%;
        width: 30%;
        height: 80px;
        border-radius: 10px;
        z-index: 100;
        display: flex;
        justify-content: space-around;
				align-items: center;
				.butterfly-item-wrapper {
          position: relative;
          width: 50px;
          height: 50px;
          img {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            z-index: 1;
          }
        }
      }
		}
		.fourth-top-wrapper{
			justify-content: space-between;
			align-items: flex-start;
    	padding: 30px 20px 0;
    	box-sizing: border-box;
		}
    .bottom-container {
			position: relative;
      height: 50%;
      .basket-wrapper {
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .basket-item {
          width: 25%;
          height: 37vh;
          vertical-align: middle;
        }
			}
			.flower_butterfly_wrapper{
				width: 50%;
        position: absolute;
				bottom: 30px;
				left: 25%;
				.flower_wrapper {
					width: 100%;
				}
				.butterfly-item{
					position: absolute;
					width: 50px;
				}
			}
      
    }
  }
}
</style>
