<template>
    <div id="baseDemo">
        <div class="simaple-rule">
            <el-row>
                <el-col :span="1" ><div class="grid-content bg-purple-dark">1</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">2</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-dark">3</div></el-col>
                <el-col :span="1" ><div class="grid-content bg-purple-f">4</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-dark">5</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">6</div></el-col>
                <el-col :span="1" ><div class="grid-content bg-purple-dark">7</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">8</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-dark">9</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">10</div></el-col>
                <el-col :span="1" ><div class="grid-content bg-purple-dark">11</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">12</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-dark">13</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">14</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-dark">15</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">16</div></el-col>
                <el-col :span="1" ><div class="grid-content bg-purple-dark">17</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">18</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-dark">19</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">20</div></el-col>
                <el-col :span="1" ><div class="grid-content bg-purple-dark">21</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">22</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-dark">23</div></el-col>
                <el-col :span="1"><div class="grid-content bg-purple-f">24</div></el-col>

            </el-row>
            <el-row class="debugger">
                <el-col :span="24" style="background-color: rgba(0,0,0,0.5); color: #5daf34">
                    <p>{{screen_de_Info}}</p>
                </el-col>
            </el-row>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'baseDemo',
        data() {
            return {
                screen_de_Info:""
            }
        },
        mounted(){
            var that =this;
            that.screen_de_Info=document.body.clientWidth+" * "+document.body.clientHeight +"_"+window.screen.width+" * "+ window.screen.height;

            window.onresize=function (e) {
                that.screen_de_Info=document.body.clientWidth+" * "+document.body.clientHeight +"_"+window.screen.width+" * "+ window.screen.height;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .simaple-rule{
        position: fixed;
        width: 100%;
        z-index: 1000;
    }
    .bg-purple-dark {
        background: rgba(0,0,0,0.5);
    }
    .grid-content{
        text-align: center;

    }
    .bg-purple-f{
        background: rgba(128,128,128,0.5);
    }

</style>
<style scoped>

</style>
