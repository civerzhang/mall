<style scoped>
  
.box {
  background-color: #fff;
}

.bar {
  height: 50px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.title {
  font-size: 16px;
  color: #505050;
  line-height: 22px;
  margin-left: 10px;
}

.sub-title {
  font-size: 14px;
  color: #B4B4B4;
  line-height: 20px;
  margin-left: 15px;
}

</style>

<template>
  
  <div class="box">
    <div class="bar">
      <div class="bar-left">
        <span class="title">{{title}}</span>
        <span class="sub-title">{{subTitle}}</span>
      </div>
      <!-- <div class="tdx-more"></div> -->
    </div>
    <div class="list">
      <mob-card-hot v-for="product in productList"
        v-if = "product.name"
        :product = "product"
        :url = "url"
      />
    </div>
  </div>

</template>

<script>

import mobCardHot from "components/mob-card-hot.vue";

/*
  
  [
    {
      name: "稳赢30天",
      cards: [
        ["定期理财", "card-blue"],
        ["中低风险", "card-gray"]
      ],
      col1: ["业绩报酬基准", "4.95%"],
      col2: ["起购金额", "1000", "0"], // 0 - 人民币，1 - 美元，2 - 港币
      label: ["保本理财  限量发售", "label-blue"]
    },
    {
      name: "大成景阳领先混合",
      cards: [
        ["基金", "card-orange"],
        ["中风险", "card-gray"]
      ],
      col1: ["今年以来涨幅", "10.22%"],
      col2: ["最新净值", "0.9199"],
      col3: ["起购金额", "1", "0"]
    },
    {
      name: "南方现金通货币E",
      cards: [
        ["基金", "card-orange"],
        ["中风险", "card-gray"],
        ["支持快赎", "card-blue2"]
      ],
      col1: ["七日年化收益率", "4.26%"],
      col2: ["万份收益", "1.3162"],
      col3: ["起购金额", "0", "0"]
    },
    {
      name: "国债理财",
      cards: [
        ["低风险", "card-gray"]
      ],
      col1: ["业绩报酬基准", "3.95%"],
      col2: ["最新净值", "1000", "0"],
      col3: ["起购金额", "1", "0"]
    }
  ]

*/

const url = {
  OpenName: "产品详情",
  OpenUrl: "../mall2/jjxq.html",
  QueryFields: [
    {
      name: "pro_code",
      field: "code"
    },
    {
      name: "pro_type1",
      field: "pro_type1"
    },
    {
      name: "pro_type2",
      field: "pro_type2"
    }
  ]
};
  
export default {

  data() {
    return {
      url
    };
  },

  props: [
    "title",
    "subTitle",
    "productList"
  ],

  components: {
    mobCardHot
  },

  methods: {

  }
}

</script>