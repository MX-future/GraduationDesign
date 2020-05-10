<template>
    <div class="change-com animated fadeInDown">
        <div class="form">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="新密码" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChangeCom",
        inject:['reload'],  //组件中注入
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    pass: '',
                    checkPass: ''
                },
                rules: {
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let password = this.ruleForm.checkPass;
                        //获取本地保存的用户id
                        let id = localStorage.getItem('userId');
                        //请求修改密码接口
                        this.$http.post(`/changepwd?id=${id}&password=${password}`).then(res => {
                            if(res.data.status === 1){
                                this.$message({
                                    type: 'success',
                                    message: '修改密码成功! 请重新登录!'
                                });
                                //清除本地token和登录的用户id
                                localStorage.removeItem('token');
                                localStorage.removeItem('userId');
                                this.$router.push({
                                    path: '/'
                                });
                                this.reload(); //刷新页面
                            }
                        }).catch(err => {
                            this.$message({
                                type: 'error',
                                message: '修改密码失败'
                            });
                            console.log('修改密码失败',err)
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style lang="less" scoped>
.change-com{
    width: 1000px;
    min-height: 750px;
    margin: 100px auto;
    .form{
        width: 400px;
        margin: 0 auto;
        border-radius: 15px;
        background: #f5f6fa;
        padding: 30px 40px 20px 0px;
    }
}
@media screen and (max-width: 992px){
    .change-com{
        width: 80%;
        .form{
            width: 80%;
        }
    }
}
</style>