<template>
  <div id="mock">
    <div class="layout">
      <div class="nav">
        <span class="back" @click="getBack">
          <img src="../assets/close.png" />
        </span>
        <span class="title">动态相册</span>
      </div>
      <div class="swiper-container">
        <div class="swiper-wrapper" ref="mySwiper">
          <div class="swiper-slide" v-for="(img,index) in listImg" :key="index" :style="{backgroundImage:'url(' + 'http://120.78.69.178:2902/' + img + ')'}"></div>
        </div>
      </div>
      <div class="tags">
        <div class="idx">{{name}} {{startIndex}}/{{tmplength}}</div>
        <div class="aidx">全部{{aidx}}/{{total}}</div>
        <ul class="flx">
          <li v-for="(item,index) in items" :key="index" class="tag" @click="changeIndex(item,index)" :class="{active: item.start < idx && idx <=item.end}">{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/idangerous.swiper.css";
export default {
  name: "MockGallery",
  data: function() {
    return {
      listImgs: [],
      listImg: [],
      activeIndex: 0,
      tags: [],
      idx: 1,
      tagName: "",
      total: 0,
      items: [],
      name: "",
      tmplength: 1,
      startIndex: 1,
      swiper: null
    };
  },
  computed: {
    aidx: function() {
      return this.idx;
    }
  },
  //   computed:{
  //       listImg:function(){
  //           return this.listImgs[this.activeIndex].data
  //       }
  //   },
  methods: {
    getBack() {
      this.$router.go(-1);
    },
    changeIndex(item, index) {
      this.swiper.slideTo(item.start, 1000);
      // this.name = item.name
      // this.tmplength = item.length
      // this.tagName = ta
      // this.idx = 1
      // this.activeIndex = index;
      // this.listImg = this.listImgs[this.activeIndex].data;
    }
  },
  created() {
    this.$http
      .get(
        "http://120.78.69.178:2902/user/img/get?project_id=" +
          this.$route.query.id
      )
      .then(res => {
        if (res.data.code != 200) {
          return;
        }

        var self = this;
        this.tags = res.data.data.map(ele => {
          return ele.name;
        });
        this.tagName = this.tags[0];
        let tempImgList = res.data.data;
        tempImgList.forEach(function(ele, index) {
          ele.data.forEach(function(element, idx) {
            self.listImg.push(element.img_url);
          });
        });
        res.data.data.forEach(function(ele) {
          let tmp = {};
          tmp.name = ele.name;
          tmp.length = ele.data.length;
          self.items.push(tmp);
        });
        this.items.forEach(function(e, index) {
          e.start = 0;
          e.end = 0;
          for (let i = 0; i < index + 1; i++) {
            e.end += self.items[i].length;
          }
          if (index > 0) {
            e.start = self.items[index - 1].end;
          }
        });

        this.name = this.items[0].name;
        this.tmplength = this.items[0].length;

        // this.listImgs.forEach(function(ele,index){
        //     self.total += ele.data.length
        // })
        this.total = this.listImg.length;
        // this.listImg = this.listImgs[this.activeIndex].data;
      });
  },
  mounted() {
    this.swiper = new Swiper(".swiper-container", {
      observeParents: true,
      observer: true,
      autoplay: false,
      onSlideChangeEnd: () => {
        this.idx = this.swiper.activeIndex + 1;
        let res = this.items.filter(ele => {
          return ele.start < this.idx && this.idx <= ele.end;
        });
        this.name = res[0].name;
        this.tmplength = res[0].length;
        this.startIndex = this.idx - res[0].start;
      }
    });

    // this.swiper.on("slideChange", () => {
    //   this.idx = this.swiper.activeIndex + 1;
    //   let res = this.items.filter(ele => {
    //     return ele.start < this.idx && this.idx <= ele.end;
    //   });
    //   this.name = res[0].name;
    //   this.tmplength = res[0].length;
    //   this.startIndex = this.idx - res[0].start;
    // });
  }
};
</script>

<style scoped>
.layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1);
}

.swiper-container {
  transition-timing-function: cubic-bezier(0, 0, 1, 1);
  position: absolute;
  top: 50%;
  /* left: 50%; */
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  width: 100%;
  height: 4.96rem;
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
.swiper-slide img {
  width: 100%;
  height: 100%;
}

.nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  align-items: center;
}

.back {
  position: absolute;
  right: 0.5rem;
  top: 0;
  width: 1rem;
  padding-left: 10px;
  color: aliceblue;
  font-size: 32px;
}
.back img {
  width: 100%;
}

.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: aliceblue;
  font-size: 14px;
}
.tags {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 1rem;
}
.flx {
  display: flex;
  width: 100%;
  /* background-color: aliceblue; */
  font-size: 12px;
}
.tag {
  padding: 0.1rem;
  background-color: white;
  border: 1px solid #40a9ff;
  margin-right: 5px;
  border-radius: 1px;
}
.idx {
  position: absolute;
  left: 0;
  top: -50%;
  font-size: 12px;
  transform: translate(0, -50%);
  margin-right: 0.2rem;
  color: aliceblue;
}
.aidx {
  position: absolute;
  right: 0;
  top: -50%;
  font-size: 12px;
  transform: translate(0, -50%);
  margin-right: 0.2rem;
  color: aliceblue;
}

.active {
  background-color: #40a9ff;
  color: white;
}
</style>
