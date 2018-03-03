<style scoped></style>

<template>
  
<div>
  <mob-wdlc-zc 
    :zj = "zj"
  />
  <mob-chart-pie 
    style = "height: 170px;"
    :loading = "loading"
    :x = "getX"
    :y = "getY"
    :row = "getChartRow"
  />
<!--   <div v-if="!cpzc || !zjye" style="padding: 3px;fontSize:14px;">
    暂无产品数据,请前往购买！
  </div> -->
  <mob-split />
  <mob-list-info 
    :items = "getItems"
    :row = "getRow"
  />
</div>

</template>

<script>

import {
  HqJyCallTql,
  __isLoginNormal
} from "commons/req.js";
  
import mobWdlcZc from "components/mob-wdlc-zc.vue";
import mobChartPie from "components/mob-chart-pie.vue";
import mobSplit from "components/mob-split.vue";
import mobListInfo from "components/mob-list-info.vue";

let hqJyCallTql;

const items = [
  {
    title: "我的持仓",
    urlParam: {
      OpenName: "我的持仓",
      OpenUrl: "licai/licai/cpcccx.html",
      OpenParam: {
        UrlType: "Absolute",
        WebViewType: "JyURL"
      }
    },
    style: {
      color: "#000"
    }
  },
  {
    title: "撤单",
    urlParam: {
      OpenName: "撤单",
      OpenUrl: "licai/licai/cpcd2.html",
      OpenParam: {
        UrlType: "Absolute",
        WebViewType: "JyURL"
      }
    },
    style: {
      color: "#000"
    }
  },
  {
    title: "当日订单查询",
    field: "info",
    urlParam: {
      OpenName: "当日订单查询",
      OpenUrl: "licai/licai/drddcx.html",
      OpenParam: {
        UrlType: "Absolute",
        WebViewType: "JyURL"
      }
    },
    style: {
      color: "#000"
    },
    style2: {
      color: "#ddd",
      fontSize: "13px"
    }
  },
  {
    title: "历史订单查询",
    urlParam: {
      OpenName: "历史订单查询",
      OpenUrl: "licai/licai/lswtcx.html",
      OpenParam: {
        UrlType: "Absolute",
        WebViewType: "JyURL"
      }
    },
    style: {
      color: "#000"
    }
  }
];

const row = {
  info: "普通认申购赎回订单"
};

export default {

  components: {
    mobWdlcZc,
    mobChartPie,
    mobSplit,
    mobListInfo
  },
  props: [],
  data() {

    return {
      zj: "",
      zjye: "",
      cpzc: "",
      loading: true,
      chartRow: {}
    };
  },

  methods: {

    getZj: function() {

      hqJyCallTql.send("104", [{
        "1230": "1"
      }], res => {

        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        if(data.rows[0]) {
          this.zj = data.rows[0]["205"];
        }

        this.getCpzc();
      });
    },

    getCpzc: function() {

      let reccnt = 0;

      // 获取基金持仓
      hqJyCallTql.send("2606", [], res => {

        reccnt ++;
        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        let cpzc = 0;
        data.rows.map( row => {
          cpzc += parseFloat(row["10001"]);
        });

        cpzc = cpzc.toFixed(2);
        this.cpzc = cpzc;
        this.chartRow.cpzc = cpzc;

        if(reccnt == 2) {
          this.loading = false;
        }
      });

      // 获取银行理财持仓
      hqJyCallTql.send("2258", [], res => {

        reccnt ++;
        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        let zjye = 0;
        data.rows.map( row => {
          zjye += parseFloat(row["10025"]);
        });

        this.zjye = zjye;
        this.chartRow.zjye = zjye;
        if(reccnt == 2) {
          this.loading = false;
        }
      });
    },

    getLogin: function() {
      
      // 如果登录，取用户信息
      __isLoginNormal( (flag, user) => {

        __webCallTql.send("tdxChangeCurAcc", { SessionID: user.SessionID }, () => {});

        hqJyCallTql = new HqJyCallTql({
          "120": user.KHH,
          "134": "#PASSWORD#"
        });

        this.getZj();
      });

    }
  },

  computed: {

    getItems: function() {
      return items;
    },

    getRow: function() {
      return row;
    },

    getX: function() {

      return ["银行理财", "基金"];
    },

    getY: function() {

      return ["zjye", "cpzc"];
    },

    getChartRow: function() {

      if(isNaN(parseFloat(this.cpzc)) || isNaN(parseFloat(this.zjye))) {
        return undefined;
      }

      return this.chartRow;
    }
  },

  mounted: function() {

    // this.getZj();
    this.getLogin();
  }
}


</script>