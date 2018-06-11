<template>
    <div id="propertyInformation">
        <div class="nav">
            <div class="back" @click="getBack"></div>
            {{info.project_name}}
        </div>
        <div id="detail">
            <div class="info">
                <item>
                    <p>项目名称</p>
                    <p slot="content">{{info.project_name}}</p>
                </item>
                <item>
                    <p>楼盘状态</p>
                    <p slot="content">{{info.sale_state}}</p>
                </item>
                <item>
                    <p>开发商</p>
                    <p slot="content">{{info.developer_name}}</p>
                </item>
                <item>
                    <p>区域位置</p>
                    <p slot="content">{{info.province_name}} - {{info.city_name}} - {{info.district_name}}</p>
                </item>
                <item>
                    <p>设计公司</p>
                    <p slot="content">{{info.decoration_company}}</p>
                </item>
                <item>
                    <p>楼盘地址</p>
                    <p slot="content">{{info.absolute_address}}</p>
                </item>
                <item>
                    <p>售楼处住址</p>
                    <p slot="content">{{info.sale_address}}</p>
                </item>
            </div>
            <div class="split"></div>
            <div class="parameter">
                <item>
                    <p>建筑类型</p>
                    <p slot="content">{{info.build_type}}</p>
                </item>
                <item>
                    <p>均价</p>
                    <p slot="content">{{info.average_price}}</p>
                </item>
                <item>
                    <p>价格区间</p>
                    <p slot="content">{{info.min_price}}万-{{info.max_price}}万</p>
                </item>
                <item>
                    <p>占地面积</p>
                    <p slot="content">{{info.covered_area}}m
                        <sup>2</sup>
                    </p>
                </item>
                <item>
                    <p>装修标准</p>
                    <p slot="content">{{info.decoration_standard}}</p>
                </item>
                <item>
                    <p>建筑面积</p>
                    <p slot="content">{{info.floor_space}}m
                        <sup>2</sup>
                    </p>
                </item>
                <item>
                    <p>容积率</p>
                    <p slot="content">{{info.plot_retio}}</p>
                </item>
                <item>
                    <p>绿化率</p>
                    <p slot="content">{{info.greening_rate}}</p>
                </item>
                <item>
                    <p>规划户数</p>
                    <p slot="content">{{info.households_num}}</p>
                </item>
                <item>
                    <p>规划车位</p>
                    <p slot="content">{{info.parking_num}}</p>
                </item>
            </div>
            <div class="split"></div>
            <div class="property">
                <item>
                    <p>物业类型</p>
                    <p slot="content">{{property_type}}</p>
                </item>
                <item>
                    <p>物业公司</p>
                    <p slot="content">{{info.property_company_name}}</p>
                </item>
                <item>
                    <p>物业费</p>
                    <p slot="content">{{info.property_cost}}</p>
                </item>
                <item>
                    <p>供暖方式</p>
                    <p slot="content">{{info.heat_supply}}</p>
                </item>
                <item>
                    <p>供水类型</p>
                    <p slot="content">{{info.water_supply}}</p>
                </item>
                <item>
                    <p>供电类型</p>
                    <p slot="content">{{info.power_supply}}</p>
                </item>
            </div>
            <div class="split"></div>
            <div class="license">
                <div class="spacebetween">
                    <div>预售许可证</div>
                    <div>发证时间</div>
                </div>
                <ul>
                    <li v-for="(license,index) in licenses" :key="index">
                        <div class="detail">{{license.sale_permit}}</div>
                        <div class="time">{{license.permit_time}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Item from "./Item";
export default {
  name: "PropertyInformation",
  components: { Item },
  data: function() {
    return {
      info: {
        property: []
      }
    };
  },
  methods:{
      getBack(){
          this.$router.push({name:'projectView',query:{id:this.$route.query.id}})
      }
  },
  computed: {
    property_type: function() {
      return this.info.property.join(" ");
    },
    licenses: function() {
      return this.info.sale_permit;
    }
  },
  created() {
    let self = this;
    let id = this.$route.query.id;
    this.$http
      .get("http://120.27.21.136:2798/user/project/buildInfo?project_id=" + id)
      .then(function(res) {
        self.info = res.data.data;
        // console.log(self.info);
      });
  }
};
</script>

<style scoped>
@import "../assets/reset.css";
#detail {
  font-size: 14px;
  margin: 0 0.3rem;
}
.split {
  width: 100%;
  height: 0.1rem;
  background-color: #dcdcdc;
}
.spacebetween {
  display: flex;
  justify-content: space-between;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
}
ul li {
  display: flex;
  align-items: center;
  height: 1.2rem;
}
.detail {
  width: 3rem;
  word-wrap: break-word;
  /* height:1.2rem; */
  /* line-height: 1.2rem */
}
.time {
  flex-grow: 1;
  text-align: right;
}
.nav{
    position: relative;
    width: 100%;
    height: 1rem;
    text-align: center;
    font-size: 16px;
    line-height: 1rem;
    border-bottom: 1px solid #eee
}
.back{
    position: absolute;
    left: 0;
    top: 50%;
    background-image: url('../assets/back.png');
    width:0.5rem;
    height: 0.5rem;
    background-size: cover;
    transform: translate(0,-50%)

    /* font-size: 24px */
}
</style>
