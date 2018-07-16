<template>
    <div id="unitDetail">
        <div class="nav">
            <div class="back" @click="getBack"></div>
            {{$route.params.DYMC ? $route.params.LDMC + $route.params.DYMC :$route.params.info.build_name + $route.params.LDMC}}
        </div>
        <div class="pullUp" v-show="spread" @touchmove.prevent  >
            <div class="sinfowrapper" >

                <div class="sinfo">
                    <div>
                        <!-- <p>单元个数: <span>{{$route.query.unit_id === 0 ? 1 :$route.query.unit_id}}</span></p> -->
                        <p>总户数: <span>{{$route.params.info.total_house_num}}</span></p>
                        <p>楼上层数: <span>{{$route.params.info.upper_floor_num}}层</span></p>
                        <!-- <p>梯户比: <span>2梯4户</span></p> -->
                        <p>开盘时间: <span>{{$route.params.info.open_time}}</span></p>
                    </div>
                    <div>
                        <p>楼下层数: <span>{{$route.params.info.down_floor_num}}层</span></p>
                        <p>开盘方式: <span>{{$route.params.info.open_way}}</span></p>
                        <p>交房时间: <span>{{$route.params.info.handing_room_time}}</span></p>
                    </div>
                </div>
                <div class="img">
                    <div class="imgwrapper" @click="pullUp"></div>
                </div>
            </div>
        </div>
        <div class="wrapper">

            <div class="pull">
                <div class="pic" @click="pullDown">
                </div>
            </div>
            <div class="split">
            </div>
            <div class="tags">
                <div class="tag scheduled">已定</div>
                <div class="tag sold">已售</div>
                <div class="tag unsold">未售</div>
            </div>
            <div class="content">
                <div class="floor">
                    <ul>
                        <li v-for="(floorNum,index) in floorNums" :key="index" class="floorwrapper">
                            F{{floorNum}}
                        </li>
                    </ul>
                </div>
                <div class="item" id="scroll">
                    <ul :style="{width:dynamicWidth}">
                        <li v-for="(item,index) in items" :key="index">
                            <ul class="itmwrapper">
                                <li v-for="(itm,idx) in item" @click="choose(itm)" :key="idx" class="itm" :class="{scheduled:itm.FJZT==='3' || itm.FJZT==='2'||itm.FJZT==='5'||itm.FJZT==='6',sold:itm.FJZT==='4',unsold:itm.FJZT==='0' || itm.FJZT ==='1'}">{{itm.FJMC}}</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="mask" v-show="showModal">
            <div class="modal">
                <div class="mtitle">
                    {{$route.params.info.build_name}}
                    <div class="mclose" @click="closeModal">x</div>
                </div>
                <div class="minfo">
                    <div class="mt">
                        <div class="squart"></div>
                        房源
                    </div>
                    <div class="mdetail">
                        <p class="text">房号:
                            <span class="txt">{{activeItem.FJMC}}</span>
                        </p>
                        <p class="text">楼栋:
                            <span class="txt">{{activeItem.LDMC}}</span>
                        </p>
                        <p class="text">单元:
                            <span class="txt">{{activeItem.DYMC}}</span>
                        </p>
                        <p class="text">楼层:
                            <span class="txt">{{activeItem.FLOORNUM}}</span>
                        </p>
                    </div>
                </div>
                <div class="mprice">
                    <div class="mt">
                        <div class="squart"></div>
                        价格
                    </div>
                    <div class="mdetail">
                        <p class="text">计价规则:
                            <span class="txt">{{activeItem.JJGZ}}</span>
                        </p>
                        <p class="text">单价:
                            <span class="txt">{{activeItem.JZDJ}}</span>
                        </p>
                        <p class="text">总价:
                            <span class="txt">{{activeItem.FJZJ}}</span>
                        </p>
                    </div>
                </div>
                <div class="mparameter">
                    <div class="mt">
                        <div class="squart"></div>
                        物业 住宅参数
                    </div>
                    <div class="mdetail">
                        <p class="text">建筑面积:
                            <span class="txt">{{activeItem.JZMJ}}</span>
                        </p>
                        <p class="text">套内面积:
                            <span class="txt">{{activeItem.TNMJ}}</span>
                        </p>
                        <p class="text">户型信息:
                            <span class="txt">{{activeItem.HXMC}}</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "UnitDetail",
  data: function() {
    return {
      info: [],
      dynamicWidth: "",
      activeItem: {},
      // condition:true,
      showModal: false,
      spread:false
    };
  },
  computed: {
    floorNums: function() {
      return this.info.map(function(ele) {
        return ele.FLOORNUM;
      });
    },
    items: function() {
      return this.info.map(function(ele) {
        return ele.LIST;
      });
    }
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    choose(itm) {
      // console.log(itm.FJZT)
      if(itm.FJZT !=='0' && itm.FJZT !=='1'){
        return
      }
      this.activeItem = itm;
      this.showModal = true;
    },
    pullUp(){
        this.spread = false
    },
    pullDown(){
        this.spread = true
    },
    getBack(){
        this.$router.go(-1)
        // this.$router.push({name:'projectView',params:{id:this.$route.query.project_id}})
    }
  },
  created() {
      console.log(this.$route.params)
    this.$http
      .get(
        `http://120.27.21.136:2798/user/yunsuan/unit?build_id=${
          this.$route.query.build_id
        }&unit_id=${this.$route.query.unit_id}&project_id=${
          this.$route.query.project_id
        }`
      )
      .then(res => {
        this.info = res.data.data;
        this.dynamicWidth =
          (this.info[0].LIST.length * 3.1 + 0.3) *
            document.documentElement.clientWidth /
            10.8 +
          "px";
      });
  }
};
</script>

<style scoped>
div#scroll {
  width: 100%;
  overflow-x: auto;
}
.nav {
  position: relative;
  /* left: 0; */
  /* right: 0; */
  /* top: 0; */
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-size: 18px;
  width: 100%;
}
/* .wrapper { */
  /* margin-top: 1rem; */
/* } */
.back {
  position: absolute;
  top: 0;
  left: 0.2rem;
}
.pull {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pic {
  width: 0.56rem;
  height: 0.36rem;
  background-image: url("../assets/down.png");
  background-size: cover;
  background-color: #ffffff;
}
.split {
  width: 100%;
  height: 0.2rem;
  background-color: rgb(240, 240, 240);
}
.tags {
  width: 100%;
  height: 1.3rem;
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  /* margin: 0 0.3rem */
}
.tag {
  width: 1.5rem;
  height: 0.8rem;
  border-radius: 3px;
  text-align: center;
  font-size: 14px;
  line-height: 0.8rem;
  margin-right: 0.5rem;
}
.scheduled {
  background-color: #ffd79a;
  color: #ffffff;
}
.sold {
  background-color: #f47564;
  color: #ffffff;
}
.unsold {
  background-color: #dcdcdc;
  color: #ffffff;
}
.content {
  padding: 0.3rem;
  display: flex;
}
.floor {
  margin: 0.2rem;
}
.floorwrapper {
  width: 1rem;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
  font-size: 14px;
  border: 1px solid #dcdcdc;
  margin-bottom: 0.3rem;
}
.item {
  margin: 0.2rem;
}
.itmwrapper {
  /* display: flex; */
  display: -webkit-box;
  width: 100%;
}
.itm {
  /* display: inline-block; */
  width: 2.8rem;
  height: 1rem;
  border: 1px solid #dcdcdc;
  font-size: 14px;
  margin-bottom: 0.3rem;
  text-align: center;
  line-height: 1rem;
  margin-right: 0.3rem;
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.modal {
  position: absolute;
  z-index: 5000;
  width: 8rem;
  /* height:8rem; */
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #ffffff;
}
.mtitle {
  height: 1.3rem;
  font-size: 24px;
  line-height: 1.3rem;
  font-weight: bold;
  text-align: center;
  position: relative;
}
.mclose {
  position: absolute;
  top: 0;
  right: 0.3rem;
  font-weight: normal;
  font-size: 17px;
}
.minfo {
  font-size: 14px;
}
.mt {
  display: flex;
  align-items: center;
  height: 1rem;
}
.squart {
  width: 0.2rem;
  height: 0.4rem;
  background-color: #1b98ff;
  margin-right: 0.2rem;
}
.mdetail {
  padding-left: 1.2rem;
}
.txt {
  padding-left: 0.5rem;
}
.text {
  margin-bottom: 0.4rem;
}
.mprice {
  font-size: 14px;
}
.mparameter {
  font-size: 14px;
}
.pullUp {
  position: fixed;
  left: 0;
  right: 0;
  top: 1rem;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}
.img {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgwrapper {
  width: 0.56rem;
  height: 0.36rem;
  background: url("../assets/pullUp.png");
  background-size: cover;
}
.sinfowrapper{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    background-color: #ffffff
}
.sinfo{
    display: flex;
    font-size: 14px;
    justify-content: space-between;
    align-items: center;
    padding: 0.1rem 0.3rem
}
.sinfo span{
    padding-left: 0.2rem;
}
.sinfo p{
    margin-bottom: 0.3rem;
}
</style>
