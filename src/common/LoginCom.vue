<template>
  <div class="login-com">
      <el-input v-model="name" placeholder="请输入账号"></el-input>
      <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
      <el-button type="primary" id="btn" @click="login">登录</el-button>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'LoginCom',
  data() {
      return {
          name: '',
          password: ''
      };
    },
    methods: {
        //登录
        login(){
            if(this.name === '' || this.password === ''){
                alert('账号或密码不能为空...')
            }else{
                //以对象方式传参给actions
                let data = {
                    name: this.name,
                    password: this.password
                }
                //提交actions
                this.$store.dispatch('toLoginIn', data)
            }

        }
    }
}
</script>

<style lang="less">
    .login-com{
        width: 300px;
        height: 300px;
        margin: 0 auto;
        text-align: center;
    #btn{
        width: 300px;
        margin-top: 20px;
        border-radus: 8px;
    }
    }
</style>

