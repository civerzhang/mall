<style scoped>
  
.more {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}

</style>

<template>
  
<div class="more" @click="jumpUrl">
  {{title}}
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
    "urlParam"
  ],
  data() {
    return {};
  },
  methods: {

    // 点击跳转
    jumpUrl: function() {

      if(this.urlParam) {

        tdxOpenUrl(this.urlParam);
      }
    }
  }
}

</script>