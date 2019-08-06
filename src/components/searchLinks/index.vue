<template>
    <div class="input-content">
        <el-input placeholder="请输入搜索内容" v-model="searchValue" class="input-with-select" @keyup.enter.native="inputEnterHandler">
            <el-select class="elSelect" v-model="selectValue" slot="prepend" placeholder="请选择"  @change="changeSelectHandlerChange" >
                <el-option v-for="(link,index) in links" :key="link.name" :label="link.name" :value="index"></el-option>
            </el-select>
            <el-button slot="append"  icon="el-icon-search" @click="inputEnterHandler"></el-button>
        </el-input>
    </div>

</template>

<script>
    export default {
        name: "SearchLinks",
        data(){
            return {
                searchValue:"",
                selectValue:0
            }
        },
        props:{
            links:Array
        },
        mounted(){

        },
        methods:{
            inputEnterHandler(){
                const {onSearch} = this.links[this.selectValue];
                const obj={
                    ...this.links[this.selectValue],
                    value:this.searchValue
                }
                window.open(onSearch(obj))
            },
            changeSelectHandlerChange(value){
                 this.selectValue = value
            },

        }
    }
</script>

<style >
    .input-content{
        display: flex;
        justify-content: center;
    }
    .el-input-group__prepend{
         border: 0px;
         background-color: rgba(0,0,0,0);
    }
    .el-select .el-input{
        width: 80px;
        color: black;

    }
    .el-select .el-input input{
        border: 0 !important;
        background-color: white !important;
        border-bottom-left-radius: 20px ;
        border-top-left-radius: 20px;

    }
    .el-input input{
        border: 0;
        border-radius: 0;
    }
    .input-with-select{
         width: 580px;
    }

    /*#7fdc74*/
    .el-input-group__append{
         border: 0;
        background-color: white;
        border-bottom-right-radius: 20px ;
        border-top-right-radius: 20px;
        color: black;
    }

</style>