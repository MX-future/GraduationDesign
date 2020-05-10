<template>
    <div class="header-com">
        <el-row id="el-row">
            <el-col :span="6" :xs="12" id="admin-col" v-if="this.$store.state.isLogin === true">
                <span><el-avatar id="avatar" shape="circle" size="medium" src="https://s1.ax1x.com/2020/03/17/8a8pd0.th.jpg"></el-avatar>MX巴赫</span>
            </el-col>
            <el-col :span="6" :xs="12" id="tourist-col"  v-if="this.$store.state.isLogin === false">
                <span>MX巴赫</span>
            </el-col>
            <el-col :span="5" :xs="12" id="blog-nav">
                <el-row>
                    <router-link to='/message'><el-col :span="8" class="hidden-md-and-down">游客留言</el-col></router-link>
                    <router-link to='/'><el-col :span="8">文章</el-col></router-link>
                    <router-link to='/collect'><el-col :span="8">收藏</el-col></router-link>
                </el-row>
            </el-col>
            <el-col :span="6" :md="5" id="time-col" class="hidden-md-and-down">
                <p>{{time_now}}</p>
            </el-col>
            <el-col :span="7" :md="7" id="all-btn"  class="hidden-md-and-down">
                <el-button type="primary" round id="el-btn" @click="loginIn"
                           v-if="isLogin === false && this.$route.path != '/edit'">
                    登录</el-button>
                <transition>
                    <div class="action" v-if="isLogin  === true">
                        <el-button type="primary" id="write" @click="toWrite()" round>写文章</el-button>
                        <el-button type="danger" id="login_out" @click="loginOut" round>退出登录</el-button>
                        <el-button type="success" @click="toChange" round>修改密码</el-button>
                    </div>
                </transition>

                <el-dialog title="登录" :visible.sync="dialogFormVisible">
                    <login-com></login-com>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import LoginCom from './LoginCom'
    import * as types from '../store/mutationTypes';
    import { mapState } from 'vuex'
    import 'element-ui/lib/theme-chalk/display.css';
    export default {
        name: 'HeaderCom',
        data(){
            return {
                time_now: new Date().toLocaleString()
            }
        },
        computed: {
            ...mapState({
                isLogin: state => state.isLogin  //映射，从而不用写成this.$store.state.isLogin
            }),
            dialogFormVisible: {
                get: function(){
                    return this.$store.state.dialogFormVisible
                },
                set: function(val){
                    this.$store.state.dialogFormVisible = val
                }
            }
        },
        components: {
            LoginCom
        },
        methods: {
            toWrite(){
                //路由传参
                this.$router.push({
                    name: 'editcom',
                    params: {
                        id: ''
                    }
                });
            },
            toChange(){
                this.$router.push({
                    path: '/change'
                });
            },
            getTime(){
                setInterval(() => {
                    this.time_now = new Date().toLocaleString();
                },1000)
            },
            loginIn(){
                this.$store.commit(types.MODEL_OPEN);
            },
            loginOut(){
                this.$store.dispatch('toLoginOut');
            }
        },
        mounted() {
            this.getTime();
        }
    }
</script>

<style lang="less">
    *{
        margin: 0;
        padding: 0;
    }
    .header-com{
        width: 100%;
        height: 100%;
        text-align: center;
        background: #ffffff;
        box-shadow: 0 1px 3px grey;
    }
    #admin-col{
        span{
            font-size: 25px;
            margin-left: 20px;
            position: relative;
            #avatar{
                position: absolute;
                top: 0px;
                right: 95px;
            }
        }
    }
    #tourist-col{
        span{
            font-size: 25px;
            margin-left: 20px;
        }
    }
    #el-row{
        line-height: 60px;
        .el-col{
            color: black;
        }
    }
    #time-col{
        padding-left: 70px;
        p{
            color: #00a8ff;
        }

    }
    #el-btn{
        width: 100px;
    }
    .action{
        #login_out{
            margin-left: 20px;
        }
    }

    .v-enter,.v-leave-to{
        opacity: 0;
        transform: translateX(80px);
    }
    .v-enter-active,.v-leave-active{
        transition: all 0.5S ease
    }
</style>


