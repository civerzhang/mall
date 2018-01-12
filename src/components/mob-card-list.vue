<style scoped>
  
.card {
  display: flex;
  padding-left: 20px;
  height: 60px;
}

.col {
  flex-shrink: 0;
  display: flex;
  /*align-items: center;*/
  justify-content: center;
  flex-direction: column;
}

.title {
  font-size: 16px;
  color: #505050;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.sub-title {
  font-size: 12px;
  color: #b4b4b4;
}

</style>

<template>
  
<div class="card" @click="jumpPage">
  
  <div class="col" v-for="col in cols" :style = "getColStyle(col)">
    <span v-if="col.field" class="title" :style = "getFieldStyle(col)">{{getValue(col.field, col)}}</span>
    <span v-if="col.fields" class="title" :style = "getFieldStyle(col)">{{getValue(col.fields[0], col)}}</span>
    <span v-if="col.fields" class="sub-title" :style = "getFieldStyle(col)">{{getValue(col.fields[1], col)}}</span>
  </div>

</div>

</template>

<script>

import {
  getFieldColor,
  formatValueType
} from "commons/func.js";

import {
  tdxOpenUrl
} from "commons/req.js";
  
export default {

  components: {},
  props: [
    "cols",
    "row",
    "urlParam"
  ],
  data() {
    return {};
  },

  methods: {

    // 点击卡片跳转
    jumpPage: function() {

      if(this.urlParam) {

        let { QueryFields } = this.urlParam;
        let qArr = [];
        if(QueryFields) {

          QueryFields.map( q => {

            let { name, field } = q;
            qArr.push(`${name}=${this.row[field]}`);
          }); 
        }

        let qStr = "";
        if(qArr.length > 0) {
          qStr = `?${qArr.join("&")}`;
        }

        let { OpenUrl, OpenType, OpenName, OpenParam } = this.urlParam;
        OpenUrl += qStr;
        tdxOpenUrl({
          OpenName,
          OpenType,
          OpenUrl,
          OpenParam
        });
      }
    },

    getColStyle: function(col) {

      let { width, align } = col;

      return {
        textAlign: align || "center",
        minWidth: `${width}px`,
        width: this.colWidthPercent
      };
    },

    getFieldStyle: function(col) {

      let { color } = col;

      // 这里的 color 配置，遵循涨红跌绿
      let rtColor;
      if(color) {
        rtColor = getFieldColor(color, this.row[col.field]);
      }

      return {
        color: rtColor
      };
    },

    getValue: function(field, col) {
      return formatValueType(this.row[field], col.format);
    }
  },

  computed: {

    colWidthPercent: function() {

      return (1 / this.cols.length * 100).toFixed(2) + "%";
    }
  }
}

</script>