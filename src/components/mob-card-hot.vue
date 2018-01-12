<style scoped>
  
.box {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /*align-items: center;*/
  padding: 0 1.5rem;
  border-bottom: 1px solid #E8E8E8;
  background-color: #fff;
}

.line {
  display: flex;
  align-items: center;
}

.pro-name {
  font-size: 16px;
  color: #505050;
  line-height: 22px;
}

.line2 {
  display: flex;
  justify-content: space-between;
}

.col {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
}

.syl {
  font-size: 24px;
  line-height: 33px;
  color: #FF4D34;
}

.sub-title {
  font-size: 12px;
  color: #B4B4B4;
  line-height: 17px;
}

.jz {
  font-size: 20px;
  color: #B4B4B4;
  line-height: 28px;
}

.label-blue {
  border: 1px solid #4696F5;
  border-radius: 100px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 14px;
  color: #4696F5;
  padding: 0 15px;
  /*position: absolute;
  top: 20px;*/
}

</style>

<template>
  
<div class="box" @click = "jumpPage">
  <div class="line">
    <span class="pro-name">{{product.name}}</span>
    <span v-for="card in product.cards" :class="card[1]">{{card[0]}}</span>
  </div>
  <div class="line2">
    <div class="col" v-if="product.col1">
      <span class="syl">{{getValue(product.col1)}}</span>
      <span class="sub-title">{{product.col1[0]}}</span>
    </div>
    <div class="col" v-if="product.col2">
      <span class="jz">{{getValue(product.col2)}}</span>
      <span class="sub-title">{{product.col2[0]}}</span>
    </div>
    <div class="col" v-if="product.col3">
      <span class="jz">{{getValue(product.col3)}}</span>
      <span class="sub-title">{{product.col3[0]}}</span>
    </div>
    <div class="col" v-if="product.label">
      <div :class="product.label[1]">{{product.label[0]}}</div>
    </div>
  </div>
</div>

</template>

<script>

/*

{
  name: "稳赢30天",
  cards: [
    ["定期理财", "card-blue"],
    ["中低风险", "card-gray"]
  ],
  col1: ["业绩报酬基准", "4.95%"],
  col2: ["起购金额", "1000", "0"], // 0 - 人民币，1 - 美元，2 - 港币
  label: ["保本理财  限量发售", "label-blue"],
  code: "",
  pro_type1: "",
  pro_type2: ""
}

或者

{
  name: "大成景阳领先混合",
  cards: [
    ["基金", "card-orange"],
    ["中风险", "card-gray"]
  ],
  col1: ["今年以来涨幅", "10.22%"],
  col2: ["最新净值", "0.9199"],
  col3: ["起购金额", "1", "0"],
  code: "",
  pro_type1: "",
  pro_type2: ""
}

*/

import {
  tdxOpenUrl
} from "commons/req.js";
  
export default {

  data() {
    return {};
  },

  props: [
    "product",
    "url"
  ],

  methods: {

    jumpPage: function(e) {
      e.stopPropagation();
      e.preventDefault();

      if(this.url) {

        let { QueryFields } = this.url;
        let qArr = [];
        if(QueryFields) {
          QueryFields.map( q => {

            let { name, field } = q;
            qArr.push(`${name}=${this.product[field]}`);
          });
        }

        let { OpenUrl, OpenType, OpenName, OpenParam } = this.url;
        OpenUrl += qArr.length > 0 ? `?${qArr.join("&")}` : "";
        tdxOpenUrl({
          OpenName,
          OpenUrl,
          OpenParam,
          OpenType
        });
      }
    },

    // 获取内容
    getValue: function(col) {

      if(col[2] != undefined) {
        let dw = ["元", "美元", "港元"];
        return `${col[1]}${dw[col[2]]}`;
      }
      else {
        return col[1];
      }
    }
  }
}

</script>