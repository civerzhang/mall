<style scoped>
  
.bar {
  height: 50px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
}

.bar-left {
  display: flex;
  align-items: center;
}

.sp {
  display: inline-block;
  width: 5px;
  height: 17px;
  background-color: #4696F5;
}

.title {
  font-size: 16px;
  color: #505050;
  line-height: 22px;
  margin-left: 10px;
}

.subtitle {
  font-size: 14px;
  color: #B4B4B4;
  line-height: 20px;
  margin-left: 15px;
}

.bar-more-title {
  font-size: 14px;
  color: #B4B4B4;
  margin-right: 5px;
}

</style>

<template>

<div class="bar" @click="jumpPage">
  <div class="bar-left">
    <span class="sp"></span>
    <span class="title">{{title}}</span>
    <span class="subtitle">{{subTitle}}</span>
  </div>
  <div class="bar-left">
    <span class="bar-more-title">{{moreText}}</span>
    <div class="tdx-more" v-if="url"></div>
  </div>
</div>

</template>

<script>

import {
  tdxOpenUrl
} from "commons/req.js";
  
export default {

  components: {},
  props: [
    "title",
    "sutTitle",
    "url",
    "moreText"
  ],
  data() {
    return {};
  },

  methods: {

    jumpPage: function(e) {
      e.stopPropagation();
      if(this.url) {
        tdxOpenUrl(this.url);
      }
    }
  }
}

</script>