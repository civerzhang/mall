<style scoped>
  
.card {
  display:  flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  height: 229px;
  background-color: #fff;
}

.title {
  font-size: 20px;
  line-height: 28px;
  color: #505050;
  text-align: center;
}

.info {
  font-size: 12px;
  color: #b4b4b4;
}

.nav {
  font-size: 28px;
  line-height: 40px;
  color: #ff4d34;
  margin-top: 10px;
}

.sec {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  width: 100%;
}

.col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.zf {
  font-size: 16px;
  line-height: 20px;
}

</style>

<template>
  
<div class="card">
  
  <span class="title">{{product.pro_name}}</span>
  <span class="info">{{product.pro_code}}</span>
  <span class="nav" :style="getStyle('rg', product.qrnhsy)">{{getValue(product.qrnhsy, '2%')}}</span>
  <span class="info">七日年化收益</span>
  <div class="sec">
    <div class="col">
      <span class="zf">{{getValue(product.qgje, '.0f')}}</span>
      <span class="info">起购金额</span>
    </div>
    <div class="col">
      <span class="zf" :style="getStyle('rg', product.wfsy)">{{getValue(product.wfsy, '.4f')}}</span>
      <span class="info">万份收益</span>
    </div>
    <div class="col">
      <span class="zf">{{product.risk_level_name}}</span>
      <span class="info">风险等级</span>
    </div>
  </div>
</div>

</template>

<script>

import {
  formatValueType,
  getFieldColor
} from "commons/func.js";
  
export default {

  components: {},
  props: [
    "product",
  ],
  data() {
    return {};
  },

  methods: {

    getStyle: function(type, value) {

      return {
        color: getFieldColor(type, value)
      }
    },

    getValue: function(value, type) {
      return formatValueType(value, type);
    }
  },

  updated: function() {
    
  }
}

</script>