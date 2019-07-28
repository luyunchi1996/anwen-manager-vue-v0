<template>
    <div>
        <div class="row">
            <div  class="col-label">{{label}}</div>
            <div  class="col-content">
                <a v-for="(li) in link"  @click="handlerClick(li.href)" >{{li.name}}</a>
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
        methods:{
            handlerClick(href){
                 window.open(href)
            }
        }
    }
</script>

<style scoped>
    .row{
         padding: 16px 12px;
        background-color: white;
        display: flex;
        width: 944px;

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
        transform: scale(1.2);

    }
</style>