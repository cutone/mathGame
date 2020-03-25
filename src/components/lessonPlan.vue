<template>
  <div class="lessonPlan-container">
      <common-header :game-list="[]"></common-header>
      <div class="lesson-img-wrapper">
          <img class="lesson-img" :src="'static/images/lessonPlan/'+lessonImg+'.png'" />
      </div>
  </div>
</template>
<script>
import commonHeader from "@/common/commonHeader";
export default {
  name: 'lessonPlan',
    data () {
        return {
            lessonImg: '1',
        }
    },
  components: {
    commonHeader
  },
  mounted(){
      let _this = this;
      console.log(_this.$route.query)
      _this.lessonImg = _this.$route.query.lessonName
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
@bodyHeight: calc(~"100% - 30px");
.lessonPlan-container{
    height: 100%;
}
    .lesson-img{
        width: 100%;
    }
    .lesson-img-wrapper{
        height: @bodyHeight;
        overflow-y: scroll;
    }
</style>