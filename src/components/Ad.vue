<template>
  <div id="adWrapper" v-if="show">
      <div id="close" @click="close"></div>
      <div id="logo"></div>
      <div id="slogen">
          <p class="main">云算渠道</p>
          <p class="secondary">房产渠道专业平台</p>
      </div>
      <div id="download"> <a href="http://itunes.apple.com/app/id1371978352?mt=8">下载APP</a></div>
  </div>
</template>

<script>
export default {
  name: "Ad",
  data: function() {
    return {
      show: true
    };
  },
  methods: {
    close: function() {
      this.show = false;
    }
  }
};
</script>

<style scoped>
#adWrapper {
  background: linear-gradient(86deg, #1c97ff 0%, #08b6fb 99%),
  linear-gradient(#1b98ff, #1b98ff);
  height: 1.6rem;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  display: -webkit-flex;
  align-items: center;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  justify-content: space-between
}
#close {
  width: 0.5rem;
  height: 0.5rem;
  background-image: url('../assets/close.png');
  background-size: cover;
  /* color: #ffffff; */
  /* border: 1px solid red; */
  /* font-size: 0.34rem; */
  /* line-height: 0.34rem; */
  /* text-align: center; */
  margin-right: 0.34rem;
}
#logo {
  width: 1.2rem;
  height: 1.2rem;
  background-color: #ffffff;
  border-radius: 0.05rem;
  border: solid 0.01rem #dcdcdc;
  background-image: url('../assets/logo.png');
  background-size: cover
}
#slogen {
    flex-grow: 1;
    padding-left: 0.3rem;
  width: 4.26rem;
  height: 0.84rem;
}
div#download {
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
#download  a{
  width: 2rem;
  height: 0.8rem;
  font-size: 0.36rem;
  /* font-size: 12px; */
  line-height: 0.8rem;
  text-align: center;
  background-color: #ffffff;
  border-radius: 3px;
  color: #1b98ff;
}
p.main {
  /* font-size: ; */
  /* width: 261px; */
  /* height: 0.38rem; */
  font-family: SourceHanSansCN-Regular;
  font-size: 0.4rem;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 0px; */
  letter-spacing: 0.02rem;
  color: #ffffff;
  position: relative;
  top: -0.17rem;
  /* margin-bottom: 0.17rem */
}
p.secondary {
  /* font-size: ; */
  /* width: 426px; */
  /* height: 0.29rem; */
  font-family: SourceHanSansCN-Regular;
  font-size: 0.3rem;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 0px; */
  letter-spacing: 0.01rem;
  color: #ffffff;
}
</style>
