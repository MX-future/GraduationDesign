<template>
  <div id="app">
    <el-container>
      <el-header id="el-layout1">
        <header-com></header-com>
      </el-header>
      <el-main id="el-layout2">
        <router-view v-if="isRouterAlive" />
      </el-main>
      <el-footer id="el-layout3">
        <footer-com></footer-com>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import HeaderCom from './common/HeaderCom';
import FooterCom from './common/FooterCom';
export default {
  name: 'App',
  components: {
    HeaderCom,
    FooterCom
  },
  provide() {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data() {
    return{
      isRouterAlive: true          //控制视图是否显示的变量
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    },
  },
  created() {
    //检查是否登录
    this.$store.dispatch('loginCheck');
  }
}
</script>

<style lang="less">
  *{
    margin: 0;
    padding: 0;
  }
  html,body{
    background: linear-gradient(#0abde3,#48dbfb,#0abde3) no-repeat;
  }
  /*}*/
  #el-layout1, #el-layout2,#el-layout3{
    padding: 0;
  }
</style>
