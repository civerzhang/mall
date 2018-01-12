<style scoped>
  
.list {
  background-color: #fff;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.list-head {
  display: flex;
  flex: 0 0 36px;
  font-size: 14px;
  color: #b4b4b4;
  padding-left: 20px;
  border-bottom: 1px solid #efefef;
}

.list-body {
  flex: 1 1 auto;
  overflow: auto;
}

.row {
  border-bottom: 1px solid #efefef;
}

.head-item {
  flex-shrink: 0;
  line-height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
}

</style>

<template>
  
<div class="list">
  <div class="list-head">
    <div v-for="col in cols"
      class="head-item" 
      :style = "getColStyle(col)"
      @click = "headItemClick(col)"
    >
      {{col.title}}
      <span v-if="col.field == orderField" :class="getSortClass"></span>
    </div>
  </div>
  <div class="list-body" :id = "`body${rn}`"
    @scroll = "onScroll"
  >
    <div v-if="loading && rows.length == 0" class="tdx-loading"></div>
    <div class="tdx-nodata" v-else-if="!rows || rows.length == 0">无查询数据！</div>
    <mob-card-list
      class = "row"
      :cols = "cols"
      :row = "row"
      :urlParam = "urlParam"
      v-for="row in rows"
      v-else
    />
  </div>
</div>

</template>

<script>

import {
  getRnHex
} from "commons/func.js";

import mobCardList from 'components/mob-card-list.vue';
  
export default {

  components: {
    mobCardList
  },
  props: [
    "cols",
    "order",
    "orderField",
    "rows",
    "sortClick",
    "loading",
    "pageQuery",
    "pageSize",
    "urlParam"
  ],
  data() {
    return {
      rn: getRnHex()
    };
  },

  methods: {

    onScroll: function(e) {

      if(this.loading) {
        return;
      }

      // 如果没有下一页
      if(this.rows.length % this.pageSize != 0) {
        console.log(this.pageSize);
        return;
      }

      let el = document.getElementById(`body${this.rn}`);
      let top = el.scrollTop;
      let h = $(`#body${this.rn}`).height();
      let sh = el.scrollHeight;

      if(top + h > sh - 40) {

        // 这里要触发分页请求
        this.pageQuery();
      }
    },

    getColStyle: function(col) {

      let { width, align } = col;

      if(align == "left") {
        align = "flex-start";
      }
      else if(align == "right") {
        align = "flex-end";
      }

      return {
        minWidth: `${width}px`,
        justifyContent: align || "center",
        width: this.colWidth
      };
    },

    // 排序点击
    headItemClick: function(col) {

      // 该列可以排序
      if(col.sort) {

        let order = this.order;

        if(order == 1) {
          order = 2;
        }
        else if(order == 2) {
          order = 1;
        }
        else {
          order = 2;
        }

        let field = col.field || (col.fields && col.fields[0]);

        this.sortClick(field, order);
      }
    }
  },

  computed: {

    colWidth: function() {

      let len = this.cols.length;
      return `${(1 / len * 100).toFixed(2)}%`;
    },

    getSortClass: function() {

      if(this.order == 1) {
        return "tdx-sort-asc";
      }
      else if(this.order == 2) {
        return "tdx-sort-desc";
      }
    }
  },

  mounted: function() {

  },

  updated: function() {
    // console.log(`${this.order}|${this.orderField}`);
  }
}

</script>