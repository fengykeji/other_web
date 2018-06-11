<template>
  <div id="newMessage">
    <div class="nav">
      <div class="back" @click="backToProjectView"></div>
      <div class="navtitle">{{name}}动态</div>
    </div>
    <div class="position-box">
      <vue-better-scroll class="wrapper" ref="scroll" :scrollbar="scrollbarObj" :pullDownRefresh="pullDownRefreshObj" :pullUpLoad="pullUpLoadObj" :startY="parseInt(startY)" @pullingDown="onPullingDown" @pullingUp="onPullingUp">
        <ul ref="list" class="list-content">
          <li class="list-item" v-for="(item,index) in items" :key="index" >
            <div class="title">{{item.title}}</div>
            <div class="time">{{item.create_time}}</div>
            <div class="content">{{item.content}}</div>
            <div class="pic" v-if="item.withPic">
              <ul>
                <li v-for="(pic,index) in pics" :key="index"></li>
              </ul>
            </div>
            <div class="awrapper">
            <a :href="'http://120.27.21.136:2798/' + item.url" class="readall">阅读全文&nbsp;>></a>
            </div>
            <!-- <div class="btn" @click="checkAllInfo(item.dynamic_id)">阅读全文&nbsp;>></div> -->
            <div class="split" ></div>
            <!-- <div class="mockblank"></div> -->
          </li>
        </ul>
      </vue-better-scroll>
    </div>

  </div>
</template>

<script>
// import BScroll from "better-scroll";
import VueBetterScroll from "vue2-better-scroll";
let count = 1;
export default {
  name: "NewMessage",
  components: {
    VueBetterScroll
  },
  data() {
    return {
      name:'',
      // 这个配置可以开启滚动条，默认为 false。当设置为 true 或者是一个 Object 的时候，都会开启滚动条，默认是会 fade 的
      scrollbarObj: {
        fade: true
      },
      // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
      pullDownRefreshObj: {
        threshold: 50,
        stop: 40
      },
      // 这个配置用于做上拉加载功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启上拉加载，可以配置离底部距离阈值（threshold）来决定开始加载的时机
      pullUpLoadObj: {
        threshold: 0,
        txt: {
          more: "加载更多",
          noMore: "没有更多数据了"
        }
      },
      startY: 0, // 纵轴方向初始化位置
      scrollToX: 0,
      scrollToY: 0,
      scrollToTime: 700,
      items: [],
      currentPage: null
    };
  },
  beforeRouteEnter: (to, from, next) => {
    document.documentElement.style.fontSize = "initial";
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    document.documentElement.style.fontSize =
      document.documentElement.clientWidth / 10.8 + "px";
    next();
  },
  methods: {
    backToProjectView(){
      let project_id = this.$route.query.project_id
      this.$router.push({name:'projectView',query:{id:project_id}})
    },
    checkAllInfo(index){
      let project_id = this.$route.query.project_id
      this.$router.push({name:'messageDetail',params:{id:index},query:{fromProject:project_id}})
      // console.log(index)
    },
    // loadData() {
    //   this.$http
    //     .get("http://120.27.21.136:2798/user/dynamic/list?project_id=1&page=1")
    //     .then(res => {
    //       console.log(res.data.data);
    //       this.items = res.data.data.data.concat(this.items);
    //       this.$nextTick(() => {
    //         if (!this.scroll) {
    //           this.scroll = new BScroll(this.$refs.wrapper, {});
    //           this.scroll.on("touchEnd", pos => {
    //             if (pos.y > 1) {
    //               this.loadData();
    //               console.log("asdasdadsasdada");
    //             }
    //           });
    //         } else {
    //           this.scroll.refresh();
    //         }
    //       });
    //     });
    // }
    scrollTo() {
      this.$refs.scroll.scrollTo(
        this.scrollToX,
        this.scrollToY,
        this.scrollToTime
      );
    },
    // 模拟数据请求
    getData() {
      // console.log(this.$router)
      // return new Promise(resolve => {
      //   setTimeout(() => {
      //     const arr = [];
      //     for (let i = 0; i < 20; i++) {
      //       arr.push(count++);
      //     }
      //     resolve(arr);
      //   }, 1000);
      // });
      let result = this.$http
        .get(
          "http://120.27.21.136:2798/user/dynamic/list?project_id=" + this.$route.query.project_id + "&page=" +
            this.currentPage
        )
        .then(res => {
          console.log(res.data)
          return res.data;
        });
      // console.log(res)
      return result;
    },
    onPullingDown() {
      // 模拟下拉刷新
      this.currentPage = 1;
      this.getData().then(res => {
        console.log(res)
        this.lastPage = res.data.last_page;
        this.items = res.data.data;
        this.$refs.scroll.forceUpdate(true);
        if (this.currentPage === this.lastPage) {
          this.$refs.scroll.forceUpdate(false);
          // this.pullUpLoadObj = false
        }
      });
    },
    onPullingUp() {
      if (this.currentPage === this.lastPage) {
        this.$refs.scroll.forceUpdate(false);
        return;
      }
      // // console.log("上啦加载");
      this.currentPage += 1;
      this.getData().then(res => {
        // console.log(res);
        this.items = this.items.concat(res.data.data);
        // if (count < 50) {
        this.$refs.scroll.forceUpdate(true);
        // if (this.currentPage === this.lastPage) {
        //   this.$refs.scroll.forceUpdate(false);
        //   return;
        // }
        // } else {
        //   this.$refs.scroll.forceUpdate(false);
        // }
      });
    }
  },
  created() {
    this.name = this.$route.query.pname
    // this.$http.get('http://120.27.21.136:2798/user/dynamic/list?project_id=1&page=1').then(function(res){
    //   console.log(res)
    //   this.items = res.data
    //   this.$nextTick(()=>{
    //     this.scroll = new BScroll(this.$refs.wrapper,{})
    //   })
    // })
    // this.loadData();
  },
  // mounted(){
  //   this.$nextTick(()=>{
  //     this.scroll = new BScroll(this.$refs.wrapper,{})
  //   })
  // }
  mounted() {
    this.onPullingDown();
  }
};
</script>

<style scoped>
@import "../assets/reset.css";
body {
  margin: 0 !important;
}
/* .list-item{
  margin-bottom: 10px;
} */
.awrapper{
  text-align: right;
}
.readall{
  color: #000000
}
.nav {
  position: fixed;
  left: 0;
  right: 0;
  height: 40px;
  border-bottom: 0.1px solid #eee
  /* background: red; */
}
.position-box {
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
}
.wrapper {
  /* height: 100%; */
  height: 300px;
  /* min-height: 100vh; */
  /* min-height: 300px; */
  /* margin-left: 0.35rem; */
  margin-left: 8px;
  margin-right: 8px;
}
/* .wrapper {
  margin-left: 0.35rem;
  background-color: #f0f0f0;
} */
.white {
  background-color: #ffffff;
}
.title {
  /* height: 1.5rem;
  line-height: 1.5rem; */
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-weight: bold;

}
.time {
  font-size: 12px;
  color: #737373;
  /* margin-bottom: 0.5rem; */
  margin-bottom: 8px;
  margin-top: 8px;
}
.content {
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  margin-bottom: 8px;
}
.btn {
  font-size: 14px;
  color: #aaaaaa;
  height: 1.2rem;
  text-align: right;
  line-height: 1.2rem;
  margin-bottom: 10px;
}
.split {
  height: 3px;
  background-color: #f0f0f0;
}
/* div.before-trigger canvas {
  /* width: 0.5rem !important; */
  /* height: 0.8rem; 
  display: none !important;
} */
.nav{
  /* display: flex; */
  text-align: center;
  background: #ffffff;
  z-index: 999;
}
.back{
  position: absolute;
  width: 20px;
  height: 20px;
  left: 0;
  top: 50%;
  background-image: url('../assets/back.png');
  background-size: cover;
  transform: translate(0,-50%)
  
  /* text-align: left; */
  /* top: 0; */
  /* left: 8px; */
  /* padding-left: 8px; */
  /* line-height: 40px; */
}
.navtitle{
  text-align: center;
  line-height: 40px;

}
.mockblank{
  width: 100%;
  height: 1rem;
}
</style>
