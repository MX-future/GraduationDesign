<template>
    <div class="collect-com animated fadeInRightBig">
        <div class="addcoll" v-if="this.$store.state.isLogin === true">
            <el-row>
                <el-col :span="20">
                    <div class="input">
                        <el-input
                            type="text"
                            placeholder="标题"
                            v-model="title"
                            maxlength="15"
                            show-word-limit
                        ></el-input>
                        <el-input v-model="coll_url" placeholder="网址" class="url_input"></el-input>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="add">
                        <el-button type="primary" @click="add()" round>添加</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-for="item in colldata" :key="item.id">
            <item-com :data="item"></item-com>
        </div>
        <div v-if="colldata.length==0" class="coll_null">
            <h1>收藏还是空的呢</h1>
        </div>
    </div>
</template>

<script>
    import ItemCom from './ItemCom'
    import { Message } from 'element-ui'
    export default {
        name: "CollectCom",
        inject:['reload'],
        data(){
            return{
                colldata: [],
                title: '',
                coll_url: ''

            }
        },
        components: {
            ItemCom
        },
        created() {
            //检查是否登录
            this.$store.dispatch('loginCheck');
        },
        mounted() {
            this.$http.get('/datacoll').then(res => {
                this.colldata = res.data.data;
                //console.log(res.data.data);
            }).catch(err => {
                console.log('请求所有收藏列表接口失败', err);
            })
        },
        methods: {
            add(){
                if(this.title != '' && this.coll_url != ''){
                    this.$http.post(`/addcoll?title=${this.title}&url=${this.coll_url}`).then(res => {
                        let status = res.data.status;
                        if(status === 1){
                            Message({
                                message: '添加收藏成功',
                                offset: 80,
                                type: 'success'
                            });
                            this.reload();
                            console.log('添加收藏成功!');
                        }else{
                            Message({
                                message: '添加收藏失败',
                                offset: 80,
                                type: 'error'
                            });
                            console.log('添加收藏失败!');
                        }
                    }).catch(err => {
                        console.log('请求添加收藏列表接口失败', err);
                    });
                }else{
                    alert('标题或者url不能为空!')
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .collect-com{
        min-height: 900px;
        overflow: hidden;
        .addcoll{
            width: 600px;
            margin: 20px auto;
            padding: 20px;
            border-radius: 15px;
            background: rgba(245, 246, 250,0.8);
            .url_input{
                margin: 5px 0px;
            }
            .add{
                margin-top: 20px;
                margin-left: 15px;
            }
        }
        .coll_null{
            width: 200px;
            margin: 100px auto;
            text-align: center;
            color: white;
        }
    }
    //自适应
    @media screen and (max-width: 992px){
        .addcoll{
            display: none;
        }
    }
</style>