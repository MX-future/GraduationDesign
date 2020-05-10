<template>
    <div class="note-com" @dblclick="deleNote(cardData._id)">
        <div class="note-card">
            <div class="card-top">
                <p>{{cardData.content}}</p>
            </div>
            <div class="card-bottom">
                <el-row>
                    <el-col :span="12">
                        <div class="card-left">
                            <el-avatar id="avatar" shape="circle" size="small" src="https://s1.ax1x.com/2020/03/17/8a8pd0.th.jpg"></el-avatar>
                            <span>{{cardData.name}}</span>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="card-right">
                            <span>{{cardData.time}}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoteCom",
        inject:['reload'],  //组件中注入
        props: ['cardData'],
        methods: {
            deleNote(id){
                if(this.$store.state.isLogin === true){
                    this.$confirm('删除该留言, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.post(`/delenote?id=${id}`).then(res => {
                            if(res.data.status === 1){
                                this.$message({
                                    type: 'success',
                                    message: '删除留言成功!'
                                });
                                this.reload(); //刷新页面
                            }
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '删除留言失败！'
                            });
                            console.log('删除留言失败', err)
                        });

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .note-com{
        margin-bottom: 20px;
        .note-card{
            width: 640px;
            min-height: 150px;
            margin: 0 auto;
            border-radius: 15px;
            padding: 20px;
            background: #f5f6fa;
            .card-top{
                min-height: 100px;
            }
            .card-bottom{
                height: 50px;
                font-size: 14px;
                color: gray;
                .card-left{
                    position: relative;
                    height: 50px;
                    #avatar{
                        position: absolute;
                        top: 13px;
                        left: 8px;
                    }
                    span{
                        position: absolute;
                        top: 16px;
                        left: 45px;
                    }
                }
                .card-right{
                    position: relative;
                    span{
                        position: absolute;
                        right: 10px;
                        top: 25px;
                    }
                }
            }
        }
    }
</style>