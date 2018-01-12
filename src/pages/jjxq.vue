<style scoped>

.all {
  display: flex;
  flex-direction: column;
}

.flx {
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: auto;
  margin-bottom: 50px;
}

.fix {
  flex: 0 0 50px;
  /*flex-shrink: 0;*/
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>

<template>
  
<div>

  <div class="all" :id="`box${rn}`">
    
    <div class="flx">
      <mob-card-info
        v-if = "!isHbjj" 
        :product = "cpinfo"
        :jz = "getZs"
      />
      <mob-card-info-hb v-else 
        :product = "cpinfo"
      />
      <mob-split />
      <mob-chart 
        v-if = "!isHbjj"
        :items = "getChartBarItems"
        :style = "getChartBoxStyle"
        :barClick = "chartBarItemClick"
        :rows = "getChartData()"
        :loading = "chartLoading"
        x = "date"
        y = "nav"
        :curSel = "dataIndex"
      />
      <mob-chart 
        v-if = "isHbjj"
        :items = "getChartBarItems"
        :style = "getChartBoxStyle"
        :barClick = "chartBarItemClick"
        :rows = "getChartData()"
        :loading = "chartLoading"
        x = "date"
        y = "wfsy"
        :curSel = "dataIndex"
      />
      <mob-split />
      <mob-bar 
        title = "基金简介"
      />
      <mob-list-info 
        :items = "getListInfoItems"
        :row = "cpinfo"
      />
      <mob-split />
      <mob-bar 
        v-if = "!isHbjj"
        title = "基金投资组合资产明细"
      />
      <mob-chart-bar
        v-if = "!isHbjj"
        style = "height: 190px;"
        :rows = "getZczhData()"
        :loading = "zczhLoading"
        x = "date"
        :y = "getZczhY"
      />
      <mob-split v-if="!isHbjj"/>
      <mob-bar title = "相关协议" />
      <mob-list-info 
        :items = "getXysList"
        :row = "cpinfo"
      />
    </div>
    <mob-btn
      class = "fix"
      :btns = "getBtns"
      :btnClick = "btnClick"
    />
  </div>
</div>

</template>

<script>

import event from "commons/event.js";
import {
  getUrlParam,
  getRnHex
} from "commons/func.js";
import {
  tdxOpenUrl
} from "commons/req.js";

import mobCardInfo from "components/mob-card-info.vue";
import mobCardInfoHb from "components/mob-card-info-hb.vue";
import mobSplit from "components/mob-split.vue";
import mobChart from "components/mob-chart.vue";
import mobChartBar from "components/mob-chart-bar.vue";
import mobBar from "components/mob-bar.vue";
import mobListInfo from "components/mob-list-info.vue";
import mobBtn from "components/mob-btn.vue";

const { pro_code, pro_type1, pro_type2 } = getUrlParam(location.search);

const listInfoItems = [
  { title: "基金类型", field: "investment_style" },
  { title: "风险等级", field: "risk_level_name" },
  { title: "起购金额", field: "qgje", type: ".0f", suffix: "元起购" },
  { title: "成立时间", field: "pro_begin_date" },
  { title: "交易状态", field: "pro_status_name" },
  { 
    title: "分红信息", urlParam: { 
      OpenName: "pro_name",
      OpenUrl: "jjfh.html",
      QueryFields: [
        {
          "name": "pro_name",
          "field": "pro_name"
        },
        {
          "name": "pro_code",
          "field": "pro_code"
        }
      ]
    } 
  },
  { title: "基金公司", field: "pro_manager" },
  { title: "基金经理", field: "fund_manager" }
];

let xysList = [
  { 
    title: "产品协议书", 
    urlParam: {
      OpenName: "产品协议书",
      OpenUrl: "http://www.baidu.com",
      OpenParam: {
        UrlType: "Remote"
      }
    } 
  },
  { 
    title: "产品说明书", 
    urlParam: {
      OpenName: "产品协议书",
      OpenUrl: "http://www.baidu.com",
      OpenParam: {
        UrlType: "Remote"
      }
    } 
  },
  { 
    title: "风险揭示书", 
    urlParam: {
      OpenName: "产品协议书",
      OpenUrl: "http://www.baidu.com",
      OpenParam: {
        UrlType: "Remote"
      }
    } 
  },
];

const btns = [
  {
    text: "认购",
    style: {
      "backgroundColor": "#F9B349",
      "color": "#fff"
    }
  },
  {
    text: "申购",
    style: {
      "backgroundColor": "#2E6BB1",
      "borderBottom": "1px solid #ddd",
      "color": "#fff"
    }
  }
];

// const zczhX = ["股票占净比", "债券占净比", "回售占净比", "现金占净比"];
const zczhY = ["jzc", "gp_zjzcb", "zq_zjzcb", "hs_zjzcb", "xj_zjzcb"];
  
export default {

  components: {
    mobCardInfo,
    mobCardInfoHb,
    mobSplit,
    mobChart,
    mobBar,
    mobListInfo,
    mobBtn,
    mobChartBar
  },
  props: [],
  data() {
    return {
      cpinfo: {},
      zs: [],
      jz: {},
      zczh: undefined,
      dataIndex: 0,
      chartLoading: true,
      zczhLoading: true,
      rn: getRnHex(),
      xysList: [],
    };
  },

  methods: {

    // 获取走势数据
    chartBarItemClick: function(index) {
      this.dataIndex = index;
      this.getCpZs(index);
    },

    // 获取产品详情内容
    getCpInfo: function() {

      __hqCallTql.send("TAS.product_info_query", [{
        "pro_code": pro_code,
        "pro_type1": pro_type1,
        "pro_type2": pro_type2
      }], response => {

        let data = FormatResult(response);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        this.cpinfo = $.extend({}, this.cpinfo, data.rows[0]);

        // 获取补充信息
        if(pro_type2 != 12) {

          __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
            "callno": "100",
            "pro_code": pro_code,
            "pro_type": ""
          }], response => {

            let data = FormatResult(response);
            if(data.ErrorCode != 0) {
              tdxAlert(data.ErrorInfo);
              return;
            }

            this.cpinfo = $.extend({}, this.cpinfo, data.rows[0]);
          });
        }
      });
    },

    // 取产品的累积净值走势，或者万份收益走势
    getCpZs: function(index) {

      let proMm = ["-1", "-3", "-6", "-12"];

      this.chartLoading = true;

      if(!this.zs[index]) {

        this.$set(this.zs, index, []);

        __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
          "callno": "103",
          "pro_code": pro_code,
          "pro_type": pro_type2,
          "pro_mm": proMm[index]
        }], response => {

          this.chartLoading = false;
          let data = FormatResult(response);
          if(data.ErrorCode != 0) {
            tdxAlert(data.ErrorInfo);
            return;
          }

          this.zs[index] = [...data.rows];
          if(index == 0) {
            this.jz = this.zs[0][this.zs[0].length - 1];
          }
        });
      }
      else {
        this.chartLoading = false;
        return this.zs[index];
      }

    },

    // 获取净值或者万份收益数据
    getChartData: function() {
      let d = this.zs[this.dataIndex];
      if(d && d.length > 0) {
        this.chartLoading = false;
      }
      return this.zs[this.dataIndex];
    },

    // 获取资产配置数据
    getZczhData: function() {

      if(this.zczh) {
        this.zczhLoading = false;
        return this.zczh;
      }
      else {

        __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
          "callno": "104",
          "pro_code": pro_code,
          "pro_mm": "-12"
        }], response => {

          this.zczhLoading = false;
          let data = FormatResult(response);
          if(data.ErrorCode != 0) {
            tdxAlert(data.ErrorInfo);
            return;
          }

          this.zczh = data.rows;
          return this.zczh;
        });
      }
    },

    // 按钮点击响应
    btnClick: function(index) {

      let status = this.cpinfo.pro_status;
      let urlParams = [
        {
          OpenName: "认购",
          OpenUrl: `jyhtml/works123/lcsc/otcrg.html?F402=${this.cpinfo.pro_code}&fromsc=1&PageID=Mobile.OTC.OTCSGTRD`,
          OpenParam: {
            UrlType: "Absolute",
            WebViewType: "JyURL"
          }
        },
        {
          OpenName: "申购",
          OpenUrl: `jyhtml/works123/lcsc/otcsg.html?F402=${this.cpinfo.pro_code}&fromsc=1&PageID=Mobile.OTC.OTCSGTRD`,
          OpenParam: {
            UrlType: "Absolute",
            WebViewType: "JyURL"
          }
        },
      ];

      __isLoginNormal(flag => {

        if(flag == 0) {
          __tdxLoginBox();
          return;
        }

        if(status == 1) {
          tdxOpenUrl(urlParams[1]);
        }
        else if(status == 2) {
          tdxOpenUrl(urlParams[0]); 
        }

        // tdxOpenUrl(urlParams[index]);

      });
    },

    // 获取产品招募书
    getXys: function(type, title) {

      if(type == "zms") {
        xysList = [];
      }

      __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
        "callno": "105",
        "pro_code": pro_code,
        "pro_type": type,
        "pro_mm": "1"
      }], res => {

        let data = FormatResult(res);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        if(data.rows && data.rows.length > 0) {
          xysList.push({
            title: title,
            urlParam: {
              OpenName: title,
              OpenUrl: data.rows[0].url,
              OpenParam: {
                UrlType: "Remote"
              }
            } 
          });
        }

        if(type == "zms") {
          this.getXys("ht", "基金合同");
        }
        else if(type == "ht") {
          this.getXys("jss", "风险揭示书");
        }
        else {

          let list = [
            {
              title: "证券投资基金投资者风险提示函",
              urlParam: {
                OpenName: "证券投资基金投资者风险提示函",
                OpenUrl: "https://www.cczq.com/webapp/funds/tzzfxtsh.html",
                OpenParam: {
                  UrlType: "Remote"
                }
              }
            }, 
            {
              title: "证券投资基金投资人权益须知",
              urlParam: {
                OpenName: "证券投资基金投资人权益须知",
                OpenUrl: "https://www.cczq.com/webapp/funds/txrqyxz.html",
                OpenParam: {
                  UrlType: "Remote"
                }
              }
            }
          ];

          xysList = xysList.concat(list);
          this.xysList = xysList;
        }
      });
    }
  },

  computed: {

    // 获取协议书列表
    getXysList: function() {

      return this.xysList;
    },

    getZs: function() {
      return this.jz;
    },

    getChartBarItems: function() {

      return ["一月", "一季", "半年", "一年"];
    },

    getChartBoxStyle: function() {

      return {
        height: "226px"
      }
    },

    getListInfoItems: function() {
      return listInfoItems;
    },

    getBtns: function() {

      let status = this.cpinfo.pro_status;
      if(status == 1) {
        return [btns[1]]
      }
      else if(status == 2) {
        return [btns[0]];
      }
      else {
        return [];
      }
    },

    isHbjj: function() {
      return pro_type2 == 12;
    },

    getZczhX: function() {
      return zczhX;
    },

    getZczhY: function() {
      return zczhY;
    }
  },

  mounted: function() {

    // $(`#box${this.rn}`).css("height", $(window).height());

    this.getCpInfo();
    this.getXys("zms", "基金招募说明书");
    this.getCpZs(0);
  },

  updated: function() {
    // debugger;
  }
}

</script>