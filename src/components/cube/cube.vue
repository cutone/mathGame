<template>
    <div class="middle-class-menu-container" >
        <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="right_music" src="static/audio/common/top_right.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="finish_five" src="static/audio/common/top_finish_five.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
        <audio id="select_cube" src="static/audio/cube/select_cube.wav">您的浏览器不支持 audio 标签。</audio>
        <audio id="select_cuboid" src="static/audio/cube/select_cuboid.wav">您的浏览器不支持 audio 标签。</audio>

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
                    <div class="item-wrapper">
                        <div class="choose-item left-item" @click="choose('left', currentItem)">
                            <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.leftImg" alt="">
                        </div>
                        <img v-if="currentItem.isRight && currentItem.rightChoice == 'left'" class="right-img" src="static/images/common/right.png" alt="">
                    </div> 
                    <div class="item-wrapper">
                        <div class="choose-item right-item" @click="choose('right', currentItem)">
                            <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="currentItem.rightImg" alt="">
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
                title: '请选正方体',
                leftImg: 'static/images/cube/rect.jpg',
                rightImg: 'static/images/cube/cube.jpg',
                rightChoice: 'right',
                isRight: false,
                isWrong: false,
                audioType: 'select_cube'
            },
            {
                title: '请选长方体',
                leftImg: 'static/images/cube/cuboid.jpg',
                rightImg: 'static/images/cube/rect2.jpg',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
                audioType: 'select_cuboid'
            },
            {
                title: '请选正方体',
                leftImg: 'static/images/cube/cube2.jpg',
                rightImg: 'static/images/cube/cuboid2.jpg',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
                audioType: 'select_cube'
            },
            {
                title: '请选长方体',
                leftImg: 'static/images/cube/cuboid3.jpg',
                rightImg: 'static/images/cube/cube3.jpg',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
                audioType: 'select_cuboid'
            },
            {
                title: '请选正方体',
                leftImg: 'static/images/cube/cube4.jpg',
                rightImg: 'static/images/cube/cuboid4.jpg',
                rightChoice: 'left',
                isRight: false,
                isWrong: false,
                audioType: 'select_cube'
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
        let select_cube = document.getElementById('select_cube');
        let select_cuboid = document.getElementById('select_cuboid');
        bg_music.addEventListener("canplaythrough",function(){
            bg_music.play();
        });
        select_cube.addEventListener("canplaythrough",function(){
            select_cube.play();
        });
        select_cube.addEventListener("ended", function(){
            _this.musicActive = false;
            _this.canChoose = true;
        })
        select_cuboid.addEventListener("ended", function(){
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
                _this.playAudio(_this.gameList[_this.currentIndex].audioType)
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
        _this.playAudio(_this.gameList[_this.currentIndex].audioType)
    },
    
    //重做
    initiate(){
        let _this = this;
        _this.isFinish = false;
        _this.currentIndex = 0;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isRight = false;
            _this.gameList[i].isWrong = false;
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio(_this.gameList[_this.currentIndex].audioType)
        _this.musicActive = true;
    }
  }
}
</script>

<style scoped lang='less'>
@headerHeight: 30px;
@bodyHeight: calc(~"100% - 30px");
.middle-class-menu-container{
    background-image: url('../../../static/images/common/background.png');
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
        height: @bodyHeight;
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
                    width: 60%;
                    min-height: 23vh;
                    max-height: 23vh;
                }
            }
        }
    }
}
</style>