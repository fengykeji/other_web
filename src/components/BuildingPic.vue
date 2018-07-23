<template>
  <div id="building">
    <div class="bgp" :style="{background:'url(' + bgp + ')'}">
      <div class="back" @click="getBack"></div>
      <div class="btn" @click="toggle" v-show="condition">展开</div>
      <div class="control" v-show="!condition">
        <div @click="toggle" class="close">
          <span></span>
        </div>
        <div class="itemswrapper">
          <ul class="items">
            <li v-for="(item,index) in items" :key="index" class="switchBtn" :class="{active:index===activeIndex}" @click="change(item,index)">
              {{item.build_info.build_name}}
            </li>
          </ul>
        </div>
      </div>
      <div class="modal" v-if="showModal">
        <ul>
          <li v-for="(sub,index) in subs" :key="index" class="sub" @click="checkUnitDetail(sub)">
            {{sub.DYMC}}
          </li>
        </ul>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>

</template>

<script>
import "../assets/reset.css";
export default {
  name: "BuildingPic",
  data: function() {
    return {
      condition: true,
      items: [],
      activeIndex: 0,
      bgp: "",
      subs: [],
      showModal: false
    };
  },
  created() {
    this.bgp = "http://120.78.69.178:2902/" + this.$route.params.pic;
    this.$http
      .get(
        "http://120.78.69.178:2902/user/yunsuan/build?project_id=" +
          this.$route.params.projectId
      )
      .then(res => {
        this.items = res.data.data;
      });
  },
  methods: {
    cancel() {
      this.showModal = false;
    },
    toggle() {
      this.condition = !this.condition;
      this.cancel();
    },
    change(item, index) {
      // if(item.)
      this.activeIndex = index;
      if (item.DYLIST.length) {
        this.showModal = true;
        this.subs = item.DYLIST;
      } else {
        // this.$router.push({})
        let build_id = item.LDID;
        let unit_id = 0;
        let project_id = this.$route.params.projectId;
        this.$router.push({
          name: "unitDetail",
          query: { build_id, unit_id, project_id },
          params: { info: item.build_info, LDMC: item.LDMC }
        });
      }
    },
    getBack() {
      let id = this.$route.params.projectId;
      this.$router.push({ name: "projectView", query: { id } });
    },
    checkUnitDetail(sub) {
      let build_id = this.items[this.activeIndex].LDID;
      let unit_id = sub.DYID;
      let project_id = this.$route.params.projectId;
      this.$router.push({
        name: "unitDetail",
        query: { build_id, unit_id, project_id },
        params: {
          info: this.items[this.activeIndex].build_info,
          LDMC: this.items[this.activeIndex].LDMC,
          DYMC: sub.DYMC
        }
      });
    }
  }
};
</script>

<style scoped>
.bgp {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
  /* background-color: blueviolet */
}
.btn {
  position: absolute;
  right: 0;
  top: 50%;
  width: 1.6rem;
  height: 1rem;
  line-height: 1rem;
  border-radius: 50px 0 0 50px;
  background-color: #1b98ff;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  font-size: 14px;
  text-align: center;
  background-size: cover;
}
.back {
  position: absolute;
  left: 0.15rem;
  top: 0.15rem;
  background-image: url("../assets/wback.png");
  width: 0.9rem;
  height: 0.9rem;
  background-size: cover;
  color: aliceblue;
}
.control {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 3.4rem;
  background-color: rgba(0, 0, 0, 0.5);
  /* background-color: red; */
  z-index: 999;
  display: flex;
}
.close {
  width: 1rem;
  height: 100%;
  /* background-color:aqua; */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close span {
  /* color: #ffffff; */
  width: 0.34rem;
  height: 0.6rem;
  background-image: url("../assets/toRight.png");
  background-size: 100% 100%;
}
.itemswrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.switchBtn:nth-child(1) {
  margin-top: 0.5rem;
}
.switchBtn {
  width: 2rem;
  height: 1rem;
  background-color: #ffffff;
  color: black;
  margin-bottom: 0.5rem;
  font-size: 14px;
  text-align: center;
  line-height: 1rem;
}
.switchBtn.active {
  background-color: #1b98ff;
  color: #ffffff;
}
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 3rem;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  font-size: 14px;
}
.sub {
  width: 100%;
  height: 1rem;
  text-align: center;
  line-height: 1rem;
}
.cancel {
  text-align: center;
  line-height: 1rem;
}
</style>
