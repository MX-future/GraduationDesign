<template>
    <div class="card-com">
        <div class="left"  @click="toDetail">
            <div class="img-div">
                <img src="@/assets/6.png" alt="显示失败">
            </div>
            <div class="time">
                <span class="span-time">创建时间: {{detailData.time}}</span>
            </div>
        </div>
        <div class="right">
            <div class="blog_msg"  @click="toDetail">
                <div class="blog-title">
                    <h2>{{detailData.title}}</h2>
                </div>
                <div class="author">
                    <span><i class="el-icon-user-solid"></i>MX巴赫</span>
                </div>
                <div class="begin" v-html="detailData.content">
                </div>
            </div>
            <div class="blog_admin" v-if="this.$store.state.isLogin === true">
                <el-button type="danger" size="small" @click="deleBlog(detailData._id)">删除</el-button>
                <el-button type="success" size="small" @click="editBlog(detailData._id)">编辑</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CardCom',
    inject:['reload'],  //组件中注入
    props: ['detailData'],
    methods: {
        toDetail(){
            let id = this.detailData._id;//获取id
            //路由传参
            this.$router.push({
                path: `/detail/${id}`
            });
        },
        //删除文章
        deleBlog(id){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //请求接口
                this.$http.post(`/delete?id=${id}`).then((res) => {
                    console.log(res.data)
                    if(res.data.status === 1){
                        this.$message({
                            type: 'success',
                            message: '删除文章成功!'
                        });
                        this.reload(); //刷新页面
                    }else{
                        this.$message({
                            type: 'error',
                            message: '删除文章失败！'
                        });
                    }
                }).catch((err) => {
                    console.log(err, '请求文章删除接口失败！')
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //编辑文章
        editBlog(id){
            //路由传参
            this.$router.push({
                name: 'editcom',
                params: {
                    id: id
                }
            });
        }
    }
}
</script>

<style lang="less">
.card-com{
    width: 1000px;
    height: 325px;
    margin: 50px auto;
    background: white;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;

    .left{
        display: inline-block;
        width: 400px;
        height: 285px;
        margin-top: 25px;
        padding-left: 10px;
        .img-div{
            width: 379px;
            height: 214px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .time{
            margin: 44px 0px;
            span{
                font-size: 14px;
                color: #2d2d2d;
            }
            .span-time{
                opacity: 0.7;
            }
        }
    }
    .right{
        display: inline-block;
        width: 540px;
        height: 285px;
        margin-top: 25px;
        .blog-title h2{
            height: 33px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .blog_msg{
            padding-left: 5px;
            padding-bottom: 5px;
            .author{
                margin: 10px;
                color: lightblue;
            }
            .begin{
                margin-top: 15px;
                height: 135px;
                overflow: hidden;
                P{
                    opacity: 0.7;
                    font-size: 15px;
                    line-height: 1.8;
                }
                img{
                    display: none;
                }
            }
        }

        .blog_admin{
            height: 50px;
            margin-top: 20px;
            .el-button{
                float: right;
                margin: 10px 5px;
            }
        }
    }
}
.card-com:hover{
    box-shadow: 0px 0px 8px white;
    transition: 0.3s;
}

/*自适应*/
/*小于768px下*/
@media screen and (max-width: 992px) {
    .card-com{
        width: 95%;
        height: 120px;
        border-radius: 10px;
        margin: 20px auto;
        position: relative;
        .left, right{
            height: 95px;
        }
        .img-div, .begin, .blog_admin{
            display: none;
        }
        .blog-title{
            position: absolute;
            left: 15px;
            top: 10px;
            max-width: 90%;
            overflow: hidden;
            h2{
                font-size: 16px;
                max-width: 335px;
            }
        }
        .time{
            position: absolute;
            right: 15px;
            top: 45px;
        }
        .author{
            position: absolute;
            left: 15px;
            top: 40px;
        }
    }
}
</style>
