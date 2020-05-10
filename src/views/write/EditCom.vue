<template>
    <div class="edit-com animated fadeIn">
        <div class="title">
            <el-input placeholder="请输入内容" v-model="title">
                <template slot="prepend">文章标题</template>
            </el-input>
        </div>
        <div id="two_btn">
            <el-button type="primary" @click="publish">发布文章</el-button>
            <el-button type="danger" @click="cancel">取消</el-button>
            <el-button type="success" @click="exportMd(title, content)">导出为md文件</el-button>
        </div>
        <div>
            <mavon-editor :ishljs="true" ref="editor" v-model="content" id="edit" />
        </div>
    </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import { Message } from 'element-ui'
import qs from 'qs'
export default {
    name: 'EditCom',
    data(){
        return {
            title: '',  //文章标题
            content: '',  //文章内容
            blog_id: ''  //要编辑的文章id
        }
    },
    components: {
        mavonEditor
    },
    methods: {
        //获取要编辑的文章内容
        getData(id){
            //根据id查询数据
            this.$http.post(`/findbyid?id=${id}`).then(res => {
                if(res.data.status === 1){
                    let data = res.data.data[0];
                    this.title = data.title;
                    this.content = data.markdown;
                }
            }).catch(err => {
                console.log(err, '获取文章详情数据出错')
            })
        },
        //取消
        cancel() {
            this.$confirm('退出将不保存当前文章?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                Message({
                    type: 'success',
                    message: '已取消保存!'
                });
                this.$router.push('/');  //跳转回首页
            }).catch(() => {
                Message({
                    type: 'info',
                    message: '已取消操作'
                });
            });
        },
        //发布文章
        publish() {
            if(this.blog_id){
                //为编辑文章情况
                let id_e = this.blog_id;
                let title_e = this.title;
                let time_e = new Date().toLocaleString();
                let content_e = this.$refs.editor.d_render;  //获取编译后的html版内容
                let markdown_e = this.content;  //markdown版内容
                //使用qs将对象序列化为url，再拼接到请求地址上
                let obj  = qs.stringify({
                    id: id_e,
                    title: title_e,
                    time: time_e,
                    content: content_e,
                    markdown: markdown_e
                });
                this.$http.post(`/update?${obj}`).then(res => {
                    let status = res.data.status;
                    if(status === 1){
                        Message({
                            message: '更新文章成功',
                            offset: 80,
                            type: 'success'
                        });
                        //跳回文章页
                        this.$router.push({
                            path: '/'
                        });
                        console.log('更新文章成功!');
                    }else{
                        Message({
                            message: '更新文章失败',
                            offset: 80,
                            type: 'error'
                        });
                        console.log('更新文章失败!');
                    }
                }).catch(err => {
                    console.log('请求更新文章接口失败', err);
                });
            }else{
                //为新增文章情况
                let title_n = this.title;
                let time_n = new Date().toLocaleString();
                let content_n = this.$refs.editor.d_render;  //获取编译后的html版内容
                let markdown_n = this.content;  //markdown版内容
                //使用qs将对象序列化为url，再拼接到请求地址上
                let obj  = qs.stringify({
                    title: title_n,
                    time: time_n,
                    content: content_n,
                    markdown: markdown_n
                });
                this.$http.post(`/add?${obj}`).then(res => {
                    let status = res.data.status;
                    if(status === 1){
                        Message({
                            message: '添加文章成功',
                            offset: 80,
                            type: 'success'
                        });
                        //跳回文章页
                        this.$router.push({
                            path: '/'
                        });
                        console.log('添加文章成功!');
                    }else{
                        Message({
                            message: '添加文章失败',
                            offset: 80,
                            type: 'error'
                        });
                        console.log('添加文章失败!');
                    }
                }).catch(err => {
                    console.log('请求添加文章接口失败', err);
                });
            }
        },
        //导出文件
        exportMd(title, content){
            if ('download' in document.createElement('a')) {
                if(title === '' || content === ''){
                    alert('标题或内容不能为空！');
                }else{
                    let eleLink = document.createElement('a');
                    eleLink.download = title + '.md';
                    eleLink.style.display= 'none';
                    //将字符内容转变成blob地址
                    let blob = new Blob([content]);
                    eleLink.href= URL.createObjectURL(blob);
                    //触发点击
                    document.body.appendChild(eleLink);
                    eleLink.click();
                    //点击后再移除
                    document.body.removeChild(eleLink);
                }
            } else {
                    alert('您的浏览器不支持导出文件');
            }

        }
    },
    mounted() {
        //获取路由参数
        let id = this.$route.params.id;
        console.log('id为', id)
        if(id){
            this.getData(id);
            this.blog_id = id;
        }
    }
}
</script>

<style lang="less">
.edit-com{
    height: 100vh;
    .title{
        margin: 20px 40px;
    }
    #edit{
        margin: 20px 40px;
        height: 600px;
    }
    #two_btn{
        margin-left: 40px;
    }
}
</style>
