<template>
    <div>
        <el-row class="boxs">
            <el-col :span="18" class="col-text">
                <div><span style="color:#e4a923;">iCase360.com</span> 法律人专属的导航</div>
            </el-col>
            <el-col :span="6" class="col-menu">
                <div  class="col-link" @click="handlerMenu" >智能助手</div><br/>
                <div  class="col-link" @click="handlerLogin">登录</div>
                <div  class="col-last col-link" @click="setHome">设为主页</div>
            </el-col>
        </el-row>

        <el-dialog
                   title=""
                   width="360px"
                   height="400px"
                   :visible.sync="dialogVisible"  :show-close="false"
                   class="login-dia wxlogin-dialog">
                <Login />
            <!--<wxlogin :appid ="wxLoginInfo.appid" class="wxLogin"-->
                     <!--:scope="wxLoginInfo.scope"-->
                     <!--:redirect_uri="wxLoginInfo.redirect_uri"-->
                     <!--:state	=" wxLoginInfo.state">-->

            <!--</wxlogin>-->
            <!--<el-col :span="8"><label for="">手机号：</label><input type="text" v-model="tellPhone"></el-col>-->
            <!--<span slot="footer" class="dialog-footer">-->
            <!--<el-button type="primary" @click="login">确 定</el-button>-->
            <!--</span>-->
        </el-dialog>
    </div>

</template>

<script>
    import router from "../../router";
    import  Login from  "../login/Login"

    export default {
        name: "Header",
        components:{
            "Login":Login
        },
        data(){
            return {
                dialogVisible: false,
                modalset:false
            }
        },
        methods:{
            handlerMenu(){
              this.$emit("handlerMenu");
            },
            handlerLogin(){
                this.dialogVisible = true;
                 // router.push("login");
            },
            setHome(){
                 window.open("http://icase360.com/help/")
            }

        }
    }

</script>
<style>
    .login-dia{

    }
</style>

<style scoped >
   .boxs{
       height: 42px;
       background-color: #efefef;
       color:#343c31;
   }
   .col-text{
       display: flex;
       height: 42px;
       align-items: center;
       font-size: 18px;
       padding-left: 120px;
   }
    .col-menu{
         display: flex;
        justify-content: flex-end;
        height: 42px;
        align-items: center;
        font-size: 14px;
    }
    .col-menu div{
         padding: 0 12px;

    }
    .col-last{
         margin-right: 30px !important;
    }
    .col-link:hover{
         cursor: pointer;
         color: #000000;
    }

</style>