<template>
    <div>
        <el-row class="boxs">
            <el-col :span="18" class="col-text">
                <div>法律人专属的导航</div>
            </el-col>
            <el-col :span="6" class="col-menu">
                <div>智能助手</div><br/>
                <div  class="col-last col-link" @click="handlerLogin">登录</div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    import router from "../../router";

    export default {
        name: "Header",
        methods:{
            handlerLogin(){
                 router.push("login");
            }
        }
    }

</script>

<style scoped >
   .boxs{
       height: 42px;
       background-color: #20a0ff;
       color:#fff;
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
         transform: scale(1.2);
    }

</style>