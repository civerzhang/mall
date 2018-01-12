<style scoped>
  
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
}

.img {
  height: 48px;
  width: 48px;
}

.info {
  font-size: 16px;
  color: #B4B4B4;
  line-height: 22px;
}

</style>

<template>
  
<div class="box">
  
  <img class="img" :src="img" />
  <span class="info">{{info}}</span>

</div>

</template>

<script>
  
export default {

  data() {

    return {};
  },

  props: [
    "img",
    "info"
  ]
}

</script>