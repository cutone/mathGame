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
      menuList:[{
        title: '生活中的数字',
        url: '/numberInLife',
        img: 'static/images/topClassMenu/numberInLife.png'
      },{
        title: '认识圆柱体和球体',
        url: '/cylinder',
        img: 'static/images/topClassMenu/cylinder.png'
      },{
        title: '认识单数和双数',
        url: '/oddEvenNumber',
        img: 'static/images/topClassMenu/oddEvenNumber.png'
      },{
        title: '层级分类',
        url: '/levelClassify',
        img: 'static/images/topClassMenu/levelClassify.png'
      },{
        title: '相邻数',
        url: '/adjoinNumber',
        img: 'static/images/topClassMenu/adjoinNumber.png'
      },{
        title: '二维分类',
        url: '/twoDimensionClassify',
        img: 'static/images/topClassMenu/twoDimensionClassify.png'
      },{
        title: '按规律排序（四）',
        url: '/regular4',
        img: 'static/images/topClassMenu/regular4.png'
      }],
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