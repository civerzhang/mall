<style scoped></style>

<template>
  
<div>
  <div class="tdx-loading" v-if="loading"></div>
  <div v-else>
    <mob-image-slider 
      :images = "images"
      :params = "{minMoveDistance: 50, autoPlay: true}"
    />
    <mob-bar 
      title = "热销基金"
      moreText = "查看更多"
      :url = "urlParam"
    />
    <mob-card-hot 
      v-for="code in codeList"
      v-if = "code.name"
      :product = "code"
      :url = "cardUrlParam"
    />
    <!-- <mob-more 
      title = "查看更多>>"
      :urlParam = "urlParam"
    /> -->
  </div>
</div>

</template>

<script>

import {
  formatValueType
} from "commons/func.js";

import mobImageSlider from "components/mob-image-slider.vue";
import mobBar from "components/mob-bar.vue";
import mobCardHot from "components/mob-card-hot.vue";
import mobMore from "components/mob-more.vue";

const images = [
  "./res/commercial01.png"
];

const urlParam = {
  OpenName: "基金",
  OpenUrl: "jjlist.html"
};

const cardUrlParam = {
  OpenName: "产品详情",
  OpenUrl: "jjxq.html",
  QueryFields: [
    {
      name: "pro_code",
      field: "code"
    },
    {
      name: "pro_type2",
      field: "pro_type2"
    },
    {
      name: "pro_type1",
      field: "pro_type1"
    }
  ]
};
  
export default {

  components: {
    mobImageSlider,
    mobBar,
    mobCardHot,
    mobMore
  },
  props: [],
  data() {
    return {
      images,
      codeList: [],
      urlParam,
      cardUrlParam,
      loading: true
    };
  },

  methods: {

    // 获取代码列表，补全代码数据
    getCodeInfo: function() {

      __hqCallTql.send("TSTC.10038", [{}], res => {

        res = res.match(/{[^}]+}/);
        if(res) {
          res = res[0];
          let data = JSON.parse(res);
          let { jj } = data;
          let codeList = [];
          let count = jj.length;
          let reccnt = 0;
          jj.map( (code, index) => {
            codeList.push({code});
            __hqCallTql.send("TAS.product_info_query", [{
              "pro_type1": "",
              "pro_type2": "",
              "pro_code": code
            }], response => {
              let data = FormatResult(response);
              if(data.ErrorCode != 0) {
                // tdxAlert(data.ErrorInfo);
                reccnt ++;
                if(reccnt == count) {
                  this.codeList = codeList;
                  this.loading = false;
                }
                return;
              }

              let rowdata = data.rows[0];
              if(rowdata) {
                $.extend(codeList[index], {
                  name: rowdata.pro_name,
                  cards: [
                    ["基金", "card-orange"],
                    [rowdata.risk_level_name.replace(/等级/g, ""), "card-gray"]
                  ],
                  col3: ["起购金额", formatValueType(rowdata.qgje, ".0f"), "0"],
                  pro_type1: rowdata.pro_type1,
                  pro_type2: rowdata.pro_type2
                });
              }

              if(rowdata.pro_type2 != 12) {
                codeList[index].col2 = ["最新净值", formatValueType(rowdata.nav, ".4f")];
              }

              __hqCallTql.send("CWServ.tdxzx_jyfunc", [{
                callno: "100",
                pro_code: code,
                pro_type2: ""
              }], response => {

                reccnt ++;
                let data = FormatResult(response);
                if(data.ErrorCode != 0) {
                  if(reccnt == count) {
                    this.codeList = codeList;
                    this.loading = false;
                  }
                  return;
                }

                let row = data.rows[0];
                if(row) {
                  
                  if(row.pro_type2 == 12) {
                    $.extend(codeList[index], {
                      col1: ["七日年化收益率", formatValueType(row.qrnhsy, "2%")],
                      col2: ["万份收益", formatValueType(row.wfsy, ".4f")]
                    });
                  }
                  else {
                    $.extend(codeList[index], {
                      col1: row.jnzf==undefined?["成立以来涨幅", formatValueType(row.clzf, "2%")]:["今年以来涨幅", formatValueType(row.jnzf, "2%")],
                      //col2: ["最新净值1", formatValueType(row.nav_total, ".4f")]
                    });
                  }
                }

                if(reccnt == count) {
                  this.codeList = codeList;
                  this.loading = false;
                }
              });
            });
          });
        }
      });
    }
  },

  mounted: function() {
    this.getCodeInfo();
  }
}

</script>