<template>
  <div>
    <ad></ad>
    <div class="uniqueGetBack" @click="getBack">
      <span class="back"></span>
      <span class='back_info'>户型详情</span>
    </div>
    <preview />
    <typesearch />
  </div>
</template>

<script>
import Preview from "./Preview";
import Ad from "./Ad";
import Typesearch from "./Typesearch";

export default {
  name: "App",
  components: { Preview, Ad, Typesearch },
  methods:{
    getBack(){
      // let id = this.$route.query.id
      this.$router.go(-1)
    }
  }
};
</script>
<style scoped>
.uniqueGetBack{
  margin-top: 64px;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
  position: relative;
  font-size: 18px;
  border-bottom: 0.1px solid #eee
  /* font-size: 24px; */
  /* padding-left: 0.2rem; */
  /* font-weight: bold; */
  /* text-align: left */
}
.back_info{
  font-size: 14px;
  padding:2px 0;
}
.back{
  position: absolute;
  left: 0;
  top: 0;
  width: 0.6rem;
  height: 0.6rem;
  margin-left: 0.1rem;
  /* margin-top: 0.5rem; */
  background-image: url('../assets/back.png');
  background-size: cover
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*::before,
*::after {
  box-sizing: border-box;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
body {
  padding-top: 0.46rem;
}
</style>