<style scoped>
  
.box {
  height: 131px;
  background-image: linear-gradient(0deg, #4D91FF 0%, #2E6BB1 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info {
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.5);
}

.btn {
  margin-top: 15px;
  height: 36px;
  width: 120px;
  border: 1px solid #FFFFFF;
  border-radius: 6px;
  line-height: 36px;
  text-align: center;
  font-size: 16px;
  color: #fff;
}

</style>

<template>
  
<div class="box">
  <span class="info">{{info}}</span>
  <div class="btn" @click="btnClick">登录</div>
</div>

</template>

<script>
  
export default {

  components: {},

  props: [
    "info",
    "btnClick"
  ],

  data() {
    return {};
  }
}

</script>