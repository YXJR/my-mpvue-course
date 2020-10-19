require("../../common/manifest.js")
require("../../common/vendor.js")
global.webpackJsonpMpvue([5],{

/***/ 136:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

var _index = __webpack_require__(137);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _vue2.default(_index2.default);
app.$mount();

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4ebf4b9c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(149);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(138)
}
var normalizeComponent = __webpack_require__(3)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4ebf4b9c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_mpvue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_mpvue_loader_lib_template_compiler_index_id_data_v_4ebf4b9c_hasScoped_true_transformToRequire_video_src_source_src_img_src_image_xlink_href_fileExt_template_wxml_script_js_style_wxss_platform_wx_node_modules_mpvue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\pages\\personal\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ebf4b9c", Component.options)
  } else {
    hotAPI.reload("data-v-4ebf4b9c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 138:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 139:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = __webpack_require__(140);

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = __webpack_require__(147);

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  data: function data() {
    return {
      isLogin: false,
      userInfo: null
    };
  },

  components: {},
  onLoad: function onLoad() {
    //在页面初始化时获取openid 
    //1.使用wx.login()获取code,以换取openid
    //2.在获取code之后,发起请求,URL为微信官方提供的接口地址
    //3.在获取到openid后将其缓存在storage中
    wx.login({
      success: function success(res) {
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx00ba6288df3854e3&secret=f09b0afd1974da557b948928b60abc05&js_code=' + res.code + '&grant_type=authorization_code',
            success: function success(res) {
              console.log(res);
              var idMessage = (0, _stringify2.default)((0, _extends3.default)({}, res.data));
              wx.setStorage({
                key: 'idMessage',
                data: idMessage
              });
            }
          });
        }
      }
    });
  },
  onShow: function onShow() {
    //如果已经登录,取出登录态显示,避免再一次的请求
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.userInfo = userInfo;
      this.isLogin = true;
    }
  },

  methods: {
    login: function login() {
      var _this = this;

      // 获取用户数据
      // 收藏；获取openid -->缓存？收藏；
      wx.getUserInfo({
        success: function success(res) {
          console.log(res);
          _this.userInfo = res.userInfo;
          wx.setStorage({
            key: 'userInfo',
            data: res.userInfo
          });
          _this.isLogin = true;
        }
      });
    },
    goToCollect: function goToCollect() {
      // wx.navigateTo({
      //   url: "pages/collectList/main"
      // });
      wx.navigateTo({
        url: "/pages/collectList/main"
      });
      console.log('go to collect');
    }
  }
};

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "personal"
  }, [(_vm.isLogin) ? _c('div', {
    staticClass: "person-picture"
  }, [_c('img', {
    staticClass: "person-img",
    attrs: {
      "src": _vm.userInfo.avatarUrl,
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.isLogin) ? _c('span', [_vm._v(_vm._s(_vm.userInfo.nickName) + " " + _vm._s(_vm.userInfo.gender === 1 ? "男" : "女"))]) : _vm._e(), _vm._v(" "), (!_vm.isLogin) ? _c('button', {
    attrs: {
      "open-type": "getUserInfo",
      "eventid": '0'
    },
    on: {
      "getuserinfo": _vm.login
    }
  }, [_vm._v("点击登录")]) : _vm._e(), _vm._v(" "), (_vm.isLogin) ? _c('div', {
    staticClass: "collection",
    attrs: {
      "eventid": '1'
    },
    on: {
      "click": _vm.goToCollect
    }
  }, [_c('span', {
    staticClass: "collection-text"
  }, [_vm._v("收藏列表")]), _vm._v(" "), _c('span', {
    staticClass: "right-arrows"
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "downPage"
  })], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4ebf4b9c", esExports)
  }
}

/***/ })

},[136]);