<template>
  <div id="typesearchWrapper">
    <p class="title">本楼盘其他户型</p>
    <div id="scroll">
      <ul id="wrapper" :style="{width:dynamicWidth}">
        <li v-for="(item,index) in items" :key="index" class="list" @click="check(item)">
          <div id="image" :style="{backgroundImage: 'url(' + 'http://120.27.21.136:2798/'+item.img_url +')'}"></div>
          <div id="info">
            <p id="type">
              <span class="typeL">{{item.house_type_name}}</span>
              <!-- <span class="typeR">{{item.property_area_min}}m
                <sup>2</sup>-{{item.property_area_max}}m
                <sup>2</sup>
              </span> -->
              <span class="typeR">{{item.property_area_min}}㎡-{{item.property_area_max}}㎡
              </span>
            </p>
            <p class="type">{{item.house_type}}</p>
            <p id="isOnSale">{{item.sale_state}}</p>
          </div>
        </li>
      </ul>
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
      dynamicWidth: ""
    };
  },
  methods: {
    check(item) {
      // console.log(item);
      this.$router.push({name:'estatedetail',query:{id:item.id}})
    }
  },
  created() {
    var self = this;
    var id = this.$route.query.id;
    this.$http
      .get("http://120.27.21.136:2798/user/houseType/list?project_id=" + id)
      .then(function(response) {
        // console.log(response);
        self.items = response.data.data;
        // console.log(self.items);
        self.dynamicWidth =
          (self.items.length * 5.353 + 0.3) *
            document.documentElement.clientWidth /
            10.8 +
          "px";
      });
  },
  watch: {
    $route(to, from) {
      var self = this;
      var id = this.$route.query.id;
      this.$http
        .get("http://120.27.21.136:2798/user/houseType/list?project_id=" + id)
        .then(function(response) {
          // console.log(response);
          self.items = response.data.data;
          // console.log(self.items);
          self.dynamicWidth =
            (self.items.length * 5.353 + 0.3) *
              document.documentElement.clientWidth /
              10.8 +
            "px";
        });
    }
  }
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
p.title {
  font-size: 0.46rem;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.46rem;
  font-weight: normal;
  font-stretch: normal;
  line-height: 0.46rem;
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

li.list {
  width: 5.153rem;
  height: 5.153rem;
  margin-right: 0.1rem;
  float: left;
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
p#type {
  font-size: 0.36rem;
  /* position: relative; */
  display: flex;
  justify-content: space-between
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
p.type {
  margin-top: 0.38rem;
  font-size: 0.36px;
  color: #565656;
  margin-bottom: 0.36rem;
}
p#isOnSale {
  font-family: SourceHanSansCN-Regular;
  font-size: 0.36rem;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #1b98ff;
}
</style>

