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
  <mob-split />
  <mob-list-info 
    :items = "getItems"
    :row = "getRow"
  />
</div>

</template>

<script>

import {
  HqJyCallTql
} from "commons/req.js"
  
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
      OpenUrl: "licai/licai/lscjcx.html",
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

      hqJyCallTql.send("104", [{}], res => {

        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        if(data.rows[0]) {
          this.zj = data.rows[0]["310"];
          this.zjye = data.rows[0]["300"];
        }

        this.chartRow.zjye = this.zjye;
        this.getCpzc();
      });
    },

    getCpzc: function() {

      hqJyCallTql.send("104", [{ "1230": "1" }], res => {

        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        if(data.rows[0]) {
          this.cpzc = data.rows[0]["205"];
        }
        this.chartRow.cpzc = this.cpzc;
        this.loading = false;
      });
    },

    getLogin: function() {
      
      // 如果登录，取用户信息
      __webCallTql.send("tdxEnumTradeAcc", {}, res => {

        let user;
        if(typeof res == "string") {
          user = JSON.parse(res)[0];
        }
        else {
          user = JSON.parse(res);
        }

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

      return ["现金", "基金"];
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