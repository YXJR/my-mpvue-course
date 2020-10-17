<template>
  <div class="city_container">
    <div class="right-letter">
      <span>热门</span>
      <span
        v-for="(letter,k) in letters"
        :key="k"
        @click="chioseLetter(letter)"
      >{{letter}}</span>
    </div>
    <scroll-view
      class="scrollView"
      scroll-y
      :scroll-into-view="'letter'+scrollLetter"
      enable-back-to-top
    >
      <div class="location">
        <span class="chiose-city">{{address}}</span>
        <span class="gps">GPS定位</span>
      </div>
      <div class="hot-city">
        <div class="city-title">热门城市</div>
        <div class="hot-city-container">
          <div
            v-for="(value,key) in hotCities"
            :key="key"
            @click="chooseCity(value)"
          >{{value}}</div>
        </div>
        <div
          class="letter"
          v-for="(v,k) in cityData"
          :key="k"
          :id="'letter'+v.letter"
        >
          {{v.letter}}
          <ul
            class="city-list"
            v-for="(item,key) in v.citys"
            :key="key"
          >
            <li @click='chooseCity(item)'>{{item}}</li>
          </ul>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
let cityData = require("../../utils/cityData.js");
export default {
  data () {
    return {
      address: "加载中...",
      cityData,
      scrollLetter: "",
      hotCities: ["上海", "北京", "广东", "深圳", "天津", "杭州", "南京", "苏州", "成都", "武汉", "重庆", "西安"],
      letters: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    };
  },
  onLoad (options) {
    this.address = options.address;
  },
  components: {},
  methods: {
    chioseLetter (letter) {
      this.scrollLetter = letter;
    },
    chooseCity (city) {
      this.address = city
      wx.setStorage({
        key: "address",
        data: city,
        success () {
          wx.navigateBack({
            delta: 1
          })
        }
      })

    }
  },
};
</script>

<style scoped>
.scrollView {
  height: 1334rpx;
}
.location {
  display: flex;
  width: 750rpx;
  height: 90rpx;
  align-items: center;
}
/* 城市标题 */
.city-title {
  font-size: 28rpx;
  color: #aaaaaa;
  margin-top: 20rpx;
  margin-left: 30rpx;
  margin-bottom: 18rpx;
}
.chiose-city {
  font-size: 24rpx;
  margin-left: 30rpx;
  margin-right: 20rpx;
}
.gps {
  color: #c0c0c0;
  font-size: 20rpx;
}
.hot-city {
  display: flex;
  flex-direction: column;
  background: #f0f0f0;
  width: 750rpx;
  height: 464rpx;
  border-bottom: 1px solid #dfdfdf;
  border-top: 1px solid #dfdfdf;
}
.hot-city-container {
  margin-left: 28rpx;
  margin-right: 70rpx;
}
.hot-city-container div {
  width: 200rpx;
  height: 70rpx;
  background: white;
  float: left;
  text-align: center;
  margin-right: 8rpx;
  margin-top: 8rpx;
  border: 2px solid #dedede;
  line-height: 70rpx;
  font-size: 24rpx;
}
.letter {
  color: #aeaeae;
  font-size: 22rpx;
  margin-left: 30rpx;
  margin-top: 6rpx;
}
.city-list {
  margin-left: 28rpx;
  color: black;
}
.city-list li {
  height: 90rpx;
  border-bottom: 1px solid #dedede;
  line-height: 90rpx;
  font-size: 24rpx;
}
/* 右侧的字母 */
.right-letter {
  width: 40rpx;
  position: fixed;
  right: 20rpx;
  top: 200rpx;
  display: flex;
  flex-direction: column;
  font-size: 18rpx;
  color: #515b67;
  z-index: 10;
}
.right-letter span {
  text-align: center;
  margin-bottom: 4rpx;
}
</style>
