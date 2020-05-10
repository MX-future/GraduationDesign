<template>
    <div class="item-com">
        <div class="title" :title=data.url>
            <a target="_top" :href=data.url>{{data.title}}</a>
        </div>
        <div class="action" v-if="this.$store.state.isLogin === true">
            <el-button id="delete" type="danger" @click="deleColl(data._id)">删除</el-button>
        </div>
    </div>
</template>

<script>
    import { Message } from 'element-ui'
    export default {
        name: "ItemCom",
        props: ['data'],
        inject:['reload'],  //组件中注入
        methods: {
            deleColl(coll_id){
                this.$http.post(`/delecoll?id=${coll_id}`).then(res => {
                    let status = res.data.status;
                    if(status === 1){
                        Message({
                            message: '删除收藏成功',
                            offset: 80,
                            type: 'success'
                        });
                        this.reload(); //刷新页面
                        console.log('删除收藏成功!');
                    }else{
                        Message({
                            message: '删除收藏失败',
                            offset: 80,
                            type: 'error'
                        });
                        console.log('删除收藏失败!');
                    }
                }).catch(err => {
                    console.log('请求删除收藏列表接口失败', err);
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.item-com{
    width: 640px;
    height: 60px;
    line-height: 60px;
    margin: 20px auto;
    background: rgba(245, 246, 250,0.8);
    border-radius: 20px;
    .title{
        float: left;
        margin-left: 30px;
        a{
            width: 680px;
            text-decoration: none;
            height: 50px;
            cursor: pointer;
            color: black;
        }
    }
    .action{
        float: right;
        margin-right: 15px;
        #delete{
            border-radius: 20px;
        }
    }
}
//自适应
@media screen and (max-width: 768px){
    .item-com{
        width: 90%;
    }
}
</style>