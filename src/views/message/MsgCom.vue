<template>
    <div class="msg-com animated fadeInUp">
        <div class="msg-card" v-if="this.$store.state.isLogin === false">
            <el-input
                type="textarea"
                :rows="2"
                id="content"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入留言, 我将会以邮件形式即时收到来自您的留言通知"
                v-model="textarea">
            </el-input>
            <el-row class="contact">
                <el-col :span="18">
                    <el-input
                            placeholder="留下您的邮箱,仅用作回复留言(非必选)"
                            id="email"
                            suffix-icon="el-icon-s-promotion"
                            v-model="email">
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" round @click="addNote">留个言</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="note-list" v-for="item in cardData.slice((currentPage-1)*6,currentPage*6)" :key="item._id">
            <note-com :cardData="item"></note-com>
        </div>
        <div v-if="cardData.length==0" class="msg_null">
            <h1>暂无游客留言</h1>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            id="pagination"
            :page-size=6
            @prev-click="prevClick"
            @next-click="nextClick"
            @current-change="currentClick"
            :total="cardData.length">
        </el-pagination>
        <div class="tip"><h1>留言功能仅在PC端支持</h1></div>
    </div>
</template>

<script>
    import NoteCom from './NoteCom'
export default {
    name: 'MsgCom',
    inject:['reload'],  //组件中注入
    components: {NoteCom},
    data(){
        return {
            textarea: '',
            email: '',
            cardData: [],  //留言数据
            currentPage: 1  //当前页
        }
    },
    created() {
        //检查是否登录
        this.$store.dispatch('loginCheck');
    },
    mounted(){
      this.getNote();
    },
    methods: {
        getNote(){
            this.$http.get('/allnote').then(res => {
                if(res.data.status === 1){
                    this.cardData =  res.data.data.reverse();
                }
                console.log(this.cardData);
            }).catch(err => {
                console.log('获取留言列表信息失败',err);
            });
        },
        addNote(){
            let content = this.textarea;
            let email = this.email;
            let time = new Date().toLocaleString();
            this.$http.post(`/addnote?content=${content}&email=${email}&time=${time}`).then(res => {
                if(res.data.status === 1){
                    this.$message({
                        type: 'success',
                        message: '添加留言成功!'
                    });
                    this.$http.post(`http://47.102.147.8:8080/sendemail?content=${content}&email=${email}`).then(res => {
                        if(res.data.status === 1){
                            console.log('邮件发送成功', res.data);
                        }
                    }).catch(err => {
                        console.log('请求发送邮件接口失败', err)
                    })
                    this.reload(); //刷新页面
                }
            }).catch(err => {
                this.$message({
                    type: 'error',
                    message: '添加留言失败！'
                });
                console.log('添加留言失败', err);
            });
        },
        prevClick(num){
            //num为跳转后的页码
            this.currentPage = num;
        },
        nextClick(num) {
            //num为跳转后的页码
            this.currentPage = num;
        },
        currentClick(num){
            //num为当前点击的页码，自带
            this.currentPage = num;
        }
    }
}
</script>

<style lang="less">
.msg-com{
    min-height: 750px;
    padding-top: 30px;
    .tip{
        display: none;
    }
    .msg-card{
        width: 600px;
        height: 100px;
        margin: 20px auto;
        border-radius: 15px;
        text-align: center;
        padding: 40px;
        background: #f5f6fa;
        .contact{
            margin-top: 15px;
        }
        #email{
        }
        #el-btn{
            float: right;
        }
    }
    .note-list{
        width: 1000px;
        margin: 0 auto;
    }
    .msg_null{
        width: 200px;
        margin: 20px auto;
        text-align: center;
        color: white;
    }
}


@media screen and (max-width: 992px){
    .msg-card, .note-list, #pagination{
        display: none;
    }
    .msg-com{
        width: 80%;
        position: relative;
    }
    .msg-com .tip{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        text-align: center;
        display: block;
    }
}
</style>
