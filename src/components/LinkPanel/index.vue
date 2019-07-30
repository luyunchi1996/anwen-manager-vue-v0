<template>
    <div>
        <div class="row">
            <div  class="col-label">{{label}}</div>
            <div  class="col-content">
                <a v-for="(li,index) in link"  @click="handlerClick(li.href)" > <img  class="icon"  @error="handleImgError($event,index)" :src="li.icon" />{{li.name}}</a>
            </div>
        </div>

    </div>
</template>

<script>

    export default {
        name: "LinkPanel",
        props:{
            label:String,
            link:Array,
        },
        computed:{

        },
        data(){
             return {
                  errorImg:require("../../assets/icons/network.png"),

             }
        },
        methods:{
            handlerClick(href){
                 window.open(href)
            },
            handleImgError(e,i){

                this.link[i].icon=this.errorImg
            },
            getBase64Image(img) {
              var canvas = document.createElement("canvas");
              canvas.width = 18;
              canvas.height = 18;
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0, 18, 18);
              var dataURL = canvas.toDataURL("image/png");
              debugger
              return dataURL
               // return dataURL.replace("data:image/png;base64,", "");
           },

        }
    }
</script>

<style scoped>
    .row{
         padding: 16px 40px;
        background-color: white;
        display: flex;
        width: 990px;

    }
    .icon{
        width: 18px;
        height: 18px;
        padding-right: 6px;
    }
    .col-content{
         display: flex;
         font-size: 14px;
    }
    .col-label{
        display: flex;
        align-items: center;
        text-align: center;
        width: 80px;
        height: 40px;
        padding-right: 32px;
        font-weight: bold;
    }
    .col-content a{
         text-align: left;
         display: flex;
         width: 120px;
        height: 40px;
        align-items: center;
        padding: 0 12px;
    }
    .col-content a:hover{
        cursor: pointer;
        color: #3a8ee6;

    }
</style>