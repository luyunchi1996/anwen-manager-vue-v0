<template>
  <div class="office">
      <p style="text-align: center">敬请期待</p>
    <!--<el-row class="content-body" >-->
      <!--<el-col :span="24" >-->
          <!--<h4>计算工具</h4>-->
          <!--<ul>-->
            <!--<li  v-for="item in toolsA" :key="item.id" @click="selectUrl($event,item)" >-->
              <!--<img :src="item.image" alt="">-->
              <!--<p v-text="item.name"></p>-->
            <!--</li>-->
          <!--</ul>-->
      <!--</el-col>-->
    <!--</el-row>-->
    <!--<el-dialog-->
            <!--:title="selectedItem.name"-->
            <!--:visible.sync="dialogVisible"-->
            <!--width="30%">-->
        <!--<div class="calcContent">-->
           <!--<div class="chunks"  :class="chunks.chunkDirect" v-for="(chunks,row) in selectedItem.chunks">-->
             <!--<div class="chunk" v-for="(chunk,col) in chunks.chunk">-->
               <!--<div v-if="chunk.type=== 'option'">-->
                 <!--<span>{{chunk.name}}</span>-->
                   <!--<select @change="processAction($event,chunk.action,12,row,col)">-->
                     <!--<option v-for="opvalue in chunk.option.data">{{opvalue}}</option>-->
                   <!--</select>-->
               <!--</div>-->
               <!--<div v-if="chunk.type=== 'text'">-->
                 <!--<span>{{chunk.name}}</span>-->
                 <!--<span>{{chunk.value}}</span>-->
               <!--</div>-->
               <!--<div v-if="chunk.type=== 'input-text'">-->
                 <!--<span>{{chunk.name}}</span>-->
                 <!--<input type="text"/>-->
               <!--</div>-->
             <!--</div>-->
           <!--</div>-->
        <!--</div>-->
      <!--<div class="menu">-->
          <!--<div>计算</div>-->
      <!--</div>-->

    <!--</el-dialog>-->

  </div>


</template>
<script>
// @ is an alias to /src

export default {
  name: "office",
  components: {
    
  },
  data() {
      return{
         toolsA:[{id:"1", image:"http://icase360.com/src/bigdataImg/icon_0.png", name:"人身损害"},
             {id:"2", image:"http://icase360.com/src/bigdataImg/icon_0.png", name:"交通事故"},
             {id:"3", image:"http://icase360.com/src/bigdataImg/icon_0.png", name:"工伤赔偿"},
             {id:"4", image:"http://icase360.com/src/bigdataImg/icon_0.png", name:"律师费"},
             {id:"5", image:"http://icase360.com/src/bigdataImg/icon_0.png", name:"诉讼费"},
         ],
          dialogVisible: false,
          fromItems:{
              "1":{
                  name:"人身损害",
                  chunks:[
                       {name:"",chunkDirect:"row",chunk:[
                           { name:"户口",value:"",placeholder:"",action:"setOption",type:"option",option:{data:["城镇","农村"],selected:"0"}},
                           { name:"年龄",value:"",placeholder:"",action:"setInput",type:"input"},
                           { name:"伤残等级",value:"",placeholder:"",action:"setOption",type:"option",option:{data:['死亡','一级','二级','三级', '四级', '五级', '六级', '七级', '八级', '九级', '十级'],selected:"1"}},
                       ],methods:{}},
                       {name:"",chunkDirect:"col",chunk:[
                           { name:"伤残赔偿金",value:"100",placeholder:"",action:"",type:"text"},
                       ],methods:{}},
                       {name:"",chunkDirect:"col",chunk:[
                           { name: "误工费", placeholder: "计算", value: "", action: "calcWugong",type:"input-text" },
                           { name: "被扶养人生活费", placeholder: "计算", value: "", action: "calcFuyang",type:"input-text" },
                           { name: "交通费", placeholder: "按需据实", value: "", action: "setInput",type:"input-text"},
                           { name: "医疗费", placeholder: "诊疗费+医药费以发票为准", value: "", action: "setInput" ,type:"input-text"},
                           { name: "住宿费", placeholder: "按需据实", value: "", action: "setInput" ,type:"input-text"},
                           { name: "护理费", placeholder: "当地劳务报酬标准*护理天数", value: "", action: "setInput" ,type:"input-text"},
                           { name: "住院伙食补助费", placeholder: "国家机关一般工作人员出差标准(元/天)*天数", value: "", action: "setInput",type:"input-text" },
                           { name: "鉴定费", placeholder: "以发票为准", value: "", action: "setInput",type:"input-text" },
                           { name: "精神损害抚慰金", placeholder: "法院根据实际情况判决", value: "", action: "setInput",type:"input-text" },
                           { name: "营养费", placeholder: "按需据实", value: "", action: "setInput" ,type:"input-text"},
                           { name: "其他费用", placeholder: "按需据实", value: "", action: "setInput",type:"input-text" }
                       ],methods:{}},
                  ]
              },
              "2":{
                  name:"人身损害",
                  chunks:[
                      {name:"",chunkDirect:"row",chunk:[
                          { name:"户口",value:"",placeholder:"",action:"setOption",type:"option",option:{data:["城镇","农村"],selected:"0"}},
                          { name:"年龄",value:"",placeholder:"",action:"setInput",type:"input"},
                          { name:"伤残等级",value:"",placeholder:"",action:"setOption",type:"option",option:{data:['死亡','一级','二级','三级', '四级', '五级', '六级', '七级', '八级', '九级', '十级'],selected:"1"}},
                      ],methods:{}},
                      {name:"",chunkDirect:"col",chunk:[
                          { name:"伤残赔偿金",value:"100",placeholder:"",action:"",type:"text"},
                      ],methods:{}},
                      {name:"",chunkDirect:"col",chunk:[
                          { name: "误工费", placeholder: "计算", value: "", action: "calcWugong",type:"input-text" },
                          { name: "被扶养人生活费", placeholder: "计算", value: "", action: "calcFuyang",type:"input-text" },
                          { name: "交通费", placeholder: "按需据实", value: "", action: "setInput",type:"input-text"},
                          { name: "医疗费", placeholder: "诊疗费+医药费以发票为准", value: "", action: "setInput" ,type:"input-text"},
                          { name: "住宿费", placeholder: "按需据实", value: "", action: "setInput" ,type:"input-text"},
                          { name: "护理费", placeholder: "当地劳务报酬标准*护理天数", value: "", action: "setInput" ,type:"input-text"},
                          { name: "住院伙食补助费", placeholder: "国家机关一般工作人员出差标准(元/天)*天数", value: "", action: "setInput",type:"input-text" },
                          { name: "鉴定费", placeholder: "以发票为准", value: "", action: "setInput",type:"input-text" },
                          { name: "精神损害抚慰金", placeholder: "法院根据实际情况判决", value: "", action: "setInput",type:"input-text" },
                          { name: "营养费", placeholder: "按需据实", value: "", action: "setInput" ,type:"input-text"},
                          { name: "其他费用", placeholder: "按需据实", value: "", action: "setInput",type:"input-text" }
                      ],methods:{}},
                  ]


              },
              "3":{
                  name:"工伤赔偿",
                  chunks:[
                      {name:"",chunkDirect:"row",chunk:[
                          { name:"伤残等级",value:"",placeholder:"",action:"setOption",type:"option",option:{data:['死亡','一级','二级','三级', '四级', '五级', '六级', '七级', '八级', '九级', '十级'],selected:"1"}},
                          { name:"工资",value:"",placeholder:"",action:"setInput",type:"input"},
                    ],methods:{}},
                      {name:"",chunkDirect:"col",chunk:[
                          { name:"一次性伤残补助金",value:"",placeholder:"",action:"",type:"text"},
                      ],methods:{}},
                      {name:"",chunkDirect:"col",chunk:[
                          { name:"伤残津贴",value:"",placeholder:"",action:"",type:"input-text"},
                      ],methods:{}},
                      {name:"生活护理费",chunkDirect:"col",chunk:[
                          { name: "部分不能自理", placeholder: "计算", value: "", action: "calcWugong",type:"input-text" },
                          { name: "大部分不能自理", placeholder: "计算", value: "", action: "calcFuyang",type:"input-text" },
                          { name: "完全不能自理", placeholder: "按需据实", value: "", action: "setInput",type:"input-text"},
                          { name: "其他费用", placeholder: "按需据实", value: "", action: "setInput",type:"input-text"}
                      ],methods:{}},
                  ]
              },
              "4":{
                  name:"律师费",
                  chunks:[
                      {name:"",chunkDirect:"row",chunk:[
                          { name:"案件类型",value:"",placeholder:"",action:"setOption",type:"option",option:{data:['死亡','一级','二级','三级', '四级', '五级', '六级', '七级', '八级', '九级', '十级'],selected:"1"}},
                          { name:"诉讼标的",value:"",placeholder:"",action:"setInput",type:"input-text"},
                      ],methods:{}},
                  ]


              },
              "5":{
                  name:"诉讼费",
                  chunks:[
                      {name:"",chunkDirect:"row",chunk:[
                          { name:"案件类型",value:"",placeholder:"",action:"setOption",type:"option",option:{data:['死亡','一级','二级','三级', '四级', '五级', '六级', '七级', '八级', '九级', '十级'],selected:"1"}},
                          { name:"涉及财产",value:"",placeholder:"",action:"setOption",type:"option",option:{data:['是','否'],selected:"0"}},
                          { name:"诉讼标的",value:"",placeholder:"输入标的(元)",action:"setInput",type:"input-text"},
                      ],methods:{}}
                  ]
              },
          },


          selectedItem:{
              name:""
          },

      }
  },
    mounted(){},
    methods:{
        setOption(value,row,col){
            debugger
        },
        processAction(e,action,value,row,col){
            this[action](value,row,col);
        },
        selectUrl(e,item){
            let tools = item;
            this.selectedItem=this.fromItems[item.id];
            console.log(this.selectedItem);
            this.dialogVisible = true;
        }

    },

};
</script>
<style lang="less">
  .office{
    width: 1366px;
    margin: 0 auto;
    margin-top: 120px;
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

</style>