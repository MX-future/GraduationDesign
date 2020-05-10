import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import * as types from './mutationTypes'
import { Message } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,  //登录状态
    dialogFormVisible: false  //登录模态框
  },
  mutations: {
    //登录
    [types.LOGIN_IN](state){
      state.isLogin = true;
      console.log(state.isLogin);
    },
    //登出
    [types.LOGIN_OUT](state){
      state.isLogin = false;
      console.log(state.isLogin);
    },
    //开启登录模态框
    [types.MODEL_OPEN](state){
      state.dialogFormVisible = true;
    },
    //关闭登录模态框
    [types.MODEL_CLOSE](state){
      state.dialogFormVisible = false;
    }
  },
  actions: {
    toLoginIn(context, data){
      axios.post(`/login?adminName=${data.name}&password=${data.password}`).then((res) => {
        if(res.data.status === 1) {
          Message({
            message: '登录成功',
            offset: 80,
            type: 'success'
          });
          context.commit(types.LOGIN_IN);
          context.commit(types.MODEL_CLOSE);
          //将token存储到本地
          localStorage.token = res.data.token;
          //将当前用户id存储到本地
          localStorage.userId = res.data.id;
        }else{
          Message({
            showClose: true,
            message: '登录失败，密码或账号错误',
            offset: 470,
            type: 'error'
          });
        }
      })

    },
    toLoginOut(context){
      context.commit(types.LOGIN_OUT);
      localStorage.removeItem('token');   //清除token
      localStorage.removeItem('userId')   //清除登录用户id
    },
    //检查登录状态
    loginCheck(context){
      if(localStorage.getItem('token')){
        axios.defaults.headers.authorization = localStorage.getItem('token');
        axios.get('/logincheck').then(res => {
          let data = res.data;
          if(data.status === 1){
            context.commit(types.LOGIN_IN);
            localStorage.token = res.data.token;
          }else{
            context.commit(types.LOGIN_OUT);
          }
        }).catch(err => {
          console.log(err);
        });
      }else{
        context.commit(types.LOGIN_OUT);
      }
    }

  }
})
