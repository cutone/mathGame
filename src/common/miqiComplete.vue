<template>
  <div class="common-finish-wrapper">
    <div class="oprate-wrapper">
      <span class="complete-btn" @click="goBack()">完成</span>
      <span class="restart-btn" @click="initiate()">重做</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'complete',
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$emit('goBack')
    },
    initiate () {
      this.$emit('initiate')
    }
  }
}
</script>
<style lang="less">
.common-finish-wrapper {
  height: 100%;
  background-image: url("../../static/images/numberWithinThree/background6.png");
  background-size: 100% 100%;
  .oprate-wrapper {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .complete-btn {
      display: inline-block;
      width: 80px;
      height: 40px;
      background: #fdf731;
      border-radius: 5px;
      line-height: 40px;
    }
    .restart-btn {
      display: inline-block;
      width: 80px;
      height: 40px;
      background: #47b1f0;
      border-radius: 5px;
      line-height: 40px;
    }
  }
}
</style>