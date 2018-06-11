<template>
  <div>
  <div id="detailsWrapper">
     <div id="basicInfo">
       <p id="type" >{{detailC.house_type_name}}</p>
       <p id="area">建筑面积：{{detailC.property_area_min + "m"}}<sup>2</sup>-{{detailC.property_area_max + "m"}}<sup>2</sup></p>
       <!-- <p id="distribution">户型分布：</p> -->
     </div>
     <div id="sellPoint">
         <p id="title">户型卖点:</p>
         <p id="sellPointDetail">{{detailC.sell_point}}</p>
     </div>
  </div>
     <div id="split"></div>
  </div>
</template>


<script>
export default {
  name: "Detail",
  props: ["detailC"]
  // props:{
  //     detailC:{
  //         type:Object,
  //         default:function(){
  //             return {
  //                 "house_type_name":'',

  //             }
  //         }
  //     }
  // },
};
</script>


<style scoped>
#detailsWrapper {
  padding-top: 0.32rem;
  padding-left: 0.28rem;
  padding-bottom: 0.69rem;
}
sup {
  /* font-size: 0.12rem; */
  height: 0.12rem;
  width: 0.12rem;
}
#type {
  /* width: 0.63rem; */
  /* height: 0.35rem; */
  font-family: SourceHanSansCN-Regular;
  font-weight: normal;
  font-stretch: normal;
  font-size: 0.4rem;
  /* font-size: 18px; */
  /* line-height: 0px; */
  letter-spacing: 0px;
  color: #333333;
  margin-bottom: 0.41rem;
  /* line-height: 0.35rem; */
}
#area {
  /* height: 0.35rem; */
  font-family: SourceHanSansCN-Regular;
  font-size: 0.36rem;
  /* font-size: 16px; */
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 0.48rem; */
  letter-spacing: 0.02rem;
  color: #737373;
  margin-bottom: 0.38rem;
}
p#distribution {
  /* height: 0.34rem; */
  font-family: SourceHanSansCN-Regular;
  /* font-size: 16px; */
  font-size: 0.36rem;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 0.48rem; */
  letter-spacing: 0.12rem;
  color: #737373;
  margin-bottom: 0.64rem;
}
#title {
  /* width: 1.81rem; */
  /* height: 0.43rem; */
  font-family: SourceHanSansCN-Regular;
  /* font-size: 20px; */
  font-size: 0.46rem;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 0px; */
  /* letter-spacing: 0px; */
  color: #333333;
  margin-bottom: 0.38rem;
}
#title::before {
  content: "";
  display: block;
  clear: both;
}
#sellPointDetail {
  /* font-size: 18px; */
  font-size: 0.4rem;
  font-family: SourceHanSansCN-Regular;
  font-weight: normal;
  font-stretch: normal;
  /* line-height: 0px; */
  letter-spacing: 0px;
  color: #333333;
}
#split {
  height: 0.24rem;
  background-color: #f0f0f0;
}
</style>

