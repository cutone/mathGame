<template>
  <div class="numberWithinFive-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio id="right_music" src="static/audio/common/bottom_right.mp3">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio id="complete" src="static/audio/sequenceFive/bottom_complete.mp3">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">
      您的浏览器不支持 audio 标签。
    </audio>
    <audio id="first_page" src="static/audio/numberWithinFive/first_page.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_1" class="stem-music" src="static/audio/numberWithinFive/stem_music_1.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_2" class="stem-music" src="static/audio/numberWithinFive/stem_music_2.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_3" class="stem-music" src="static/audio/numberWithinFive/stem_music_3.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_4" class="stem-music" src="static/audio/numberWithinFive/stem_music_4.wav">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music_5" class="stem-music" src="static/audio/numberWithinFive/stem_music_5.wav">您的浏览器不支持 audio 标签。</audio>

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
    <common-header
      :game-list="gameList"
      :currentIndex="currentIndex"
      v-if="!isFinish"
    ></common-header>
    <div class="first-page" v-if="isFirstPage && !isFinish"></div>
    <div v-if="!isFinish && !isFirstPage" class="body">
        <div class="target-wrapper">
            <div class="shadow-wrapper" :class="currentItem.shadowImg" v-for="item in currentItem.shadowList">
                <img v-show="item.isRight" class="shadow-img" :src="'static/images/numberWithinFive/'+currentItem.rightImg+'.png'" alt="">
                <img v-show="!item.isRight" class="shadow-img" :src="'static/images/numberWithinFive/'+currentItem.shadowImg+'.png'" alt="">
                <img :class="item.isRight?'number-img-show':'number-img-hide'" class="number-img" :src="item.numberImg" />
            </div>
        </div>
        <div class="table-wrapper">
            <div v-for="(item, index) in currentItem.imgList" class="drag-item-wrapper" :class="item">
                <img
                    :id="item+'_'+index"
                    class="drag-item"
                    @touchmove="touchMove(item+'_'+index)" 
                    @touchstart="down(item+'_'+index)"
                    @touchend="check(item+'_'+index)"  
                    :src="'static/images/numberWithinFive/'+item+'.png'" alt="" />
            </div>
        </div>
    </div>
    <complete 
            v-if="isFinish" 
            @goBack="goBack" 
            @initiate="restart"
            :img="completeImg"
            background="#70d7c8">
        </complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import complete from "@/common/complete";
export default {
  name: "numberWithinFive",
  data() {
    return {
        position: {x: 0, y:0},
        completeImg: 'static/images/numberWithinFive/complete.png',
      currentIndex: 0,
      currentItem: {},
      musicActive: true,
      canDrag: false,
      isFinish: false,
      isFirstPage: true,
      gameList: [{
          number: 1,
          shadowImg: 'bag_shadow',
          rightImg: 'bag',
          shadowList: [{numberImg: '', isRight: false}],
          currentNumber: 0,
          imgList: ['rule','book','bag','eraser']
      },{
          number: 2,
          shadowImg: 'book_shadow',
          rightImg: 'book',
          shadowList: [{numberImg: '', isRight: false},{numberImg: '', isRight: false}],
          currentNumber: 0,
          imgList: ['bag','book','pencil','book','eraser']
      },{
          number: 3,
          shadowImg: 'box_shadow',
          rightImg: 'box',
          shadowList: [{numberImg: '', isRight: false},{numberImg: '', isRight: false},{numberImg: '', isRight: false}],
          currentNumber: 0,
          imgList: ['box','bag','eraser','box','box','rule']
      },{
          number: 4,
          shadowImg: 'rule_shadow',
          rightImg: 'rule',
          shadowList: [{numberImg: '', isRight: false},{numberImg: '', isRight: false},{numberImg: '', isRight: false},{numberImg: '', isRight: false}],
          currentNumber: 0,
          imgList: ['rule','eraser','note','rule','rule','eraser','eraser','rule','pencil']
      },{
          number: 5,
          shadowImg: 'eraser_shadow',
          rightImg: 'eraser',
          shadowList: [{numberImg: '', isRight: false},{numberImg: '', isRight: false},{numberImg: '', isRight: false},{numberImg: '', isRight: false},{numberImg: '', isRight: false}],
          currentNumber: 0,
          imgList: ['eraser','eraser','book','rule','eraser','pencil','box','eraser','eraser']
      }]
    };
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
    let first_page = document.getElementById("first_page");
    let dragList = document.getElementsByClassName("drag-item");
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

    first_page.addEventListener("canplaythrough", function() {
      first_page.play();
    });
    first_page.addEventListener("ended", function() {
        setTimeout(function(){
           _this.playAudio("stem_music_1"); 
           _this.isFirstPage = false;
        },1000)
    });
    right_music.addEventListener("ended", function() {
      if (_this.currentIndex == _this.gameList.length) {
        _this.isFinish = true;
        _this.playAudio("complete");
      } else {
        _this.currentItem = _this.gameList[_this.currentIndex];
        for(let i = 0; i < dragList.length; i++){
            dragList[i].style.display = 'block';
            dragList[i].style.top = 'auto';
            dragList[i].style.left = 'auto';
        }
        _this.playAudio("stem_music_"+(_this.currentIndex+1));
        _this.musicActive = true;
      }
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true;
    });
    _this.initiate();
  },
  methods: {
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
      //获取元素
      let moveDiv = event.target;
      let targetList = document.getElementsByClassName('shadow-wrapper');
      for (let i = 0; i < targetList.length; i++) {
            let imgLeft = targetList[i].offsetLeft;
            let imgRight = imgLeft + targetList[i].clientWidth;
            // let imgTop = getElementToPageTop(targetList[i]);
            let imgTop = targetList[i].offsetTop;
            let imgBottom = imgTop + targetList[i].clientHeight;
            console.log(imgLeft, imgRight, imgTop, imgBottom);
            if (
              mouseX > imgLeft &&
              mouseX < imgRight &&
              mouseY > imgTop &&
              mouseY < imgBottom
            ) {
                let moveContent = (moveDiv.id.split('_'))[0]
              if (_this.currentItem.rightImg == moveContent) {
                console.log("对了");
                moveDiv.style.display = 'none';
                _this.currentItem.currentNumber++
                _this.currentItem.shadowList[i].numberImg = 'static/images/numberWithinFive/' + _this.currentItem.currentNumber+'.png'
                _this.currentItem.shadowList[i].isRight = true;
              } else {
                console.log("错了");
                moveDiv.style.top = 'auto';
                moveDiv.style.left = 'auto';
                _this.canDrag = false;
                _this.playAudio("please_think");
              }
            }
      }
      for(let i = 0; i < _this.currentItem.shadowList.length; i++){
          if(_this.currentItem.shadowList[i].isRight == false){
              return
          }
      }
      _this.currentIndex++;
      _this.canDrag = false;
      _this.playAudio('right_music')
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
      _this.playAudio("stem_music_"+(_this.currentIndex+1));
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
      _this.isFirstPage = true;
      _this.canDrag = false;
      _this.musicActive = true;
      let dragList = document.getElementsByClassName("drag-item");
      for(let i = 0; i < dragList.length; i++){
            dragList[i].style.display = 'block';
            dragList[i].style.top = 'auto';
            dragList[i].style.left = 'auto';
        }
      _this.playAudio("first_page");
    },
    restart() {
      let _this = this;
      _this.isFinish = false;
      _this.currentIndex = 0;
      _this.isFirstPage = false;
      let dragList = document.getElementsByClassName("drag-item");
      for (let i = 0, len = _this.gameList.length; i < len; i++) {
          _this.gameList[i].currentNumber = 0;
        for (let j = 0; j < _this.gameList[i].shadowList.length; j++) {
          _this.gameList[i].shadowList[j].isRight = false;
          _this.gameList[i].shadowList[j].numberImg = '';
        }
      }
      for(let i = 0; i < dragList.length; i++){
            dragList[i].style.display = 'block';
            dragList[i].style.top = 'auto';
            dragList[i].style.left = 'auto';
        }
      _this.currentItem = _this.gameList[_this.currentIndex];
      _this.playAudio("stem_music_"+(_this.currentIndex+1));
      _this.musicActive = true;
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
    }
  }
};
</script>

<style scoped lang="less">
@import "../../../static/css/common.css";
@bodyHeight: calc(~"100% - 30px");
.numberWithinFive-container {
  height: 100%;
  .first-page {
    background-image: url("../../../static/images/numberWithinFive/firstPage.png");
    background-size: 100% 100%;
    height: @bodyHeight;
    margin-bottom: 30px;
  }
  .body {
    height: @bodyHeight;
    background: #dbeec0;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 20px;
    box-sizing: border-box;
    .target-wrapper{
        height: 30%;
        width: 90%;
        display: flex;
        justify-content: center;
        align-items: center;
        .shadow-wrapper{
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;
            margin: 0 20px;
            .shadow-img{
                width: 100%;
            }
            .number-img{
                height: 5vh;
                margin-top: 3vh;
            }
            .number-img-show{
                visibility: auto;
            }
            .number-img-hide{
                visibility: hide;
            }
        }
        
    }
    .table-wrapper{
        height: 45vh;
        width: 90%;
        background-image: url("../../../static/images/numberWithinFive/table.png");
        background-position: 0px 12vh;
        background-repeat: no-repeat;
        background-size: 100% 95%;
        display: flex;
        justify-content: center;
        align-items: center;
        
        .drag-item-wrapper{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 10px;
            .drag-item{
                position: absolute;
                width: 100%;
            }
        }
    }
    .bag_shadow,
        .bag{
            width: 10%;
        }
        .book_shadow,
        .book{
            width: 10%;
        }
        .box_shadow,
        .box{
            width: 5%;
        }
        .eraser_shadow,
        .eraser{
            width: 5%;
        }
        .rule_shadow,
        .rule{
            width: 10%;
        }
        .pencil_shadow,
        .pencil{
            width: 5%;
        }
        .note_shadow,
        .note{
            width: 10%;
        }
  }
}
</style>
