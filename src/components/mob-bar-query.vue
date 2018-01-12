<style scoped>
  
.bar {
  background-color: #fff;
  display: flex;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #efefef;
}

.bar-item {
  flex-shrink: 0;
  width: 60px;
  font-size: 16px;
  color: #505050;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar-item-sel {
  height: 25px;
  border-radius: 12px;
  background-color: #2e6bb1;
  color: #fff;
}

</style>

<template>
  
<div class="bar">
  <span v-for="(item, index) in items"
    class="bar-item"
    :class = "index == curSel ? 'bar-item-sel' : ''"
    @click = "barItemClick(index)"
  >{{item}}</span>
</div>

</template>

<script>
  
export default {

  components: {},
  props: [
    "items",
    "curSel",
    "queryItemClick"
  ],
  data() {

    return {};
  },

  methods: {

    barItemClick: function(index) {

      if(index != this.curSel) {

        this.queryItemClick(index);
      }
    }
  }
}

</script>