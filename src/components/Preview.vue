<template>
  <div id="wrapper">
    <div class="banner">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(data,index) in listImg" :style="{backgroundImage: 'url(' + 'http://120.78.69.178:2902/'+data.img_url +')'}" :key="index"></div>
        </div>
      </div>
      <div class="tags">
        <ul class="tags-wrapper">
          <li class="tag" v-for="(tag ) in tags" @click="changeTag(tag)" :class="current.tag == tag.name?'active':''" :key="tag.name">
            <span>{{tag.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <detail :detailC="detail"></detail>
  </div>
</template>

<script>
import Banner from "./Banner.vue";
import Pagination from "./Pagination.vue";
import Detail from "./Detail.vue";
import Swiper from "swiper";
import "swiper/dist/idangerous.swiper.css";
export default {
  name: "Preview",
  components: { Pagination, Banner, Detail },
  data: function() {
    return {
      tags: [],
      listImg: [],
      currentIndex: 0,
      detail: {},
      mySwiper: null,
      current: {}
    };
  },
  methods: {
    updateIndex: function(index) {
      this.currentIndex = index;
    },
    initSwiper() {
      this.mySwiper = new Swiper(".swiper-container", {
        onSlidePrev: swiper => {
          this.current = this.listImg[this.mySwiper.activeIndex];
        },
        onSlideNext: swiper => {
          this.current = this.listImg[this.mySwiper.activeIndex];
        }
      });
    },
    changeTag(tag) {
      this.mySwiper.swipeTo(tag.index, 0, false);
      this.current = this.listImg[tag.index];
    }
  },
  created() {
    var self = this;
    let id = this.$route.query.id;
    this.$http
      .get("http://120.78.69.178:2902/user/houseType/detail?id=" + id)
      .then(response => {
        self.detail = response.data.data.baseInfo;
        response.data.data.imgInfo.forEach(element => {
          let tag = {};
          tag.name = element.type;
          tag.index = self.listImg.length;
          self.tags.push(tag);
          for (let img of element.list) {
            img.tag = element.type;
            self.listImg.push(img);
          }
        });
        this.current = this.listImg[0];
        this.$nextTick(() => {
          this.initSwiper();
        });
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
        .get("http://120.78.69.178:2902/user/houseType/detail?id=" + id)
        .then(function(response) {
          console.log("-----------------------------------");
          console.log(response.data.data);
          self.detail = response.data.data.baseInfo;
          response.data.data.imgInfo.forEach(element => {
            self.tags.push(element.type);
            self.listImg.push(element.list);
          });
        });
    }
  }
};
</script>
<style scoped>
#banner {
  /* width: 6.79rem; */
  /* height: 4.96rem; */
}
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
  height: 100%;
}
.swipe-slide img {
  width: 100%;
  height: 100%;
}

.tags {
  margin-top: 10px;
}
.tags .tags-wrapper {
  padding-left: 0.28rem;
  padding-right: 0.28rem;
  display: flex;
  justify-content: space-around;
}
.tags .tags-wrapper .tag {
  /* width: 1.5rem; */
  /* height: 0.8rem; */
  font-size: 12px;
  text-align: center;
  border: 1px solid #dcdfe6;
  color: #606266;
  border-radius: 4px;
  padding: 3px 5px;
}

.tags .tags-wrapper .tag.active {
  border: 1px solid #409eff;
  background: #409eff;
  color: #fff;
}
</style>
