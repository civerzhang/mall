<style scoped>
  
.box {
  background-color: #fff;
}

.row {
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #ddd;
}

.info {
  font-size: 16px;
  color: #b5b5b5;
}

.content {
  font-size: 16px;
  color: #505050;
}

.right {
  display: flex;
  align-items: center;
}

</style>

<template>
  
<!-- 介绍基金类型的 list -->
<ul class="box">
  <li class="row" v-for="item in items" @click="liClick(item)">
    <span class="info" :style="item.style">{{item.title}}</span>
    <div class="right">
      <span class="content" :style="item.style2">{{getValue(item)}}</span>
      <span class="tdx-more" v-if="item.urlParam"></span>
    </div>
  </li>
</ul>

</template>

<script>

import {
  tdxOpenUrl
} from "commons/req.js";

import {
  formatValueType
} from "commons/func.js";
  
export default {

  components: {},
  props: [
    "items",
    "row"
  ],
  data() {
    
    return {};
  },

  methods: {

    liClick: function(item) {

      if(item.urlParam) {

        let { OpenName, OpenUrl, OpenParam, OpenType, QueryFields } = item.urlParam;
        let row = this.row;
        OpenName = row[OpenName] || OpenName;
        OpenUrl = row[OpenUrl] || OpenUrl;

        let qArr = [];
        if(QueryFields) {
          QueryFields.map( q => {
            qArr.push(`${q.name}=${row[q.field]}`);
          });
        }
        OpenUrl += qArr.length > 0 ? `?${qArr.join("&")}` : "";
        tdxOpenUrl({
          OpenName,
          OpenType,
          OpenUrl,
          OpenParam
        });
      }
    },

    getValue: function(item) {

      let value = this.row[item.field];

      if(item.type) {

        return `${formatValueType(value, item.type)}${item.suffix || ""}`
      }
      else {
        return value;
      }
    }
  }
}

</script>