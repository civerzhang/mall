<style scoped>
  
</style>

<template>
  
  <div>
    <mob-zjzs 
      v-if="isLogin && ccNum > 0"
      :zj = "zj"
      :sy = "sy"
      :id = "`zjzs${this.rn}`"
      :style = "zjzsStyle"
      :zjShow = "zjShow"
      :toggleZjShow = "toggleZjShow"
    />
    <mob-zjzs-simple 
      v-if="isLogin && ccNum > 0 && this.scrollY > 50"
      :zj = "zj"
      :sy = "sy"
      :jumpPage = "jumpToWdlc"
      :zjShow = "zjShow"
    />
    <mob-tip
      v-if="isLogin && ccNum == 0"
      info = "您当前无持仓的理财产品，快去看看吧"
    />
    <mob-not-login 
      v-if="!isLogin"
      info = "安心理财，就在川财~登录后查看您的理财资产"
      :btnClick = "loginClick"
    />
    <mob-nav 
      :items = "navItems"
    />
    <mob-split />
    <mob-card-single
      v-if = "yyqt"
      title = "一元起投"
      subTitle = "理财无门槛，小钱也能钱生钱"
      :product = "yyqt"
    />
    <mob-split v-if = "yyqt" />
    <mob-card-single
      v-if = "wjsy"
      title = "稳健收益"
      subTitle = "安心理财，稳定回报"
      :product = "wjsy"
    />
    <mob-split v-if = "wjsy" />
    <div class="img-gg">
      <img src="res/banner.png" style="height: 100%; width: 100%;">
    </div>
    <mob-split />
    <mob-list-hot 
      title = "大家都在看"
      subTitle = "最热门产品"
      :productList = "hot"
    />
    <mob-qs-logo 
      img = "res/chuancailogo.png"
      info = "川财证券，您的理财小棉袄"
    />
  </div>

</template>

<script>
import event from "commons/event.js";
import { 
  getRnHex,
  formatValueType
} from "commons/func.js";
import { 
  tdxOpenUrl,
  HqJyCallTql
} from "commons/req.js";

import mobZjzs from "components/mob-zjzs.vue";
import mobZjzsSimple from "components/mob-zjzs-simple.vue";
import mobNav from "components/mob-nav.vue";
import mobSplit from "components/mob-split.vue";
import mobCardSingle from "components/mob-card-single.vue";
import mobListHot from "components/mob-list-hot.vue";
import mobQsLogo from "components/mob-qs-logo.vue";
import mobNotLogin from "components/mob-not-login.vue";
import mobTip from "components/mob-tip.vue";

const navItems = [
  {
    title: "活期",
    img: "res/nav-hq.png",
    urlParam: {
      OpenName: "活期理财",
      OpenUrl: "hqlc.html"
    }
  },
  {
    title: "定期",
    img: "res/nav-dq.png",
    urlParam: {
      OpenName: "定期理财",
      OpenUrl: "dqlc.html"
    }
  },
  {
    title: "基金",
    img: "res/nav-jj.png",
    urlParam: {
      OpenName: "基金",
      OpenUrl: "jjlc.html"
    }
  }
];

let hqJyCallTql;
  
export default {

  components: {
    mobZjzs,
    mobNav,
    mobSplit,
    mobCardSingle,
    mobListHot,
    mobQsLogo,
    mobZjzsSimple,
    mobNotLogin,
    mobTip
  },

  props: [],

  data() {

    return {
      yyqt: "",
      wjsy: "",
      hot: "",
      rn: getRnHex(),
      scrollY: 0,
      zjShow: true,
      isLogin: false,
      ccNum: 1,
      navItems,
      zj: "--",
      sy: "--"
    };
  },

  methods: {

    // 登录，调用登录框
    loginClick: function() {

      __tdxLoginBox();
    },

    // 显示隐藏金额
    toggleZjShow: function() {

      this.zjShow = !this.zjShow;
    },

    // 滚动事件
    onScroll: function(e) {
      this.scrollY = window.scrollY;
    },

    // 跳转到我的理财页面
    jumpToWdlc: function() {

      tdxOpenUrl({
        OpenName: "我的理财",
        OpenUrl: "wdlc.html"
      });
    },

    // 检查账号操作
    doZhCheck: function() {
      // 判断是否已登录
      __isLoginNormal( flag => {
        this.isLogin = flag;

        // 如果登录了，需要取持仓
        if(flag) {

          // 如果登录，取用户信息
          __webCallTql.send("tdxEnumTradeAcc", {}, res => {

            // debugger;
            let user;

            // ios
            if(typeof res == "string") {
              user = JSON.parse(res)[0];
            }

            // android
            else {
              user = JSON.parse(res);
            }

            hqJyCallTql = new HqJyCallTql({
              "120": user.KHH,
              "134": "#PASSWORD#"
            });

            hqJyCallTql.send("104", [{
              "1230": "1"
            }], res => {

              let data = FormatResult(res);
              if(data.ErrorCode != 0) {
                tdxAlert(data.ErrorInfo);
                return;
              }

              let row = data.rows[0];
              if(row) {
                this.zj = row["204"];
                this.sy = row["205"];
              }
            });

            hqJyCallTql.send("2606", {}, res => {

              let data = FormatResult(res);
              if(data.ErrorCode != 0) {
                tdxAlert(data.ErrorInfo);
                return;
              }

              this.ccNum = data.rows.length;
            });
          });

          // __jyCallTql.send("2106", [{}], data => {
          //   data = FormatResult(data);
          //   this.ccNum = data.rows.length;
          // });

          // __jyCallTql.send()
        }
      });
    },

    getCode: function() {

      __hqCallTql.send("TSTC.10038", [{}], res => {

        res = res.match(/{[^}]+}/);
        if(res) {

          res = res[0];
          let data = JSON.parse(res);
          let { yyqt, wjsy, hot } = data;

          this.getSingleInfo(yyqt, "yyqt");
          this.getSingleInfo(wjsy, "wjsy");
          this.getHotInfo(hot);
        }
      });
    },

    getSingleInfo: function(codeList, flag) {

      // 取第一个代码
      if(codeList.length == 0) {
        return;
      }

      let code = codeList[0];
      let product = { code };
      __hqCallTql.send("TAS.product_info_query", [{
        "pro_code": code,
        "pro_type1": "",
        "pro_type2": ""
      }], res => {

        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          console.error(data.ErrorInfo);
          return;
        }

        let row = data.rows[0];
        if(row) {

          product.name = row.pro_name;
          product.pro_type1 = row.pro_type1;
          product.pro_type2 = row.pro_type2;
          product.pro_status = row.pro_status;
          product.cards = [
            [row.pro_type2_name, "card-blue"],
            [row.risk_level_name.replace(/等级/, ""), "card-gray"]
          ];

          if(row.pro_type2 != 12) {
            product.sy = ["最新净值", formatValueType(row.nav, ".4f")]; 
          }

        }

        __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
          callno: "100",
          pro_code: code,
          pro_type: ""
        }], res => {

          let data = FormatResult(res);
          if(data.ErrorCode != 0) {
            console.error(data.ErrorInfo);
            return;
          }

          let row = data.rows[0];
          if(row) {

            if(row.pro_type2 == 12) {
              product.sy = ["七日年化收益", formatValueType(row.qrnhsy, "2%")];
              // product.col2 = ["万份收益", formatValueType(row.wfsy, ".4f")];
            }
            else {
              // product.col1 = ["今年以来涨幅", formatValueType(row.jnzf, "2%")];
              // product.sy = ["最新净值", formatValueType(row.nav, ".4f")]; 
            }

          }

          if(flag == "yyqt") {
            this.yyqt = product;
          }
          else {
            this.wjsy = product;
          }
        });
      });
    },

    // 获取热门列表
    getHotInfo: function(codeList) {

      let count = codeList.length;
      let reccnt = 0;
      let list = [];
      codeList.map( (code, index) => {

        if(!code) {
          reccnt++;
          return;
        }

        list.push({ code });
        __hqCallTql.send("TAS.product_info_query", [{
          pro_code: code,
          pro_type1: "",
          pro_type2: ""
        }], res => {

          let data = FormatResult(res);
          if(data.ErrorCode != 0) {
            reccnt++;
            if(reccnt == count) {
              this.hot = list;
            }
            return;
          }

          let row = data.rows[0];
          if(row) {

            list[index].name = row.pro_name;
            list[index].pro_type1 = row.pro_type1;
            list[index].pro_type2 = row.pro_type2;
            list[index].col3 = ["起购金额", formatValueType(row.qgje, ".0f"), "0"];
            list[index].cards = [
              [row.pro_type2_name, "card-blue"],
              [row.risk_level_name.replace(/等级/, ""), "card-gray"]
            ];

            if(row.pro_type2 != 12) {
              list[index].col2 = ["最新净值", formatValueType(row.nav, ".4f")];
            }
          }

          __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
            callno: "100",
            pro_code: code,
            pro_type: ""
          }], res => {

            reccnt ++;
            let data = FormatResult(res);
            if(data.ErrorCode != 0) {
              if(reccnt == count) {
                this.hot = list;
                return;
              }
            }

            let row = data.rows[0];
            if(row) {
              
              if(row.pro_type2 == 12) {
                list[index].col1 = ["七日年化收益", formatValueType(row.qrnhsy, "2%")];
                list[index].col2 = ["万份收益", formatValueType(row.wfsy, ".4f")];
              }
              else {
                list[index].col1 = ["今年以来涨幅", formatValueType(row.jnzf, "2%")];
                // list[index].col2 = ["最新净值", formatValueType(row.nav, ".4f")]; 
              }
            }

            if(reccnt == count) {
              this.hot = list;
            }
          });
        })
      });
    }
  },

  computed: {

    zjzsStyle: function() {

      let ht = 131;
      let sY = 0;
      let sp = ht - this.scrollY;
      if(sp > 0) {
        sY = sp / ht;
      }

      return {
        "transform": `scaleY(${sY})`,
        "height": `${sp}px`
      };
    }
  },

  mounted: function() {
    this.doZhCheck();
    this.getCode();
  },

  created: function() {
    window.addEventListener('scroll', this.onScroll);

    event.$on("tdxActivity", () => {
      this.doZhCheck();
    });
  },

  destory: function() {
    window.removeEventListener('scroll', this.onScroll);
  }
}

</script>