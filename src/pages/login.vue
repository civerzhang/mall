<style scoped></style>

<template>
  
<div>
  <mob-not-login 
    info = "安心理财，就在川财~登录后查看您的理财资产"
    :btnClick = "loginClick"
  />
</div>

</template>

<script>

import mobNotLogin from "components/mob-not-login.vue";
  
export default {

  components: {
    mobNotLogin
  },
  props: [],
  data() {

    return {};
  },
  methods: {

    loginClick: function() {

      __tdxLoginBox();
    }
  }
}

</script>