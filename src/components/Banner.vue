<template>
 
</template>


<script>

export default {
  name: "Banner",
  props: ["listImgC", "tags"],
  data() {
    return {
      mySwiper: null,
      current: {}
    };
  },
  watch: {
    listImgC(val) {
      setTimeout(() => {
        this.initSwiper();
      }, 1000);
    }
  },
  mounted() {
    this.initSwiper();
  },
  methods: {
    initSwiper() {
      this.mySwiper = new Swiper(".swiper-container", {
        onSlidePrev: swiper => {
          this.current = this.listImgC[this.mySwiper.activeIndex];
        },
        onSlideNext: swiper => {
          this.current = this.listImgC[this.mySwiper.activeIndex];
        }
      });
    },
    changeTag(tag) {
      console.log(tag.index);
      this.mySwiper.swipeTo(1, 0 ,false);
      // this.current = this.listImgC[tag.index];
    }
  }
};
</script>

<style scoped>

</style>

