<template>
  <div class="wrap" id="pagination">
    <ul id="box">
      <li id = 'list' v-for="(name,index) in names" :key="index"> <el-button class="btn" :type="index === indexC ? 'primary' : ''" @click.native = "switchIndex(index)">{{name}}</el-button> </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["names", "indexC"],
  mounted() {},
  methods: {
    switchIndex: function(index) {
      this.$emit("indexUpdate", index);
    }
  }
};
</script>

<style>
#pagination .wrap {
  position: relative;
}
#pagination .wrap::after {
  opacity: 0.23;
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.23);
  z-index: 1;
}
#pagination #box {
  position: relative;
  max-width: 9.6rem;
  margin: 0 auto;
  height: 1.2rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
  z-index: 999;
}
#pagination li#list {
  width: 1.5rem;
  height: 0.8rem;
}
#pagination  button.el-button.btn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}
#pagination  button.el-button.btn > span {
  font-size: 12px;
}
#pagination  #list .btn span {
  width: 1.03rem;
  height: 0.32rem;
}
</style>
