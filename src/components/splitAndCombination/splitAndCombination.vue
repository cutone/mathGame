<template>
  <div class="middle-class-menu-container">
    <audio id="bg_music" loop="loop" src="static/audio/splitAndCombination/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/splitAndCombination/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/splitAndCombination/please_think.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="bottom_right" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="selt_keystone" class="stem-music" src="static/audio/splitAndCombination/selt_keystone.mp3">您的浏览器不支持 audio
      标签。</audio>
    <audio id="selt_rectangular" class="stem-music" src="static/audio/splitAndCombination/selt_rectangular.mp3">您的浏览器不支持
      audio 标签。</audio>
    <audio id="selt_square" class="stem-music" src="static/audio/splitAndCombination/selt_square.mp3">您的浏览器不支持 audio
      标签。</audio>
    <audio id="selt_triangle" class="stem-music" src="static/audio/splitAndCombination/selt_triangle.mp3">您的浏览器不支持 audio
      标签。</audio>
    <audio id="selt_house" class="stem-music" src="static/audio/splitAndCombination/selt_house.mp3">您的浏览器不支持 audio
      标签。</audio>
    <audio id="selt_fish" class="stem-music" src="static/audio/splitAndCombination/selt_fish.mp3">您的浏览器不支持 audio
      标签。</audio>
    <audio id="selt_chicken" class="stem-music" src="static/audio/splitAndCombination/selt_chicken.mp3">您的浏览器不支持 audio
      标签。</audio>
    <audio id="selt_car" class="stem-music" src="static/audio/splitAndCombination/selt_car.mp3">您的浏览器不支持 audio
      标签。</audio>
    <img class="music-img" @click="broadcast()" v-if="!musicActive && !isFinish"
      src="static/images/trapezoid/music.png">
    <img class="music-img" v-if="musicActive && !isFinish" src="static/images/trapezoid/music_active.gif">
    <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div class="game-list" v-if="!isFinish">
      <div class="game-item">
        <div class="game-title">
          <div class="game-title-left" v-if="currentIndex<4">
            <img class="game-title-leftImg" :src="currentItem.titleImg" alt="">
          </div>
          <div class="game-title-right">
            <span class="game-title-text">{{currentItem.title}}</span>
            <img class="game-title-img" src="static/images/splitAndCombination/question.png" alt="">
          </div>
        </div>
        <div class="choose-item-wrapper">
          <div class="topFour" v-if="currentIndex<4">
            <div class="choose-item left-item" @click="choose('left')">
              <img :class="currentItem.isWrong?'shake-animation' : ''" class="choice-img" :src="currentItem.leftImg"
                alt="">
              <img v-if="currentItem.isLeft=='left'" class="right-img" src="static/images/splitAndCombination/right.png"
                alt="">
            </div>
            <div v-if="currentItem.centerImg" class="choose-item left-item" @click="choose('center')">
              <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.centerImg"
                alt="">
              <img v-if="currentItem.isCenter=='center'" class="right-img"
                src="static/images/splitAndCombination/right.png" alt="">
            </div>
            <div class="choose-item right-item" @click="choose('right')">
              <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.rightImg"
                alt="">
              <img v-if="currentItem.isRight=='right'" class="right-img"
                src="static/images/splitAndCombination/right.png" alt="">
            </div>
          </div>
          <div class="topFive" :key="currentItem.id" v-if="currentIndex>3">
            <!-- 左侧可拖动图片 -->
            <img v-for="(item1,index1) in currentItem.initCss" :key="index1" class="all" :style="item1.css"
              :src="'static/images/splitAndCombination/'+item1.name+'.png'" @touchmove="touchMove(item1.name)"
              @touchstart="down(item1.name)" @touchend="check(item1,index1)" :id="item1.name" />
            <!-- 外边框 -->
            <img src='static/images/splitAndCombination/border2.png' class="back" :id="currentItem.backId">
            <!-- 目标区域图片 -->
            <img v-for="item2 in currentItem.rImg" :key="item2.name" :style="item2.css" :name="item2.class"
              :src="'static/images/splitAndCombination/'+item2.img+'.png'" :class="item2.class">
          </div>
        </div>
      </div>
    </div>
    <middle-complete v-if="isFinish" @goBack="goBack" @initiate="initiate"
      background="static/images/splitAndCombination/ending.gif">
    </middle-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import middleComplete from "@/common/middleComplete";
export default {
  name: 'splitAndCombination',
  data () {
    return {
      position: { x: 0, y: 0 },
      currentIndex: 0,
      currentItem: {},
      isFinish: true,
      musicActive: true,
      canChoose: false,
      selt_canChoose: [],
      canDrag: false,
      gameList: [
        {
          titleImg: 'static/images/splitAndCombination/titleRectangular.png',
          title: '正方形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/splitRectangular.png',
          rightImg: 'static/images/splitAndCombination/splitTriangle.png',
          rightChoice: ['left', '', 'right'],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 2,
          isWrong: false,
          audioType: 'selt_square'
        },
        {
          titleImg: 'static/images/splitAndCombination/rectangular.png',
          title: '长方形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/purpleKeystone.png',
          centerImg: 'static/images/splitAndCombination/purpleTriangle.png',
          rightImg: 'static/images/splitAndCombination/purpleSquare.png',
          rightChoice: ['', 'center', 'right'],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 2,
          isWrong: false,
          audioType: 'selt_rectangular'
        },
        {
          titleImg: 'static/images/splitAndCombination/quad.png',
          title: '梯形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/blueRectangular.png',
          centerImg: 'static/images/splitAndCombination/blueTriangle.png',
          rightImg: 'static/images/splitAndCombination/blueQuad.png',
          rightChoice: ['left', 'center', 'right'],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 3,
          isWrong: false,
          audioType: 'selt_keystone'
        },
        {
          titleImg: 'static/images/splitAndCombination/pinkTriangle.png',
          title: '三角形可以分割成下列哪些图形？',
          leftImg: 'static/images/splitAndCombination/pinkTriangle.png',
          centerImg: 'static/images/splitAndCombination/pinkKeystone.png',
          rightImg: 'static/images/splitAndCombination/pinkQuad.png',
          rightChoice: ['left', 'center', ''],
          isLeft: '',
          isCenter: '',
          isRight: '',
          count: '',
          right: 2,
          isWrong: false,
          audioType: 'selt_triangle'
        },
        {
          id: 4,
          title: '请用给出的图形拼出一座房子',
          initCss: [
            {
              name: 'house_one',
              id: 'house',
              css: { width: "25%", height: "30%", top: "10px", left: " 5%" },
              target: 'house_one'
            },
            {
              name: 'house_two',
              id: 'house',
              css: { width: "25%", height: "35%", top: "40%", left: "5%" },
              target: 'house_two'
            },
            {
              name: 'house_three',
              id: 'house',
              css: { width: "5%", height: "12%", top: "2%", left: "35%" },
              target: 'house_three'
            },
            {
              name: 'house_four',
              id: 'house',
              css: { width: "5%", height: "25%", top: "50%", left: "35%" },
              target: 'house_four'
            },
          ],
          rImg: [
            {
              name: 'rHouse',
              class: 'house_one',
              css: { position: "absolute", left: "58%", top: "12%", width: " 25%", height: "30%"},
              img: 'rHouse',
            },
            {
              name: 'rHouse1',
              class: 'house_two',
              css: { position: "absolute", left: "58%", top: "42%", width: "25%", height: "35%"},
              img: 'rHouse1',
            },
            {
              name: 'rHouse2',
              class: 'house_three',
              css: { position: "absolute", left: "62%", top: "50%", width: "5%", height: "12%"},
              img: 'rHouse2',
            },
            {
              name: 'rHouse3',
              class: 'house_four',
              css: { position: "absolute", width: "5%", height: "25%", left: "75%", top: "52%"},
              img: 'rHouse3',
            }
          ],
          backId: 'house',
          rightChoice: 4,
          currentChoice: 0,
          audioType: 'selt_house',
          isWrong: false,
        },
        {
          id: 5,
          title: '请用给出的图形拼出两条鱼',
          initCss: [
            {
              name: 'fish_one',
              id: 'fish',
              css: { width: "20%", height: "30%", top: "10px", left: " 5%" },
              target: 'fish_one'
            },
            {
              name: 'fish_two',
              id: 'fish',
              css: { width: "5%", height: "30%", top: "40%", left: "5%" },
              target: 'fish_two'
            },
            {
              name: 'fish_three',
              id: 'fish',
              css: { width: "7%", height: "45%", top: "10px", left: "30%" },
              target: 'fish_three'
            },
            {
              name: 'fish_four',
              id: 'fish',
              css: { width: "5%", height: "30%", top: "40%", left: "12%" },
              target: 'fish_four'
            },
            {
              name: 'fish_five',
              id: 'fish',
              css: { width: "4%", height: "15%", top: "46%", left: "20%" },
              target: 'fish_five'
            },
            {
              name: 'fish_six',
              id: 'fish',
              css: { width: "2.5%", height: "10%", top: "48%", left: "25%" },
              target: 'fish_six'
            },
          ],
          rImg: [
            {
              name: 'rFish',
              class: 'fish_one',
              css: { position: "absolute", left: "58%", top: "12%", width: "20%", height: "30%" },
              img: 'rFish'
            },
            {
              name: 'rFish1',
              class: 'fish_two',
              css: { position: "absolute", left: "78%", top: "12%", width: "5%", height: "30%" },
              img: 'rFish1'
            },
            {
              name: 'rFish2',
              class: 'fish_three',
              css: { position: "absolute", left: "62%", top: "45%", width: "7%", height: "45%" },
              img: 'rFish2'
            },
            {
              name: 'rFish3',
              class: 'fish_four',
              css: { position: "absolute", left: "69%", top: "52%", width: "5%", height: "30%" },
              img: 'rFish3'
            },
            {
              name: 'rFish4',
              class: 'fish_five',
              css: { position: "absolute", left: "60%", top: "19%", width: "4%", height: "15%" },
              img: 'rFish4'
            },
            {
              name: 'rFish5',
              class: 'fish_six',
              css: { position: "absolute", left: "64%", top: "62%", width: "2.5%", height: "10%" },
              img: 'rFish5'
            },
          ],
          backId: 'fish',
          rightChoice: 6,
          currentChoice: 0,
          isWrong: false,
          audioType: 'selt_fish'
        },
        {
          id: 6,
          title: '请用给出的图形拼出一只小鸡',
          initCss: [
            {
              name: 'chicken_one',
              id: 'chicken',
              css: { width: "12%", height: "35%", top: "10px", left: " 5%" },
              target: 'chicken_one'
            },
            {
              name: 'chicken_two',
              id: 'chicken',
              css: { width: "16%", height: "45%", top: "40%", left: "5%" },
              target: 'chicken_two'
            },
            {
              name: 'chicken_three',
              id: 'chicken',
              css: { width: "4%", height: "20%", top: "4%", left: "30%" },
              target: 'chicken_three'
            },
            {
              name: 'chicken_four',
              id: 'chicken',
              css: { width: "5%", height: "15%", top: "4%", left: "20%" },
              target: 'chicken_four'
            },
            {
              name: 'chicken_five',
              id: 'chicken',
              css: { width: "4%", height: "15%", top: "46%", left: "25%" },
              target: 'chicken_five'
            },
            {
              name: 'chicken_six',
              repeat: 'chicken_six',
              id: 'chicken',
              css: { width: "4%", height: "15%", top: "46%", left: "30%" },
              target: 'chicken_five'
            },
          ],
          rImg: [
            {
              id: 0,
              name: 'rChicken',
              class: 'chicken_one',
              css: { position: "absolute", left: "58%", top: "12%", width: "12%", height: "35%" },
              img: 'rChicken'
            },
            {
              id: 1,
              name: 'rChicken1',
              class: 'chicken_two',
              css: { position: "absolute", left: "68%", top: "25%", width: "16%", height: "45%" },
              img: 'rChicken1'
            },
            {
              id: 2,
              name: 'rChicken2',
              class: 'chicken_three',
              css: { position: "absolute", left: "54%", top: "18%", width: "4%", height: "20%" },
              img: 'rChicken2'
            },
            {
              id: 3,
              name: 'rChicken3',
              class: 'chicken_four',
              css: { position: "absolute", left: "60%", top: "22%", width: "5%", height: "15%" },
              img: 'rChicken3'
            },
            {
              id: 4,
              name: 'rChicken4',
              class: 'chicken_five',
              css: { position: "absolute", left: "70%", top: "64%", width: "4%", height: "15%" },
              img: 'rChicken4'
            },
            {
              id: 5,
              name: 'rChicken5',
              class: 'chicken_five',
              css: { position: "absolute", left: "76%", top: "64%", width: "4%", height: "15%" },
              img: 'rChicken5'
            },
          ],
          backId: 'chicken',
          rightChoice: 6,
          currentChoice: 0,
          isWrong: false,
          audioType: 'selt_chicken'
        },
        {
          id: 7,
          title: '请用给出的图形拼出一辆车',
          initCss: [
            {
              name: 'car_one',
              id: 'car',
              css: { width: "8%", height: "25%", top: "10px", left: " 5%" },
              target: 'car_one'
            },
            {
              name: 'car_two',
              id: 'car',
              css: { width: "12%", height: "25%", top: "40%", left: "5%" },
              target: 'car_two'
            },
            {
              name: 'car_three',
              id: 'car',
              css: { width: "30%", height: "25%", top: "4%", left: "15%" },
              target: 'car_three'
            },
            {
              name: 'car_four',
              id: 'car',
              css: { width: "5%", height: "15%", top: "46%", left: "20%" },
              target: 'car_four',
            },
            {
              name: 'car_five',
              id: 'car',
              css: { width: "5%", height: "15%", top: "46%", left: "28%" },
              target: 'car_four',
            },
          ],
          rImg: [
            {
              name: 'rCar',
              class: 'car_one',
              css: { position: "absolute", left: "54%", top: "14%", width: "8%", height: "25%" },
              img: 'rCar'
            },
            {
              name: 'rCar1',
              class: 'car_two',
              css: { position: "absolute", left: "62%", top: "14%", width: "12%", height: "25%" },
              img: 'rCar1'
            },
            {
              name: 'rCar2',
              class: 'car_three',
              css: { position: "absolute", left: "54%", top: "39%", width: "30%", height: "25%" },
              img: 'rCar2'
            },
            {
              name: 'rCar3',
              class: 'car_four',
              css: { position: "absolute", left: "60%", top: "64%", width: "5%", height: "15%" },
              img: 'rCar3'
            },
            {
              name: 'rCar4',
              class: 'car_four',
              css: { position: "absolute", left: "75%", top: "64%", width: "5%", height: "15%" },
              img: 'rCar4'
            },
          ],
          backId: 'car',
          rightChoice: 5,
          currentChoice: 0,
          isWrong: false,
          audioType: 'selt_car'
        },
      ],
      houseLeft: '',
      houseRight: '',
      houseTop: '',
      houseBottom: '',
      initialPosition: [],
    }
  },
  components: {
    commonHeader,
    middleComplete
  },
  mounted () {
    let _this = this;
    this.$nextTick(() => {
      let bg_music = document.getElementById('bg_music');
      let right_music = document.getElementById('right_music');
      let please_think = document.getElementById('please_think');
      let bottom_right = document.getElementById('bottom_right');
      let stemMusicList = document.getElementsByClassName("stem-music");
      for (let i = 0, len = stemMusicList.length; i < len; i++) {
        eval("let " + stemMusicList[i].id + "=document.getElementById('" + stemMusicList.id + "');");
        stemMusicList[i].addEventListener("ended", function () {
          _this.canChoose = true;
          _this.musicActive = false;
        });
      }
      bg_music.addEventListener("canplaythrough", function () {
        bg_music.play();
      });
      selt_square.addEventListener("canplaythrough", function () {
        selt_square.play();
      });
      //正确提示mp3播放后
      right_music.addEventListener("ended", function () {
        _this.currentIndex++;
        if (_this.currentIndex == _this.gameList.length) {
          //播放答对五道题的mp3
          _this.playAudio('bottom_right');
          _this.isFinish = true;
        } else {
          //修改题目下标，播放题目
          _this.currentItem = _this.gameList[_this.currentIndex];
          _this.playAudio(_this.gameList[_this.currentIndex].audioType)
          _this.musicActive = true;
          _this.canChoose = false;
        }
      })
      please_think.addEventListener("ended", function () {
        _this.canChoose = true;
        _this.currentItem.isWrong = false;
      })
      _this.initiate();
    })
  },
  methods: {
    //播放游戏规则
    playAudio (id) {
      let audioBtn = document.getElementById(id);
      audioBtn.currentTime = 0;
      audioBtn.play();
    },
    goBack () {
      this.$router.go(-1);
    },
    // 鼠标松开后触发
    check (item, index) {
      console.log(item);
      let _this = this;
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      let mouseX = event.changedTouches[0].pageX;
      let mouseY = event.changedTouches[0].pageY;
        let moveDiv = event.target;
        let LightList;
        console.log(item.target)
        LightList = document.getElementsByClassName(item.target);
        console.log(LightList, LightList.length);
        for (let i = 0; i < LightList.length; i++) {
          let imgLeft = LightList[i].offsetLeft;
          let imgRight = imgLeft + LightList[i].clientWidth;
          let imgTop = document.body.clientHeight * 4 / 10 + LightList[i].offsetTop;
          let imgBottom = imgTop + LightList[i].clientHeight;
          if (mouseX > imgLeft && mouseX < imgRight && mouseY > imgTop && mouseY < imgBottom) {
            console.log(LightList[i].name)
            LightList[i].src = 'static/images/splitAndCombination/'+LightList[i].name+'.png';
            document.getElementById(item.name).style.display = "none";
            this.currentItem.currentChoice++;
            this.initialPosition.forEach(im => {
              if (item.name == im.key) {
                im.isCanChoice = false;
              }
            })
            if (this.currentItem.rightChoice == this.currentItem.currentChoice) {
              _this.canChoose = false;
              _this.playAudio('right_music');
            }
          } else if (i == LightList.length) {
            // 判断是不是在目标位置
            this.initialPosition.forEach(item1 => {
              if (item.name == item1.key) {
                moveDiv.style.top = item1.y;
                moveDiv.style.left = item1.x;
                _this.canChoose = false;
                _this.playAudio("please_think");
              }
            })
          }
        }
    },
    //鼠标按下触发
    down (el) {
      //  题目音乐播放完之后才能点击
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
      // 判断是不是已经获取初始位置的图片
      let result = this.initialPosition.some(item => {
        return el == item.key;
      })
      if (!result) {
        this.initialPosition.push({
          key: el,
          x: this.dx + 'px',
          y: this.dy + 'px',
          isCanChoice: true,
        })
      }
    },
    //选择答案
    choose (choiceItem) {
      //  题目音乐播放完之后才能点击
      if (!this.canChoose) {
        return;
      }
      let _this = this;
      let selt_canChoose = _this.selt_canChoose.some(item1 => {
        return choiceItem == item1;
      })
      // 判断是不是已经点过的图形
      if (selt_canChoose) {
        return;
      }
      let result = _this.currentItem.rightChoice.some(item1 => {
        return choiceItem == item1
      })
      if (result) {
        _this.selt_canChoose.push(choiceItem);
        _this.currentItem.count++;
        switch (choiceItem) {
          case 'left':
            _this.currentItem.isLeft = choiceItem;
            break;
          case 'center':
            _this.currentItem.isCenter = choiceItem;
            break;
          case 'right':
            _this.currentItem.isRight = choiceItem;
            break;
        }
        if (_this.currentItem.count == _this.currentItem.right) {
          _this.selt_canChoose = [];
          _this.canChoose = false;
          _this.playAudio('right_music');
        }
      }
      else {
        _this.canChoose = false;
        _this.currentItem.isWrong = true;
        console.log(_this.currentItem)
        _this.playAudio('please_think');
      }
    },
    //拖动事件
    touchMove (el) {
      const _this = this;
      if (!_this.canChoose) {
        return;
      }
      let moveDiv = document.getElementById(el);
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
        function () {
          document.removeEventListener(
            "touchmove",
            _this.preventDefault,
            false
          );
        },
        { passive: false }
      );
    },
    //播放题目
    broadcast () {
      let _this = this;
      _this.musicActive = true;
      _this.canChoose = false;
      _this.playAudio(_this.gameList[_this.currentIndex].audioType)
    },

    //重做
    initiate () {
      let _this = this;
      _this.isFinish = false;
      _this.currentIndex = 0;
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
        _this.gameList[i].isRight = false;
        if(i < 4){
          _this.gameList[i].isLeft=''
          _this.gameList[i].isCenter=''
          _this.gameList[i].isRight=''
          _this.gameList[i].count=0
        }else{
          _this.gameList[i].currentChoice = 0
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
@import "../../../static/css/doudong.css";
@headerHeight: 30px;
@bodyHeight: calc(~"100%-30px");
.middle-class-menu-container {
  background-image: url("../../../static/images/splitAndCombination/background.png");
  background-size: 100% 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  .music-img {
    position: absolute;
    top: 50px;
    left: 50px;
    width: 100px;
  }
  .game-list {
    height: 100%;
    .game-item {
      height: 100%;
    }
    .game-title {
      display: flex;
      width: 100%;
      height: 30%;
      margin: 0 auto;
      justify-content: center;
      &-left {
        height: 100%;
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        .game-title-leftImg {
          display: block;
          height: 80%;
          margin-left: 10%;
        }
      }
      &-right {
        height: 100%;
        width: 50%;
        position: relative;
        margin: 0 auto;
        .game-title-img {
          position: absolute;
          display: block;
          width: 80%;
          height: 80px;
          top: 18%;
          left: 10%;
        }
        .game-title-text {
          position: absolute;
          left: 0;
          z-index: 2;
          width: 80%;
          left: 10%;
          text-align: center;
          line-height: 100px;
          color: #69473d;
        }
      }
    }
    .choose-item-wrapper {
      width: 100%;
      height: 60%;
      .topFour {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .choose-item {
          display: inline-block;
          padding: 4% 0;
          box-sizing: border-box;
          margin-bottom: 0;
          width: 25%;
          height: 60%;
          background-image: url("../../../static/images/splitAndCombination/border.png");
          background-size: 100% 100%;
          position: relative;
          .choice-img {
            width: 40%;
            height: 90%;
          }
          .right-img {
            position: absolute;
            width: 40%;
            top: 100%;
            left: 30%;
          }
        }
      }
      .topFive {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: relative;
        .all {
          position: absolute;
          z-index: 10;
        }
        .back {
          position: absolute;
          left: 50%;
          width: 40%;
          height: 90%;
        }
        .allSmall {
          position: absolute;
        }
      }
    }
  }
}
</style>
