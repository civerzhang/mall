import "commons/global.css";
import "commons/rem.js";
import event from "commons/event.js";

import PageNotFound from "pages/404.vue";

let vm;

const run = () => {

  // 设置 .tdx-loading 的高度
  // $("#app").css("height", $(window).height() - 20);
  // $(".tdx-loading").css("height", $(window).height() - 20);

  if(vm) {
    event.$emit("tdxActivity");
  }
  else {
    vm = new Vue({
      el: "#app",
      data: {
        activity: false
      },
      computed: {

        ViewPage() {
          // 这里可以设置判断条件，来显示不同的 pages
          return PageNotFound;
        }
      },

      render(h) {
        return h(this.ViewPage);
      }
    });
  }
};

run();

// 定义当前 View 激活事件
window["tdxActivity"] = run;

// 定义刷新事件
window["tdxRefresh"] = () => {
  window.location.href = window.location.href;
};
window["Ret_Query"] = () => {
  window.location.href = window.location.href;
};