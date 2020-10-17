<template>
  <div>
    <div class="title_content">

      <div class="area">
        <span
          class="area_name"
          @click="goToAddress"
        >{{address}}</span>
        <img
          class="downIcon"
          src="/static/images/down.png"
        />
        <img
          class="people"
          src="/static/images/people.png"
        />
      </div>
    </div>
    <div class="menu_content">
      <div class="menu_item">
        <img src="/static/images/eat.png" />
        <span>美食</span>
      </div>
      <div class="menu_item">
        <img src="/static/images/ktv.png" />
        <span>KTV</span>
      </div>
      <div class="menu_item">
        <img src="/static/images/foot.png" />
        <span>足疗/按摩</span>
      </div>
      <div class="menu_item">
        <img src="/static/images/hotel.png" />
        <span>酒店</span>
      </div>
      <div class="menu_item">
        <img src="/static/images/improve.png" />
        <span>丽人/美发</span>
      </div>
    </div>
    <div class="line_gray"></div>
    <div class="gass_love">
      <span class="love_title">猜你喜欢</span>

      <div
        class="love_item"
        v-for="(item,k) in remarkList"
        :key="k"
      >
        <img :src="'cloud://xiaopower20190321-srswa.7869-xiaopower20190321-srswa-1303938263/'+item.image_path" />
        <ul class="list_right">
          <li class="list_title">{{item.title}}</li>
          <li class="list_price">
            <!-- {{item.score}} -->
            <Star :score='item.score'></Star>
            ￥{{item.price}}/人
          </li>
          <li class="list_local">{{item.place}}</li>
          <li
            class="list_tag"
            v-if='item.labelArr[0]'
          >
            <span
              v-for="(v,key) in item.labelArr"
              :key="key"
            >{{v}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="loading"
      v-if='isLoading'
    >正在加载更多内容...</div>
  </div>
</template>

<script>

var QQMapWX = require("../../utils/qqmap-wx-jssdk.js");
const db = wx.cloud.database()
import Star from '../../components/Star'
export default {

  data () {
    return {
      address: "加载中...",
      remarkList: [],
      isLoading: false,
      p: 1,
      perPage: 5
    };
  },
  onReachBottom () {
    const _this = this
    console.log("触底了")
    this.isLoading = true
    db.collection('remark').skip((this.p - 1) * this.perPage).limit(this.perPage).get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        //对label进行处理,按照,分割,最多展示4条
        for (let i = 0; i < res.data.length; i++) {
          res.data[i]['labelArr'] = res.data[i]['label'].split(',').splice(0, 4)
        }
        _this.remarkList = [..._this.remarkList, ...res.data]
        console.log(_this.remarkList)

      }
    })
    this.p++
  },
  onShow () {
    const _this = this
    wx.getStorage({
      key: 'address',
      success (res) {
        _this.address = res.data
      }
    })

  },
  onLoad () {

    const _this = this
    console.log(_this)
    // 实例化API核心类;
    //1.获取地理位置信息
    var qqmapsdk = new QQMapWX({
      key: 'DDABZ-3VYRP-3PPDY-LBEN7-UBUG6-R6BRS'
    });
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(res)
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            console.log(res)
            let address = res.result.address_component.city;
            _this.address = address
          }

        })
      }
    })

    //2.获取猜你喜欢部分数据
    db.collection('remark').skip(0).limit(this.perPage).get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        //对label进行处理,按照,分割,最多展示4条
        for (let i = 0; i < res.data.length; i++) {
          res.data[i]['labelArr'] = res.data[i]['label'].split(',').splice(0, 4)
        }
        _this.remarkList = res.data
        console.log(_this.remarkList)
      }
    })


  },
  components: {
    Star
  },

  methods: {
    goToAddress () {
      console.log(this)
      wx.navigateTo({
        url: "/pages/city/main?address=" + this.address
      });
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.home_container {
  width: 750rpx;
  height: 300rpx;
  background: red;
}

.title_content {
  width: 750rpx;
  height: 104rpx;
  background: #181818;
  /* background: #319764; */
  display: flex;
  flex-direction: column;
}
.bar_title {
  color: white;
  margin-top: 60rpx;
  margin-left: 34.5rpx;
  font-size: 28rpx;
  /* background: #9b2c7f; */
}
.area {
  color: #d4ab81;
  font-size: 22rpx;
  margin-top: 33rpx;
  /* border: red; */
}
.area_name {
  margin-left: 36rpx;
  margin-right: 9rpx;
  /* background: #bebc46; */
}
.downIcon {
  width: 10rpx;
  height: 8rpx;
}
.people {
  width: 48rpx;
  height: 48rpx;
  vertical-align: middle;
  position: absolute;
  right: 28rpx;
}
.menu_content {
  width: 750rpx;
  height: 198rpx;
  display: flex;
  flex-direction: row;
  /* background: #482a9b; */
}

.line_gray {
  height: 18rpx;
  background: #f0f0f0;
  width: 750rpx;
}
.menu_item {
  flex: 1;
  text-align: center;
}
.menu_item img {
  width: 88rpx;
  height: 88rpx;
  margin: 20rpx 20rpx;
}
.menu_item span {
  font-size: 24rpx;
}
/* 猜你喜欢 */
.gass_love {
  display: flex;
  flex-direction: column;
  padding-left: 28rpx;
}
.love_item {
  width: 750rpx;
  height: 208rpx;
  border-bottom: 4rpx solid #f0f0f0;
}
.love_title {
  font-size: 30rpx;
  color: #7c7c7c;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
.love_item {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.love_item img {
  width: 155rpx;
  height: 155rpx;
  border: 2px solid#f0f0f0;
}
.list_right {
  margin-left: 28rpx;
}
.list_title {
  font-weight: bold;
  font-size: 28rpx;
  margin-bottom: 8rpx;
}
.list_price {
  font-size: 20rpx;
  margin-bottom: 8rpx;
}

.list_local {
  font-size: 20rpx;
  color: #666666;
  margin-bottom: 8rpx;
}
.list_tag {
  display: flex;
  flex-direction: row;
}
.list_tag span {
  display: flex;
  font-size: 20rpx;
  color: #666666;
  border: 1px solid #bbbbbb;
  width: 108rpx;
  height: 41rpx;
  justify-content: center;
  align-items: center;
  margin-right: 8rpx;
}
.loading {
  width: 750rpx;
  background: #f0f0f0;
  color: #666666;
  text-align: center;
  padding-top: 30rpx;
  font-size: 24rpx;
}
</style>

