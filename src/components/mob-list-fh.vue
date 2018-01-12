<style scoped>
  
.list {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.head {
  flex: 0 0 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 0 20px;
}

.body {
  flex: 1 1 auto;
  overflow: auto;
}

.tr {
  display: flex;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #ddd;
  height: 50px;
}

.col0,
.col1 {
  flex: 0 0 100px;
}

.col2 {
  flex: 1 1 auto;
}

</style>

<template>
  
<div class="list">
  <div class="head">
    <span v-for="(col, index) in cols" :class="`col${index}`">{{col.title}}</span>
  </div>
  <div class="body" :id="`body${rn}`">
    <div v-if="loading && rows.length == 0" class="tdx-loading"></div>
    <div v-else-if="rows.length == 0" class="tdx-nodata">暂无查询数据！</div>
    <div v-else v-for="row in rows" class="tr">
      <span v-for="(col, index) in cols" :class="`col${index}`">{{row[col.field]}}</span>
    </div>
  </div>
</div>

</template>

<script>

import {
  getRnHex
} from "commons/func.js";
  
export default {

  components: {},
  props: [
    "cols",
    "rows",
    "loading",
    "hasNextPage",
    "page"
  ],
  data() {

    return {
      rn: getRnHex()
    };
  },

  methods: {

    bodyScroll: function(e) {

      let { scrollTop, scrollHeight, clientHeight } = e.target;
      let bottom = 30;
      if(scrollTop + bottom + clientHeight > scrollHeight) {
        this.page();
      }
    }
  },

  mounted: function() {

    let that = this;
    let scrollWaiting = false;
    let timer;

    $(`#body${this.rn}`).unbind("scroll").bind("scroll", function(e) {

      e.stopPropagation();
      e.preventDefault();

      if(!that.hasNextPage || that.loading) {
        return;
      }

      if(scrollWaiting) {
        return;
      }

      scrollWaiting = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        that.bodyScroll(e);
      }, 200); 

      setTimeout(() => {
        scrollWaiting = false;
      }, 100);

      that.bodyScroll(e);
    });
  },

  beforeDestroy: function() {

    $(`#body${this.rn}`).unbind("scroll");
  }
}

</script>