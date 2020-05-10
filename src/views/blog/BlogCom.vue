<template>
    <div class="blog-com animated fadeInLeftBig">
        <!--使用数组切割方法实现分页-->
        <div v-for="item in blogData.slice((currentPage-1)*4,currentPage*4)" :key="item._id">
            <card-com :detailData="item"></card-com>
        </div>
        <div v-if="blogData.length==0" class="blog_null">
            <h1>暂无文章</h1>
        </div>
        <el-pagination
            background
            layout="prev, pager, next"
            id="pagination"
            :page-size=4
            @prev-click="prevClick"
            @next-click="nextClick"
            @current-change="currentClick"
            :total="blogData.length">
        </el-pagination>
    </div>
</template>

<script>
import CardCom from './components/CardCom'
export default {
    name: 'BlogCom',
    data(){
      return {
          blogData: [],  //全部数据
          currentPage: 1  //当前页
      }
    },
    components: {
        CardCom
    },
    created() {
        //检查是否登录
        this.$store.dispatch('loginCheck');
    },
    mounted() {
        this.$http.get('/data').then(res => {
            if(res.data.status === 1){
                this.blogData = res.data.data;
            }
        }).catch(err => {
            console.log(err, '获取数据出错')
        })
    },
    methods: {
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
.blog-com{
    min-height: 900px;
    .blog_null{
        width: 200px;
        margin: 20px auto;
        text-align: center;
        color: white;
    }
}


//解决移动端分页无法点击的问题，即只在PC端时给分页添加样式，在移动端保持分页组件的原有样式
@media screen and (min-width: 992px){
    #pagination{
        margin: 40px auto;
        text-align: center;
    }
}
</style>

