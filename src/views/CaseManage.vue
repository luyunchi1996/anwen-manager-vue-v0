<template>
  <div class="case-manage">
    <el-row class="body-head">
      <el-col :span="7" :offset="2" class="col-filter" >
        <ul class="sequence">
          <li class="selected">排序</li>
          <li>日期</li>
          <li>案由</li>
          <li>受理法院</li>
        </ul>
      </el-col>
      <el-col :span="4" :offset="5" style="width: auto;" class="serach">
        <el-input
          placeholder="输入委托人,按回车进行搜索"
          suffix-icon="el-icon-search"
          class="search-box"
          v-model="searchValue"  :value="searchValue" @keyup.enter.native="changeValue">
        </el-input>
      </el-col>
      <el-col :span="3" :offset="1" class="create-btn"><button @click="dialogVisible = true">创建新案件</button></el-col>
    </el-row>
    <el-row  class="content-head">
      <el-col :span="20" :offset="2" class="content-header">
        <ul>
          <li class="first">委托人</li>
          <li class="second">案由</li>
          <li class="third">法院</li>
          <li class="fouth"></li>
          <li class="fifth">日期</li>
        </ul>
      </el-col>         
    </el-row>
     <el-row  class="content-body">
      <el-col :span="20" :offset="2" class="col-content">
          <ul v-for="item in caseList" :key="item.id" class="content-body" @click="getDetail(item.id)"> 
            <li class="first" v-text="item.bailorName"></li>
            <li class="second" v-text="item.reasonName"></li>
            <li class="third" v-text="item.courtName"></li>
            <li class="fouth" ><span v-for="(state,index) in item.caseState">{{state}}</span></li>
            <li class="fifth" v-text="item.createTime">2018-10-22</li>
          </ul>

          <el-pagination v-if="maxPage!==0"
            layout="prev, pager, next"
            :total="maxPage*10"    @current-change="pageChange($event)" >
          </el-pagination>
      </el-col>      
    </el-row>
    <el-row>
      <el-col :span="24" class="divider"></el-col>
    </el-row>
    <el-row class="footer"> 
        <el-col :span="12">
          <div id="caseLine" class="line-echart" :style="'height:300px;width:98%;'"></div>
        </el-col>
        <el-col :span="12">
          <div id="casePie" class="pie-echart" :style="'height:300px;width:98%;'"></div>
        </el-col>
    </el-row>
    <el-dialog
      title="创建新案件"
      width="80%"
      :visible.sync="dialogVisible"
      class="new-case">
      <el-row class="new-form">
        <el-col :span="8"><label for="">委托人：</label><input type="text"  v-model="newCase.userName"  name="userName" class="validate"><span>*</span></el-col>
        <el-col :span="8"><label for="">联系方式：</label><input type="text"  v-model="newCase.userTel" name="userTel" class="validate"><span>*</span></el-col>
        <el-col :span="8"><label for="">案由：</label><input type="text" v-model="newCase.reasonName" name="reasonName" class="validate"><span>*</span></el-col>
        </el-row>
        <el-row class="new-form">
        <el-col :span="8"><label for="">受理法院：</label><input type="text"  v-model="newCase.courtName" name="courtName" class="validate"><span>*</span></el-col>
        <el-col :span="8"><label for="">案件类型：</label>
            <select   v-model="newCase.caseType" name="clientCaseType" class="validate" >
                <option value="-1" >---请选择案件类型---</option>
                <option value="1" >民事</option>
                <option value="2">刑事</option>
                <option value="3">行政</option>
                <option value="4">法律顾问</option>
            </select>
           <span>*</span></el-col>
        <el-col :span="8"><label for="">诉讼地位：</label>
            <select  v-model="newCase.bailorType" name="bailorType" class="validate">
                <option value="-1"  >---请选择诉讼地位---</option>
                <option value="0">原告</option>
                <option value="1">被告</option>
                <option value="2">第三人</option>
                <option value="3">上诉人</option>
                <option value="4">被上诉人</option>
            </select>
            <span>*</span></el-col>
      </el-row>
       <el-row class="new-form from3">
        <el-col :span="24">
            <label for="">相对方：</label>
            <!--<input type="text" v-model="newCase.counterParty">-->
            <!--<input type="text" >-->
            <!--<input type="text" >-->
            <!--<button>添加</button>-->


            <!---->
            <ul class="parties" >
                <!---->
                <li   class="party" v-for="(party,idx) in parties"
                    @click="editorParty($event)" v-model="party.name" title="双击此标签即可编辑" :data-idx="idx" >
                    <span  @blur="blurParty($event)" class="label-text" :data-id="idx"  v-if="party.iseditor" :contenteditable="party.iseditor" >{{party.name}}&nbsp;</span>
                    <span  @blur="blurParty($event)" class="label-text" :data-id="idx"   v-if="!party.iseditor" :contenteditable="party.iseditor" >{{party.name}}</span>

                    <i title="删除"   @click.stop="delParty($event)" v-if="!party.iseditor"></i>
                </li>
                <li class="icon-add" v-if="parties.length <5"  @click.stop="addParty($event)" title="添加"></li>
            </ul>
            <div class="divider"></div>
        </el-col>
      </el-row>
       <el-row class="new-form from4">
        <el-col :span="8"><label for="">承办方：</label><input type="text" v-model="newCase.agent"><span></span></el-col>
        <el-col :span="8"><label for="">书记员：</label><input type="text" v-model="newCase.courtClerk"><span></span></el-col>
        <el-col :span="8"><label for="">对方代理 ：</label><input type="text" v-model="newCase.counterPartyLawyer"><span></span></el-col>
      </el-row>
       <el-row class="new-form from5">
        <el-col :span="8"><label for="">律师费：</label><input type="text"  name="serviceCharge" v-model="newCase.serviceCharge" class="validate"><span></span></el-col>
        <el-col :span="8"><label for="">标的：</label><input type="text"   name="orderPrice" v-model="newCase.orderPrice" class="validate"><span></span></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createCase">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src

import FromValidate from "../assets/js/validate/FromValidate";

export default {
  name: "caseManage",
  components: {},
  data() {
    return {
      searchValue: "",
      dialogVisible: false,
      caseList: [],
      chartInfo: {},
      caseState: [],
      parties:[],
      partiesSelected:-1,
      newCase: {
          bailorType:"-1",
          caseType:"-1",
          serviceCharge:0,
          orderPrice:0
      },
       maxPage:0,
        searchBy:"",
    };
  },
  mounted() {
    let baseUrl = this.GLOBAL.baseUrl;

    var that = this;
    let userID = this.common.getCookie("userID");
    let token = this.common.getCookie("token");
    let lawyerId = this.common.getCookie("lawyerId");
    this.getCaseList(this.searchBy,0);
    //
    this.$http
      .get(baseUrl + "/findLawyerInfoByRegisterId", {
        params: {
          registerId: userID,
            lawyerId:lawyerId
        }
      })
      .then(({ data }) => {
        let info = data.data;
        this.chartInfo = info.chartInfo;
      })
      .then(() => {
        let lineChart = this.$echarts.init(document.getElementById("caseLine"));
        let option_line = {
          xAxis: {
            type: "category",
            data: this.chartInfo.monthCase[0]
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              data: this.chartInfo.monthCase[1],
              type: "line"
            }
          ]
        };
        lineChart.setOption(option_line);
      })
      .then(() => {
        let pieChart = this.$echarts.init(document.getElementById("casePie"));
        let option_pie = {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "left",
            data: this.chartInfo.lawyerAbility[0]
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              selectedMode: "single",
              radius: [0, "30%"],

              label: {
                normal: {
                  position: "inner"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              }
            },
            {
              name: "案由",
              type: "pie",
              radius: ["40%", "55%"],
              label: {
                normal: {
                  show: false,
                  formatter:
                    "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
                  backgroundColor: "#eee",
                  borderColor: "#aaa",
                  borderWidth: 1,
                  borderRadius: 4,
                  // shadowBlur:3,
                  // shadowOffsetX: 2,
                  // shadowOffsetY: 2,
                  // shadowColor: '#999',
                  // padding: [0, 7],
                  rich: {
                    a: {
                      color: "#999",
                      lineHeight: 22,
                      align: "center"
                    },
                    // abg: {
                    //     backgroundColor: '#333',
                    //     width: '100%',
                    //     align: 'right',
                    //     height: 22,
                    //     borderRadius: [4, 4, 0, 0]
                    // },
                    hr: {
                      borderColor: "#aaa",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 16,
                      lineHeight: 33
                    },
                    per: {
                      color: "#eee",
                      backgroundColor: "#334455",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: this.chartInfo.lawyerAbility[2]
            }
          ]
        };
        pieChart.setOption(option_pie);
      });
    //

    //
  },
  methods: {
      scanForm() {
        var params={}
        var validates =document.getElementsByClassName("validate");
        for(var i=0;i<validates.length;i++){
            var ele = validates[i];
            var paramsName = ele.getAttribute("name");
            params[paramsName]={}
            params[paramsName].val =getVal(ele,ele.nodeName);
            params[paramsName].el =ele;

    }
    return params;
    function getVal(ele,nodeName) {
        // debugger;
        switch(nodeName){
            case "INPUT":
                return ele.value;
                break;
            case "SELECT":
                return ele.value;
                break;
            default:
                return ele.getAttribute("value");
                break;
        }
    }
},

      initValidateFrom() {
//          bailorType  诉讼
//          clientCaseType   案件类型
//          courtName   法院名
//          orderPrice   律师费
//
//          reasonName  案由
//          serviceCharge: 服务费
//          userName  委托人姓名
//          userTel  联系方式
//              :

    // 验证字段的规则
    const rules = {
        reasonName:{
            required:true
        },
        clientCaseType:{
            needSelectd:true
        },
        courtName:{
            required:true,
            courtIsFormat:true
        },
        userName:{
            required:true,
            maxlength:32
        },
        bailorType:{
            needSelectd:true
        },
        userTel:{
            required: true,
            tel: true,
        },
        orderPrice:{
            required: true,
            number:true,
            // digits:true
        },
        serviceCharge:{
            required: true,
            number:true,
            // digits:true
        }
    }

    const messages = {
        reasonName:{
            required:'请输入案由'
        },
        userName:{
            required:'请输入委托人姓名',
            maxlength:'最多输入32个字'
        },
        userTel:{
            required: '请输入手机号码',
            tel: '请输入有效的11位手机号码',
        },
        courtName:{
            required: '请输入法院名称',
        }

    }
    // 创建实例对象
    let formValidate = new  FromValidate(rules, messages)
    // 自定义验证规则
    formValidate.addMethod('needSelectd', function(value, param){
        var flag = true;
        var val = parseInt(value);
        if(val === -1)
            flag = false;
        return formValidate.optional(value) || flag
    }, '请在其中选择一项')
    formValidate.addMethod('courtIsFormat', function(value, param){
        var patt=new RegExp("(\\S+)省(\\S+)市(\\S+)法院");
        return formValidate.optional(value) || patt.test(value)
    }, '按照: xx省xx市xx法院的格式输入')
    return formValidate;
},

      delParty(e){
          let target = e.target;
          let id = target.parentNode.getAttribute("data-idx");
          let copy = [];
          for(let idx in this.parties){
              if(""+idx === id )
                  continue;
              copy.push(this.parties[idx]);
          }
          this.parties = [];
          this.parties = copy;

//          target.parentNode.remove();
      },
      addParty(e){
          this.parties.push({name:"",iseditor:true})
      },
      blurParty(e){
          let target = e.target.parentNode;
          let text = e.target;
          let id = target.getAttribute("data-idx");
          this.parties[id].iseditor=false;
          let name  = text.innerHTML.replaceAll("<!---->","").replaceAll("\n","").replaceAll("&nbsp;","").trim();
          this.parties[id].name=name;

      },
      editorParty(e){
          let target = e.target;
          let text ="";
          if(target.nodeName =="LI"){
              target = target.children[0];

          }
          if(target.className ==="label-text"){
              let id = target.parentNode.getAttribute("data-idx");
              console.log(this.parties[id]);
              this.parties[id].iseditor=true;
//              let pe = document.getElementById("party_editor");
//              if(pe) pe.innerHTML = this.parties[id].name;


          }



      },
      pageChange(e){
        this.getCaseList(this.searchBy,e-1);
      },
      changeValue(e){
          this.getCaseList(this.searchValue,0)

      },
    getCaseList(searchBy,page){
        var that = this;
        let baseUrl = this.GLOBAL.baseUrl;
        if(searchBy=="")
            searchBy=undefined
        let userID = this.common.getCookie("userID");
        let token = this.common.getCookie("token");
        let lawyerId = this.common.getCookie("lawyerId");
        let caseTypeProgress = this.GLOBAL.caseTypeProgress;
        that.$http
            .post(
                baseUrl + "/order/FindOrderList",
                this.qs.stringify({
                    orderState: 0,
                    token: token,
                    userId: userID,
                    lawyerId: userID,
                    searchBy:searchBy,
                    page: page,
                    searchMode: "simple"
                })
            )
            .then(({ data }) => {
            that.caseList = data.data

            that.maxPage = data.maxPage
            that.caseList.forEach(function(value, index) {
            let caseType = value.caseType;
            let caseProgressStatus =[];

            if(value.orderProcessState)
                caseProgressStatus = value.orderProcessState.split(",");
            let caseProgress = caseTypeProgress[caseType]
            let casestatus =[]
            for(let idx in caseProgressStatus){
                var cstate = caseProgress[caseProgressStatus[idx]];
                if(cstate) casestatus.push(cstate.name)
            }
            value["caseState"]=casestatus

            value.createTime = value.createTime.split(" ")[0];
        });
        console.log(that.caseList);

    });

    },
    createCase() {
      let baseUrl = this.GLOBAL.baseUrl;
      console.log(this.newCase);
        let userID = this.common.getCookie("userID");
        let token = this.common.getCookie("token");
        let cop = []
        for(let idx in this.parties){
            cop.push(this.parties[idx].name)
        }
        this.newCase.counterParty   =cop.join(",");
         let  validateParams = this.scanForm();
         let formValidate = this.initValidateFrom();




//         ############
        var params={}
        for(var key in validateParams){
            params[key] = validateParams[key].val;
            validateParams[key].status = true;
            var parent = validateParams[key].el.parentNode;
            parent.removeClass("inputError")
            parent.removeClass("inputSuccess")
        }


//        for(var key in validateParams){
//            if(validateParams[key].status){
//                debugger;
//                var parent = validateParams[key].el.parentNode;
//                if(validateParams[key].val != "") {
//                    parent.removeClass("inputError")
//                    parent.addClass("inputSuccess")
//                }
//            }
//        }

        var errorcount =0;
        if (!formValidate.checkForm(params)) {
            for(var i =0;i<formValidate.errorList.length;i++){
                const error = formValidate.errorList[i];
                validateParams[error.param].status = false;
                let parent = validateParams[error.param].el.parentNode;
                parent.addClass("inputError").attr('data-content',error.msg);
                errorcount++;
            }
            for(let key in  validateParams){
                if(validateParams[key].status){
                    let parent = validateParams[key].el.parentNode;
                    parent.removeClass("inputError")
                    parent.addClass("inputSuccess")
                }
            }


            if(formValidate.errorList.length !== 0) return false

        }

//        for(var key in validateParams){
//            if(validateParams[key].status){
//                var parent = validateParams[key].el.parentNode;
//                if(errorcount ===0 && validateParams[key].val ===""){
//                    parent.removeClass("inputError")
//                    parent.removeClass("inputSuccess")
//                }
//                if(validateParams[key].val != "") {
//                    parent.toggleClass("inputError","inputSuccess");
//                }
//            }
//        }
        //         ############




        this.$http
        .post(
          baseUrl + "/order/SubmitOrder",
          this.qs.stringify({
            page: 0,
            orderState: 1,
            userName: this.newCase.userName,
            reasonName: this.newCase.reasonName,
            courtName: this.newCase.courtName,
            counterParty: this.newCase.counterParty,
            caseType: this.newCase.caseType,
            bailorType: this.newCase.bailorType,
            userTel: this.newCase.userTel,
            agent: this.newCase.agent,
            courtClerk: this.newCase.courtClerk,
            counterPartyLawyer: this.newCase.counterPartyLawyer,
            serviceCharge: this.newCase.serviceCharge,
            orderPrice: this.newCase.orderPrice,
              userid:userID,
              token:token
          })
        )
        .then(({ data }) => {
          if (data.message == "成功") {
            this.$message({
              message: "保存成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.$router.push({ name: "caseProcess",params:{id:data.data.id}});

          }else{
            this.$message({
              message: "保存失败",
              type: "error"
            });
          }
        });
    },
    getDetail(id){
      console.log(id)
      this.$router.push({ name: "caseProcess",params:{id:id}});
    }
  }
};
</script>
<style>
    .inputError,.inputSuccess{
        position:relative;
    }
    .inputError select{
        border: #DE6A39 1px solid !important;
        color:#DE6A39 !important;
    }
    .inputError input{
        border: #DE6A39 1px solid !important;
        color:#DE6A39 !important ;
    }
    .inputError:before{
        content: '';
        display: block;
        width:16px ;
        height: 16px;
        background-image: url("../assets/images/icon-error.png");
        background-size: 100% 100%;
        position: absolute;
        top: 31px;
        left: 482px;
    }

    .inputError:after{
        content:attr(data-content);
        display: block;
        width:200px ;
        height: 16px;
        font-size: 12px;
        color: #DE6A39;
        position: absolute;
        text-align: left;
        top: 53px;
        left: 185px;
    }
    .inputSuccess:after{
        content:"";
        display: block;
        width:200px ;
        height: 16px;
        font-size: 12px;
        color: #000;
        border-color: #eee;
        position: absolute;
        top: 53px;
        left: 86px;
    }
    .inputSuccess:before{
        content: '';
        display: block;
        width:16px ;
        height: 16px;
        background-image: url("../assets/images/icon-success.png");
        background-size: 100% 100%;
        position: absolute;
        top: 31px;
        left: 482px;

    }
</style>
<style lang="less">
.case-manage {
  .body-head {
    background-color: #f6f6f8;
      .col-filter{
          width: auto;
          margin-left: 0.89rem;
      }

  }
  .sequence {
      margin-top: 0.22rem;
      margin-bottom: 0.24rem;
    padding: 0;
      padding-right: 0.13rem;
    height: 0.42rem;
   line-height: 0.42rem;
    border-radius: 10px;
    border: 1px solid #e4e4e6;
    background-color: #ffffff;
    list-style: none;
    li {
      /*width: 24%;*/
       padding-left: 23px;
        padding-right: 10px;
        display: inline-block;
      color: #a9aaaa;
      font-size: 17px;
      text-align: center;
    }
      li:hover{
          cursor: pointer;
          color: #cacaca;
      }
     .selected:hover{
         color: #336fcf;
         cursor: default;
     }
    .selected {
      color: #336fcf;
    }
  }
    .serach{
        margin-left: 4.67rem;
        margin-right:0.23rem ;
    }
    .el-icon-search:before{
        font-size: 20px;
        background-color: #fff;
        padding-right: 0.15rem;

    }
  .search-box .el-input__inner {
    /*margin: 35px 0;*/
      margin-top: 0.22rem;
      margin-bottom: 0.24rem;
    padding: 0;
    height: 0.42rem;
    /*line-height: 63px;*/
    border: 1px solid #e4e4e6;
    border-radius: 10px;
    font-size: 14px;
    padding-left: 0.13rem;
      width: 2.28rem;
  }
    .search-box .el-input__suffix{
        left: 1.86rem;
        top: 0.24rem;
    }
  .create-btn {
      width: auto;

    button {
      background: linear-gradient(
        to right,
        rgb(40, 217, 206),
        rgb(51, 110, 206)
      );
        margin-top: 0.22rem;
        margin-bottom: 0.24rem;
        padding:0 0.32rem;
        height: 0.42rem;

      border: 1px solid #e4e4e6;
      border-radius: 10px;
      width: 100%;
      font-size:17px;
      color: #ffffff;
    }
  }
  .content-head {
      .content-header{
          margin-left: 0.42rem;
          /*border-bottom: 1px solid #eee;*/
      }

    ul {
      padding: 20px 0;
      margin: 0;
      /*border-bottom: 1px solid #eee;*/
        position: relative;
        left: 0.47rem;
      li {
        list-style: none;
        display: inline-block;
        text-align: center;
        font-size: 17px;
        color: #626262;
      }
      .first {
          /*width: 1.4rem;*/
          padding-right: 0.68rem;
      }
      .second {
        /*width: 18%;*/
          padding: 0 1.14rem;
      }
      .third {
        /*width: 18%;*/
          padding: 0 0.96rem;
      }
      .fouth {
          width: 4.86rem;
          height: 2px;
        /*width: 32%;*/
      }
      .fifth {
          width: 0.78rem;
          padding-right: 0.23rem;
        /*width: 16%;*/
      }
    }
  }
  .content-body {
      .col-content{
          margin-left: 0.42rem;
      }
    ul:first-child{
        border-top: 1px solid #eee;
    }
    ul.content-body {
      padding: 10px 0;
      margin: 0;
      border-bottom: 1px solid #eee;
      li {
        list-style: none;
        display: inline-block;
        text-align: center;
        font-size: 14px;
        color: #838485;
      }
      .first {
        width: 1.19rem;
          padding-right: 1.18rem;
      }
      .second {
        width: 1.26rem;
          padding-right: 0.8rem;
          text-align: left;

      }
      .third {
          width: 1.4rem;
          padding-right: 0.99rem;
          text-align: left;
      }
      .fouth {
        width: 4.42rem;
        text-align: left;


        span {
            display: inline-block;
          background-color: #2ca7e7;

          color: #fff;
          padding: 3px 10px;
            position: relative;
            margin-right: 0.25rem;
        }
          span:first-child:before{
              display: inline-block;
              content: "";
              position: absolute;
              top: 0;
              z-index: -1;
              border: 0px;


          }
          span:before{
              display: inline-block;
              content: "";
              position: absolute;
              top: 0;
              z-index: -1;

              border: 1px solid transparent;
              border-color: #2ca7e7  #2ca7e7  #2ca7e7 transparent;


              left: -0.12rem;
              border-width: 0.125rem 0.06rem;

          }
          span:after{
              right: -0.12rem;

              display: block;
              content: " ";
              position: absolute;
              top: 0;
              z-index: -1;
              border: 1px solid transparent;
              border-left-color: #2ca7e7;
              border-width: 0.125rem 0.06rem;
          }
          span:before{

          }

      }
      .fifth {
        width: 1.01rem;

      }
    }
    .el-pagination {
      text-align: center;
      padding: 20px 0;
    }
  }
  .divider {
    height: 34px;
    background-color: #eee;
  }
  .footer {
    height: 300px;
    background: linear-gradient(to right, rgb(40, 217, 206), rgb(51, 110, 206));
  }
  .new-case {
    .el-dialog {
      border-radius: 20px;
    }
    .el-dialog__header {
      background-color: #f8f7fa;
      padding: 30px 0 30px 43px;
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;
      .el-dialog__title {
        font-size: 30px;
        color: #626262;
      }
      .el-dialog__headerbtn {
        font-size: 30px;
        top: 30px;
      }
    }
    .new-form {
      text-align: right;
      margin-bottom: 30px;
      label {
        font-size: 24px;
        color: #626262;
        line-height: 50px;
      }
      input {
        height: 50px;
        box-sizing: border-box;
        vertical-align: top;
        width: 60%;
        border: 1px solid #eee;
        background-color: #f7f7fa;
        border-radius: 10px;
        font-size: 24px;
      }
      select{
          height: 50px;
          box-sizing: border-box;
          vertical-align: top;
          width: 60%;
          border: 1px solid #eee;
          background-color: #f7f7fa;
          border-radius: 10px;
          font-size: 24px;
      }
      input:focus {
        outline: none;
        border-color: #409eff;
      }
      span {
        font-size: 24px;
        margin-left: 10px;
        color: red;
      }
    }
    .from3 {
      .divider {
        display: inline-block;
        width: 7%;
        height: 0;
      }
        .parties{
            list-style: none;
            padding: 0;
            width: 81%;
            max-height: 5%;
            text-align: left;
            display: inline-block;
            li{
                display:inline-block;
                margin: 0 2px;
            }
            span{
                display: inline-block;
                 font-size: 14px;
                 margin-left: 0px;
                 color: #606266;
                min-width: 16px;
            }
            .party{
                height: 100%;
                border: 1px solid #409eff;
                border-radius: 10px;
                padding: 2px 5px;


            }
            .party i:after{
                content: " ";
                display: inline-block;
                background-image: url("../assets/images/del.png");
                width: 16px;
                height: 16px;
                background-size: 100% 100%;
                position: relative;
                top: 2px;
                left: 3px;
            }
            .party i:hover:after{
                 cursor: pointer;
                 transform: rotate(30deg);
            }
            .icon-add{
                width: 16px;
                height: 16px;
                padding: 2px;
                background-image: url("../assets/images/add.png");
                background-size: 100% 100%;
                position: relative;
                top: 2px;
            }
            .icon-add:hover{
                cursor: pointer;
            }
            
        }
      input {
        display: inline-block;
        width: 23%;
        margin-right: 10px;
      }
      label {
        vertical-align: top;
      }
      button {
        width: 10%;
        height: 50px;
        border: none;
        border-radius: 5px;
        display: inline-block;
        vertical-align: top;
        color: #fff;
        font-size: 24px;
        background: linear-gradient(
          to right,
          rgb(40, 217, 206),
          rgb(51, 110, 206)
        );
      }
      padding-right: 0;
    }
    .from4,
    .from5 {
      span {
        width: 10px;
        display: inline-block;
      }
    }
    .el-dialog__footer {
      text-align: center;
      padding-bottom: 70px;
    }
    .dialog-footer {
      text-align: center;
      button {
        width: 40%;
        background: linear-gradient(
          to right,
          rgb(40, 217, 206),
          rgb(51, 110, 206)
        );
      }
    }
  }
}
</style>
