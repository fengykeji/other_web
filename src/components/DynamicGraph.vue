<template>
  <div class="mock">
    <div class="layout" @click="getBack">
      <div class="nav">
        <span class="title">动态相册</span>
      </div>
      <div class='houseImg'>
        <div class='imgList'>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" @click.stop='detailno' v-for="(data,index) in listImg" :style="{backgroundImage: 'url(' + base+data.img_url +')'}" :key="index"></div>
            </div>
          </div>
        </div>
        <div class="tags">
          <div>
            <div class="aidx">全部 {{img}}/{{total}}</div>
            <span class="tag" v-for="(tag ) in tags" @click.stop="changeTag(tag)" :class="current.tag== tag.name?'active':''" :key="tag.name">
              <span class='tag-text'>{{tag.name}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/dist/idangerous.swiper.css";
export default {
  name: "DynamicGraph",
  data: function() {
    return {
      tags: [],
      listImg: [],
      currentIndex: 0,
      detail: {},
      mySwiper: null,
      current: {},
      total: 0,
      img: 1
    };
  },
  mounted() {
    this.getPreiewImg();
  },
  methods: {
    detailno(e) {},
    getBack() {
      this.$router.go(-1);
    },
    swiperLoad() {
      this.swiper = new Swiper(".swiper-container", {
        onSlideNext: () => {
          this.current = this.listImg[this.swiper.activeIndex];
        },
        onSlidePrev: () => {
          this.current = this.listImg[this.swiper.activeIndex];
        },
        runCallbacks: true
      });
    },
    changeTag(tag) {
      console.log(tag);
      this.mySwiper.swipeTo(tag.index, 0, false);
      this.current = this.listImg[tag.index];
      this.img = tag.index+1;
      if (this.img == 0) {
        this.img = 1;
      }
    },
    initSwiper() {
      this.mySwiper = new Swiper(".swiper-container", {
        onSlidePrev: swiper => {
          this.current = this.listImg[this.mySwiper.activeIndex];
             this.img = this.mySwiper.activeIndex + 1;
        },
        onSlideNext: swiper => {
          this.current = this.listImg[this.mySwiper.activeIndex];
             this.img = this.mySwiper.activeIndex + 1;
        }
      });
    },
    getPreiewImg() {
      var this_ = this;
      let id = this.$route.query.id;
      this.$http
        .get(this.base+"user/houseType/detail?id=" + id)
        .then(response => {
          this_.detail = response.data.data.baseInfo;
          response.data.data.imgInfo.forEach(element => {
            let tag = {};
            tag.name = element.type;
            tag.index = this_.listImg.length;
            this_.tags.push(tag);
            for (let img of element.list) {
              img.tag = element.type;
              this_.listImg.push(img);
            }
          });
          this.current = this.listImg[0];
          this.total = this.listImg.length;
          if (this.total > 0) {
            this.img = 1;
          } else {
            this.img = 0;
          }
          this.$nextTick(() => {
            this.initSwiper();
          });
        });
    }
  }
};
</script>

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  margin-top: 50%;
}
.swiper-slide {
  background-position: center;
  background-size: cover;
}
.layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 1);
}
.tags {
  display: flex;
  display: -webkit-flex;
  margin-top: 12px;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 10px 0;
  font-size: 0.3rem;
}
.tag.active {
  background-color: #409eff;
  color: #fff;
}
.tag {
  border: 1px solid #bbb;
  padding: 4px 8px;
  color: #444;
  border-radius: 3px;
  background-color: #fff;
  margin: 0 20px;
  border: none;
  cursor: pointer;
}
.nav {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1rem;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  -webkit-align-items: center;
}
.title {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: aliceblue;
  font-size: 14px;
}
.imgList {
  height: 260px;
}
.idx {
  position: absolute;
  left: 0;
  top: -50%;
  font-size: 12px;
  transform: translate(0, -50%);
  margin-left: 0.8rem;
  color: aliceblue;
}
.aidx {
  position: absolute;
  right: 0;
  top: -50%;
  font-size: 12px;
  transform: translate(0, -50%);
  margin-right: 1rem;
  color: aliceblue;
}
.textBtn {
  display: flex;
  display: -webkit-flex;
  margin-top: 12px;
  -webkit-justify-content: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 10px 0;
  font-size: 0.3rem;
}
.textBtn.active {
  background-color: #409eff;
  color: #fff;
}
.text {
  border: 1px solid #bbb;
  padding: 4px 8px;
  color: #444;
  border-radius: 3px;
  background-color: #fff;
  margin: 0 20px;
  border: none;
  cursor: pointer;
}
</style>