<template>
  <div class="middle-class-menu-container">
    <audio id="middle_class_BGM" src="static/audio/middleClassBGM.mp3">您的浏览器不支持 audio 标签。</audio>
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in menuList" :key="index" class="swiper-slide">
        <img :name="item.url" class="menu-item" :src="item.img" alt />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "bottomClassMenu",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    let _this = this;
    return {
      currentIndex: 1,
      menuList: [
        //上学期
        {
          title: "认识圆形",
          url: "/circle",
          img: "static/images/bottomClassMenu/circle.png"
        },
        {
          title: "比较物体的大小",
          url: "/compareSize",
          img: "static/images/bottomClassMenu/compareSize.png"
        },
        {
          title: "1和许多",
          url: "/oneAndMany",
          img: "static/images/bottomClassMenu/oneAndMany.png"
        },
        {
          title: "按物体名称分类",
          url: "/ClassificationByName",
          img: "static/images/bottomClassMenu/classificationByName.png"
        },
        {
          title: "区分上下",
          url: "/topAndBottom",
          img: "static/images/bottomClassMenu/topAndBottom.png"
        },
        {
          title: "比较两个数相不相等",
          url: "/compareNumber",
          img: "static/images/bottomClassMenu/compareNumber.png"
        },
        {
          title: "学习3以内的数",
          url: "/numberWithinThree",
          img: "static/images/bottomClassMenu/numberWithinThree.png"
        },
        //下学期
        {
          title: "认识正方形",
          url: "/square",
          img: "static/images/bottomClassMenu/square.png"
        },
        {
          title: "认识三角形",
          url: "/triangle",
          img: "static/images/bottomClassMenu/triangle.png"
        },
        {
          title: "复习5以内的数",
          url: "/numberWithinFive",
          img: "static/images/bottomClassMenu/numberWithinFive.png"
        },
        {
          title: "区分前后",
          url: "/beforeAndAfter",
          img: "static/images/bottomClassMenu/beforeAndAfter.png"
        },
        
      ],
      swiperOption: {
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0, //slide做3d旋转时Y轴的旋转角度。默认50。
          stretch: 0, //每个slide之间的拉伸值，越大slide靠得越紧。 默认0。
          depth: 10, //slide的位置深度。值越大z轴距离越远，看起来越小。 默认100。
          modifier: 0, //depth和rotate和stretch的倍率，相当于depth*modifier、rotate*modifier、stretch*modifier，值越大这三个参数的效果越明显。默认1。
          slideShadows: false //开启slide阴影。默认 true。
        },
        width: window.innerWidth * 0.7,
        // height: 100,
        //循环
        loop: true,
        loopedSlides: 7,
        on: {
          // click: function(e){
          //   console.log(''+e.target.name)
          //   _this.toGamePage(e.target.name)
          // }
          tap: function(e) {
            // console.log(''+e.target.name)
            _this.toGamePage(e.target.name);
          }
        }
      },
      showList: []
    };
  },
  created() {
    let _this = this;
    _this.showList = _this.menuList.slice(
      _this.currentIndex - 1,
      _this.currentIndex + 2
    );
  },
  activated(){
    let middle_class_BGM = document.getElementById("middle_class_BGM");
    middle_class_BGM.currentTime = 0;
    middle_class_BGM.play();
  },
  mounted() {
    let _this = this;
      let middle_class_BGM = document.getElementById("middle_class_BGM");
      middle_class_BGM.addEventListener("canplaythrough", function() {
        middle_class_BGM.play();
      });
  },
  methods: {
    toGamePage(path) {
      console.log(path);
      this.$router.push(path);
    },
    //滑动菜单
    swipeHandler(e) {
      let _this = this;
      console.log(e);
      if (e.direction == "Left") {
        if (_this.currentIndex < _this.menuList.length) {
          _this.currentIndex++;
          _this.showList = _this.menuList.slice(
            _this.currentIndex - 1,
            _this.currentIndex + 2
          );
          console.log(_this.showList);
        }
      } else if (e.direction == "Right") {
        if (_this.currentIndex > 0) {
          _this.currentIndex--;
          _this.showList = _this.menuList.slice(
            _this.currentIndex - 1,
            _this.currentIndex + 2
          );
        }
      }
    }
  }
};
</script>
<style scoped lang='less'>
.middle-class-menu-container {
  height: 100%;
  box-sizing: border-box;
  justify-content: center;
  background-image: url("../../static/images/middleClassMenu/background.png");
  background-size: 100% 100%;
  padding-top: 100px;
  .swiper-container {
    padding-left: 28%;
    height: 100%;
  }
  // /deep/.swiper-slide{
  //   width: 30% !important;
  // }
  // .swiper-slide-active{
  //   width: 40% !important;
  // }
  .swiper-slide {
    transform: scale(0.7) !important;
  }
  .swiper-slide-active {
    transform: scale(1) !important;
  }
  .swiper-slide-prev {
    transform: translateY(20px) scale(0.7) rotate(-15deg) !important;
  }
  .swiper-slide-next {
    transform: translateY(20px) scale(0.7) rotate(15deg) !important;
  }
  .menu-item {
    width: 100%;
    height: 200px;
    border: 1px solid #fff;
    border-radius: 30px;
  }
}
</style>