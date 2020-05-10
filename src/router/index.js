import Vue from 'vue'
import VueRouter from 'vue-router'
//import LoginCom from '../views/login/LoginCom'
import BlogCom from '../views/blog/BlogCom'
import BlogDetail from '../views/blog/BlogDetail'
import EditCom from '../views/write/EditCom'
import CollectCom from "../views/collect/CollectCom";
import ChangeCom from "../views/change/ChangeCom";
import MsgCom from "../views/message/MsgCom";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'blogcom',
    component: BlogCom
  },
  {
    path: '/edit/',
    name: 'editcom',
    component: EditCom,
    beforeEnter: (to, form, next) => {
      let isLogin = localStorage.getItem('userId');
      if(isLogin){
        next();
      }else{
        next({path: '/'});
        alert('请先登录');
      }
    }
  },
  {
    path: '/message',
    name: 'message',
    component: MsgCom
  },
  {
    path: '/detail/:id',
    name: 'blogdetail',
    component: BlogDetail
  },
  {
    path: '/collect',
    name: 'collectcom',
    component: CollectCom
  },
  {
    path: '/change',
    name: 'changecom',
    component: ChangeCom,
    beforeEnter: (to, form, next) => {
      //检查用户是否登录
      let isLogin = localStorage.getItem('userId');
      console.log(isLogin)
      if(isLogin){
        next();
      }else{
        next({path: '/'});
        alert('请先登录');
      }
    }
  }


]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  //让路由变化后回到顶部
  scrollBehavior(){
    return {
      x: 0,
      y: 0
    }
  }
})

export default router;
