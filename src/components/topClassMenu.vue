<template>
    <div class="middle-class-menu-container">
      <audio id="middle_class_BGM" src="static/audio/middleClassBGM.mp3">您的浏览器不支持 audio 标签。</audio>
      <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in menuList" :key="index" class="swiper-slide">
            <img :name="item.url" class="menu-item" :src="item.img" alt="">
          </swiper-slide>
      </swiper>
    </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'topClassMenu',
  components: {
    swiper,
    swiperSlide
  },
  data(){
    let _this = this
    return {
      currentIndex: 1,
      menuList:[
        //上学期
        {
        title: '二维分类',
        url: '/twoDimensionClassify',
        img: 'static/images/topClassMenu/twoDimensionClassify.png'
      },{
        title: '10以内的相邻数',
        url: '/adjoinNumber',
        img: 'static/images/topClassMenu/adjoinNumber.png'
      },{
        title: '认识单数和双数',
        url: '/oddEvenNumber',
        img: 'static/images/topClassMenu/oddEvenNumber.png'
      },{
        title: '生活中的数字',
        url: '/numberInLife',
        img: 'static/images/topClassMenu/numberInLife.png'
      },{
        title: '10以内的序数',
        url: '/numberWithinTen',
        img: 'static/images/topClassMenu/numberWithinTen.png'
      },{
        title: '以自身为中心区分左右',
        url: '/leftAndRight',
        img: 'static/images/topClassMenu/leftAndRight.png'
      },
      {
        title: '学习6-8的组成',
        url: '/sixToEight',
        img: 'static/images/topClassMenu/sixToEight.png'
      },
      {
        title: '学习9、10的组成',
        url: '/nineAndTen',
        img: 'static/images/topClassMenu/nineAndTen.png'
      },
      
      //下学期
      {
        title: '层级分类',
        url: '/levelClassify',
        img: 'static/images/topClassMenu/levelClassify.png'
      },
      {
        title: '层级分类',
        url: '/selfSubQuestionWithinTen',
        img: 'static/images/topClassMenu/selfSubQuestionWithinTen.png'
      },
      {
        title: '学习自编应用题',
        url: '/selfMadeQuestion',
        img: 'static/images/topClassMenu/selfMadeQuestion.png'
      },
      {
        title: '认识圆柱体和球体',
        url: '/cylinder',
        img: 'static/images/topClassMenu/cylinder.png'
      },{
        title: '按规律排序（四）',
        url: '/regular4',
        img: 'static/images/topClassMenu/regular4.png'
      },
      {
        title: '多角度分类',
        url: '/multiAngleClassification',
        img: 'static/images/topClassMenu/multiAngleClassification.png'
      },
      {
        title: '认识‘0’',
        url: '/learnZero',
        img: 'static/images/topClassMenu/learnZero.png'
      },
      {
        title: '10以内的加减法',
        url: '/addAndSubWithinTen',
        img: 'static/images/topClassMenu/addAndSubWithinTen.png'
      },
      
      {
        title: '认识正方体与长方体',
        url: '/cube',
        img: 'static/images/topClassMenu/cube.png'
      },
      {
        title: '学习二等分',
        url: '/bisect',
        img: 'static/images/topClassMenu/bisect.png'
      },
      {
        title: '长度、面积守恒',
        url: '/lengthAndArea',
        img: 'static/images/topClassMenu/lengthAndArea.png'
      },
      {
        title: '学习列加法算式',
        url: '/learnAdd',
        img: 'static/images/topClassMenu/learnAdd.png'
      },
      {
        title: '学习列减法算式',
        url: '/learnSub',
        img: 'static/images/topClassMenu/learnSub.png'
      },
      ],
      swiperOption:{
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
          stretch: 0, //每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
          depth: 10, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
          modifier: 0, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
          slideShadows : false //开启slide阴影。默认 true。
        },
        width: window.innerWidth*0.7,
        // height: 100,
        //循环
        loop:true,
        loopedSlides: 7,
        on: {
          // click: function(e){
          //   console.log(''+e.target.name)
          //   _this.toGamePage(e.target.name)
          // }
          tap: function(e){
            // console.log(''+e.target.name)
            _this.toGamePage(e.target.name)
          }
        }
      },
      showList: []
    }
  },
  created(){
    let _this = this;
    _this.showList = _this.menuList.slice(_this.currentIndex-1,_this.currentIndex+2)
  },
  activated(){
    let middle_class_BGM = document.getElementById("middle_class_BGM");
    middle_class_BGM.currentTime = 0;
    middle_class_BGM.play();
  },
  mounted(){
    let _this = this;
    _this.$nextTick(()=>{
      let middle_class_BGM = document.getElementById('middle_class_BGM');
      middle_class_BGM.addEventListener("canplaythrough",function(){
        middle_class_BGM.play();
      });
    })
  },
  methods: {
    toGamePage(path){
      console.log(path);
      this.$router.push(path);
    },
    //滑动菜单
    swipeHandler(e){
      let _this = this;
      console.log(e)
      if(e.direction == 'Left'){
        if(_this.currentIndex < _this.menuList.length){
          _this.currentIndex++;
          _this.showList = _this.menuList.slice(_this.currentIndex-1,_this.currentIndex+2);
          console.log(_this.showList)
        }
      }else if(e.direction == 'Right'){
        if(_this.currentIndex > 0){
          _this.currentIndex--;
          _this.showList = _this.menuList.slice(_this.currentIndex-1,_this.currentIndex+2);
        }
      }
    }
  }
}
</script>
<style scoped lang='less'>
.middle-class-menu-container{
    height: 100%;
    box-sizing: border-box;
    justify-content: center;
    background-image: url('../../static/images/middleClassMenu/background.png');
    background-size: 100% 100%;
    padding-top: 100px;
    .swiper-container{
      padding-left: 28%;
      height: 100%;
    }
    .swiper-slide{
      transform: scale(0.7) !important;
    }
    .swiper-slide-active{
      transform: scale(1) !important;
    }
    .swiper-slide-prev{
      transform: translateY(20px) scale(0.7) rotate(-15deg) !important;
      
    }
    .swiper-slide-next{
      transform: translateY(20px) scale(0.7) rotate(15deg) !important;
      
    }
    .menu-item{
      width: 100%;
      height: 200px;
      border-radius: 30px;
    }
}
</style>