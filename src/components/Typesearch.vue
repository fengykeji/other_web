<template>
  <div id="typesearchWrapper">
    <p class="title">本楼盘其他户型</p>
    <div id="scroll">
      <div class="house_type imgwrapper">
        <div v-for="(item,index) in items" :key="index" class="list" @click="check(item)">
          <img class='otherImg' v-bind:src="'http://120.78.69.178:2902/'+item.img_url" v-if='item.img_url' />
          <img class='otherImg' v-else src="../assets/default_3@2x.jpg" />
          <div>
            <span class="house_named">{{item.house_type_name}}</span>
            <span class="house_named">{{item.property_area_min}}㎡</span>
          </div>
          <div class="house_named">{{item.house_type}}</div>
          <div>
            <font style="color:#1B98FF" class="house_named">{{item.sale_state}}</font>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Typesearch",
  props: [],
  data: function() {
    return {
      items: [],
      dynamicWidth: "",
      house_type: [],
      id: ""
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    let house_type = sessionStorage.getItem('house_type');
    this.house_type = JSON.parse(house_type);
    this.showOtherHouse();
  },
  methods: {
    showOtherHouse() {
      this.items = this.house_type;
      let temp = this.items;
      let arr = [];
      for (let item of this.items) {
        if (item.id == this.id) {
        } else {
          arr.push(item);
        }
      }
      this.items = arr;
    },
    check(item) {
      this.$router.push({ name: "estatedetail", query: { id: item.id } });
    }
  },
  created() {}
};
</script>


<style scoped>
/* #typesearchWrapper {
} */
div#scroll {
  width: 100%;
  overflow-x: auto;
  height: 300px;
}
.house_type_content div p {
  float: left;
  width: 4.6rem;
  overflow: hidden;
  font-size: 12px;
  text-align: left;
  line-height: 1rem;
}
.house_type {
  margin: 0 0.2rem;
  /* float: left; */
  /* width: 100%; */
}
.house_named {
  font-size: 0.26rem;
}
.imgwrapper {
  display: -webkit-box;
}
.otherImg {
  width: 3rem;
  height: 3rem;
}
.title {
  font-family: SourceHanSansCN-Regular;
  font-size: 0.4rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.4rem;
  letter-spacing: 0px;
  color: #333333;
  padding: 0.3rem 0;
  padding-left: 0.3rem;
}
#wrapper {
  margin-top: 0.12rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  padding-top: 0.42rem;
  /* width: 1120px; */
}

.list {
  text-align: center;
  margin-right: 0.5rem;
  font-size: 0.46rem;
}
div#image {
  width: 100%;
  padding-top: 100%;
  background-size: contain;
  margin-bottom: 0.64rem;
}
span.typeL {
  font-family: SourceHanSansCN-Regular;
  font-size: 0.001rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #565656;
}
#type {
  font-size: 0.36rem;
  /* position: relative; */
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
}
span.typeR {
  /* position: absolute; */
  /* top: -0.15rem; */
  /* right: 0.2rem; */
  font-family: SourceHanSansCN-Regular;
  font-size: 0.001rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #565656;
}
.type {
  margin-top: 0.38rem;
  font-size: 0.36px;
  color: #565656;
  margin-bottom: 0.36rem;
}
#isOnSale {
  font-family: SourceHanSansCN-Regular;
  font-size: 0.36rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #1b98ff;
}
</style>

