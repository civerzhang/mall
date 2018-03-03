import "commons/global.css";
import "commons/rem.js";
import event from "commons/event.js";

import {
  __isLoginNormal
} from "commons/req.js";

import Wdlc from "pages/wdlc.vue";
import Login from "pages/login.vue";

let vm;
const run = () => {

  // 设置 .tdx-loading 的高度
  // $("#app").css("height", $(window).height() - 20);
  // $(".tdx-loading").css("height", $(window).height() - 20);

  // 判断是否登录
  __isLoginNormal( flag => {

    if(vm) {
      vm.loginFlag = flag;
      event.$emit("tdxActivity");
    }
    else {
      vm = new Vue({
        el: "#app",
        data: {
          loginFlag: flag
        },
        computed: {

          ViewPage() {

            // 这里可以设置判断条件，来显示不同的 pages
            return this.loginFlag ? Wdlc : Login;
          }
        },

        render(h) {
          return h(this.ViewPage);
        }
      });
    }

  });
};

run();

// 定义当前 View 激活事件
window["tdxActivity"] = () => {
  if (__tdxMobSystem == "Android") {
    run();
  } else {
    window.location.href = window.location.href;
  }

};

// 定义刷新事件
window["tdxRefresh"] = () => {
  window.location.href = window.location.href;
};
window["Ret_Query"] = () => {
  window.location.href = window.location.href;
};