<template>
  <div class="header">
   <el-row class="box">
     <el-col :span="5"><div class="logo-box"><img src="../assets/images/logo.png" alt=""></div></el-col>
     <el-col :span="13" style="width: auto;">
         <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" @select="handleSelect" router>
            <el-menu-item index="/case/caseManage" @click="changeIcon(1)">
              <img v-show="icons.icon1" src="../assets/icons/case.png" alt="">
              <img v-show="icons.icon1active" src="../assets/icons/caseacitve.png" alt="">
              <span>案件管理</span>
            </el-menu-item>
            <el-menu-item index="/case/bigData" @click="changeIcon(2)">
              <img v-show="icons.icon2" src="../assets/icons/bigdata.png" alt="">
              <img v-show="icons.icon2active" src="../assets/icons/bigdataactive.png" alt="">
              <span>大数据</span>
            </el-menu-item>
            <el-menu-item index="/case/office" @click="changeIcon(3)">
              <img v-show="icons.icon3" src="../assets/icons/office.png" alt="">
              <img v-show="icons.icon3active" src="../assets/icons/officeactive.png" alt="">
              <span>智能办公</span>
            </el-menu-item>
            <el-menu-item index="/case/book" @click="changeIcon(4)">
              <img v-show="icons.icon4" src="../assets/icons/book.png" alt="">
              <img v-show="icons.icon4active" src="../assets/icons/bookactive.png" alt="">
              <span>通讯录</span>
            </el-menu-item>
            <el-menu-item index="/case/user" @click="changeIcon(5)">
              <img v-show="icons.icon5" src="../assets/icons/mine.png" alt="">
              <img v-show="icons.icon5active" src="../assets/icons/mineactive.png" alt="">
              <span>我的</span>
            </el-menu-item>
          </el-menu>

    </el-col>
     <el-col :span="6" class="head-user-info">
       <div class="user-info-warp">
           <div class="warp">
               <p>
                   <img src="../assets/icons/lawyer.png" alt="">
                   <span class="content" v-text="name">赵子耀</span>
                   <span class="mark">律师</span>
               </p>
               <i></i>
               <p>

                   <img src="../assets/icons/exp.png" alt="">
                   <span class="content">执业经验</span>
                   <span class="mark" v-text="exp+'年'"></span>
               </p>



           </div>
           <!--:src="headImg"-->
           <img class="head-img"  :src="headImg"  @error="imgError()" alt="">

       </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "/case/caseManage",
      name:"",
      exp:"",
      headImg:"",
      icons: {
        icon1: false,
        icon1active: true,
        icon2: true,
        icon2active: false,
        icon3: true,
        icon3active: false,
        icon4: true,
        icon4active: false,
        icon5: true,
        icon5active: false
      },
      menus: [
        {
          url: "/case/caseManage",
          title: "案件管理",
          icon: "../assets/icons/case.png"
        },
        {
          url: "",
          title: "大数据",
          icon: "../assets/icons/bigdata.png"
        },
        {
          url: "",
          title: "智能办公",
          icon: "../assets/icons/office.png"
        },
        {
          url: "",
          title: "通讯录",
          icon: "../assets/icons/book.png"
        },
        {
          url: "",
          title: "我的",
          icon: "../assets/icons/mine.png"
        }
      ]
    };
  },
  mounted(){
    let baseUrl = this.GLOBAL.baseUrl;
    let userID = this.common.getCookie("userID")
      let lawyerId = this.common.getCookie("lawyerId");

      this.$http
      .get(baseUrl + "/findLawyerInfoByRegisterId", {
        params: {
          registerId: userID,
            lawyerId: lawyerId
        }
      })
      .then(({ data }) => {
        let info = data.data;
        this.name = info.lawyerName;
        this.exp = info.workAge;
        this.headImg = info.imageUrl;
        this.common.setCookie("lawyerName",info.lawyerName);
      });
  },
  methods: {
      imgError(){
          this.headImg="http://icase360.com/src/icon_head_def.png";
      },
    handleSelect() {},
    changeIcon(num) {
      //导航图片切换
      switch (num) {
        case 1:
          {
            this.icons = {
              icon1: false,
              icon1active: true,
              icon2: true,
              icon2active: false,
              icon3: true,
              icon3active: false,
              icon4: true,
              icon4active: false,
              icon5: true,
              icon5active: false
            };
          }
          break;
        case 2:
          {
            this.icons = {
              icon1: true,
              icon1active: false,
              icon2: false,
              icon2active: true,
              icon3: true,
              icon3active: false,
              icon4: true,
              icon4active: false,
              icon5: true,
              icon5active: false
            };
          }
          break;
        case 3:
          {
            this.icons = {
              icon1: true,
              icon1active: false,
              icon2: true,
              icon2active: false,
              icon3: false,
              icon3active: true,
              icon4: true,
              icon4active: false,
              icon5: true,
              icon5active: false
            };
          }
          break;
        case 4:
          {
            this.icons = {
              icon1: true,
              icon1active: false,
              icon2: true,
              icon2active: false,
              icon3: true,
              icon3active: false,
              icon4: false,
              icon4active: true,
              icon5: true,
              icon5active: false
            };
          }
          break;
        case 5:
          {
            this.icons = {
              icon1: true,
              icon1active: false,
              icon2: true,
              icon2active: false,
              icon3: true,
              icon3active: false,
              icon4: true,
              icon4active: false,
              icon5: false,
              icon5active: true
            };
          }
          break;
      }
    }
    //
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  height: 0.71rem;
    /*line-height: 0.26rem;*/
  .box {
    .el-menu-header .is-active {
      border: none;
      /*background: linear-gradient(*/
        /*to right,*/
        /*rgb(40, 217, 206),*/
        /*rgb(51, 110, 206)*/
      /*);*/
      color: #fff;

    }
      .el-menu-header .is-active img,.el-menu-header .is-active span{
           position: relative;
           z-index: 100;
      }
   .el-menu-header .is-active:after{
       content: " ";
       display: block;
       width: 100%;
        height: 100%;
       background-image: url("../assets/images/menu-bk.png");
       background-size: 100% 100%;
       position: absolute;
       top: 0;
       left: 0;
       z-index: 0;

   }

    .el-menu-header {
      li {
        height: 0.71rem;
        line-height: 0.69rem;
          position: relative;
      }
    }
      .el-menu-item{
          padding-left: 0.25rem;
          padding-right: 0.22rem;
      }
    .el-menu--horizontal {
      border: none;
    }
  }
  .logo-box {
      padding-top: 0.26rem;
    padding-left: 0.42rem;
      padding-right: 1.2rem;
      height: 0.25rem;
  }
  .logo-box img{
    height: 100%;
}
  ul {
    padding-left: 0;
      margin-right: 0.25rem;
    li {
      display: inline-block;
      /*width: 20%;*/
      list-style: none;
      img {
        margin-right: 0.14rem;
          max-width: 25px;
      }
      a {
        text-decoration: none;
        color: #626262;
        font-size: 18px;
        vertical-align: top;
        line-height: 37px;
      }
    }
  }
    .head-user-info .user-info-warp:before{

        content: " ";
        width: 2px;
        display: block;
        height: 0.42rem;
        background-image: url("../../src/assets/images/line-ver.png");
        background-size: 100% 100%;
        position: absolute;

    }
  .head-user-info{
     position: relative;
      .user-info-warp{
          position: absolute;
          top: 14px;
      }
      .user-info-warp .warp{
           padding-left: 0.21rem;
          padding-top: 0.1rem;
      }
      .user-info-warp .warp p{
           display: inline-block;
          margin: 0;
          padding: 0 6px;
          position: relative;
          top: -9px;
      }
    img, span{
      vertical-align: middle; 
      /*padding: 0 3px;*/
    }
      i{
          display: inline-block;
          width: 2px;
          height: 25px;
          background-image: url("../../src/assets/images/line-ver.png");
          background-size: 100% 100%;
      }
      .content{
          padding-right:3px;
      }
      img{
          padding-right: 6px;

      }

    .head-img{
      width: 0.56rem;
      height: 0.56rem;
      position: absolute;
      padding: 6px;
        border-radius: 50px;
        background-color: #e3e3e6;
        top: -12px;
        right: -68px;
    }
    .content{
      color: #000;
      font-size: 16px;
      font-weight: bold;
    }
    .mark{
      color: #626262;
      font-size: 16px;
    }
  }
}
</style>
