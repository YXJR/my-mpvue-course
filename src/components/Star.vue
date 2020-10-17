<template>
  <div class='imgContainer'>
    <img
      v-for="(value,key) in starArr"
      :key="key"
      :src="'/static/images/b-'+value+'.png'"
    />
  </div>
</template>

<script>
export default {
  props: ['score'],
  computed: {
    starArr () { //满分为10分
      console.log(this.score)
      let score = this.score / 2
      let starArr = []
      //1.处理全星
      for (let i = 1; i < score; i++) {
        starArr.push('on')
      }
      //2.处理半星
      if (score % 1 <= 0.5) {
        starArr.push("half");
      }
      //3.处理没有星星的
      while (5 - starArr.length) {
        starArr.push("off");
      }
      return starArr
    }
  },
}
</script>

<style>
.imgContainer img {
  width: 25rpx;
  height: 25rpx;
  vertical-align: middle;
}
</style>
