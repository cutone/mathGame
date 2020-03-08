<template>
    <div class="compare-number-container" >
        <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="finish_five" src="static/audio/common/bottom_complete.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="stem_music" src="static/audio/compareNumber/stem_music.wav">您的浏览器不支持 audio 标签。</audio>

        <img class="music-img" @click="broadcast()" v-if="!musicActive && !isFinish" src="static/images/common/top_music.png"> 
        <img class="music-img" v-if="musicActive && !isFinish" src="static/images/common/top_music_active.gif">
        <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
        <div class="game-list" v-if="!isFinish">
            <div class="game-title">
                <img class="game-title-img" src="static/images/compareNumber/Minnie1.png" alt="">
            </div>
            <div class="choose-item-wrapper">
                <div class="item-wrapper">
                    <div class="choose-item left-item" @click="choose('left', currentItem)">
                        <img v-for="(img, index) in currentItem.topNumber" :key="index" class="choice-img" :src="currentItem.topImg" alt="">
                    </div>
                </div> 
                <div class="item-wrapper">
                    <div class="choose-item right-item" @click="choose('right', currentItem)">
                        <img v-for="(img, index) in currentItem.bottomNumber" :key="index" class="choice-img" :src="currentItem.bottomImg" alt="">
                    </div>
                </div>
                <div class="choice-wrapper">
                    <img class="choose-item" @click="choose('left')" src="static/images/compareNumber/true.png" alt="">
                    <img class="choose-item" @click="choose('right')" src="static/images/compareNumber/wrong.png" alt="">
                </div> 
            </div>
        </div>
        <bottom-class-complete 
            v-if="isFinish" 
            :background="background" 
            :leftImg="leftImg" 
            :rightImg="rightImg"
            @goBack="goBack" 
            @initiate="initiate"
        >
        </bottom-class-complete>
    </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import bottomClassComplete from "@/common/bottomClassComplete";
export default {
  name: 'home',
  data(){
    return {
        background: 'static/images/compareNumber/background.png',
        leftImg: 'static/images/compareNumber/Minnie1.png',
        rightImg: 'static/images/compareNumber/Minnie2.png',
        currentIndex: 0,
        currentItem: {},
        isFinish: false,
        musicActive: true,
        canChoose: false,
        gameList: [
            {
                topImg: 'static/images/compareNumber/watermelon.png',
                topNumber: 3,
                bottomImg: 'static/images/compareNumber/pineapple.png',
                bottomNumber: 4,
                answer: 'right'
            },
            {
                topImg: 'static/images/compareNumber/fish.png',
                topNumber: 5,
                bottomImg: 'static/images/compareNumber/hippocampus.png',
                bottomNumber: 5,
                answer: 'left'
            },
            {
                topImg: 'static/images/compareNumber/cake.png',
                topNumber: 3,
                bottomImg: 'static/images/compareNumber/frog.png',
                bottomNumber: 2,
                answer: 'right'
            },
            {
                topImg: 'static/images/compareNumber/bowl.png',
                topNumber: 4,
                bottomImg: 'static/images/compareNumber/cup.png',
                bottomNumber: 3,
                answer: 'right'
            },
            {
                topImg: 'static/images/compareNumber/hat.png',
                topNumber: 5,
                bottomImg: 'static/images/compareNumber/box.png',
                bottomNumber: 5,
                answer: 'left'
            }
        ]
    }
  },
  components: {
      commonHeader,
      bottomClassComplete
  },
  mounted(){
      let _this = this;
      _this.currentIndex = 0;
      this.$nextTick(()=>{
        let bg_music = document.getElementById('bg_music');
        let right_music = document.getElementById('right_music');
        let finish_five = document.getElementById('finish_five');
        let please_think = document.getElementById('please_think');
        let stem_music = document.getElementById('stem_music');
        bg_music.addEventListener("canplaythrough",function(){
            bg_music.play();
        });
        stem_music.addEventListener("canplaythrough",function(){
            stem_music.play();
        });
        stem_music.addEventListener("ended", function(){
            _this.musicActive = false;
            _this.canChoose = true;
        })
        //正确提示mp3播放后
        right_music.addEventListener("ended", function(){
            console.log(_this.currentIndex)
            if(_this.currentIndex == 5){
                //播放答对五道题的mp3
                _this.playAudio('finish_five');
                _this.isFinish = true;
            }else{
                //修改题目下标，播放题目
                _this.currentItem = _this.gameList[_this.currentIndex];
                _this.musicActive = true;
                _this.canChoose = true;
            }
        })
        please_think.addEventListener("ended", function(){
            _this.canChoose = true;
        })
        _this.initiate()
      })
  },
  beforeDestroy(){
      let _this = this;
      _this.isFinish = false;
        _this.currentIndex = 0;
        _this.currentItem = _this.gameList[_this.currentIndex];
  },
  methods: {
    //播放游戏规则
    playAudio(id){
      let audioBtn = document.getElementById(id);
      audioBtn.currentTime = 0;
      audioBtn.play();
    },
    goBack(){
      this.$router.go(-1);
    },
    //选择答案
    choose(answer){
        let _this = this;
        if(!_this.canChoose){
            return;
        }
        _this.canChoose = false;
        if(answer == _this.currentItem.answer){
            _this.currentIndex++;
            _this.playAudio('right_music');
        }else{
            _this.playAudio('please_think');
        }
    },
    //播放题目
    broadcast(){
        let _this = this;
        _this.musicActive = true;
        _this.canChoose = false;
        _this.playAudio('stem_music')
    },
    
    //重做
    initiate(){
        let _this = this;
        _this.isFinish = false;
        _this.currentIndex = 0;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isRight = false;
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('stem_music')
        _this.musicActive = true;
    }
  },
}
</script>

<style scoped lang='less'>
@headerHeight: 30px;
@bodyHeight: calc(~"100% - 30px");
.compare-number-container{
    background-image: url('../../../static/images/compareNumber/background.png');
    background-size: 100% 100%;
    height: 100%;
    box-sizing: border-box;
    .music-img{
        position: absolute;
        top: 50px;
        left: 50px; 
        width: 100px;
    }
    .game-list{
        display: flex;
        height: @bodyHeight;
        .game-item{
            height: 100%;
        }
        .game-title{
            display: inline-block;
            width: 25%;
            height: 100%;
            line-height: 140px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .game-title-img{
                display: block;
                width: 50%;
            }
        }
        .choose-item-wrapper{
            display: inline-block;
            width: 74%;
            .item-wrapper{                
                box-sizing: border-box;
                margin: 0 auto;
                width: 60%;
                height: 25%;
                .choose-item{
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 10px 0;
                    background: #c6e6e9;
                    margin: 20px auto;
                    border: 10px;
                    height: 100%;
                    box-sizing: border-box;
                    .choice-img{
                        width: 10%;
                    }
                    
                }
            }
        }
        .choice-wrapper{
            display: flex;
            justify-content: space-around;
            align-items: center;
            height: 25%;
            width: 60%;
            margin: 0 auto;
            .choose-item{
                width: 20%;
            }
        }
    }
}
</style>