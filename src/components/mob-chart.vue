<style scoped>
  
.box {
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.chart,
.tdx-loading {
  flex: 1 1 auto;
}

.bar {
  flex: 0 0 36px;
  display: flex;
  border-top: 1px solid #efefef;
}

.bar-item {
  flex: 1 1 auto;
  background-color: #fafafa;
  color: #b4b4b4;
  font-size: 14px;
  line-height: 36px;
  text-align: center;
}

.bar-item-sel {
  background-color: #fff;
  color: #2e6bb1;
}

</style>

<template>
  
<div class="box">
  
  <div v-if="loading" class="tdx-loading"></div>
  <div class="chart" :id="`chart${rn}`" v-else></div>

  <div class="bar">
    <span v-for="(item, index) in items"
      class = "bar-item"
      :class = "index == curSel ? 'bar-item-sel' : ''"
      @click = "barClick(index)"
    >{{item}}</span>
  </div>

</div>

</template>

<script>

import {
  getRnHex,
  hcDefConf
} from "commons/func.js";

import {
  hcLegendLabel
} from "commons/constant.js";
  
export default {

  components: {},
  props: [
    "items",
    "barClick",
    "rows",
    "x",
    "y",
    "loading",
    "curSel"
  ],
  data() {
    return {
      rn: getRnHex()
    };
  },
  methods: {

    drawChart: function() {

      if(this.rows && this.rows[0]) {

        let cw = $(`#chart${this.rn}`).width();
        let ch = $(`#chart${this.rn}`).height();
        let x = [], y = [];

        this.rows.map( d => {

          x.push(d[this.x]);
          y.push(parseFloat(d[this.y]));
        });

        let conf = {

          labels: {

            items: [
              {
                html: this.rows[0].date,
                style: {
                  top: `${ch - 26}`,
                  left: "0"
                }
              },
              {
                html: this.rows[this.rows.length - 1].date,
                style: {
                  top: `${ch - 26}`,
                  left: `${cw - 110}`
                }
              }
            ]
          },

          xAxis: {
            categories: x,
            labels: {
              step: this.rows.length - 1
            }
          },

          series: [
            {
              data: y,
              name: hcLegendLabel[this.y]
            }
          ]
        };

        debugger;
        new Highcharts.Chart(`chart${this.rn}`, $.extend(true, {}, hcDefConf, conf));
      }
    }
  },

  updated: function() {
    this.drawChart();
  },

  mounted: function() {
    this.drawChart();
  }
}

</script>