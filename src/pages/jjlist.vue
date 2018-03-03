<style scoped>
  
.list {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
}

.fixh {
  flex-grow: 0;
  flex-shrink: 0;
}

.flexh {
  flex: 1 1 auto;
  overflow: auto;
}

</style>

<template>
  
<div class="list" :id="`list${rn}`">
  <mob-bar-func
    class = "fixh" 
    :funcList = "funcList"
    :curSel = "curSel"
    :funcItemClick = "funcItemClick"
  />
  <mob-split class = "fixh" />
  <mob-list 
    class = "flexh"
    :cols = "getListCols"
    :order = "getListOrder"
    :orderField = "getListOrderField"
    :rows = "getListRows()"
    :sortClick = "sortClick"
    :loading = "isLoading"
    :pageQuery = "pageQuery"
    :pageSize = "getPageSize"
    :urlParam = "getUrlParam"
  />
  <mob-bar-query 
    class="fixh"
    v-if = "curSel != 3"
    :items = "getBarQueryItems"
    :curSel = "barQueryItemSel"
    :queryItemClick = "barQueryItemClick"
  />
</div>

</template>

<script>

import {
  getRnHex
} from "commons/func.js";

import mobBarFunc from "components/mob-bar-func.vue";
import mobSplit from "components/mob-split.vue";
import mobList from "components/mob-list.vue";
import mobBarQuery from "components/mob-bar-query.vue";
  
const funcList = ["股票型", "混合型", "债券型", "货币型", "其他基金"];
const funcCols = [
  [
    { title: "产品名称", fields: ["pro_name", "pro_code"], align: "left" },
    { title: "单位净值", field: "nav_total", sort: true, format: ".4f" }
    // { title: "日涨幅", field: "rzf", sort: true, color: "rg" }
  ],
  [
    { title: "产品名称", fields: ["pro_name", "pro_code"], align: "left" },
    { title: "起购金额", field: "qgje", sort: true, format: "2m" },
    { title: "七日年化收益", field: "qrnhsy", sort: true, color: "rg", format: "2%" },
    { title: "万份收益", field: "wfsy", sort: true, format: ".4f" }
  ]
];

const pageSize = 20;
const queryParam = [
  {
    "pro_type1_in": "(1)",
    "pro_type2": "11",
    "orderby_field": "rzf",
    "orderby_type": "2",
    "@POS": 0,
    "@COUNT": pageSize
  },
  {
    "pro_type1_in": "(1)",
    "pro_type2": "14",
    "orderby_field": "rzf",
    "orderby_type": "2",
    "@POS": 0,
    "@COUNT": pageSize
  },
  {
    "pro_type1_in": "(1)",
    "pro_type2": "13",
    "orderby_field": "rzf",
    "orderby_type": "2",
    "@POS": 0,
    "@COUNT": pageSize
  },
  {
    "pro_type1_in": "(1)",
    "pro_type2": "12",
    "orderby_field": "qrnhsy",
    "orderby_type": "2",
    "@POS": 0,
    "@COUNT": pageSize
  },
  {
    "pro_type1_in": "(1)",
    "pro_type2": "16",
    "orderby_field": "rzf",
    "orderby_type": "2",
    "@POS": 0,
    "@COUNT": pageSize
  }
];

const barQueryList = ["日", "周", "月", "季", "年", "今年"];
const barQueryName = ["日涨幅", "周涨幅", "月涨幅", "季涨幅", "年涨幅", "今年以来"];
const barQueryField = ["rzf", "zzf", "yzf", "jzf", "nzf", "jnzf"];

const urlParam = {
  OpenName: "产品详情",
  OpenUrl: "jjxq.html",
  QueryFields: [
    {
      name: "pro_code",
      field: "pro_code"
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
    mobBarFunc,
    mobSplit,
    mobList,
    mobBarQuery
  },
  props: [],
  data() {
    return {
      funcList,
      curSel: 0,
      funcRows: [],
      reCompute: true,
      isLoading: true,
      barQueryItemSel: 0,
      rn: getRnHex()
    };
  },

  methods: {

    // 分页查询
    pageQuery: function() {

      let sel = this.curSel;
      let param = queryParam[sel];
      param["@POS"] += param["@COUNT"];
      this.queryData();
    },

    barQueryItemClick: function(index) {

      if(this.barQueryItemSel != index) {

        this.barQueryItemSel = index;
        let sel = this.curSel;
        queryParam[sel]["@POS"] = 0;
        queryParam[sel]["orderby_field"] = barQueryField[index];
        queryParam[sel]["orderby_type"] = 2;
        this.funcRows[sel] = undefined;
        this.reCompute = !this.reCompute;
        this.queryData();
      }
    },

    // 功能导航栏点击
    funcItemClick: function(index) {
      this.curSel = index;
      if(!this.funcRows[this.curSel]) {
        this.queryData();
      }
    },

    // 查询数据
    queryData: function() {

      this.isLoading = true;
      __hqCallTql.send("TAS.product_code_query", [queryParam[this.curSel]], response => {

        let data = FormatResult(response);
        if(data.ErrorCode != 0) {
          tdxAlert(data.ErrorInfo);
          return;
        }

        this.isLoading = false;
        if(!this.funcRows[this.curSel]) {

          // 这里添加响应数据内容
          this.$set(this.funcRows, this.curSel, []);
        }

        // let data = {};
        // data.rows = [
        //   {
        //     "pro_name": "华安设备",
        //     "pro_code": "001072",
        //     "nav": "0.8790",
        //     "rzf": "5.29%",
        //     "zzf": "3.33%",
        //     "yzf": "6.76%",
        //     "jzf": "19.22%",
        //     "nzf": "30.22%",
        //     "jnzf": "15.32%",
        //     "qgje": "1000",
        //     "qrnhsy": "5.20%",
        //     "wfsy": "1.6234"
        //   }
        // ];

        this.funcRows[this.curSel] = this.funcRows[this.curSel].concat(data.rows);
      });
    },

    getListRows: function() {

      let index = this.curSel;
      return this.funcRows[index];
    },

    // 排序点击
    sortClick: function(field, sort) {

      let index = this.curSel;
      queryParam[index]["orderby_type"] = sort;
      queryParam[index]["orderby_field"] = field;
      queryParam[index]["@POS"] = 0;
      this.funcRows[index] = undefined;
      this.reCompute = !this.reCompute;

      this.queryData();
    }
  },

  watch: {},

  computed: {

    getListCols: function() {

      let index = this.curSel;

      // 货币型
      if(index == 3) {

        return funcCols[1];
      }
      else {

        // 这里应该还要处理各种涨幅字段
        // return funcCols[0];
        return [
          ...funcCols[0], 
          {
            title: barQueryName[this.barQueryItemSel],
            field: barQueryField[this.barQueryItemSel],
            sort: true,
            color: "rg",
            format: "2%"
          }
        ];
      }
    },

    getListOrder: function() {

      let flag = this.reCompute;
      return queryParam[this.curSel]["orderby_type"];
    },

    getListOrderField: function() {
      let flag = this.reCompute;
      return queryParam[this.curSel]["orderby_field"];
    },

    getBarQueryItems: function() {

      return barQueryList;
    },

    getPageSize: function() {
      return pageSize;
    },

    getUrlParam: function() {

      return urlParam;
    }
  },

  updated: function() {

    // debugger;
    // this.queryData();
  },

  mounted: function() {

    let lht = localStorage.jjHeight || 0;
    let wht = $(window).height();
    if(lht <= wht) {
      localStorage.jjHeight = wht;
      lht = wht;
    }

    $(`#list${this.rn}`).css("height", lht);
    this.queryData();
  }
}

</script>