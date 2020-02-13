<template>
  <div class="number-in-life-container">
    <audio id="bg_music" loop="loop" src="static/audio/common/bg_music.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="right_music" src="static/audio/common/right.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="complete" src="static/audio/common/top_complete.m4a">您的浏览器不支持 audio 标签。</audio>
    <audio id="please_think" src="static/audio/common/top_please_think.m4a">您的浏览器不支持 audio 标签。</audio>
    <common-header :game-list="[]" :currentIndex="currentIndex" v-if="!isFinish"></common-header>
    <div v-if="!isFinish" class="body">
        <div class="target-wrapper"> 
            <div class="target-item-wrapper" v-for="(item, index) in gameList" :key="index">
                <img :src="item.img" alt="">
                <div class="target-ele" :title="item.need">
                    <span :class="item.isRight?'show-content':'opacity-content'">{{item.need}}</span>
                </div>
            </div>
        </div>
        <div class="drag-container">
            <div class="drag-item-wrapper" v-for="(item, index) in answerList" :key="index">
                <div class="drag-item" 
                    :id="'item'+index"
                    @touchmove="touchMove('item'+index)" 
                    @touchstart="down('item'+index)" 
                    @touchend="check(item)"   
                >{{item.content}}</div>
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
  name: 'HelloWorld',
  data () {
    return {
        position: {
            x: 0,
            y: 0
        },
    currentIndex: 0,
      musicActive: true,
      canDrag: false,
      isFinish: false,
      gameList: [{
          img: 'static/images/numberInLife/fireTruck.png',
          isRight: false,
          need: '119'
      },{
          img: 'static/images/numberInLife/police.png',
          isRight: false,
          need: '110'
      },{
          img: 'static/images/numberInLife/ambulance.png',
          isRight: false,
          need: '120'
      },{
          img: 'static/images/numberInLife/telephone.png',
          isRight: false,
          need: '13869255'
      },{
          img: 'static/images/numberInLife/car.png',
          isRight: false,
          need: '闽A52088'
      },{
          img: 'static/images/numberInLife/clock.png',
          isRight: false,
          need: '10:00'
      }],
      answerList: [
            {content: '1505920',isRight: false},
            {content: '122',isRight: false},
            {content: '110',isRight: false},
            {content: '闽A52088',isRight: false},
            {content:'09:62',isRight: false},
            {content:'911',isRight: false},
            {content:'120',isRight: false},
            {content:'13869255',isRight: false},
            {content:'119',isRight: false},
            {content:'10:00',isRight: false}
        ]
    }
  },
  components: {
    commonHeader,
    topClassComplete
  },
  mounted() {
    let _this = this;
    let bg_music = document.getElementById("bg_music");
    let right_music = document.getElementById("right_music");
    let complete = document.getElementById("complete");
    let please_think = document.getElementById("please_think");

    bg_music.addEventListener("canplaythrough", function() {
      bg_music.play();
    });
    please_think.addEventListener("ended", function() {
      _this.canDrag = true
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
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //游戏初始化
    initiate() {
      let _this = this;
      _this.currentIndex = 0;
      _this.isFinish = false;
      _this.canDrag = true;
      _this.musicActive = true;
      for(let i = 0, len = _this.gameList.length; i < len; i++){
            _this.gameList[i].isRight = false
        }
    },
    //检查是否正确
    check(item){
        let _this = this;
        if(!_this.canDrag){
            return;
        }
        
        let touch;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        let moveDiv = event.target;
        let mouseX = event.changedTouches[0].pageX
        let mouseY = event.changedTouches[0].pageY
        let targetList = document.getElementsByClassName('target-ele')
        for(let i=0, len=targetList.length; i < targetList.length; i++){
            let targetLeft = targetList[i].offsetLeft;
            let targetRight = targetLeft + targetList[i].clientWidth;
            let targetTop = targetList[i].offsetTop;
            let targetBottom = targetTop + targetList[i].clientHeight;
            if(mouseX > targetLeft && mouseX < targetRight && mouseY > targetTop && mouseY < targetBottom){
                if(targetList[i].title == item.content){
                    _this.gameList[i].isRight = true;
                    moveDiv.style.display = 'none';
                }else{
                    _this.canDrag = false;
                    moveDiv.style.top = '0px';
                    moveDiv.style.left = '0px';
                    _this.playAudio('please_think')
                }
            }
        }
        for(let i = 0, len = _this.gameList.length; i < len; i++){
            if(!_this.gameList[i].isRight){
                return
            }
        }
        _this.isFinish = true;
        _this.playAudio('complete')
    },
    //鼠标按下触发
    down(el){
        let moveDiv = document.getElementById(el);
        this.flags = true;
        var touch;
        if(event.touches){
            touch = event.touches[0];
        }else {
            touch = event;
        }
        this.position.x = touch.clientX;
        this.position.y = touch.clientY;
        this.dx = moveDiv.offsetLeft;
        this.dy = moveDiv.offsetTop;
    },
    //拖动事件
    touchMove(el){
      const _this = this;
      if(!_this.canDrag){
          return;
      }
      let moveDiv = document.getElementById(el);
          var touch ;
          // || event.target.x > window.width-30 || event.target.y < 30 || event.target.y > window.height-30){
          if(event.touches){
              touch = event.touches[0];
          }else {
              touch = event;
          }
          //防止出屏
          if(touch.clientX < 15 || touch.clientX > window.innerWidth -15 || touch.clientY < 15 || touch.clientY > window.innerHeight-15){
            return;
          }
          this.nx = touch.clientX - this.position.x;
            this.ny = touch.clientY - this.position.y;
            this.xPum = this.dx+this.nx;
            this.yPum = this.dy+this.ny;
            moveDiv.style.left = this.xPum+"px";
            moveDiv.style.top = this.yPum +"px";
          //阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
          document.addEventListener("touchmove",_this.preventDefault,{passive: false});
          document.addEventListener("touchend",function(){
              document.removeEventListener('touchmove',_this.preventDefault, false);
          },{passive: false});
    },
  }
}
</script>

<style scoped lang='less'>
@import "../../../static/css/common.css";
.number-in-life-container{
    height: 100%;
    .body{
        height: 100%;
        background-image: url('../../../static/images/numberInLife/background.png');
        background-size: 100% 100%;
        .target-wrapper{
            display: flex;
            flex-wrap: wrap;
            .target-item-wrapper{
                display: flex;
                align-items: center;
                justify-content: space-around;
                width: 50%;
                height: 22vh;
                img{
                    width: 20%;
                    height: 26vh;
                }
                .target-ele{
                    border: 2px dotted #ae7621;
                    width: 35%;
                    height: 4vw;
                    border-radius: 5px;
                    .show-content{
                        display: block;
                        background: #ae7621;
                        color: #fff;
                        height: 100%;
                        line-height: 4vw;
                    }
                    .opacity-content{
                        display: none;
                    }
                }
            }
        }
        
        .drag-container{
            // display: flex;
            .drag-item-wrapper{
                width: 17%;
                height: 1vh;
                display: inline-block;
                position: relative;
                margin: 2% 1%;
                .drag-item{
                    width: 100%;
                    position: absolute;
                    background: #ae7621;
                    border-radius: 5px;
                    color: #fff;
                    padding: 5px 10px;
                    box-sizing: border-box;

                }
            }
        }
        
    }
}
</style>
