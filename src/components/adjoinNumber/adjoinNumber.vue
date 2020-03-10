<template>
    <div class="middle-class-menu-container" >
        <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="finish_five" src="static/audio/common/top_finish_five.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="stem_music" src="static/audio/adjoinNumber/stem_music.m4a">您的浏览器不支持 audio 标签。</audio>

        <img class="music-img" @click="broadcast()" v-if="!musicActive && !isFinish" src="static/images/common/top_music.png"> 
        <img class="music-img" v-if="musicActive && !isFinish" src="static/images/common/top_music_active.gif">
        <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
        <div class="game-list" v-if="!isFinish">
            <div class="game-item">
                <div class="game-title">
                    <span class="game-title-text">{{currentItem.title}}</span>
                    <img class="game-title-img" src="static/images/common/cloud.png" alt="">
                </div>
                <div class="choose-item-wrapper">
                    <div class="item-wrapper flex-wrapper">
                        <div v-for="(item, index) in currentItem.questionList" class="choose-item" :key="index">
                            <div class="img-wrapper">
                                <img class="choice-img" :src="'static/images/'+item+'.png'" alt="">
                            </div>
                            <img class="yellow-person" src="static/images/adjoinNumber/question_bg.png" alt="">
                        </div>
                    </div> 
                    <img class="floor" src="static/images/adjoinNumber/floor.png" alt="">
                    <div class="answer-list flex-wrapper">
                        <div v-for="(item, index) in currentItem.answerList" :key="index" class="answer-item" @click="choose(index)">
                            <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="'static/images/'+item+'.png'" alt="">
                            <img class="right-img" v-if="currentItem.isRight && index+1==currentItem.answer" src="static/images/common/right.png" alt="">
                        </div>
                        
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
                title: '根据提示点击正确答案',
                questionList: ['adjoinNumber/one_banana','','adjoinNumber/three_strawberry'],
                answerList: ['adjoinNumber/fore_banana','adjoinNumber/three_grape','adjoinNumber/two_watermalen'],
                answer: 3,
                isRight: true,
                isWrong: false
            },
            {
                title: '根据提示点击正确答案',
                questionList: ['common/3','common/4',''],
                answerList: ['common/5','common/1','common/2'],
                answer: 1,
                isRight: false,
                isWrong: false
            },
            {
                title: '根据提示点击正确答案',
                questionList: ['','adjoinNumber/five_dice','adjoinNumber/six_dice'],
                answerList: ['adjoinNumber/two_dice','adjoinNumber/four_dice','adjoinNumber/three_dice'],
                answer: 2,
                isRight: false,
                isWrong: false
            },
            {
                title: '根据提示点击正确答案',
                questionList: ['common/8','','common/10'],
                answerList: ['common/7','common/6','common/9'],
                answer: 3,
                isRight: false,
                isWrong: false
            },
            {
                title: '根据提示点击正确答案',
                questionList: ['adjoinNumber/five_dice','adjoinNumber/six_flower',''],
                answerList: ['common/7','common/6','common/5'],
                answer: 1,
                isRight: false,
                isWrong: false
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
                _this.playAudio('stem_music')
                _this.musicActive = true;
                _this.canChoose = false;
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
        if((choiceItem+1) == _this.currentItem.answer){
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
        background: #fde7aa;
        .game-item{
            height: 100%;
        }
        .game-title{
            position: relative;
            width: 25%;
            height: 25%;
            line-height: 140px;
            margin: 0 auto;
            .game-title-img{
                position: absolute;
                display: block;
                width: 100%;
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
                font-size: 11px;
            }
        }
        .choose-item-wrapper{
            height: 75%;
            .floor{
                width: 100%;
                height: 20px;
            }
            .answer-list{
                height: 30%;
                width: 80%;
                margin: 0 auto;
                .answer-item{
                    position: relative;
                    display: inline-block;
                    width: 20%;
                    background-image: url('../../../static/images/adjoinNumber/answer_bg.png');
                    background-size: 100% 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    img{
                        position: absolute;
                        width: 70%;
                        height: 80%;
                    }
                }
            }
            .item-wrapper{
                display: inline-block;
                box-sizing: border-box;
                width: 100%;
                height: 45%;
            }
            .choose-item{
                display: inline-block;
                width: 9%;
                height: 100%;
                vertical-align: middle;
                margin: 0 5%;
                .img-wrapper{
                    width: 100%;
                    height: 8vw;
                    background-image:url('../../../static/images/adjoinNumber/answer_bg.png');
                    background-size: 100% 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .choice-img{
                        width: 60%;
                    }
                }
                .yellow-person{
                    width: 100%;
                }
            }
        }
    }
}
</style>