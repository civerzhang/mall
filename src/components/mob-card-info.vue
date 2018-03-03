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
  font-size: 30px;
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
  <span class="nav" :style="getStyle('rg', jz.nav)">{{getValue(jz.nav, '.4f')}}</span>
  <span class="info">最新净值 ({{getDate(jz.date)}})</span>
  <div class="sec">
    <div class="col">
      <span class="zf" :style="getStyle('rg', product.yzf)">{{getValue(product.yzf, '2%')}}</span>
      <span class="info">近一月涨跌</span>
    </div>
    <div class="col" v-if = "product.jnzf==undefined">
      <span class="zf" :style="getStyle('rg', product.clzf)">{{getValue(product.clzf, '2%')}}</span>
      <span class="info">成立以来涨跌</span>
    </div>
    <div class="col" v-else>
      <span class="zf" :style="getStyle('rg', product.jnzf)">{{getValue(product.jnzf, '2%')}}</span>
      <span class="info">今年以来涨跌</span>
    </div>
    <div class="col">
      <span class="zf" :style="getStyle('rg', product.nav_total)">{{getValue(product.nav_total, '.4f')}}</span>
      <span class="info">累计净值</span>
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
    "jz"
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
    },

    getDate: function(date) {

      if(!date) {
        return date;
      }

      if(date.length > 5) {
        return date.substr(5);
      }
      else {
        return date;
      }
    }
  },

  updated: function() {

    console.log(this.jz);
  }
}

</script>