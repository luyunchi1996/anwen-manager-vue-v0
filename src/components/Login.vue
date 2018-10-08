<template>
  <!-- <body class="bodyLogin"> -->
  <div class="container-fluid">
    <img class="back" src="../assets/images/index.png" />
    <div class="login-logo">
      <p>案问问·案件管理系统</p>
    </div>
    <div class="navUl">
      <!--管理员登录-->
    </div>
    <div class="tab-content">
      <div id="loginTips" class="loginError"></div>
      <form autocomplete="off">
        <div class="form-inp form-user">
          <input type="text" name="user" autocomplete="off"  placeholder="请输入您的用户名" v-model="userName">
        </div>
        <div class="form-inp form-pass">
          <input type="password" name="passWord"  placeholder="请输入密码" autocomplete="off"  v-model="passWord">
        </div>
        <input type="button" name="submit" value="登录" class="btn" @click="login">
      </form>

    </div>
  </div>

</template>

<script>
  export default {
    name:"Login",
    data(){
      return{
        passWord:"",
        userName:""

      }
    },
    mounted() {

    },
    methods: {
        login(){
          let userName = this.userName;
          let passWord = this.passWord;
          let host = this.GLOBAL.host;
           this.$http.post(
               host+"/api/order/Login",this.qs.stringify({
                     username:userName,
                    password:passWord
             })
           ).then(
             ({ data }) =>{

                if(data.state == "success") {
                  this.$cookie.set('userId', data.data.userId);
                  this.$cookie.set('token', data.data.token);
                  this.$router.push({
                    name: "Home"
                  });
                }

             }
           );
        }

    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .back{
      position: fixed;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -100;
  }
  .login-logo {
    text-align: center;
    padding-top: 180px;
  }
  .login-logo p {
    color: #fff;
    font-size: 35px;
  }
  .navUl{
    width: 438px;
    height: 56px;
    border-radius: 80px;
    margin: 0 auto;
    margin-bottom: 10px;
    padding-left:30px;
    margin-top:40px;
  }
  .tab-content .form-inp{
    width: 438px;
    height: 56px;
    border-radius: 80px;
    border: 1px solid #fff;
    margin: 0 auto;
    margin-bottom: 26px;

  }
  .form-inp input{
    position: relative;
    left: 50px;

  }
  .tab-content form .btn{
    width: 438px;
    height: 56px;
    display: block;
    margin: 0 auto;
    background-color: #fc9f1b;
    border-radius: 80px;
    color: #fff;
    font-size: 20px;
    margin-top: 90px;
  }
  .tab-content .form-user{
    background: url(../assets/images/uesr.png) 18px center no-repeat;

  }
  .tab-content .form-inp input{
    width: 75%;
    height: 53px;
    display: inline-block;
    border: none;
    background-color: #ffffff00;
    font-size: 16px;
  }

  .tab-content .form-pass{
    background: url(../assets/images/pass.png) 18px center no-repeat;
  }
  .tab-content .loginError{
    width: 438px;
    margin: 0 auto;
    color:#fa6353;
  }
  .wxLogin{
    width: 438px;
    margin: 0 auto;
    margin-bottom: 26px
  }
  img{
    width:50%;
  }
  .nav-tabs>li>a{
    margin-right:0px;
    line-height: 1.42857143;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    background-color: #abe5e7;
    width: 120px;
  }
  .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover{
    color: #555;
    cursor: default;
    background-color: #fff;
    border: 1px solid #ddd;
    /* height: 50px; */
    border-bottom-color: transparent
  }
</style>
