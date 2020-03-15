<template>
  <div class="max-five-container">
    <common-header :game-list="[]" v-if="!isFinish"></common-header>
    <audio id="firstScreenAudio" src="static/audio/firstScreen.mp3">您的浏览器不支持 audio 标签。</audio>
    <audio id="secondScreenAudio" src="static/audio/secondScreen.mp3"></audio>
    <audio id="congratrulationAudio" src="static/audio/congratrulation.wav"></audio>
    <audio id="pleaseThinkAudio" src="static/audio/pleaseThink.wav"></audio>
    <div class="body" v-if="!isFinish">
      <img v-if="step == 1" class="bee" src="static/images/maxFive/bee.png" alt="">
      <img v-if="step == 1" class="snail" src="static/images/maxFive/snail.png" alt="">
      <div class="tree" v-for="(tree,index) in treeList" :key="index" :style="{top: tree.style.top, left: tree.style.left}">
        <img class="fruit" 
          :id="tree.type + fruit.type + index" 
          @touchmove="touchMove(tree.type + fruit.type + index)" 
          @touchstart="down(tree.type + fruit.type + index)"
          v-for="(fruit,index) in tree.fruitList" 
          :src="fruit.src" 
          :style="{top: fruit.top, left: fruit.left, width: fruit.width, height: fruit.height}"
          :key="index">
      </div>
      <div class="basket-container" v-if="step == 2 || step ==3">
        <div class="basket-wrapper" v-for="(basket, index) in basketList" :key="index">
          <img :id="'basket'+index" class="basket" :src="basket.src">
          <div v-if="basket.showQuestion" class="question-content">从箭头开始的第{{basket.tree}}颗
            <img class="little-tree" src="static/images/maxFive/tree.png"> ，摘{{basket.count}}个果子
          </div>
          <div class="btn-wrapper" v-if="step == 3">
            <img :id="'audio-btn-'+index" class="audio-btn" src="static/images/maxFive/audio.svg" alt="" @click="playAudio(basket,index)">
            <button class="submit-btn" @click="check(index)">确定</button>
          </div> 
          <audio :id="'basket-audio-'+index" :src="basket.audioSrc">
            您的浏览器不支持 audio 标签。
          </audio>
        </div>
      </div>
    </div>  
    <common-complete v-if="isFinish"></common-complete>
  </div>
</template>

<script>
import commonHeader from "@/common/commonHeader";
import commonComplete from "@/common/commonComplete";
export default {
  name: 'max-five',
  data(){
    return {
      step: 1,
      isFinish: false,
      position: {x: 0, y:0},
      treeList: [{
          type: 'apple',
          style: {
            top: '4%',
            left: '2%'
          },
          fruitList: [
            {type: 'apple', src: 'static/images/maxFive/apple.png', top: '10%', left: '35%', width: '30px', height: '30px'},
            {type: 'apple', src: 'static/images/maxFive/apple.png', top: '25%', left: '20%', width: '30px', height: '30px'},
            {type: 'apple', src: 'static/images/maxFive/apple.png', top: '40%', left: '15%', width: '30px', height: '30px'},
            {type: 'apple', src: 'static/images/maxFive/apple.png', top: '20%', left: '60%', width: '30px', height: '30px'},
            {type: 'apple', src: 'static/images/maxFive/apple.png', top: '30%', left: '40%', width: '30px', height: '30px'},
            {type: 'apple', src: 'static/images/maxFive/apple.png', top: '35%', left: '65%', width: '30px', height: '30px'},
          ]
        },
        {
          type: 'pear',
          style: {
            top: '7%',
            left: '22%'
          },
          fruitList: [
            {type: 'pear', src: 'static/images/maxFive/pear.png', top: '10%', left: '40%', width: '30px', height: '30px'},
            {type: 'pear', src: 'static/images/maxFive/pear.png', top: '25%', left: '25%', width: '30px', height: '30px'},
            {type: 'pear', src: 'static/images/maxFive/pear.png', top: '40%', left: '20%', width: '30px', height: '30px'},
            {type: 'pear', src: 'static/images/maxFive/pear.png', top: '20%', left: '55%', width: '30px', height: '30px'},
            {type: 'pear', src: 'static/images/maxFive/pear.png', top: '30%', left: '70%', width: '30px', height: '30px'},
          ]
        },
        {
          type: 'orange',
          style: {
            top: '4%',
            left: '41%'
          },
          fruitList: [
            {type: 'orange', src: 'static/images/maxFive/orange.png', top: '10%', left: '40%', width: '30px', height: '30px'},
            {type: 'orange', src: 'static/images/maxFive/orange.png', top: '23%', left: '25%', width: '30px', height: '30px'},
            {type: 'orange', src: 'static/images/maxFive/orange.png', top: '40%', left: '20%', width: '30px', height: '30px'},
            {type: 'orange', src: 'static/images/maxFive/orange.png', top: '15%', left: '65%', width: '30px', height: '30px'},
            {type: 'orange', src: 'static/images/maxFive/orange.png', top: '30%', left: '55%', width: '30px', height: '30px'},
          ]
        },
        {
          type: 'banana',
          style: {
            top: '9%',
            left: '61%'
          },
          fruitList: [
            {type: 'banana', src: 'static/images/maxFive/banana.png', top: '10%', left: '30%', width: '30px', height: '30px'},
            {type: 'banana', src: 'static/images/maxFive/banana.png', top: '23%', left: '35%', width: '30px', height: '30px'},
            {type: 'banana', src: 'static/images/maxFive/banana.png', top: '40%', left: '20%', width: '30px', height: '30px'},
            {type: 'banana', src: 'static/images/maxFive/banana.png', top: '25%', left: '15%', width: '30px', height: '30px'},
            {type: 'banana', src: 'static/images/maxFive/banana.png', top: '30%', left: '55%', width: '30px', height: '30px'},
            {type: 'banana', src: 'static/images/maxFive/banana.png', top: '15%', left: '65%', width: '30px', height: '30px'},
          ]
        },
        {
          type: 'peach',
          style: {
            top: '5%',
            left: '79%'
          },
          fruitList: [
            {type: 'peach', src: 'static/images/maxFive/peach.png', top: '10%', left: '30%', width: '30px', height: '30px'},
            {type: 'peach', src: 'static/images/maxFive/peach.png', top: '30%', left: '15%', width: '30px', height: '30px'},
            {type: 'peach', src: 'static/images/maxFive/peach.png', top: '15%', left: '60%', width: '30px', height: '30px'},
            {type: 'peach', src: 'static/images/maxFive/peach.png', top: '30%', left: '55%', width: '30px', height: '30px'},
          ]
        }
      ],
      basketList: [
        {src: 'static/images/maxFive/basket.png', audioSrc: 'static/audio/firstBasket.mp3', tree: 2, count: 3, showQuestion: false},
        {src: 'static/images/maxFive/basket.png', audioSrc: 'static/audio/secondBasket.mp3', tree: 3, count: 2, showQuestion: false},
        {src: 'static/images/maxFive/basket.png', audioSrc: 'static/audio/thirdBasket.mp3', tree: 1, count: 4, showQuestion: false},
        {src: 'static/images/maxFive/basket.png', audioSrc: 'static/audio/fourthBasket.mp3', tree: 5, count: 1, showQuestion: false},
        {src: 'static/images/maxFive/basket.png', audioSrc: 'static/audio/fifthBasket.mp3', tree: 4, count: 5, showQuestion: false}
      ]
    }
  },
  components: {
    commonHeader,
    commonComplete
  },
  mounted(){
    let _this = this;
    console.log('屏幕高'+window.innerHeight)
    console.log('屏幕宽'+window.innerWidth)
    this.$nextTick(()=>{
      let firstScreenAudio = document.getElementById('firstScreenAudio');
      let secondScreenAudio = document.getElementById('secondScreenAudio');
      firstScreenAudio.addEventListener("canplaythrough",function(){
        firstScreenAudio.play();
      });
      firstScreenAudio.addEventListener('ended', function () {  
        _this.step = 2;
        secondScreenAudio.play();
      }, false);
      secondScreenAudio.addEventListener('ended', function () {  
        _this.step = 3;
      }, false);
    })
  },
  methods: {
    //跳过动画
    skip(){
      let _this = this;
      _this.step = 3;
      let audioList = document.getElementsByTagName('audio')
      for(let i = 0; i < audioList.length; i++){
        audioList[i].pause();
      }
    },
    stopAllAudio(){
      let audioList = document.getElementsByTagName('audio')
      for(let i = 0; i < audioList.length; i++){
        audioList[i].pause();
      }
    },
    //返回上一页
    back(){
      let _this = this;
      _this.$router.go(-1);
    },
    //播放游戏规则
    playAudio(item,index){
      item.showQuestion = true;
      let audioList = document.getElementsByTagName('audio')
      for(let i = 0; i < audioList.length; i++){
        audioList[i].pause();
      }
      let audioBtn = document.getElementById('basket-audio-'+index);
      audioBtn.currentTime = 0;
      audioBtn.play();
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
      if(_this.step !== 3){
        return;
      }
      let moveDiv = document.getElementById(el);
      if(this.flags){
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
      }
    },
    check(index){
      let _this = this;
      let rightCount = 0; 
      let shouldRightCount = _this.basketList[index].count;
      let shouldTreeNumber = _this.basketList[index].tree - 1;
      let basketDiv = document.getElementById('basket'+index);
      let basketDivWidth = window.innerWidth * 0.2;
      // 篮子的四个边
      let basketTop = basketDiv.offsetParent.offsetParent.offsetTop;
      let backetBottom = basketDiv.offsetParent.offsetParent.offsetTop + 100;
      let basketLeft = basketDiv.offsetParent.offsetLeft + basketDiv.offsetLeft;
      let backetRight = basketDiv.offsetParent.offsetLeft + basketDiv.offsetLeft + basketDivWidth;
      console.log('x'+basketDiv.x);
      console.log('parent'+basketDiv.offsetParent.offsetLeft)
      console.log('offsetLeft'+basketDiv.offsetLeft)
      console.log('篮子'+','+basketTop+','+backetBottom+','+basketLeft+','+backetRight)
      for(let i = 0; i < _this.treeList[shouldTreeNumber].fruitList.length; i++){
        let id = _this.treeList[shouldTreeNumber].type + _this.treeList[shouldTreeNumber].type + i;
        let fruitItem = document.getElementById(id)
        // 水果的四个边
        console.log('x'+fruitItem.x);
        console.log('parent'+fruitItem.offsetParent.offsetLeft)
        console.log('offsetLeft'+fruitItem.offsetLeft)
        let fruitItemTop = fruitItem.offsetParent.offsetTop + fruitItem.offsetTop;
        let fruitItemBottom = fruitItem.offsetParent.offsetTop + fruitItem.offsetTop + 30;
        let fruitItemLeft = fruitItem.offsetParent.offsetLeft + fruitItem.offsetLeft;
        let fruitItemRight = fruitItem.offsetParent.offsetLeft + fruitItem.offsetLeft + 30;
        console.log('水果'+fruitItemTop+','+fruitItemBottom+','+fruitItemLeft+','+fruitItemRight)
        if(basketTop < fruitItemBottom && backetBottom > fruitItemTop && basketLeft < fruitItemRight && backetRight > fruitItemLeft){
          rightCount++
        }
      }
      if(rightCount == shouldRightCount){
        _this.stopAllAudio();
        document.getElementById('congratrulationAudio').play();
      }else{
        _this.stopAllAudio();
        document.getElementById('pleaseThinkAudio').play();
      }
    }
  }
}
</script>

<style scoped lang='less'>
@bodyHeight: calc(~"100% - 30px");
@keyframes bee-move{
  0%{
    left: 0;
    bottom: 10px;
  }
  50%{
    left: 20%;
    bottom: 70px;
  }
  100%{
    left: 45%;
    bottom: 50px;
  }
}
@keyframes snail-move{
  from{
    right: 0;
    bottom: 10px;
  }
  to{
    right: 25%;
    bottom: 10px;
  }
}
@keyframes basket-show{
  from {
    opacity: 0;
    bottom: -100%;
  }
  to {
    opacity: 1;
    bottom: 10px;
  }
}
.max-five-container{
    height: 100%;
    background: url('../../../static/images/maxFive/background.jpg');
    background-size: 100% 100%;
    position: relative;
    .body{
      height: @bodyHeight;
    }
    .btn{
      position: relative;
      display: block;
      float: right;
      margin-right: 10px;
      width: 75px;
      height: 30px;
      background: green;
      color: #fff;
      text-align: center;
      line-height: 15px;
      border: none;
    }
    .snail{
      display: block;
      position: absolute;
      width: 100px;
      animation: snail-move 21s ease-in-out;
      right: 0;
      bottom: 10px;
      animation-fill-mode:forwards;
      z-index: 10;
    }
    .bee{
      display: block;
      position: absolute;
      width: 100px;
      animation: bee-move 20s linear;
      left: 0;
      bottom: 10px;
      animation-fill-mode:forwards;
      z-index: 10;
    }
    .tree{
      position: absolute;
      width: 23%;
      height: 65%;
      background-image: url('../../../static/images/maxFive/tree.png');
      background-size: 100% 100%;
      .fruit{
        position: absolute;
        display: inline-block;
        z-index: 15;
      }
    }
    .basket-container{
      position: absolute;
      opacity: 1;
      animation: basket-show 3s linear;
      animation-fill-mode:forwards;
    }
    .basket-wrapper{
      position: relative;
      display: inline-block;
      padding: 0 10px;
      width: 20%;
      box-sizing: border-box;
      .btn-wrapper{
        margin-top: -5px;
      }
      .audio-btn{
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
      .submit-btn{
        width: 50px;
        height: 25px;
        vertical-align: middle;
        border: 1px solid #3085fb;
        color: #3085fb;
        background: #fff;
        border-radius: 25px;
      }
      .question-content{
        width: 75%;
        background: #bdb5a3;
        font-size: 10px;
        position: absolute;
        bottom: 30px;
        left: 20px;
        .little-tree{
          width: 10px;
          height: 10px;
          display: inline-block;
          vertical-align: middle;
          
        }
      }
    }
    .basket{
      width: 100%;
      z-index: 5;
    }
}
</style>
