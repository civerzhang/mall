<style scoped>
  
.box {
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.chart {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
}

.col1 {
  /*flex: 1 1 auto;*/
  flex-shrink: 0;
  flex-grow: 1;
  width: 50%;
}

.col2 {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20px;
}

.card {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
}

.info {
  font-size: 14px;
  padding: 0 5px;
}

</style>

<template>
  
<div class="box">
  
  <div v-if="loading" class="tdx-loading"></div>
  <div class="chart" v-else>
    <div class="col2">
      <div class="col2row" v-for="(ix, index) in x">
        <span class="card" :style="getRectStyle(index)"></span>
        <span class="info">{{ix}}</span>
        <span class="info">{{getValue(row[y[index]])}}</span>
      </div>
    </div>
    <div class="col1" :id="`chart${rn}`"></div>
  </div>

</div>

</template>

<script>

import {
  getRnHex,
  hcDefConf,
  toMoneyFormat
} from "commons/func.js";
  
export default {

  components: {},
  props: [
    "row",
    "x",
    "y",
    "loading"
  ],
  data() {
    return {
      rn: getRnHex(),
      colors: [ "#f26a55", "#fba62e" ]
    };
  },

  methods: {

    getRectStyle: function(index) {

      return {
        "backgroundColor": this.colors[index]
      };
    },

    getValue: function(value) {

      return toMoneyFormat(value, 2);
    },

    draw: function() {

      if(this.row) {

        let { x, y, row } = this;

        let sy = [];
        y.map( (field, index) => {
          sy.push({
            name: x[index],
            y: parseFloat(row[field])
          });
        });

        let conf = {
          chart: {
            type: "pie",
            padding: 0
          },
          colors: this.colors,
          series: [{
            data: sy
          }],
          plotOptions: {
            pie: {
              dataLabels: {
                enabled: false
              }
            }
          },
          tooltip: {
            pointFormat: "<b>{point.name}</b>: {point.percentage:.1f}%"
          }
        };

        new Highcharts.Chart(`chart${this.rn}`, $.extend(true, {}, hcDefConf, conf));
        // new Highcharts.Chart(`chart${this.rn}`, conf);
      }
    }
  },

  updated: function() {

    this.draw();
  },

  mounted: function() {
    this.draw();
  }
}

</script>