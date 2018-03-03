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

          yAxis: {
            tickPositioner: function() {
              // this.dataMax = this.dataMax*1000;
              // this.dataMin = this.dataMin*1000;
              let myPositions = [];
              if(this.dataMax==this.dataMin){
                return [this.dataMax-this.dataMax,this.dataMax,this.dataMax+this.dataMax];
              }
              
              let increment = (this.dataMax - this.dataMin) / 4;
              // increment = increment.toFixed(3);
              let tick = this.dataMin-increment;
              for (tick; tick - increment*2 <= this.dataMax; tick += increment) {
                myPositions.push(tick);
              }
              return myPositions.map(x=>x.toFixed(4));
            },
          },

          plotOptions: {
              series: {
                  events: {
                      legendItemClick: function () {
                          return false;
                      }
                  }
              }
          },
          
          series: [
            {
              data: y,
              name: hcLegendLabel[this.y]
            }
          ]
        };

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