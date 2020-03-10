<template>
    <div class="triangle-container" >
        <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="right_music" src="static/audio/common/bottom_right.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="finish_five" src="static/audio/common/bottom_finish_five.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="please_think" src="static/audio/common/bottom_please_think.mp3">您的浏览器不支持 audio 标签。</audio>
        <audio id="select_triangle" src="static/audio/triangle/select_triangle.wav">您的浏览器不支持 audio 标签。</audio>
        <audio id="select_rect" src="static/audio/triangle/select_rect.wav">您的浏览器不支持 audio 标签。</audio>
        <audio id="first_page" src="static/audio/triangle/first_page.wav">您的浏览器不支持 audio 标签。</audio>

        <img v-if="!isFirstPage && !musicActive && !isFinish" class="music-img" @click="broadcast()" src="static/images/common/bottom_music.png"> 
        <img v-if="!isFirstPage && musicActive && !isFinish" class="music-img" src="static/images/common/bottom_music_active.gif">
        <common-header :game-list="gameList" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
        <div class="first-page" v-if="isFirstPage && !isFinish">
        </div> 
        <div class="body" v-if="!isFinish">
            <div class="game-item">
                <div class="game-title">
                    <img class="game-title-img" :src="'static/images/triangle/'+currentItem.titleImg+'.png'" alt="">
                </div>
                <div class="choose-item-wrapper">
                    <div class="item-wrapper" v-for="(item, index) in currentItem.choiceList">
                        <div class="choose-item left-item" @click="choose(item)">
                            <img :class="currentItem.isWrong ? 'shake-animation' : ''" class="choice-img" :src="item.img" alt="">
                        </div>
                        <img v-if="item.currentRight" class="right-img" src="static/images/common/right.png" alt="">
                    </div> 
                </div>
            </div>
        </div>
        <complete 
            v-if="isFinish" 
            @goBack="goBack" 
            @initiate="restart"
            :img="completeImg"
            background="#fef987">
        </complete>
    </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import complete from "@/common/complete";
export default {
  name: 'triangle',
  data(){
    return {
        completeImg: 'static/images/triangle/complete.png',
        currentIndex: 0,
        currentItem: {},
        isFinish: true,
        isFirstPage: true,
        musicActive: true,
        canChoose: false,
        gameList: [
            {
                audioType: 'select_rect',
                titleImg: 'title_rect',
                isWrong: false,
                choiceList: [{
                    img: 'static/images/triangle/rect_2.png',
                    isRight: true,
                    currentRight: false
                },{
                    img: 'static/images/triangle/star.png',
                    isRight: false,
                    currentRight: false
                },{
                    img: 'static/images/triangle/circle_1.png',
                    isRight: false,
                    currentRight: false
                }],
            },
            {
                audioType: 'select_triangle',
                titleImg: 'title_triangle',
                isWrong: false,
                choiceList: [{
                    img: 'static/images/triangle/rect_1.png',
                    isRight: false,
                    currentRight: false
                },{
                    img: 'static/images/triangle/triangle_4.png',
                    isRight: true,
                    currentRight: false
                },{
                    img: 'static/images/triangle/hexagon.png',
                    isRight: false,
                    currentRight: false
                }],
            },
            {
                audioType: 'select_triangle',
                titleImg: 'title_triangle',
                isWrong: false,
                choiceList: [{
                    img: 'static/images/triangle/parallelogram.png',
                    isRight: false,
                    currentRight: false
                },{
                    img: 'static/images/triangle/trapezoid_2.png',
                    isRight: false,
                    currentRight: false
                },{
                    img: 'static/images/triangle/triangle_3.png',
                    isRight: true,
                    currentRight: false
                }],
            },
            {
                audioType: 'select_triangle',
                titleImg: 'title_triangle',
                isWrong: false,
                choiceList: [{
                    img: 'static/images/triangle/triangle_5.png',
                    isRight: true,
                    currentRight: false
                },{
                    img: 'static/images/triangle/circle_2.png',
                    isRight: false,
                    currentRight: false
                },{
                    img: 'static/images/triangle/triangle_2.png',
                    isRight: true,
                    currentRight: false
                },{
                    img: 'static/images/triangle/diamond.png',
                    isRight: false,
                    currentRight: false
                }],
            },
            {
                audioType: 'select_triangle',
                titleImg: 'title_triangle',
                isWrong: false,
                choiceList: [{
                    img: 'static/images/triangle/triangle_1.png',
                    isRight: true,
                    currentRight: false
                },{
                    img: 'static/images/triangle/rect_3.png',
                    isRight: false,
                    currentRight: false
                },{
                    img: 'static/images/triangle/triangle_6.png',
                    isRight: true,
                    currentRight: false
                },{
                    img: 'static/images/triangle/trapezoid_1.png',
                    isRight: false,
                    currentRight: false
                }],
            }
        ]
    }
  },
  components: {
      commonHeader,
      complete
  },
  mounted(){
      let _this = this;
      _this.currentIndex = 0;
      this.$nextTick(()=>{
        let bg_music = document.getElementById('bg_music');
        let right_music = document.getElementById('right_music');
        let finish_five = document.getElementById('finish_five');
        let please_think = document.getElementById('please_think');
        let select_triangle = document.getElementById('select_triangle');
        let select_rect = document.getElementById('select_rect');
        let first_page = document.getElementById('first_page');
        bg_music.addEventListener("canplaythrough",function(){
            bg_music.play();
        });
        first_page.addEventListener("canplaythrough",function(){
            first_page.play();
        });
        first_page.addEventListener("ended", function(){
            setTimeout(function(){
                _this.playAudio('select_rect');
                _this.isFirstPage = false;
            },1000)
        })
        select_triangle.addEventListener("ended", function(){
            _this.musicActive = false;
            _this.canChoose = true;
        })
        select_rect.addEventListener("ended", function(){
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
                _this.playAudio(_this.gameList[_this.currentIndex].audioType)
                _this.currentItem = _this.gameList[_this.currentIndex];
                _this.musicActive = true;
                _this.canChoose = true;
            }
        })
        please_think.addEventListener("ended", function(){
            _this.canChoose = true;
            _this.currentItem.isWrong = false
            for(let i = 0, len = _this.gameList.length; i < len; i++){
                _this.gameList[i].isWrong = false;
            }
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
        if(choiceItem.isRight == false){
            _this.currentItem.isWrong = true;
            _this.canChoose = false;
            _this.playAudio('please_think');
        }else{
            choiceItem.currentRight = true;
        }
        for(let i = 0; i < _this.currentItem.choiceList.length; i++){
            if(_this.currentItem.choiceList[i].isRight && !_this.currentItem.choiceList[i].currentRight){
                return
            }
        }
        _this.currentIndex++;
        _this.playAudio('right_music');
        _this.canChoose = false;
    },
    //播放题目
    broadcast(){
        let _this = this;
        _this.musicActive = true;
        _this.canChoose = false;
        _this.playAudio(_this.gameList[_this.currentIndex].audioType)
    },
    
    //第一次初始化
    initiate(){
        let _this = this;
        _this.isFinish = false;
        _this.isFirstPage = true;
        _this.currentIndex = 0;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isWrong = false;
            for(let j = 0; j< _this.gameList[i].choiceList.length; j++){
                _this.gameList[i].choiceList[j].currentRight = false;
            }
        }
        _this.currentItem = _this.gameList[_this.currentIndex];
        _this.playAudio('first_page')
        _this.musicActive = true;
    },

    restart(){
        let _this = this;
        _this.isFinish = false;
        _this.currentIndex = 0;
        _this.isFirstPage = false;
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isWrong = false;
            for(let j = 0; j< _this.gameList[i].choiceList.length; j++){
                _this.gameList[i].choiceList[j].currentRight = false;
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
@headerHeight: 30px;
@bodyHeight: calc(~"100% - 30px");
.triangle-container{
    height: 100%;
    box-sizing: border-box;
    .music-img{
        position: absolute;
        top: 50px;
        left: 50px; 
        width: 100px;
    }
    .first-page{
        background-image: url('../../../static/images/triangle/firstPage.png');
        background-size: 100% 100%;
        height: @bodyHeight;
        margin-bottom: 30px;
    }
    .body{
        background-image: url('../../../static/images/triangle/background.png');
        background-size: 100% 100%;
        height: @bodyHeight;
        padding-top: 40px;
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
            width: 80%;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            .item-wrapper{
                display: inline-block;
                box-sizing: border-box;
                width: 20%;
                vertical-align: top;
                .right-img{
                    width: 50%;
                }
            }
            .choose-item{
                padding: 15% 0 0;
                background-size: 100% 100%;
                
                .choice-img{
                    width: 60%;
                    max-height: 23vh;
                }
            }
        }
    }
}
</style>