<template>
  <div class="swiper-container">
      <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(data,index) in listImgC" :style="{backgroundImage: 'url(' + 'http://120.27.21.136:2798/'+data.img_url +')'}" :key="index"></div>
      </div>
  </div>
</template>


<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.css';
    export default {
        name:'Banner',
        props:['listImgC'],
        mounted(){
            var swiper = new Swiper('.swiper-container',{
                loop:true,
                speed:2000,
                // uniqueNavElements: false
                // autoplay:true,
                observer:true,
                // observeParents:true
                // onTouchEnd:function(){
                //     swiper.startAutoplay()
                // }
            })
        },
        created(){
            // console.log(this.listImgC)
        },
        updated(){
            // console.log(this.listImgC)
        }
    }
</script>

<style scoped>
    .swiper-container {
        width: 6.79rem;
        height: 4.96rem;
        /* padding-left: 1.85rem; */
        /* padding-right: 2.16rem; */
    }
    .slide-wrapper {
        width: 100%;
        height: 100%;
    }
    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 100%;
        height: 100%

    }
    .swipe-slide img{
        width: 100%;
        height: 100%;
    }
</style>

