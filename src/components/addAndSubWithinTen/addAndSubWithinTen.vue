<template>
    <div class="middle-class-menu-container" >
        <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="finish_five" src="static/audio/common/top_finish_five.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="select_globe" src="static/audio/cylinder/select_globe.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="select_cylinder" src="static/audio/cylinder/select_cylinder.m4a">您的浏览器不支持 audio 标签。</audio>

        <img class="music-img" v-if="!musicActive && !isFinish" src="static/images/common/top_music.png"> 
        <img class="music-img" v-if="musicActive && !isFinish" src="static/images/common/top_music_active.gif">
        <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
        <div class="game-list" v-if="!isFinish">
            <div class="game-item">
                <div class="game-title">
                    <span class="game-title-text">{{currentItem.title}}</span>
                    <img class="game-title-img" src="static/images/common/cloud.png" alt="">
                </div>
                <div class="choose-item-wrapper">
                    <div class="item-wrapper">
                        <div class="choose-item left-item" @click="choose('left')">
                            <span :class="currentItem.isWrong ? 'shake-animation':''" class="choice-img">{{currentItem.leftImg}}</span>    
                            <!-- <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.leftImg" alt=""> -->
                        </div>
                        <img v-if="currentItem.isRight && currentItem.rightChoice == 'left'" class="right-img" src="static/images/common/right.png" alt="">
                    </div> 
                    <div class="item-wrapper">
                        <div class="choose-item right-item" @click="choose('right')">
                            <span :class="currentItem.isWrong ? 'shake-animation':''" class="choice-img">{{currentItem.rightImg}}</span> 
                            <!-- <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.rightImg" alt=""> -->
                        </div>
                        <img v-if="currentItem.isRight && currentItem.rightChoice == 'right'" class="right-img" src="static/images/common/right.png" alt="">
                    </div>
                </div>
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
  name: 'home',
  data(){
    return {
        currentIndex: 0,
        currentItem: {},
        isFinish: true,
        musicActive: true,
        canChoose: false,
        gameList: [
            {
                title: '请选出正确算式',
                leftImg: '3+2=5',
                rightImg: '4+3=8',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
            },
            {
                title: '请选出正确算式',
                leftImg: '10-2=8',
                rightImg: '10-6=5',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
            },
            {
                title: '请选出正确算式',
                leftImg: '4+2=8',
                rightImg: '5+3=8',
                rightChoice: 'right',
                isRight: false,
                isWrong: false,
            },
            {
                title: '请选出正确算式',
                leftImg: '8-3=5',
                rightImg: '9-6=4',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
            },
            {
                title: '请选出正确算式',
                leftImg: '4+3=6',
                rightImg: '5+3=8',
                rightChoice: 'right',
                isRight: false,
                isWrong: false,
            },
        ]
    }
  },
  components: {
      commonHeader,
      topClassComplete
  },
  mounted(){
      let _this = this;
      _this.currentIndex = 0;
      this.$nextTick(()=>{
        let bg_music = document.getElementById('bg_music');
        let right_music = document.getElementById('right_music');
        let finish_five = document.getElementById('finish_five');
        let please_think = document.getElementById('please_think');
        bg_music.addEventListener("canplaythrough",function(){
            bg_music.play();
        });
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
            _this.currentItem.isWrong = false
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
    choose(choiceItem){
        let _this = this;
        if(!_this.canChoose){
            return;
        }
        _this.canChoose = false;
        if(choiceItem == _this.currentItem.rightChoice){
            _this.currentItem.isRight = true;
            _this.currentIndex++;
            _this.playAudio('right_music');
        }else{
            _this.currentItem.isWrong = true;
            _this.playAudio('please_think');
        }
    },
    //播放题目
    broadcast(){
        let _this = this;
        _this.musicActive = true;
        _this.canChoose = false;
        // _this.playAudio(_this.gameList[_this.currentIndex].audioType)
    },
    
    //重做
    initiate(){
        let _this = this;
        _this.isFinish = false;
        _this.currentIndex = 0;
        _this.canChoose = true;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isRight = false;
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        // _this.playAudio(_this.gameList[_this.currentIndex].audioType)
        _this.musicActive = true;
    }
  }
}
</script>

<style scoped lang='less'>
@import '../../../static/css/doudong.css';
@headerHeight: 30px;
@bodyHeight: calc(~"100% - 30px");
.middle-class-menu-container{
    height: 100%;
    box-sizing: border-box;
    .music-img{
        position: absolute;
        top: 50px;
        left: 50px; 
        width: 100px;
    }
    .game-list{
        height: @bodyHeight;
        background-image: url('../../../static/images/common/background.png');
        background-size: 100% 100%;
        .game-item{
            height: 100%;
        }
        .game-title{
            position: relative;
            width: 25%;
            height: 30%;
            line-height: 140px;
            margin: 0 auto;
            .game-title-img{
                position: absolute;
                display: block;
                width: 200px;
                height: 130px;
            }
            .game-title-text{
                position: absolute;
                left: 0;
                z-index: 2;
                width: 100%;
                text-align: center;
                line-height: 120px;
                color: #69473d;
            }
        }
        .choose-item-wrapper{
            height: 70%;
            .item-wrapper{
                display: inline-block;
                
                box-sizing: border-box;
                margin: 0 30px;
                width: 20%;
                vertical-align: top;
                .right-img{
                    width: 50%;
                }
            }
            .choose-item{
                padding: 15% 0;
                background-image: url('../../../static/images/trapezoid/border.png');
                background-size: 100% 100%;
                
                .choice-img{
                    font-size: 25px;
                    font-weight: bolder;
                    width: 60%;
                }
                
            }
        }
    }
}
</style>