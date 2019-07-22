<template>
    <div id="doLogin">
        <div class="register">
            <p>输入邀请码</p>
            <div>
                <div><el-input v-model="code"  placeholder="输入邀请码,区分大小写"></el-input></div>
                <div><el-button type="success" @click="doRegister()">激活</el-button></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "doLogin",
        data(){
            return{
                code:""
            }
        },
        mounted(){
            let baseUrl = this.GLOBAL.baseUrl;
            let params = this.common.getUrlParam();
            this.$http
                .get(baseUrl + "/order/PcWechatLogin", {
                    params: {
                        'code':params.code,
                        'state':params.state,
                        'appId':this.GLOBAL.appid
                    }
                })
                .then(({ data }) => {
                            //console.log(data);

                            this.common.setCookie("userID",data.data.userId);
                            this.common.setCookie("token",data.session);
                            //console.log($.cookie("Ltoken"),"---",$.cookie("LuserId"));
                            if(data.code==100){
                                //alert("aaa");
                                //window.top.location.href="getInvitation.html";
                            }else{
                                // this.common.setCookie("Ltoken",data.data.token);
                                // this.common.setCookie("LuserId",data.data.userId);
                                // this.common.setCookie("session",data.session);

                                this.$http
                                    .post(
                                        baseUrl + "/order/CheckLogin",
                                        this.qs.stringify({
                                            userid:data.data.userId
                                        })
                                    )
                                    .then(({ data }) => {
                                        if (data.message == "成功") {

                                            this.common.setCookie("lawyerId",data.data.lawyerId);

                                            this.$router.push({ name: "caseManage"});
                                        }
                                    });

                            }
                });

        },
        methods: {
            doRegister(){
                let code = this.code;
                if(code === ""){
                    this.$message({
                        message: '请填写邀请码',
                        type: 'error',
                        duration:2000
                    });
                    return 0;
                }
                let baseUrl = this.GLOBAL.baseUrl;
                this.$http
                    .post(
                        baseUrl + "/order/BindVerifyCode",
                        this.qs.stringify({
                            verifyCode: code,
                            userid:  this.common.getCookie("userID"),
                            token: this.common.getCookie("token"),
                        })
                    )
                    .then(({ data }) => {

                                if(data.code != 0){
                                    debugger;
                                    this.$message({
                                        message: data.message,
                                        type: 'error',
                                        duration:2000
                                    });

                                }
                                if(data.code == 0){

                                    this.$http
                                        .post(
                                            baseUrl + "/order/CheckLogin",
                                            this.qs.stringify({
                                                userid:this.common.getCookie("userID")
                                            })
                                        )
                                        .then(({ data }) => {
                                            if (data.message == "成功") {
                                                this.common.setCookie("lawyerId",data.data.lawyerId);
                                                this.$router.push({ name: "caseManage"});
                                            }
                                        });
                                }

                    });



            }

        }
    }

</script>

<style lang="less">
    #doLogin:before{
        width: 100%;
        height: 100%;
        content: '';
        display: block;
        background-image: url("../assets/images/index-0.png");
        background-size: 100% 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -100;

    }
    #doLogin  .register{
            width: 3.8rem;
            margin: 0 auto;
           margin-top: 360px;
            p{
                 color: #fff;
                font-size: 20px;
                margin-bottom: 40px;
            }
            .el-input .el-input__inner{
                height: 51px;
                margin-bottom: 20px;

            }
          .el-input__inner::-webkit-input-placeholder{
            color: #747474;
        }
        .el-input__inner::-moz-placeholder{
            color: #747474;
        }
        .el-input__inner:-ms-input-placeholder{
            color: #747474;
        }


        }
      .el-button{
         width: 100%;
        font-size: 18px;
    }

</style>