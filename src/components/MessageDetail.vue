<template>
    <div id="messageDetail">
        <div class="nav">
            <div class="back" @click="getBack"><</div>
            <div class="navtitle">动态详情</div>
        </div>
            <div class="contentBox">
                <div class="title">{{result.data.data.title}}</div>
                <div class="time">{{result.data.data.create_time}}</div>
                <div class="content">{{result.data.data.content}}</div>
                <div v-if="condition" class="pics">
                    <ul class="picBox">
                        <li v-for="(pic,index) in pics" :key="index" class="pic" :style="{background:'url(' + pic.url + ')'}"></li>
                    </ul>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  name: "MessageDetail",
  data: function() {
    return {
      result: {
          data:{
              data:{
                  title:''
              }
          }
      },
      condition:false
    };
  },
  created() {
    // console.log(this.$route.params)
    this.$http
      .get("http://120.27.21.136:2798/user/dynamic/detail?id=" + this.$route.params.id)
      .then(res => {
          // console.log(res)
        if(res.data.data.img_url){
            this.condition = true
        }
        this.result = res;
      });
  },
  methods:{
    getBack() {
      let project_id = this.$route.query.fromProject
      // this.$router.go(-1)
      this.$router.push({name:'newMessage',query:{project_id}})
    }   
  }
};
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 1.2rem;
  text-align: center;
  background-color: #ffffff;
  z-index: 999;
  font-size: 14px;
}
.navtitle{
    line-height: 1.2rem
}
.back {
  position: absolute;
  text-align: left;
  top: 0;
  left: 8px;
  /* padding-left: 8px; */
  line-height: 40px;
  height: 40px;
  font-size: 32px;
  width: 50px;
}
.navtitle {
  text-align: center;
  /* line-height: 40px; */
}
.contentBox {
  padding: 0.5rem 0.35rem;
  margin-top: 1.2rem;
}
.title {
  font-size: 16px;
  font-weight: bold;
}
.time {
  font-size: 12px;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
}
.content {
  font-size: 14px;
  margin-bottom: 0.5rem;
}
.picBox {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.pic {
  /* width: calc(33.333% - 0.4rem); */
  width: 3rem;
  height: 2.5rem;
  background-size: contain;
}
</style>
