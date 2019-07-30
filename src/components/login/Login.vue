<template>
    <div>
        <div class="login-con">
            <wxlogin v-if="isLogin" :appid ="wxLoginInfo.appid" class="wxLogin"
                     :scope="wxLoginInfo.scope"
                     :redirect_uri="wxLoginInfo.redirect_uri"
                     :state	=" wxLoginInfo.state">
            </wxlogin>
            <div  v-else class="reg">
                <img src="../../assets/images/xiaocase.jpg"/>
                <p>请使用微信扫描二维码联系管理员,进行注册</p>
            </div>

        </div>


        <div class="login-footer">
            <span class="login-select">
                <a :class="selected"  @click="handlerLoginClick('登录')">
                    <i class="icon-wechat"/>
                </a>
            </span>
            <a class="login-reg" :class="selected" @click="handlerLoginClick('注册')">注册</a>
        </div>

    </div>
</template>

<script>
    import wxlogin from 'vue-wxlogin';
    export default {
        name: "Login",
        components: {
            wxlogin
        },
        data(){
            return {
                wxLoginInfo:{
                    appid:this.GLOBAL.appid,
                    scope:"snsapi_login",
                    redirect_uri:encodeURIComponent(this.GLOBAL.callbackIp+'/#/doLogin'),
                    state:new Date().getTime().toString()
                },
                isLogin:true,
                selected:"selected"
            }
        },
        methods:{
            handlerLoginClick(type){
                if(type==="注册"){
                    this.isLogin=false
                }else if(type==="登录"){
                     this.isLogin=true
                }
            }
        }
    }
</script>

<style scoped>
    .login-footer{
         display: flex;
         justify-content: space-between;
        padding: 6px 12px;

    }
    .login-select{
         height: 32px;
    }
    .reg img{
         width: 320px;
         height: 320px;
    }
    .reg p{
        text-align: center;
    }
    .login-con{
         display: flex;
         justify-content: center;
         padding: 12px;
    }

    .login-select a{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    .login-reg{
        display: flex;
        align-items: center;
        color: #20a0ff;
    }
    .login-reg:hover{
         cursor: pointer;
         color: #8cc5ff;
    }
    .icon-wechat{
         background-image:url("../../assets/icons/wechat.png") ;
         display: inline-block;
         width: 21px;
         height: 18px;
         background-size: 100% 100%;
    }
    .icon-wechat:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
    .login-footer img{
         width: 20px;
        display: flex;
        align-items: center;
    }
</style>