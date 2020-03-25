<template>
    <div class="circle-container" >
        <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="finish_five" src="static/audio/common/bottom_complete.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="stem_music" src="static/audio/circle/stem_music.wav">您的浏览器不支持 audio 标签。</audio>
        <audio id="first_page" src="static/audio/circle/first_page.wav">您的浏览器不支持 audio 标签。</audio>
        <img class="music-img" @click="broadcast()" v-if="!musicActive && !isFinish && !isFirstPage" src="static/images/common/bottom_music.png"> 
        <img class="music-img" v-if="musicActive && !isFinish && !isFirstPage" src="static/images/common/bottom_music_active.gif">
        <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish && !isFirstPage"></common-header>
        <div class="first-page" v-if="isFirstPage && !isFinish">
            <img class="shake-opacity" src="static/images/circle/tip.png" alt="">
        </div>
        <div class="game-list" v-if="!isFinish && !isFirstPage">
            <div class="game-item">
                <div class="game-title">
                    <img class="game-title-img" src="static/images/circle/title.png" alt="">
                </div>
                <div class="choose-item-wrapper">
                    <div class="item-wrapper">
                        <div class="choose-item left-item" @click="choose('left', currentItem)">
                            <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.leftImg" alt="">
                        </div>
                        <img v-show="currentItem.isRight && currentItem.rightChoice == 'left'" class="right-img" src="static/images/common/right.png" alt="">
                    </div> 
                    <div class="item-wrapper">
                        <div class="choose-item right-item" @click="choose('right', currentItem)">
                            <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.rightImg" alt="">
                        </div>
                        <img v-show="currentItem.isRight && currentItem.rightChoice == 'right'" class="right-img" src="static/images/common/right.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="finish-wrapper" v-if="isFinish">
            <div class="oprate-wrapper">
                <span class="complete-btn" @click="goBack()">完成</span>
                <span class="restart-btn" @click="initiate()">重做</span>
            </div> 
        </div>
    </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
export default {
  name: 'circle',
  data(){
    return {
        isFirstPage: true,
        currentIndex: 0,
        currentItem: {},
        isFinish: true,
        musicActive: true,
        canChoose: false,
        gameList: [
            {
                
                leftImg: 'static/images/circle/disk.png',
                rightImg: 'static/images/circle/tv.png',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
            },
            {
                
                leftImg: 'static/images/circle/cake.png',
                rightImg: 'static/images/circle/clock.png',
                rightChoice: 'right',
                isRight: false,
                isWrong: false,
            },
            {
                
                leftImg: 'static/images/circle/coin.png',
                rightImg: 'static/images/circle/door.png',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
            },
            {
                
                leftImg: 'static/images/circle/circle_red.png',
                rightImg: 'static/images/circle/trapezoid.png',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
            },
            {
                leftImg: 'static/images/circle/triangle.png',
                rightImg: 'static/images/circle/circle_purple.png',
                rightChoice: 'right',
                isRight: false,
                isWrong: false,
            },
        ]
    }
  },
  components: {
      commonHeader,
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
        let first_page = document.getElementById('first_page');
        bg_music.addEventListener("canplaythrough",function(){
            bg_music.play();
        });
        first_page.addEventListener("canplaythrough",function(){
            first_page.play();
        });
        first_page.addEventListener("ended", function(){
            _this.isFirstPage = false;
            _this.playAudio('stem_music');
        })
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
                _this.playAudio('stem_music')
                _this.musicActive = true;
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
    choose(choiceItem, item){
        let _this = this;
        if(!_this.canChoose){
            return;
        }
        _this.canChoose = false;
        if(choiceItem == item.rightChoice){
            item.isRight = true;
            _this.currentIndex++;
            _this.playAudio('right_music');
        }else{
            item.isWrong = true;
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
        _this.isFirstPage = true;
        _this.currentIndex = 0;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isRight = false;
            _this.gameList[i].isWrong = false;
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('first_page')
        _this.musicActive = true;
    }
  }
}
</script>

<style scoped lang='less' scoped>
@headerHeight: 30px;
@bodyHeight: calc(~"100% - 30px");
.circle-container{
    height: 100%;
    box-sizing: border-box;
    .first-page{
        background-image: url("../../../static/images/circle/firstPage.png");
        background-size: 100% 100%;
        height: 100%;
        margin-bottom: 30px;
        box-sizing: border-box;
        padding-top: 7%;
        .shake-opacity{
            width: 30%;
        }
    }
    .game-list{
        height: @bodyHeight;
        background-image: url('../../../static/images/circle/background.png');
        background-size: 100% 100%;
        padding-top: 20px;
        box-sizing: border-box;
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
                display: block;
                height: 100px;
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
                width: 30%;
                vertical-align: top;
                .right-img{
                    width: 35%;
                }
            }
            .choose-item{
                padding: 15% 0 0;
                background-size: 100% 100%;
                
                .choice-img{
                    width: 60%;
                }
            }
        }
    }
    .finish-wrapper{
        height: 100%;
        background-image: url('../../../static/images/circle/finish.png');
        background-size: 100% 100%;
        padding-top: 20%;
        padding-left: 10%;
        box-sizing: border-box;
        .oprate-wrapper {
            display: flex;
            width: 50%;
            justify-content: space-around;
            transform: rotate(-5deg);
            .complete-btn {
                display: block;
                width: 80px;
                height: 40px;
                background: #fdf731;
                border-radius: 5px;
                line-height: 40px;
            }
            .restart-btn {
                display: block;
                width: 80px;
                height: 40px;
                background: #47b1f0;
                border-radius: 5px;
                line-height: 40px;
            }
        }
    }
}
</style>