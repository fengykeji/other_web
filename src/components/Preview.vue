<template>
    <div id="wrapper">
        <banner :listImgC="result" id="banner"></banner>
        <pagination :names="tags" :indexC="currentIndex" @indexUpdate="updateIndex"></pagination>
        <detail :detailC="detail"></detail>
    </div>
</template>

<script>
import Banner from "./Banner.vue";
import Pagination from "./Pagination.vue";
import Detail from "./Detail.vue";

export default {
  name: "Preview",
  components: { Pagination, Banner, Detail },
  data: function() {
    return {
      tags: [],
      listImg: [],
      currentIndex: 0,
      detail: {}
    };
  },
  computed: {
    result: function() {
      return this.listImg[this.currentIndex];
    }
  },
  methods: {
    updateIndex: function(index) {
      this.currentIndex = index;
    }
  },
  created() {
    var self = this;
    let id = this.$route.query.id;
    // console.log(this.$route.query)
    this.$http
      .get("http://120.27.21.136:2798/user/houseType/detail?id=" + id)
      .then(function(response) {
        // console.log('!@#$%^&*&^%@#$%^&*((*&%^&*')
        //   console.log(response.data.data.baseInfo)
        self.detail = response.data.data.baseInfo;
        let res = [];
        response.data.data.imgInfo.forEach(element => {
          // self.tags.push(element.type_name)
          self.tags.push(element.type);
          res.push(element.list);
          self.listImg.push(element.list);
        });
        // console.log('look!!!!!!!!!!!!!!!')
        // console.log(self.listImg)
      });
  },
  watch: {
    $route(to, from) {
      this.tags = [];
      this.listImg = [];
      this.currentIndex = 0;
      var self = this;
      let id = this.$route.query.id;
      this.$http
        .get("http://120.27.21.136:2798/user/houseType/detail?id=" + id)
        .then(function(response) {
          console.log('-----------------------------------')
          console.log(response.data.data)
          self.detail = response.data.data.baseInfo;
          // let res = [];
          response.data.data.imgInfo.forEach(element => {
            self.tags.push(element.type);
            // res.push(element.list);
            self.listImg.push(element.list);
          });
        });
    }
  }
};
</script>
<style scoped>
#banner {
  width: 6.79rem;
  height: 4.96rem;
}
</style>
