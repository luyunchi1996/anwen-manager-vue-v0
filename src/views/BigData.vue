<template>
  <div id="bigData" class="big-data">
     <el-row class="body-head">      
      <el-col :span="8" :offset="8" class="serach"> 
        <el-input
          placeholder="输入要搜索的内容,选择要搜索的网站,按回车进行搜索"
          suffix-icon="el-icon-search"
          class="search-box"
          v-model="searchValue" @keyup.native.enter="search">
        </el-input>
      </el-col>
    </el-row>
    <el-row class="content-body">      
      <el-col :span="24" class="data"> 
        <h4>案例分析</h4>
       <ul>
         <li  v-for="item in caseA" :key="item.id" :params="item.params" :url="item.url" @click="selectUrl($event,item)" >
           <img :src="item.image" alt="">
           <p v-text="item.name"></p>
         </li>       
        </ul>
      </el-col>
      <el-col :span="24" class="data" >
        <h4>法律关系</h4>
       <ul>
         <li v-for="item in caseB" :key="item.id" :params="item.params" :url="item.url" @click="selectUrl($event,item)" >
           <img :src="item.image" alt="">
           <p v-text="item.name"></p>
         </li> 
        </ul>
      </el-col>
      <el-col :span="24" class="data"> 
        <h4>法律维护</h4>
       <ul>
       <li v-for="item in caseC" :key="item.id" :params="item.params" :url="item.url" @click="selectUrl($event,item)" >
           <img :src=item.image alt="">
           <p v-text="item.name"></p>
         </li> 
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "bigData",
  components: {},
  data() {
    return {
      searchValue: "",
      caseA:[],
      caseB:[],
      caseC:[],
        selected:{}

    };
  },
  mounted(){
    let baseUrl = this.GLOBAL.baseUrl;
     this.$http
      .get(baseUrl + "/bigDataIconInfo", {})
      .then(({ data }) => {
        var caseAObject = data.data.A0.icons;
        var caseBObject = data.data.A1.icons;
        var caseCObject = data.data.A2.icons;
        for (const key in caseAObject) {
          if (caseAObject.hasOwnProperty(key)) {
            caseAObject[key].image = "http://icase360.com"+caseAObject[key].path+caseAObject[key].image
            const element = caseAObject[key];
            this.caseA.push(element)
          }

        }
        for (const key in caseBObject) {
          if (caseBObject.hasOwnProperty(key)) {
              caseBObject[key].image = "http://icase360.com"+caseBObject[key].path+caseBObject[key].image
            const element = caseBObject[key];
            this.caseB.push(element)
          }
        }
        for (const key in caseCObject) {
          if (caseCObject.hasOwnProperty(key)) {
              caseCObject[key].image = "http://icase360.com"+caseCObject[key].path+caseCObject[key].image
            const element = caseCObject[key];
            this.caseC.push(element)
          }
        }
      });
    this.openNotice();
  },
  methods:{
      search(){
          let value = this.searchValue;
          let selected = this.selected;
          for(let key in selected){
              let  obj = selected[key];
              let url = obj.url;
              let params = obj.params;
              params = params.replace("$PARAMS",value);
              url = url +params;
              window.open(url);

          }

          // debugger;

      },
selectUrl(e,item){
          let target =  e.target;
          if(target.nodeName !="LI"){
              target = target.parentNode;
          }
          let className = target.className;
          let name = item.name;
          if(className.indexOf("accept")==-1) {
              target.className = "accept";
              this.selected[name] = item;
          }
          else {
              target.className = "";
              delete  this.selected[name];
          }
      },
     openNotice() {
        this.$notify({
          title: '提示',
          message: '勾选要查询的网站，填写搜索的内容进行搜索',
          duration: 2000
        });
      }
  }
};
</script>
<style lang="less">

    .el-notification{
        width: 4.2rem;
        height: 1.47rem;
        top:0.8rem !important;
        .el-notification__group{
            .el-notification__title{
                color:#626262;
                padding-top: 0.12rem;
                padding-bottom: 0.12rem;
                padding-left: 0.20rem;
            }
            .el-notification__content p{
                display: inline-block;
                color: #838485;
                position: relative;
                top: -0.08rem;
            }
            .el-notification__content:before{
                display: inline-block;
                content: " ";

                width: 0.24rem;
                height: 0.24rem;
                background-image: url("../assets/images/icon-tip-warn.png");
                background-size: 100% 100%;
                margin-left: 0.2rem;
                margin-right: 0.3rem;
            }
            .el-notification__closeBtn{
                width: 16px;
                height: 16px;
            }
            .el-icon-close::before{
                 content: " ";
                display: inline-block;
                width: 100%;
                height: 100%;
                  background-image: url("../assets/images/icon-close.png");
                  background-size: 100% 100%;
            }

        }
    }


#bigData {
    width: 1366px;
    margin: 0 auto;
  /*background-color: #f6f6f8;*/
  .body-head {
    padding-top: 0.33rem;
    padding-bottom: 0.34rem;
  }

  .content-body{
    padding-bottom: 150px;
      .data{
           padding: 6px 0;
      }
      h4{
        padding-left: 3%;
        color: #A9AAAA;
        font-size: 17px;
        margin: 0;
      font-weight: normal;
    }
    ul{

        .accept:after{
            content: ' ';
            display: inline-block;
            width: 16px;
            height: 16px;
            background-image: url("../assets/images/accept.png");
            background-size: 100% 100%;
            position:absolute;
            bottom: 0.40rem;
            right: 0.64rem;

        }
        .accept:hover{
             transform: scale(1.0);
             cursor: default;
        }
        li:hover{
             transform: scale(1.2);
            cursor: pointer;
        }
      li{
        list-style: none;
        display: inline-block;

        background-color: #fff;
          height: 1.32rem;
          width: 1.93rem;
        margin-right: 2%;
        vertical-align: top;
        text-align: center;
          position: relative;
          border-radius: 10px;
        img{
          margin-top: 14%;
            width: 0.6rem;
            height: 0.6rem;
        }
        p{
          text-align: center;
          color: #626262;
            font-size: 16px;
        }
      }
      li:nth-child(6){
        margin-right: 0;
      }
    }
  }
    @media screen  and (max-width: 1366px){
        .el-input__inner{
            font-size: 12px;
        }
        .content-body h4{
          font-size: 16px;
        }
        .content-body ul li{
            width: 1.25rem;
            height: 1.25rem;
        }
        .content-body ul li img{
            width: 0.6rem;
            height: 0.6rem;
        }
        .content-body ul li p{
            font-size: 14px;
        }
        .content-body ul .accept:after{
            bottom: 0.4rem;
            right: 0.3rem;
        }
    }
}
</style>
<!--1366 media-->
<style scoped lang="less">
    @media screen  and (max-width: 1366px){
        #bigData {
            width: 1024px;

        }
    }


</style>