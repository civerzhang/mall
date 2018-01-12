<style scoped>
  
.box {
  height: 50px;
  display: flex;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
  text-align: center;
}

</style>

<template>
  
<div class="box">
  <span v-for="(btn, index) in btns" 
    class="btn"
    @click="btnClick(index)"
    :style="btn.style">{{btn.text}}</span>
</div>

</template>

<script>
  
export default {

  components: {},
  props: [
    "btns",
    "btnClick"
  ],
  data() {
    return {};
  }
}

</script>