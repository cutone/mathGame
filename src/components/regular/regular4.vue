<template>
  <div class="regular4-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio class="right_music" id="right_music_1" src="static/audio/regular4/right_music_1.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio class="right_music" id="right_music_2" src="static/audio/regular4/right_music_2.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio class="right_music" id="right_music_3" src="static/audio/regular4/right_music_3.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio class="right_music" id="right_music_4" src="static/audio/regular4/right_music_4.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/regular4/complete.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="stem_music" class="stem-music" src="static/audio/regular4/stem_music.m4a">您的浏览器不支持 audio 标签。</audio>
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
        <div class="img-wrapper" v-for="(item, index) in currentItem.imgList" :key="index" :style="{'top': item.top,'left':item.left}">
            <img :src="'static/images/regular4/'+item.img+'.png'" alt="">
        </div>
        <img @click="check('left')" class="left_choice" :src="'static/images/regular4/'+currentItem.leftChoice+'.png'" alt="">
        <img @click="check('right')" class="right_choice" :src="'static/images/regular4/'+currentItem.rightChoice+'.png'" alt="">
        <img v-if="currentItem.isRight && currentItem.right=='left'" class="left_choice right-img" src="static/images/common/right.png" alt="">
        <img v-if="currentItem.isRight && currentItem.right=='right'" class="right_choice right-img" src="static/images/common/right.png" alt="">
    </div>
     <top-class-complete v-if="isFinish" @goBack="goBack" @initiate="initiate">
    </top-class-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import topClassComplete from "@/common/topClassComplete";
export default {
  name: 'HelloWorld',
  data () {
    return {
    currentIndex: 0,
    currentItem: {},
      musicActive: true,
      canChoose: false,
      isFinish: false,
      gameList: [{
          imgList: [
              {img: 'bird',left: '5%',top: '50%'},
              {img: 'bee',left: '9%', top: '40%'},
              {img: 'bird',left: '15%',top: '30%'},
              {img: 'bee',left: '22%',top: '23%'},
              {img: 'bee',left: '29%',top: '17%'},
              {img: 'bird',left: '36%',top: '13%'},
              {img: 'bee',left: '44%',top: '11%'},
              {img: 'bee',left: '52%',top: '11%'},
              {img: 'question',left: '60%',top: '13%'},
              {img: 'bird',left: '68%',top: '17%'},
              {img: 'bee',left: '76%',top: '22%'},
              {img: 'bee',left: '83%',top: '30%'},
              {img: 'bee',left: '89%',top: '40%'},
              {img: 'bee',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'bee',
          rightChoice: 'bird',
          right: 'left'
      },{
          imgList: [
              {img: 'face_red',left: '5%',top: '50%'},
              {img: 'face_yellow',left: '9%', top: '40%'},
              {img: 'face_red',left: '15%',top: '30%'},
              {img: 'face_red',left: '22%',top: '23%'},
              {img: 'face_yellow',left: '29%',top: '17%'},
              {img: 'face_red',left: '36%',top: '13%'},
              {img: 'face_red',left: '44%',top: '11%'},
              {img: 'face_red',left: '52%',top: '11%'},
              {img: 'face_yellow',left: '60%',top: '13%'},
              {img: 'face_red',left: '68%',top: '17%'},
              {img: 'face_red',left: '76%',top: '22%'},
              {img: 'face_red',left: '83%',top: '30%'},
              {img: 'face_red',left: '89%',top: '40%'},
              {img: 'question',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'face_red',
          rightChoice: 'face_yellow',
          right: 'right'
      },{
          imgList: [
              {img: 'flower_green',left: '5%',top: '50%'},
              {img: 'flower_red',left: '9%', top: '40%'},
              {img: 'flower_red',left: '15%',top: '30%'},
              {img: 'flower_red',left: '22%',top: '23%'},
              {img: 'flower_red',left: '29%',top: '17%'},
              {img: 'flower_green',left: '36%',top: '13%'},
              {img: 'flower_red',left: '44%',top: '11%'},
              {img: 'flower_red',left: '52%',top: '11%'},
              {img: 'question',left: '60%',top: '13%'},
              {img: 'flower_green',left: '68%',top: '17%'},
              {img: 'flower_red',left: '76%',top: '22%'},
              {img: 'flower_red',left: '83%',top: '30%'},
              {img: 'flower_green',left: '89%',top: '40%'},
              {img: 'flower_red',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'flower_red',
          rightChoice: 'flower_green',
          right: 'left'
      },{
          imgList: [
              {img: 'heart_yellow',left: '5%',top: '50%'},
              {img: 'heart_yellow',left: '9%', top: '40%'},
              {img: 'heart_yellow',left: '15%',top: '30%'},
              {img: 'question',left: '22%',top: '23%'},
              {img: 'heart_red',left: '29%',top: '17%'},
              {img: 'heart_yellow',left: '36%',top: '13%'},
              {img: 'heart_yellow',left: '44%',top: '11%'},
              {img: 'heart_yellow',left: '52%',top: '11%'},
              {img: 'heart_red',left: '60%',top: '13%'},
              {img: 'heart_yellow',left: '68%',top: '17%'},
              {img: 'heart_yellow',left: '76%',top: '22%'},
              {img: 'heart_red',left: '83%',top: '30%'},
              {img: 'heart_yellow',left: '89%',top: '40%'},
              {img: 'heart_red',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'heart_red',
          rightChoice: 'heart_yellow',
          right: 'right'
      },{
          imgList: [
              {img: 'grape',left: '5%',top: '50%'},
              {img: 'strawberry',left: '10%', top: '36%'},
              {img: 'grape',left: '17%',top: '26%'},
              {img: 'grape',left: '25%',top: '18%'},
              {img: 'strawberry',left: '34%',top: '13%'},
              {img: 'strawberry',left: '44%',top: '11%'},
              {img: 'question',left: '55%',top: '11%'},
              {img: 'grape',left: '64%',top: '13%'},
              {img: 'grape',left: '73%',top: '18%'},
              {img: 'strawberry',left: '81%',top: '26%'},
              {img: 'strawberry',left: '88%',top: '36%'},
              {img: 'strawberry',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'grape',
          rightChoice: 'strawberry',
          right: 'left'
      },{
          imgList: [
              {img: 'rectangle_green',left: '5%',top: '50%'},
              {img: 'rectangle_green',left: '10%', top: '36%'},
              {img: 'rectangle_green',left: '17%',top: '26%'},
              {img: 'question',left: '25%',top: '18%'},
              {img: 'rectangle_yellow',left: '34%',top: '13%'},
              {img: 'rectangle_yellow',left: '44%',top: '11%'},
              {img: 'rectangle_green',left: '55%',top: '11%'},
              {img: 'rectangle_green',left: '64%',top: '13%'},
              {img: 'rectangle_yellow',left: '73%',top: '18%'},
              {img: 'rectangle_yellow',left: '81%',top: '26%'},
              {img: 'rectangle_green',left: '88%',top: '36%'},
              {img: 'rectangle_yellow',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'rectangle_yellow',
          rightChoice: 'rectangle_green',
          right: 'left'
      },{
          imgList: [
              {img: 'face_triangle',left: '5%',top: '50%'},
              {img: 'face_rectangle',left: '10%', top: '36%'},
              {img: 'face_rectangle',left: '17%',top: '26%'},
              {img: 'face_rectangle',left: '25%',top: '18%'},
              {img: 'face_triangle',left: '34%',top: '13%'},
              {img: 'question',left: '44%',top: '11%'},
              {img: 'face_rectangle',left: '55%',top: '11%'},
              {img: 'face_rectangle',left: '64%',top: '13%'},
              {img: 'face_triangle',left: '73%',top: '18%'},
              {img: 'face_triangle',left: '81%',top: '26%'},
              {img: 'face_triangle',left: '88%',top: '36%'},
              {img: 'face_rectangle',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'face_triangle',
          rightChoice: 'face_rectangle',
          right: 'left'
      },{
          imgList: [
              {img: 'watermelon',left: '5%',top: '50%'},
              {img: 'watermelon',left: '10%', top: '36%'},
              {img: 'watermelon',left: '17%',top: '26%'},
              {img: 'apple',left: '25%',top: '18%'},
              {img: 'watermelon',left: '34%',top: '13%'},
              {img: 'watermelon',left: '44%',top: '11%'},
              {img: 'apple',left: '55%',top: '11%'},
              {img: 'apple',left: '64%',top: '13%'},
              {img: 'watermelon',left: '73%',top: '18%'},
              {img: 'apple',left: '81%',top: '26%'},
              {img: 'apple',left: '88%',top: '36%'},
              {img: 'question',left: '93%',top: '50%'},
            ],
            isRight: false,
          leftChoice: 'watermelon',
          rightChoice: 'apple',
          right: 'right'
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
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");
    let stem_music = document.getElementById("stem_music");
    let rightMusicList = document.getElementsByClassName("right_music");
    for(let i = 0, len = rightMusicList.length; i < len; i++){
      eval("let "+ rightMusicList[i].id + "=document.getElementById('"+rightMusicList[i].id+"');");
      rightMusicList[i].addEventListener("ended", function() {
        if(_this.currentIndex == _this.gameList.length){
            _this.isFinish = true;
            _this.playAudio('complete')
        }else{
            console.log(_this.currentIndex)
            _this.currentItem = _this.gameList[_this.currentIndex];
            _this.musicActive = true;
            _this.canChoose = true;
        }
      });
    }
    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });

    stem_music.addEventListener("canplaythrough", function() {
      stem_music.play();
    });
    stem_music.addEventListener("canplaythrough", function() {
      _this.canChoose = true;
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
    check(choice){
        let _this = this;
        if(!_this.canChoose){
            return;
        }
        _this.canChoose = false;
        if(choice == _this.currentItem.right){
            _this.currentIndex++;
            _this.currentItem.isRight = true;
            _this.playAudio('right_music_1');
        }else{
            _this.playAudio('please_think');
        }
    }
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.regular4-container{
    height: 100%;
    .body{
        height: 100%;
        background-image: url('../../../static/images/regular4/background.png');
        background-size: 100% 120%;
        position: relative;
        .img-wrapper{
            position: absolute;
            background: #fff;
            border-radius: 5vw;
            width: 5vw;
            height: 5vw;
            display: flex;
            align-items: center;
            padding: 5px;
            box-sizing: border-box;
            img{
                width: 100%;
                height: 100%;
                position: static;
            }
        }
        .left_choice{
            position: absolute;
            left: 13%;
            bottom: 14%;
            width: 5vw;
            height: 5vw;
        }
        .right_choice{
            position: absolute;
            right: 10%;
            bottom: 14%;
            width: 5vw;
            height: 5vw;
        }
        .right-img{
            position: absolute;
            background: none;
            display: block;
            width: 5vw;
            height: 5vw;

        }
    }
}

</style>
