<style scoped>
  
</style>

<template>

<div class="tdx-404">

  <mob-image-slider 
    :images = "images"
    :params = "{minMoveDistance: 50, autoPlay: true}"
    style = "height: 150px;"
  />
  <div class="tdx-404-img"></div>
  <span>正在上新，敬请期待...</span>
</div>
  
</template>

<script>
  
import mobImageSlider from "components/mob-image-slider.vue";

const images = [
  "./res/commercial01.png"
];

export default {

  components: {
    mobImageSlider
  },
  data() {
    return {};
  },

  computed: {

    images: function() {
      return images;
    }
  }
}

</script>