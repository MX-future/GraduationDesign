<template>
    <div class="blog-detail">
        <div class="blog-title">
            <h1>{{detail_data.title}}</h1>
        </div>
        <div class="blog-time"><p>{{detail_data.time}}</p></div>
        <div v-html="detail_data.content" class="markdown-body">
        </div>
    </div>

</template>

<script>
    import "mavon-editor/dist/css/index.css"; //引入markdown样式
    import "mavon-editor/dist/markdown/github-markdown.min.css";  //引入markdown样式
    export default {
        name: "BlogDetail",
        data() {
            return {
                id: '',
                detail_data: {}
            }

        },
        methods: {
            //获取文章详情数据
            getData(id){
                //根据id查询数据
                this.$http.post(`/findbyid?id=${id}`).then(res => {
                    if(res.data.status === 1){
                        this.detail_data = res.data.data[0];
                        document.title = this.detail_data.title; //更改网页标题
                    }
                }).catch(err => {
                    console.log(err, '获取文章详情数据出错')
                })
            }
        },
        created() {
            //检查是否登录
            this.$store.dispatch('loginCheck');
        },
        mounted() {
            //获取路由参数
            this.id = this.$route.params.id;
            this.getData(this.id);
        }
    }
</script>

<style scoped lang="less">
.blog-detail{
    width: 70%;
    min-height: 1000px;
    margin: 40px auto;
    background: rgba(255,255,255,1);
    border-radius: 15px;
    padding: 40px;
    overflow: auto;
    .blog-title{
        height: 60px;
        margin-bottom: 5px;
        font-size: 23px;
        h1{
            padding-left: 10px;
            border-left: 8px solid #48dbfb;
        }
    }
    .blog-time{margin-top: 35px;
        margin-bottom: 35px;
        color: gray;
        margin-left: 15px;
    }
    .blog-content{
        background: blanchedalmond;
        h1{
            border-left: beige;
        }
    }
}

/*自适应*/
/*小于768px下*/
@media screen and (max-width: 768px){
    .blog-detail{
        width: 85%;
        margin: 15px auto;
        padding: 20px;
        .blog-time{
            font-size: 13px;
        }
        .blog-title{
            height: 40px;
            font-size: 15px;
        }
    }
}
</style>