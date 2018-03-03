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

.sp {
  display: inline-block;
  width: 5px;
  height: 17px;
  background-color: #4696F5;
}

.title {
  font-size: 16px;
  color: #505050;
  /*line-height: 22px;*/
  margin-left: 10px;
}

.subtitle {
  font-size: 14px;
  color: #B4B4B4;
  /*line-height: 20px;*/
  margin-left: 15px;
}

.card {
  height: 202px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.pro-name {
  font-size: 20px;
  line-height: 28px;
  color: #505050;
}

.pro-sy-title {
  font-size: 12px;
  color: #B4B4B4;
  line-height: 17px;
  margin-top: 5px;
}

.pro-sy-value {
  font-size: 28px;
  color: #FF4D34;
  line-height: 40px;
}

.btn {
  height: 44px;
  line-height: 44px;
  text-align: center;
  border: 1px solid #4696F5;
  border-radius: 6px;
  font-size: 16px;
  color: #4696F5;
  width: 90%;
}

.bar-left {
  display: flex;
  align-items: center;
}

</style>

<template>
  
  <div class="box">
    
    <div class="bar">
      <div class="bar-left">
        <span class="sp"></span>
        <span class="title">{{title}}</span>
        <span class="subtitle">{{subTitle}}</span>
      </div>
      <!-- <div class="tdx-more"></div> -->
    </div>

    <div class="card" @click = "jumpInfoPage">
      
      <div class="pro-name">{{product.name}}</div>
      <div>
        <span v-for="card in product.cards" :class="card[1]">{{card[0]}}</span>
      </div>
      <span class="pro-sy-title">{{product.sy[0]}}</span>
      <span class="pro-sy-value">{{product.sy[1]}}</span>
      <div class="btn" @click = "jumpPage">立即购买</div>

    </div>

  </div>

</template>

<script>

/*
  {
    name: "中融货币E",
    cards: [
      ["活期理财", "card-blue"],
      ["中低风险", "card-gray"]
    ],
    sy: ["七日年化收益率", "4.21%"]
  }
*/

import {
  tdxOpenUrl,
  __isLoginNormal
} from "commons/req.js";
  
export default {

  data() {
    return {};
  },

  props: [
    "title",
    "subTitle",
    "product"
  ],

  methods: {

    // 跳转到购买界面
    jumpPage: function(e) {
      e.stopPropagation();
      e.preventDefault();

      const product = this.product;

      // 做用户登录判断
      __isLoginNormal( flag => {

        // 未登录
        if(!flag) {
          __tdxLoginBox();
          return;
        }

        // 申购
        if(product.pro_status == 2) {
          tdxOpenUrl({
            OpenName: "认购",
            OpenUrl: `jyhtml/works123/lcsc/otcrg.html?F402=${product.code}&fromsc=1&PageID=Mobile.OTC.OTCSGTRD`,
            OpenParam: {
              UrlType: "Absolute",
              WebViewType: "JyURL"
            }
          });
        }
        else {
          tdxOpenUrl({
            OpenName: "申购",
            OpenUrl: `jyhtml/works123/lcsc/otcsg.html?F402=${product.code}&fromsc=1&PageID=Mobile.OTC.OTCSGTRD`,
            OpenParam: {
              UrlType: "Absolute",
              WebViewType: "JyURL"
            }
          });
        }
      });
    },

    // 跳转到详情界面
    jumpInfoPage: function(e) {
      e.preventDefault();
      e.stopPropagation();

      let product = this.product;
      tdxOpenUrl({
        OpenName: "产品详情",
        OpenUrl: `../mall2/jjxq.html?pro_code=${product.code}&pro_type1=${product.pro_type1}&pro_type2=${product.pro_type2}`
      });
    } 
  }
}

</script>