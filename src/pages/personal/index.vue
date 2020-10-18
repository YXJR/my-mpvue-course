<template>
  <div class="personal">

    <div
      v-if="isLogin"
      class="person-picture"
    >
      <img
        class="person-img"
        :src='userInfo.avatarUrl'
        alt
      />
    </div>
    <span v-if="isLogin">{{userInfo.nickName}} {{userInfo.gender===1?"男":"女"}}</span>
    <button
      open-type="getUserInfo"
      @getuserinfo="login"
      v-if="!isLogin"
    >点击登录</button>
    <div
      class="collection"
      v-if="isLogin"
    >
      <span class="collection-text">收藏列表</span>
      <span class="right-arrows"></span>
    </div>
    <div class="downPage"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false,
      userInfo: null
    };
  },
  components: {},
  onLoad () {
    //在页面初始化时获取openid 
    //1.使用wx.login()获取code,以换取openid
    //2.在获取code之后,发起请求,URL为微信官方提供的接口地址
    //3.在获取到openid后将其缓存在storage中
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx00ba6288df3854e3&secret=f09b0afd1974da557b948928b60abc05&js_code=${res.code}&grant_type=authorization_code`,
            success (res) {
              console.log(res)
              const idMessage = JSON.stringify({
                ...res.data
              })
              wx.setStorage({
                key: 'idMessage',
                data: idMessage
              })
            }
          })
        }
      }
    })
  },
  methods: {
    login () {
      // 获取用户数据
      // 收藏；获取openid -->缓存？收藏；
      wx.getUserInfo({
        success: res => {
          console.log(res);
          this.userInfo = res.userInfo
          this.isLogin = true;
        }
      })
    }
  },
};
</script>

<style scoped>
.personal {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20rpx;
  font-size: 26rpx;
}

.person-picture {
  border-radius: 50%;
  width: 204rpx;
  height: 204rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #f3f5f2;
}
.collection {
  margin-top: 24rpx;
  width: 750rpx;
  height: 100rpx;
  line-height: 100rpx;
  border-top: 1px solid #dddddd;
}
.person-img {
  border-radius: 50%;
  width: 200rpx;
  height: 200rpx;
}
.collection-text {
  float: left;
  display: block;
  margin-left: 30rpx;
}
.right-arrows {
  width: 18rpx;
  height: 18rpx;
  display: block;
  rotate: 45deg;
  border-right: 1px solid;
  border-top: 1px solid;
  float: right;
  margin-top: 40rpx;
  margin-right: 35rpx;
}
.downPage {
  width: 750rpx;
  height: 780rpx;
  background: #cccccc;
}
</style>
