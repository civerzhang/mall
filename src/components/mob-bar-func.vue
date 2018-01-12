<style scoped>
  
.bar {
  height: 44px;
  display: flex;
  align-items: center;
  /*width: 100%;*/
  background-color: #fff;
  padding: 0 10px;
}

.bar-item {
  flex-shrink: 0;
  font-size: 15px;
  line-height: 44px;
  text-align: center;
  color: #505050;
  margin: 0 7px;
}

.bar-item-sel {
  font-size: 17px;
  color: #2e6bb1;
  border-bottom: 3px solid #2e6bb1;
}

</style>

<template>
  
<div class="bar">
  <span class="bar-item"
    :class = "curSel == index ? 'bar-item-sel' : ''"
    v-for="(item, index) in funcList"
    @click = "funcItemClick(index)"
  >{{item}}</span>
</div>

</template>

<script>
  
export default {

  components: {},
  props: [
    "funcList",
    "curSel",
    "funcItemClick"
  ],
  data() {
    return {};
  }
}

</script>