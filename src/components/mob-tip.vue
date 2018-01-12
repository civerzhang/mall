<style scoped>
  
.box {
  height: 40px;
  background: #FDE9E2;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info {
  font-size: 14px;
  color: #E37F7F;
}

.img {
  height: 16px;
  width: 16px;
  background: url(../res/cross.png) center center no-repeat;
  background-size: 100% 100%;
}

</style>

<template>
  
<div class="box" v-if="!hide">
  <span class="info">{{info}}</span>
  <span class="img" @click="clickClose"></span>
</div>

</template>

<script>
  
export default {

  components: {},
  props: [
    "info"
  ],
  data() {
    return {
      hide: false
    };
  },
  methods: {

    clickClose: function() {

      this.hide = true;
    }
  }
}

</script>