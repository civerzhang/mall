<style scoped>
  
.nav {
  height: 86px;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow-x: auto;
}

.nav-item {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  line-height: 17px;
  text-align: center;
  margin: 0 0.5rem;
}

.img {
  width: 2.5rem;
  height: 2.5rem;
  background-size: 100% 100%;
}

</style>

<template>
  
<div class="nav">
  <div class="nav-item" v-for="item in items" @click="itemClick(item)">
    <div class="img">
      <img :src="item.img" style="width:100%;height:100%;">
    </div>
    <span>{{item.title}}</span>
  </div>
</div>

</template>

<script>

/*

  [
    {
      title: "基金",
      img: "res/nav-jj.png",
      urlParam: {
        OpenName: "基金",
        OpenUrl: "jjlc.html"
      }
    },
    ...
  ]

*/

import {
  tdxOpenUrl
} from "commons/req.js";
  
export default {

  props: [
    "items"
  ],
  data() {
    return {};
  },
  methods: {
    itemClick: function(item) {
      if(item.urlParam) {
        tdxOpenUrl(item.urlParam);
      }
    }
  }
}

</script>