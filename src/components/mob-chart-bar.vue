<style scoped>
  
.box {
  display: flex;
}

.chart {
  flex: 1 1 auto;
}

</style>

<template>
  
<div class="box">
  <div v-if="loading" class="tdx-loading"></div>
  <div class="chart" :id="`chart${rn}`" v-else></div>
</div>

</template>

<script>

import {
  hcLegendLabel
} from "commons/constant.js";

import {
  getRnHex,
  hcDefConf2
} from "commons/func.js";
  
export default {

  components: {},
  props: [
    "rows",
    "x",
    "y",
    "loading"
  ],
  data() {
    return {
      rn: getRnHex()
    };
  },
  methods: {

    drawChart: function() {
      
      if(this.rows && this.rows.length > 0) {

        let x = [];
        let s = [];
        this.rows.map(d => {

          x.push(d[this.x]);
          this.y.map((field, index) => {

            if(!s[index]) {
              s[index] = {
                name: hcLegendLabel[field],
                data: []
              };

              if(index == 0) {
                s[index].type = "line";
                s[index].yAxis = 1;
              }
              else {
                s[index].tooltip = {
                  valueSuffix: "%"
                }
              }
            }

            s[index].data.push(parseFloat(d[field] || 0));
          });
        });

        let conf = {

          chart: {
            type: "column"
          },
          xAxis: {
            categories: x,
            labels: {
              enabled: true,
              align: "center"
            }
          },
          yAxis: [
            {
              tickAmount: 5,
              labels: {
                formatter: function() {
                  return `${this.value}%`;
                }
              }
            },
            {
              tickAmount: 5,
              labels: {
                formatter: function() {
                  return `${(this.value / 100000000).toFixed(1)}亿`;
                }
              }
            }
          ],
          series: s
        };

        new Highcharts.Chart(`chart${this.rn}`, $.extend(true, {}, hcDefConf2, conf));
      }
    }
  },

  updated: function() {

    this.drawChart();
    // console.log(`mobChartBar: ${this.rows}`);
  }
}

</script>