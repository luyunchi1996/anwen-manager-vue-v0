<template>
  <div class="case-process">
    <el-row class="body-head">
      <!--<ul class="sequence">-->
        <!--<li>首页</li>-->
        <!--<li>案件</li>-->
        <!--<li>任务</li>-->
      <!--</ul>-->

    </el-row>
    <el-row  class="content-head">
      <el-col :span="15" :offset="1" class="el-fixed">
          <h4><span class="title">任务</span> <span class="title-sm">(共{{processCount[0]}}个任务组，{{processCount[1]}}个任务)</span></h4>
      </el-col>    

    </el-row>
     <el-row  class="content-body">
      <el-col :span="15" :offset="1" class="el-fixed">
            <div class="process" v-for="(process,index) in caseProcess">
                <i class="icon-number" :class="'icon-'+process.index"></i>
              <h5>{{process.name}}</h5>
              <!--v-for="(pchild,index) in caseTypeProgress.child"-->
              <div  class="process-detail" v-for="(pchild,index) in process.child"   @click="showDialog($event,process.name,pchild.name,pchild.id,pchild.detailProcessId,pchild)">
                <!--{{JSON.stringify( pchild)}}-->
                <el-checkbox v-model="pchild.state==0?false:true" class="checked" :id="pchild.detailProcessId" ></el-checkbox>
                <span class="name">{{pchild.name}}</span>
                <span class="demo">模板</span>
                <span class="direction">指引</span>
                <span class="document">文档</span>
                <span class="time">{{pchild.finishDate}}</span>
              </div>
              <!--<div class="process-detail">-->
                <!--<el-checkbox v-model="checked" class="checked"></el-checkbox>-->
                <!--<span class="name">出具《法律服务方案》</span>-->
                <!--<span class="demo">模板</span>-->
                <!--<span class="direction">指引</span>-->
                <!--<span class="document">文档</span>-->
                <!--<span class="time">2017-12-11</span>-->
              <!--</div>-->
          </div>
      </el-col>
       <el-col :span="8" class="case-padding">
         <div class="warp">
         <h4>概览</h4>
         <ul class="case-detail">
           <li><span class="title">委托人</span>
                <span class="content">{{caseDetail.userName}}</span></li>
           <li><span class="title">联系方式</span>
                <span class="content">{{caseDetail.userTel}}</span></li>
           <li><span class="title">案由</span>
                <span  class="content">{{caseDetail.reasonName}}</span></li>
           <li><span  class="title">受理法院</span>
               <span class="content">{{caseDetail.courtName}}</span></li>
           <li><span class="title">案件类型</span>
               <span class="content">{{caseDetail.caseType}}</span></li>
           <li><span class="title">诉讼地位</span>
               <span class="content">{{caseDetail.bailorType}}</span></li>
           <li><span class="title">相对方</span>
               <ol class="parties" >
                   <!---->
                   <li   class="party" v-for="(party,idx) in caseDetail.counterParty" >
                       <span  class="label-text" :data-id="idx"   data-idx="idx">{{party}}</span>
                   </li>
               </ol>
               <!--<span>{{caseDetail.counterParty}}</span></li>-->
           <li><span class="title">承办人</span>
               <span class="content">{{caseDetail.agent}}</span></li>
           <li><span class="title">书记员</span>
                <span class="content">{{caseDetail.courtClerk}}</span></li>
           <li><span class="title">对方代理人</span>
                <span class="content">{{caseDetail.counterPartyLawyer}}</span></li>
           <li><span class="title">律师服务费</span>
                <span class="content">{{caseDetail.serviceCharge}}</span></li>
           <li><span class="title">标的</span>
                <span class="content">{{caseDetail.orderPrice}}</span></li>
           <li><span class="title">关联码</span>
               <span class="content">{{caseDetail.verifyCode}}</span></li>
         </ul>
         </div>
         <div class="warp">
           <h4>我的成员</h4>
           <div class="case-team">
             <el-input
                     placeholder="输入律师姓名,按回车进行搜索"
                     suffix-icon="el-icon-search"
                     class="search-box"
                     v-model="searchValue"  :value="searchValue" @keyup.native="searchLawyerMember($event)"  >
             </el-input>

             <span class="first-text">当前成员:</span>
             <div class="case-teamers">
               <ul class="first">
                   <li  v-for="(member,index) in  caseDetail.orderMember" >
                     <img :src="member.imageUrl?member.imageUrl:''"  @error="imgError($event,member)"  :alt="member.lawyerName.substring(0,1)"
                                                                               :title="member.lawyerName+(member.isSponsors?' 主办':' 协作')"/>
                     <i class="icon_title" :title="member.lawyerName+(member.isSponsors?' 主办':' 协作')" :data-after="member.lawyerName.substring(0,1)"></i>
                     <i  v-if="member.isSponsors" class="icon icon-star icon-inner"  ></i>

                   </li>
                 </ul>

                 <!--<img class="icon-more" src="../assets/images/more.png"/>-->
               <ul class="teamer-search"  v-if="isSearch">
                 <li v-for="(lawyerMember,index) in lawyerMembers ">
                   <i class="icon_title" :title="lawyerMember.officeName" :data-after="lawyerMember.lawyerName.substring(0,1)"  style="float: left;"></i>
                   <img :src="lawyerMember.imageUrl?lawyerMember.imageUrl:''" @error="imgError($event,lawyerMember)" :title="lawyerMember.officeName"  />
                      <span class="name-content">{{lawyerMember.lawyerName}}</span>
                      <span class="role-content">{{lawyerMember.sponsors}}</span>
                    <i v-if="lawyerMember.sponsors===''" class="icon icon-add" @click="addLawyerMember(lawyerMember)" title="点击添加成员" src="../assets/images/add.png"></i></li>
               </ul>
             </div>
           </div>
         </div>

       </el-col>
     </el-row>
    <el-row>

    </el-row>


    <el-dialog
      width="80%"
      :visible.sync="dialogVisible"
      :class=" 'new-case '+dialogClass" @opened="dialogOpen" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :top="dialogTop">
      <!--<span>{{processname}}</span><i>&gt;</i>-->
        <h5  slot="title">
        <span>{{pchildname}}</span></h5>
      <el-row class="type1">
          <div>
              <label>办案时长 ( 数字 )</label><el-input  class="input_minute" v-model="minute" placeholder="请输入数字"></el-input><span>单位/分钟</span>
          </div>
          <div>
              <label>备注</label><textarea  v-model="remark" class="text-area"></textarea>
          </div>
          <div class="file-upload " :class="fileSelectedForm">
              <div>
              <!--<label>文件列表:</label>-->
                  <ul class="file-selected " >
                      <li  :class="fileSelectedActive[0]" @click="doSelect('uploadFile',0)"><span>传输列表 ({{fileSelectedCount}})</span></li>
                      <li :class="fileSelectedActive[1]" @click="doSelect('showFile',1)"><span>已上传 ({{fileUpCount}})</span></li>
                  </ul>
                  <el-input
                          placeholder="输入文件名,按回车进行搜索"
                          suffix-icon="el-icon-search"
                          class="search-box"
                          v-model="fileName"  :data-searchType="fileSelectedForm" :value="searchValue" @keyup.native.enter="searchFile($event)"  >
                  </el-input>
                  <div class="create-btn btn-new">
                      <button  class="btn-sm"  @click="selectFile($event)">选择文件</button>
                      <button  class="btn-sm" @click="upLoadFile($event)">上传文件</button></div>
                  </div>

              <div class="file-list-warp" id ="flw">
                  <ul class="file-list show-icon" >
                      <li class="empty-list empty-text1" v-if="fileListView.length===0">还没有需要上传的文件哦,点击 '选择文件' 进行上传</li>
                      <li class="empty-list empty-text2" v-if="fileListView.length===0">此过程还没有上传过文件,点击 '传输列表' 上传文件</li>
                      <li v-else v-for="(fl,idx) in fileListView">
                          <i class="icon icon_default" :class="fl.icon"></i>
                          <el-popover
                                  placement="right"
                                  :title="fl.name"
                                  trigger="hover"
                                  content="">
                                  <div>
                                    <img   @load="imgOnLoad($event,'')"  @error="imgError($event,'')" :src="fl.url"/>
                                    <p  class="not-view">该文件不支持预览，你可以<a  @click="downFile(fl.url,fl.name)" style="color: #336fcf; cursor: pointer"> 点击此处</a> 查看</p>
                                  </div>
                                  <span  slot="reference" class="file-name" >
                                      <a>{{fl.name}}</a>
                                   </span>
                              <!--<el-button slot="reference">{{fl.name}}</el-button>-->
                          </el-popover>




                          <span class="file-size">{{fl.formatSize}}</span>
                          <div class="progress"></div>
                          <div class="menu"><i class="icon icon-del" @click="delFile(idx,fl.vfrom)" title="删除"></i></div>
                      </li>
                      <!---->


                      <li class="watch-li"></li>

                  </ul>
              </div>
          </div>


      </el-row>
      <el-row class="type2">
          <p>{{pchild.tips}}</p>
          <ul>
              <li v-if="!pchild.templateMap">暂无模版</li>
              <li v-else-if="pchild.templateMap.length == 0">暂无模版</li>
              <li  v-else v-for="(template,key) in pchild.templateMap" >
                  <span class="content">{{key}}</span>&nbsp;&nbsp;<a class="link" :href=template></a>
              </li>


          </ul>
      </el-row>
      <el-row class="type3">
          <p>{{pchild.tips}}</p>
          <ul>
              <li v-if="!pchild.templateMap">暂无模版</li>
              <li v-else-if="pchild.templateMap.length == 0">暂无模版</li>
              <li  v-else v-for="(template,key) in pchild.templateMap" >
                  <span class="content">{{key}}</span>&nbsp;&nbsp;<a class="link" :href=template></a>
              </li>


          </ul>
      </el-row>
      <el-row class="type4">
          <div class="file-upload " :class="fileSelectedForm">
              <div>
                  <!--<label>文件列表:</label>-->
                  <ul class="file-selected " >
                      <!--<li  :class="fileSelectedActive[0]" @click="doSelect('uploadFile',0)"><span>传输列表 ({{fileSelectedCount}})</span></li>-->
                      <li :class="fileSelectedActive[1]" @click="doSelect('showFile',1)"><span>我的文档 ({{fileUpCount}})</span></li>
                  </ul>
                  <el-input
                          placeholder="输入文件名,按回车进行搜索"
                          suffix-icon="el-icon-search"
                          class="search-box"
                          v-model="fileName"  :value="searchValue" :data-searchType="fileSelectedForm" @keyup.native.enter="searchFile($event)"  >
                  </el-input>
                  <div class="create-btn btn-new">
                      <button  class="btn-sm"  @click="selectFile($event)">选择文件</button>
                      <button  class="btn-sm" @click="upLoadFile($event)">上传文件</button></div>
              </div>

              <div class="file-list-warp" id ="flw">
                  <ul class="file-list show-icon" >
                      <li class="empty-list empty-text1" v-if="fileListView.length===0">还没有需要上传的文件哦,点击 '选择文件' 进行上传</li>
                      <li class="empty-list empty-text2" v-if="fileListView.length===0">此过程还没有上传过文件</li>
                      <li v-else v-for="(fl,idx) in fileListView">
                          <i class="icon icon_default" :class="fl.icon"></i>
                          <el-popover
                                  placement="right"
                                  :title="fl.name"
                                  trigger="hover"
                                  content="">
                              <div>
                                  <img   @load="imgOnLoad($event,'')"  @error="imgError($event,'')"  :src="fl.url"/>
                                  <p  class="not-view">该文件不支持预览，你可以<a  @click="downFile(fl.url,fl.name)" style="color: #336fcf; cursor: pointer">点击此处</a> 查看</p>
                              </div>
                              <span  slot="reference" class="file-name" >
                                      <a>{{fl.name}}</a>
                                   </span>
                              <!--<el-button slot="reference">{{fl.name}}</el-button>-->
                          </el-popover>




                          <span class="file-size">{{fl.formatSize}}</span>
                          <div class="progress"></div>
                          <div class="menu" ><i class="icon icon-del" title="删除"  @click="delFile(idx,fl.vfrom)"></i></div>
                      </li>

                      <li class="watch-li"></li>

                  </ul>
              </div>
          </div>
      </el-row>
      <!--<el-row class="new-form">-->
        <!--<el-col :span="8"><label for="">委托人：</label><input type="text" v-model="newCase.userName"><span>*</span></el-col>-->
        <!--<el-col :span="8"><label for="">联系方式：</label><input type="text" v-model="newCase.userTel"><span>*</span></el-col>-->
        <!--<el-col :span="8"><label for="">案由：</label><input type="text" v-model="newCase.reasonName"><span>*</span></el-col>-->
        <!--</el-row>      -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="save"  :class="inactive" @click="createCase($event)">保 存</el-button>
           <el-button type="primary" class="exit" :class="inactive" @click="exitDialog($event)">返 回</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "caseManage",
  components: {},
  data() {
    return {
        dialogTop:"2vh",
        fileListView:[],
        fileUpLoadList:{},
        fileRecordList:[],

        fileUpCount:0,
        fileSelectedCount:0,
        detailProcessId:"",
        fileSelectedActive:["","active"],
        fileSelectedForm:"showFile",
        inactive:"",
        minute:"",
        remark:"",
        pchild:{},
      searchValue: "",
      isSearch:false,
      dialogVisible: false,
      caseList: [],
        lawyerMembers:[],
        caseDetail:{},
      chartInfo: {},
        processname:"",
        pchildname:"",
         processId:"",
        fileName:"",
        dialogClass:"editor",
      caseState: ["收案", "起诉", "庭审", "结案"],
      newCase: {},
        processCount:[],
      caseProcess:{},
      checked:false,
      id:""
    };
  },
  mounted() {
    let baseUrl = this.GLOBAL.baseUrl;
    let userID = this.common.getCookie("userID");
    let token = this.common.getCookie("token");
    let id = this.$route.params.id;
    let caseType =this.GLOBAL.caseType;
    let bailorType=this.GLOBAL.bailorType;
    this.id = id;

    var that = this;
    if(id){
        this.$http
                .post(
                    baseUrl + "/order/CheckDetail",
                    this.qs.stringify({
                        token: "df300d22e5318d076b29144f7193278ce0ef5b76",
                        userId: "U1525405578581qbBSE",
                        id: id,
                    })
                )
                .then(({ data }) => {
                if(data.code===0)

                    var ckey = data.data.caseType;
                data.data.caseType = caseType[data.data.caseType]
                data.data.bailorType = bailorType[data.data.bailorType]
                this.caseDetail = data.data;
                this.caseDetail.counterParty =this.caseDetail.counterParty.split(",");

                if(this.caseDetail.counterParty.length === 1 && this.caseDetail.counterParty[0] === ""){
                    this.caseDetail.counterParty =[]
                }

            });

    }



    this.$http
      .post(
        baseUrl + "/order/CheckCaseProcess",
        this.qs.stringify({          
          token: "df300d22e5318d076b29144f7193278ce0ef5b76",
          userId: "U1525405578581qbBSE",
          id: id,         
        })
      )
      .then(({ data }) => {
       if(data.code == '0'){

           let caseProcess =data.data;
           if(caseProcess.length===0)
               that.$router.push({name:"caseManage"})

          let processRoot = caseProcess["00"]
          let pcount = 0;
          let ccount=0;
          for(let key in processRoot){
               let code = key.substring(2,4);
               processRoot[key].child = caseProcess[code];
               let names = processRoot[key].name.split("、");
               if(names.length==1){
                   processRoot[key].name=names[0]
               }else if(names.length >1){
                   processRoot[key].name=names[1]
               }
               processRoot[key].index = pcount +1;
               for(let ckey in processRoot[key].child){
                   ccount++
               }
              pcount++;
           }
          that.caseProcess = processRoot;
          that.processCount.push(pcount);
          that.processCount.push(ccount);


      }else{
          that.$router.push({name:"caseManage"})
       }
      });
    //
   
    //

    //
  },
  methods: {
      searchFile(e){
          let result = this.fileName;
          let searchType = e.target.attr("data-searchtype");
          if(searchType =="showFile"){
              let filterList = this.fileRecordList.filter(
                  function (item) {
                      return item.name.indexOf(result) != -1;
                  }
              )
              this.fileListView = filterList;

          }else if(searchType =="uploadFile"){
              let filterList = this.fileUpLoadList[this.detailProcessId].filter(
                  function (item) {
                      return item.name.indexOf(result) != -1;
                  }
              );
              this.fileListView = filterList;
          }


          // let filter =

      },
      delFile(id,vfrom){
          let baseUrl = this.GLOBAL.baseUrl;
          if(vfrom=="obj"){
              // deleteUserFile
             let result = this.fileListView[id]
              this.$http
                  .post(
                      baseUrl + "/order/deleteUserFile",this.qs.stringify(
                          {srcId:result.srcId}
                      )
                  )
                  .then(({ data }) => {
                       if(data.code==0){
                           let index = 0;
                           for(let idx=0;idx<this.fileRecordList.length;idx++){
                               if(this.fileRecordList[idx].srcId === result.srcId){
                                   index = idx;
                                   break;
                               }
                           }
                           this.fileRecordList.splice(index,1);
                           let viewIdx = -1;
                           for(let j=0;j <this.fileListView.length;j++){
                               if(result.srcId === this.fileListView[j].srcId){
                                   viewIdx = j;
                                   break;
                               }
                           }
                           if(viewIdx != -1){
                               this.fileListView.splice(viewIdx,1);
                           }

                           // this.fileListView.splice(id,1);
                            this.fileUpCount = this.fileRecordList.length;
                       }
                  });

          }else if(vfrom=="file"){

              let files = this.fileListView[id];
              let index = 0;
              for(let idx=0;idx<this.fileUpLoadList[this.detailProcessId].length;idx++){
                  if(this.fileUpLoadList[this.detailProcessId][idx].uid === files.uid){
                      index = idx;
                      break;
                  }
              }
              this.fileUpLoadList[this.detailProcessId].splice(index,1);

              let viewIdx = -1;
              for(let j=0;j <this.fileListView.length;j++){
                  if(files.uid === this.fileListView[j].uid){
                      viewIdx = j;
                      break;
                  }
              }
              if(viewIdx != -1){
                  this.fileListView.splice(viewIdx,1);
              }
              this.fileSelectedCount = this.fileUpLoadList[this.detailProcessId].length;

          }

      },
      downFile(url,fileName){
         window.open(url);
      },
      exitDialog(e){
          let target = e.target;
          let targetName = target.tagName;
          if(targetName==="SPAN")
              target = target.parentNode;
          let className = target.className;
          if(className.indexOf("inactive")!=-1) return;
          this.dialogVisible=false;
      },
      doSelect(action,idx){
          for(let i=0;i<this.fileSelectedActive.length;i++){
               this.fileSelectedActive[i]="";
          }
          this.fileSelectedActive.splice(idx,1,"active");

          switch (action){
              case "uploadFile":
                  this.fileListView=[];
                  this.fileSelectedForm="uploadFile";
                  let flist = this.fileUpLoadList[this.detailProcessId];

                  //console.log("fulist "+this.detailProcessId,this.fileUpLoadList)

                  if(flist){
                      for(let idx=0;idx< flist.length;idx++){
                          flist[idx].url="#";
                          flist[idx].icon = setFileIcon(flist[idx].name);
                          flist[idx].formatSize = formatSize(flist[idx].size);
                      }
                      this.fileListView = flist

                      this.fileSelectedCount = flist.length;

                  }
                  else   this.fileListView=[]
                  break;
              case "showFile":
                  this.loadProcessFile(this.detailProcessId);
                  this.fileSelectedForm="showFile";
                  this.fileListView =this.fileRecordList;
                  break;
              default:
                  break;
          }


          function formatSize(size) {
              //BYTE字节
              if(size<=1024) {
                  return size + " 字节"
              }
              //KB 千字节
              else if(size>1024&&size<=(1024*1024)){
                  return Math.floor(size/1024)+" KB"
              }
              //MB 兆字节
              else if(size>(1024*1024)&&size<=(1024*1024*1024)){
                  return Math.floor(size/(1024*1024))+"MB";
              }

          }
          function setFileIcon(fileName) {
              let name =fileName .toLowerCase();
              let sufixs = name.split(".");
              let sufix = sufixs.pop();
              let icon="";
              switch(sufix){
                  case "txt":
                      icon ="icon-txt"
                      break;
                  case "doc":
                      icon ="icon-doc"
                      break;
                  case "docx":
                      icon ="icon-docx"
                      break;
                  case "xls":
                  case "xlsx":
                      icon ="icon-xlsx"
                      break;
                  case "pdf":
                      icon="icon-pdf";
                      break;
                  case "ppt":
                      icon="icon-ppt";
                      break;
                  case "jpg":
                      icon="icon-jpg";
                      break;
                  case "png":
                      icon="icon-png";
                      break;
                  case "bmp":
                      icon="icon-bmp";
                      break;
                  default:
                      break;

              }
              return icon;
          }
      },
      selectFile(e){
          let fileLoad = document.getElementById("fileLoad");
          var that = this;
          if(!fileLoad){
              let target =e.target;
              let parent =target.parentNode;
              fileLoad = document.createElement("input");
              fileLoad.setAttribute("type","file");
              fileLoad.setAttribute("multiple","multiple");
              fileLoad.id="fileLoad";

              parent.appendChild(fileLoad);
          }
          fileLoad.setAttribute("style","display:none;");
          fileLoad.onchange= function (e) {
              // that.fileUpLoadList = fileLoad.files;
              let obj = fileLoad.files;
              let list =[];
              for(let idx=0;idx< obj.length;idx++){
                  // icon: undefined
                  // lastModified: 1539178658567
                  // lastModifiedDate: Wed Oct 10 2018 21:37:38 GMT+0800 (中国标准时间) {}
                  // name: "5b37492118336b2652a11896f52efc8e.jpg"
                  // size: 297810
                  // type: "image/jpeg"
                  // webkitRelativePath: ""
                  let reader =  new FileReader();
                  reader.readAsDataURL(obj[idx]);
                  reader.onload = function () {
                      // obj[idx].url=reader.result;
                      let fv =  that.fileListView[idx];
                      fv.url = reader.result;
                      that.fileListView.splice(idx,1,fv);
                  };

                  list.push(obj[idx]);


                  // obj[idx].url="#";
                  list[idx].icon = setFileIcon(list[idx].name);
                  list[idx].formatSize = formatSize(list[idx].size);
                  list[idx].uid = guid();
                  list[idx].vfrom = "file"
              }
              that.fileUpLoadList[that.detailProcessId] = list;
              that.fileSelectedCount = list.length;
              that.fileListView = that.fileUpLoadList[that.detailProcessId];
              function guid() {
                  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                      return v.toString(16);
                  });
              }
              function formatSize(size) {
                  //BYTE字节
                  if(size<=1024) {
                      return size + " 字节"
                  }
                   //KB 千字节
                  else if(size>1024&&size<=(1024*1024)){
                      return Math.floor(size/1024)+" KB"
                  }
                  //MB 兆字节
                  else if(size>(1024*1024)&&size<=(1024*1024*1024)){
                       return Math.floor(size/(1024*1024))+"MB";
                  }

              }
              function setFileIcon(fileName) {
                  let name =fileName .toLowerCase();
                  let sufixs = name.split(".");
                  let sufix = sufixs.pop();
                  let icon="";
                  switch(sufix){
                      case "txt":
                          icon ="icon-txt"
                          break;
                      case "doc":
                          icon ="icon-doc"
                          break;
                      case "docx":
                          icon ="icon-docx"
                          break;
                      case "xls":
                      case "xlsx":
                          icon ="icon-xlsx"
                          break;
                      case "pdf":
                          icon="icon-pdf";
                          break;
                      case "ppt":
                          icon="icon-ppt";
                          break;
                      case "jpg":
                          icon="icon-jpg";
                          break;
                      case "png":
                          icon="icon-png";
                          break;
                      case "bmp":
                          icon="icon-bmp";
                          break;
                      default:
                          break;

                  }
                  return icon;
              }


          }
          fileLoad.click();

      },
      upLoadFile(){
          //将按钮禁用
          this.inactive="inactive";
          let files = this.fileUpLoadList[this.detailProcessId];

          let baseUrl = this.GLOBAL.baseUrl;
          let userID = this.common.getCookie("userID");
          let token = this.common.getCookie("token");
          let  that = this


          let lawyerName =  this.common.getCookie("lawyerName");

          function upMutiFile(list) {
              if(list.length==0) {
                  that.inactive="";
                  return;
              }

              let file = list.pop();
              console.log("list: "+list.length)
              delete  file.formatSize;
              delete  file.icon;
              delete  file.url;
              delete file.uid;
              that.fileSelectedCount--;
              var fd = new FormData();
              fd.append("file",file)
              fd.append("filePath","/src/"+userID)
              fd.append("userid",userID)
              fd.append("token",token)
              that.$http
                  .post(
                      baseUrl + "/order/UpLoadFile",fd
                  )
                  .then(({ data }) => {

                      saveInProcess(data,that.detailProcessId,list);

              });

          }
          function saveInProcess(data,processId,list) {
              // alias: "3.jpg"
              // createUserImgPath: null
              // createUserName: null
              // isExist: null
              // oid: ""
              // srcId: "61806527f668400bb7d035b5d01474cd"
              // srcName: "20190115193222BfK.jpg"
              // srcPath: "/src/U1525405578581qbBSE"
              // staticUrl: "https://icase360.com//src/U1525405578581qbBSE/20190115193222BfK.jpg"
              // alias: null
              // createUserImgPath: "src/U1535453821221pARGX/20181201125814RTE.jpg"
              // createUserName: "test"
              // isExist: true
              // oid: null
              // srcId: "e09725f2a8cc4487b41143668edfd511"
              // srcName: "20190114204326VHN.jpg"
              // srcPath: "/src/U1535453821221pARGX"
              // staticUrl: "https://icase360.com//src/U1535453821221pARGX/20190114204326VHN.jpg"

              let obj = data.data;

              that.$http.post(baseUrl + "/order/saveUserFilePath",that.qs.stringify({

                  "srcId": obj.srcId,
                  "srcPath":obj.srcPath,
              "srcName": obj.srcName,
              "staticUrl": obj.staticUrl,
              "alias": obj.alias,
              "processId": that.detailProcessId,
              "userId": userID}
               )).then((data)=>{
                  obj.createUserName = lawyerName;
                  obj.isExist = true;
                  obj.name = obj.alias;
                  console.log("file",obj);
                  that.fileRecordList.push(obj);

                  that.fileUpCount++;
                  upMutiFile(list);
               });
          }
          upMutiFile(files)


          // debugger


      },
      dialogOpen(){

      },
      showDialog(e,processname,pchildname,id,detailProcessId,pchild){


           let target = e.target;
           this.pchild = pchild;
          this.fileSelectedActive=["","active"],
          this.fileListView=[];
          this.detailProcessId=detailProcessId;
          this.processname =processname;
          this.pchildname=pchildname;
          let count=0;
          for(let key in pchild.templateMap){
              if(pchild.templateMap[key]) {

                  if(pchild.templateMap[key].indexOf( "http://icase360.com/")==-1)
                    pchild.templateMap[key] = "http://icase360.com/" + pchild.templateMap[key]

              }else {
                  delete  pchild.templateMap[key];
                  count--;
              }
             count++;
       }
       if(count<=0){
              pchild.templateMap=undefined;
       }

          this.id = id;

          switch(target.className){
              case "demo":
                  this.dialogClass="template";

                  break;
              case "direction":
                  this.dialogClass="tip";
                  break;
              case "document":
                  this.dialogClass="doc";
                  this.fileSelectedForm="showFile"
                  this.loadProcessFile(detailProcessId);
                  // this.loadProcessDetail(detailProcessId)
                  break;
              default:
                  this.dialogClass="editor";
                  this.loadProcessFile(detailProcessId);
                  this.loadProcessDetail(detailProcessId)
                  break;
          }

          this.dialogVisible=true;

      },
      loadProcessDetail(id){
          let baseUrl = this.GLOBAL.baseUrl;
          let that = this;
          let userID = this.common.getCookie("userID");
          let token = this.common.getCookie("token");



          this.$http
              .post(
                  baseUrl + "/order/CheckCaseProcessInfo",this.qs.stringify(
                      {
                          detailProcessId: id,
                          userid: userID,
                          token: token,

                      }
                  )
              )
              .then(({ data }) => {

                  that.minute=data.data.workTime;
                  if(data.data.remark)
                  that.remark=data.data.remark;
                  else
                  that.remark="";

          });


      },
      loadProcessFile(id){
          let baseUrl = this.GLOBAL.baseUrl;
          let that = this;
          this.$http
              .post(
                  baseUrl + "/order/getUserFilePath",this.qs.stringify(
                      {processId:id}
                  )
              )
              .then(({ data }) => {
                  let  objs=[]
                  for(let idx=0;idx<data.length;idx++){
                      let obj ={};
                      obj.name=data[idx].alias;
                      obj.srcId = data[idx].srcId;
                      obj.url=data[idx].staticUrl
                      obj.icon = setFileIcon(obj.name);
                      obj.formatSize = formatSize(obj.size)
                      obj.vfrom="obj";
                      objs.push(obj);

              // that.fileRecordList.push(obj)
                  }
                  that.fileRecordList=objs
                  that.fileUpCount = that.fileRecordList.length;
                  that.fileListView = that.fileRecordList;
          var flw = document.getElementById("flw");
          var wl = document.getElementsByClassName("watch-li");
          flw.onscroll=function (e) {
              // console.log("flw ",flw.getBoundingClientRect(),"wl ",wl[0].getBoundingClientRect())

              if(flw.getBoundingClientRect().bottom - wl[0].getBoundingClientRect().bottom>0){
                   // that.loadProcessFile(id)
              }


          }





          function formatSize(size) {
              //BYTE字节
              if(size<=1024) {
                  return size + " 字节"
              }
              //KB 千字节
              else if(size>1024&&size<=(1024*1024)){
                  return Math.floor(size/1024)+" KB"
              }
              //MB 兆字节
              else if(size>(1024*1024)&&size<=(1024*1024*1024)){
                  return Math.floor(size/(1024*1024))+"MB";
              }

          }
          function setFileIcon(fileName) {
              let name =fileName .toLowerCase();
              let sufixs = name.split(".");
              let sufix = sufixs.pop();
              let icon="";
              switch(sufix){
                  case "txt":
                      icon ="icon-txt"
                      break;
                  case "doc":
                      icon ="icon-doc"
                      break;
                  case "docx":
                      icon ="icon-docx"
                      break;
                  case "xls":
                  case "xlsx":
                      icon ="icon-xlsx"
                      break;
                  case "pdf":
                      icon="icon-pdf";
                      break;
                  case "ppt":
                      icon="icon-ppt";
                      break;
                  case "jpg":
                      icon="icon-jpg";
                      break;
                  case "png":
                      icon="icon-png";
                      break;
                  case "bmp":
                      icon="icon-bmp";
                      break;
                  default:
                      break;

              }
              return icon;
          }


      });
      },
      addLawyerMember(obj){
//          order/addOrderMember
          let baseUrl = this.GLOBAL.baseUrl;
          let userID = this.common.getCookie("userID");
          let lawyerId = this.common.getCookie("lawyerId");
//          "path": null, "lawyerName": "刘小二", "registerId": "10d5d2c2d5194ccfb699f618cec69e2a", "": false, "imageUrl": null,
              let that = this;
          let oid = that.id;
          this.$http
              .get(
                  baseUrl + "/order/addOrderMember?orderId="+oid+"&lawyerId="+obj.registerId+"&userId="+userID
              )
              .then(({ data }) => {
                  if(data.code == 0){
                      let o={}
                      o.lawyerName = obj.lawyerName;
                      o.registerId = obj.registerId;
                      o.isSponsors = false;
                      o.imageUrl = obj.imageUrl;


                      that.caseDetail.orderMember.push(o);
                      that.isSearch = false;
                 }


              });


      },
      imgOnLoad(e,menber){
         // let parent = e.target.parentNode;
          e.target.parentNode.className= "";

      },
      imgError(e,menber){

          let parent = e.target.parentNode;
          parent.setAttribute("class","icon_no_img");
          this.imgShow = false;

      },

      searchLawyerMember(e){
          let searchValue = this.searchValue;
          if(searchValue ===""){
               this.isSearch=false
               return;
          }
          if(e.keyCode !=13) return;
          let baseUrl = this.GLOBAL.baseUrl;
          this.$http
              .get(
                  baseUrl + "/findRegisterLawyer",{
                      params: {
                       lawyerName:searchValue
                    }
                  }
              )
              .then(({ data }) => {
                  if(data.code==0){
                      let caseDetail =this.caseDetail;
                      let member = caseDetail.orderMember;
                      let namesMap ={};
                      for(let idx in member){
                          let sponsors=" ";
                          if(member[idx].isSponsors){
                              sponsors ="主办"
                          }
                            else{
                              sponsors="协作"
                            }
                            namesMap[member[idx].lawyerName] =sponsors;
                      }

                      for(let idx in data.data){
                           let sponsors = namesMap[data.data[idx].lawyerName]
                          data.data[idx].sponsors="";

                          if(sponsors){
                                data.data[idx].sponsors = sponsors;
                           }
                      }
                      this.lawyerMembers = data.data;

                      this.isSearch = true;
                  }
          });

      },
    createCase(e) {
        let target = e.target;
        let targetName = target.tagName;
        if(targetName==="SPAN")
            target = target.parentNode;
        let className = target.className;
        if(className.indexOf("inactive")!=-1) return;
      let baseUrl = this.GLOBAL.baseUrl;
       let userID = this.common.getCookie("userID");
        let token = this.common.getCookie("token");
        let that = this;
        console.log(that.remark);

        let response = {
            detailProcessId: that.detailProcessId,
            remark: that.remark,
            token:token ,
            userid: userID,
            workTime: that.minute,
        };


      this.$http
        .post(
          baseUrl + "/order/EditCaseProcess",response
        )
        .then(({ data }) => {
            let checked = document.getElementById(that.detailProcessId);
            let checkedInput = checked.children[0];
            let clsName =  checkedInput.className;
            if(clsName.indexOf("is-checked")==-1)
                checkedInput.className+=" is-checked"
    // :id="pchild.detailProcessId" el-checkbox__input
           that.dialogVisible =false;

        });
    }
  }
};
</script>
<!--上传文件部分样式-->
<style lang="less">
    .process{
        position:relative;
    }
    .icon-number{
        width: 23px;
        height: 23px;
        content: "";
        display: inline-block;
        position: absolute;
        top: 10px;
        left: 15px;
        background-image: url("../assets/images/number-icon.png") ;
        background-repeat: no-repeat;

    }
    .icon-1{
        background-position: 0px 0px;

    }
    .icon-2{
        background-position: 0px -24px;

    }
    .icon-3{
        background-position: -23px 0px;
    }
    .icon-4{
        background-position: -23px -24px;
    }
    .icon-5{
        background-position: -46px 0px;
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

    .showFile{
        .create-btn{
            display: none !important;
        }
        .empty-text1{
             display: none !important;
        }

    }
    .uploadFile{
        .empty-text2{
            display: none !important;
        }
    }
    .el-popover{
        img{
            max-width: 320px;
            max-height:160px;
        }
        .not-view{
             display: none;
        }
        .icon_no_img{
            img{
                display: none
            }
            .not-view{
                display: block;
            }
        }
    }
    .file-upload{
        border: 1px solid #eee;
        border-radius: 10px;
        margin-top: 12px;
        .el-input{
            width: 25%;
            padding: 12px 0px;
            padding-left: 10px;
            .el-input__inner{
                height: 32px;
                line-height: 32px;

            }

        }
        ul{
            list-style: none;
            padding: 0;
            margin: 0;
            border-bottom: 1px solid #eee;
        }
        .file-selected{
            li {
                display: inline-block;
                color:#909399;
                padding: 0 12px;
                padding-top: 6px;
                padding-bottom: 6px;
            }
            li:first-child{
                 border-top-left-radius: 10px;
                border-right: 1px solid #eee;
            }
            .active{
                background: linear-gradient(to right, #28d9ce, #336ece);
                color: #fff;
            }
            .active:hover{
                 cursor: default;
                color: #fff;
            }
            li:hover{
                cursor: pointer;
                color: #000;
            }


        }
        .file-list-warp{

        }

        .file-list{
            min-height: 1px;
            position: relative;
            height: 320px;
            overflow: auto;


            li{
                border-bottom:1px solid #ccc;
                position: relative;
                padding: 6px 0;


            }
            li:first-child{
                border-top:1px solid #ccc ;
            }
            .watch-li{
                 border: 0;
                height: 1px;
                padding: 0;
            }
            .empty-list:first-child{
                 border: 0px;
            }
            .empty-list{
                 border: 0;
                position: absolute;

                width: 100%;

                top: 128px;
                text-align: center;
                font-size: 14px;
            }
            li div {
                display: inline-block;
            }
            .file-name{
                padding-left: 12px;
                position: relative;
                bottom: 14px;
                display: inline-block;
                width: 190px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap
            }
            .file-size{
                 font-size: 14px;
                 position: absolute;
                top: 27px;
                left: 46px;
            }
            .progress{
                 margin-left: 12px;
                 width: 320px;
                 min-height: 2px;
                margin-right: 12px;
                position: relative;
                bottom: 8px;
            }
        }
        .show-icon{
            width: 100%;
            height: 2.4rem;
            overflow-x: hidden;
            .empty-list{
                top:0.97rem;
            }
            li{
                float: left;
                width: 11.5%;
                height: 1.2rem;
                padding: 0 0.06rem;
                margin: 0 0.06rem;
                margin-bottom:0.12rem;
                border:0px;
                :after{
                    content: " ";
                    display: block;
                    clear: both;
                }
                .icon{
                    width: 0.16rem;
                    height: 0.16rem;
                }
                .icon-del{
                    position: absolute;
                    top: 0;
                    left:0.89rem;

                }

                .icon_default{
                     width: 0.38rem;
                     height: 0.38rem;
                    left: 0.28rem;
                    top:0.18rem;
                }
                .file-name{
                    width: 100%;
                    top: 0.2rem;
                    padding: 0;
                }
                .file-size{
                    left: 0px;
                    width: 100%;
                    text-align: center;
                    top: 0.9rem;
                }
            }

            li:first-child{
                 border-top: 0px;
            }
            .watch-li{
                display: none;
            }

        }

        /*##icon##*/
        .icon{
            display: inline-block;
            width: 20px;
            height: 20px;
            padding: 5px;
            background-color: #fff;
            position: relative;
             top: 2px;

        }
        .icon_default{
            width: 32px;
            height: 32px;
            padding: 2px;

        }
        .icon-del{
             top:-2px;
            left: 160px;
        }
        .icon:after{
            content:"";
            display: inline-block;
            width: 100%;
            height: 100%;

        }
        .icon-txt{
            background-image: url("../assets/images/file/TEXT.png");
            background-size: 100% 100%;
        }
        .icon-doc:after{
            background-image: url("../assets/images/file/DOC.png");
            background-size: 100% 100%;
        }

        .icon-docx:after{
            background-image: url("../assets/images/file/DOCX.png");
            background-size: 100% 100%;
        }
        .icon-xlsx:after{
            background-image: url("../assets/images/file/XLSX.png");
            background-size: 100% 100%;
        }


        .icon-pdf:after{
            background-image: url("../assets/images/file/PDF.png");
            background-size: 100% 100%;
        }
        .icon-ppt:after{
            background-image: url("../assets/images/file/PPT.png");
            background-size: 100% 100%;
        }

        .icon-jpg:after{
            background-image: url("../assets/images/file/JPG.png");
            background-size: 100% 100%;
        }
        .icon-png:after{
            background-image: url("../assets/images/file/PNG.png");
            background-size: 100% 100%;
        }
        .icon-bmp:after{
            background-image: url("../assets/images/file/BMP.png");
            background-size: 100% 100%;
        }

        .icon-del:after{
            background-image: url("../assets/images/file/del.png");
            background-size: 100% 100%;
        }
        .icon-del:hover:after{
            background-image: url("../assets/images/file/del_active.png");
            background-size: 100% 100%;
            cursor: pointer;
        }

    }

</style>
<style lang="less">
.case-process {
  .body-head {
    background-color: #f6f6f8;
  }
    .el-checkbox__input{
        .el-checkbox__inner{
            width: 20px;
            height: 20px;
            border: 1px solid #dcdfe6;
            background-color: #fff;
            position: relative;
            left: -13px;

        }

    }
    .checked{
        margin-right: 0;
    }
    .is-checked{
        .el-checkbox__inner::after{
            border: 2px solid #336fcf;
            border-left: 0;
            border-top: 0;
            height: 12px;
            width: 6px;
            top:0px;
            left: 5px;
        }
    }
  .sequence {
    margin: 35px 0;
    padding: 0;
    height: 63px;
    line-height: 63px;
    border-radius: 10px;
    border: 1px solid #e4e4e6;
    background-color: #ffffff;
    list-style: none;
    li {
      width: 24%;
      display: inline-block;
      color: #a9aaaa;
      font-size: 24px;
      text-align: center;
    }
    .selected {
      color: #336fcf;
    }
  }

  .create-btn {
      display: inline-block;
      width: 50%;
    button {
      background: linear-gradient(
        to right,
        rgb(40, 217, 206),
        rgb(51, 110, 206)
      );
      margin: 35px 0;
      padding: 0;
      height: 63px;
      line-height: 63px;
      border: 1px solid #e4e4e6;
      border-radius: 10px;
      width: 100%;
      font-size: 24px;
      color: #ffffff;
    }
      .btn-sm{
          height: 32px;
          line-height: 32px;
          font-size: 14px;
          margin: 0;
          width: 20%;
          margin-right: 6px;

      }
      .btn-sm:hover{
           cursor: pointer;
      }
  }
    .btn-new{
        text-align: right;
        position: relative;
        left: 215px;
    }
  .content-head {
     .title {
          font-size: 24px;
          color: #336fcf ;
          padding-right: 8px;
         font-weight: normal;
         position: relative;
          padding-bottom: 12px;
     }
      .title-sm{
          font-size: 18px;
          color: #a9aaaa;
          font-weight: normal;
      }
      .title:after{
           content: "";
           display: block;
           width: 82px;
            height: 2px;
            box-shadow:#a9aaaa 1px 1px 0px 0px ;
            background: linear-gradient(to right, #F29C22, #D0503A);

           position: absolute;
           bottom: 0;
           left: 0;

      }



    ul {
      padding: 20px 0;
      margin: 0;
      border-bottom: 1px solid #eee;
      li {
        list-style: none;
        display: inline-block;
        text-align: center;
        font-size: 24px;
        color: #626262;
      }
      .first {
        width: 16%;
      }
      .second {
        width: 18%;
      }
      .third {
        width: 18%;
      }
      .fouth {
        width: 32%;
      }
      .fifth {
        width: 16%;
      }
    }
  }
  .content-body {

      .process{
          h5{
              margin: 0;
              margin-top: 13px;
              padding: 10px;
              background: linear-gradient(to right, rgb(40, 217, 206), rgb(51, 110, 206));
              color: #fff;
              border-radius: 15px;
              font-size: 16px;
              padding-left: 45px;
              font-weight: normal;

          }
          .process-detail{
              margin-top: 10px;
              padding-left: 2%;
              padding-right: 3%;
              padding-bottom: 10px;
              border-bottom: 1px solid #ccc;
            :hover{
               cursor: pointer;
            }
              >span{
                  display: inline-block;
                  font-size: 13px;
                  color: #626262;
              }
              .checked{
                  width: 3%;
                  text-align: center;
              }
              .name{
                  width: 27%;
              }
              .demo, .direction, .document{
                  width: 10%;
                  text-align: center;
              }
            .demo:hover, .direction:hover, .document:hover{
                  color: #336fcf;
                  cursor: pointer;
            }

              .time{
                  width: 25%;
                  text-align: right;
                  float: right;
                  color: #a9aaaa;
              }
          }
      }
      .case-padding{

         width: 3.68rem;
         height:7.69rem ;
         border: 1px solid #e5e5e5 ;
        border-radius: 0.1rem;
        background-color: #fff;
        margin-left: 0.61rem;
        .warp{

           padding: 0 0.3rem;
            h4{
                color: #336fcf;
                margin-bottom: 0px;

            }
            h4:after{
                content: " ";
                display: block;      width: 0.8rem;
                position: relative;
                top: 7px;
                height: 2px;
                background: linear-gradient(to right, #F29C22, #D0503A);
            }
           .case-detail{
              padding: 0;
               margin-top: 0.18rem;
              list-style: none;
              li{
                 margin-top: 0.12rem;
              }
               .title{
                   color: #626262;
                   font-size: 16px;
                   display: inline-block;
                   width: 1rem;
               }
               .content{
                   color: #a9aaaa;
               }

           }
            .case-team{
                margin-top: 0.12rem;
                .first-text{
                    color: #626262;
                    display: block;
                    margin-top: 0.12rem;
                    padding-bottom: 0.12rem;
                }
            }
          .search-box .el-input__inner {
            margin: 0px 0;
            padding: 0;

            border: 1px solid #e4e4e6;
            border-radius: 10px;
            font-size: 14px;
            padding-left: 5%;
          }
          .case-teamers{
              position: relative;
              img{
                width: 32px;
                height: 32px;
                padding: 2px;
                border-radius: 50%;
                background-color: #e3e3e6;
                margin-right: 8px;
              }
            .first{
               padding: 0;
               list-style: none;
               margin: 0;
               margin-top: 12px;
               margin-bottom: 12px;
            }

            .first li{
               display: inline-block;
               position: relative;


            }
            .first .icon_no_img .icon_title{
                margin-right: 8px;
                position: relative;
                top: -11px;

            }
          .icon_no_img .icon_title{
                display: block;

            }
           .icon_no_img img{
              display: none;
            }
            .icon_no_img .icon-inner{
              top: -20px;
              left: 20px;
            }
            li .icon_title{
              display: none;
            }
            .first img:hover{
               cursor: pointer;
            }
            .icon_title{
                background-color: darkgoldenrod;
                width: 20px;
                height: 20px;
                padding: 8px;
                border-radius: 50%;
            }
            .icon_title:hover:after{
               cursor: pointer;
            }
            .icon_title:after{
               content: attr(data-after);
               display: inline-block;
               font-style: normal;
               font-size: 16px;
              width: 100%;
              text-align: center;
               color:white;
            }

               .icon{
                  display: inline-block;
                  width: 20px;
                  height: 20px;
                  padding: 8px;
                  position: relative;
                  left: 140px;

                  background-color: #fff;
               }
               .icon:after{
                  content:"";
                  display: inline-block;
                  width: 100%;
                 height: 100%;
               }
            .icon-inner{
              position: absolute;
              top: -21px;
              left: 13px;
              background-color: rgba(0,0,0,0);
            }
            .name-content{
               width: 45px;
            }
            .role-content{
               width: 28px;
               min-height: 2px;
            }
               .icon-teamer:after{
                 background-image: url("../assets/images/teamer.png");
                 background-size: 100% 100%;
               }
                .icon-star:after{
                  background-image: url("../assets/images/star.png");
                  background-size: 100% 100%;
                } ;
               .icon-add:after{

                   background-image: url("../assets/images/add-unactive.png");
                   background-size: 100% 100%;
               }
               .icon-add:hover:after{
                   background-image: url("../assets/images/add.png");
                   background-size: 100% 100%;
               }
               .icon:hover{
                  cursor: pointer;

               }
              .teamer-search{
                padding: 0;
                list-style: none;
                margin: 0;
                background-color: #fff;
                position: absolute;
                top:-33px;
                li{
                  padding: 4px;
                  padding-left: 0.15rem;
                  border-bottom: 1px solid #ececec;
                  margin-bottom: 2px;
                  width: 290px;
                }
                li img,li span{
                   float: left;
                  margin: 0;
                }
                li span{
                   font-size: 14px;
                  color: #A9AAAA;
                  position: relative;
                  top: 9px;
                  padding-left: 6px;
                }
                li:after{
                  content: " ";
                  display: block;
                  clear: both;
                }


              }
          }


        }


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
        width: 50% !important;
    }
    .el-dialog__header {
      background-color: #f8f7fa;
      padding: 0;
        padding-top: 0.12rem;
        padding-bottom: 0.12rem;
        padding-left: 0.20rem;
        /*padding: 30px 0 30px 43px;*/
      border-top-left-radius: 20px;
      border-top-right-radius: 20px;

        h5{
            padding: 0;
            margin: 0;
            font-size: 20px;
            font-weight: normal;
            color: #626262;
        }
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
        .inactive{
            cursor: not-allowed !important;
            background: rgba(0,0,0,0.5) !important;
        }
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

  .editor{
      .el-dialog{
           width: 50% !important;


      }
      .el-dialog__body{
          padding: 0.2rem 0.2rem;
      }
      textarea{
           width: 99%;
           height: 120px;
          border-radius: 10px;
          border: 1px solid #eee;
          resize: none;
      }
      label{
          font-size: 16px;
          display: inline-block;
          padding-right: 0.12rem;
      }
      .input_minute{
        width: 10%;
          margin-right: 12px;
      }
    .type2,.type3,.type4{
       display: none;
    }
  }
   .template{
      .type1,.type3,.type4{
          display: none;
      }
       p{
           color: #626262;
           font-size: 18px;
       }
       ul{
           list-style: none;
           padding: 0;
           padding: 24px;

           border-radius: 10px;
           background-color: #f7f7fa;
           li{
               padding-bottom: 10px;
           }

           .content{
               display: inline-block;
               width: 160px;
               font-size: 16px;
               color: black;
               overflow: hidden;
               text-overflow:ellipsis;
               white-space:nowrap
           }

           .link:after{
               content: "下载";
               height: 21px;
               font-size: 16px;
               color: #FA8004;
               display: inline-block;
               margin-right: 6px;
               position: relative;
               top:-5px;
           }
           .link:before{
               content: " ";
               width: 21px;
               height: 21px;
               background-image: url("../assets/images/icon-down.png");
               background-size: 100% 100%;
               display: inline-block;
               margin-right: 5px;
           }

       }
       .dialog-footer{
            .save{
                 display: none;
            }
       }
   }
  .tip{
    .type1,.type2,.type4{
        display: none;
    }
      .dialog-footer{
          .save{
              display: none;
          }
      }
      ul{
          list-style: none;
          padding: 0;

          padding: 24px;

          border-radius: 10px;
          background-color: #f7f7fa;
          li{
              padding-bottom: 10px;
          }

          .content{
              display: inline-block;
              width: 160px;
              font-size: 16px;
              color: black;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space:nowrap
          }

          .link:after{
              content: "下载";
              height: 21px;
              font-size: 16px;
              color: #FA8004;
              display: inline-block;
              margin-right: 6px;
              position: relative;
              top:-5px;
          }
          .link:before{
              content: " ";
              width: 21px;
              height: 21px;
              background-image: url("../assets/images/icon-down.png");
              background-size: 100% 100%;
              display: inline-block;
              margin-right: 5px;
          }

      }
      p{
          color: #626262;
          font-size: 18px;
      }

  }
  .doc{
    .type1,.type2,.type3{
        display: none;
    }
      .dialog-footer{
          .save{
              display: none;
          }
      }
  }
}



@media screen  and (max-width: 1366px){
    .file-upload .el-input .el-input__inner{
        font-size: 12px;
    }
}


</style>
<!--1366 media-->
<style scoped lang="less">
    @media screen  and (max-width: 1366px){
        .case-process {
            width: 1024px;
            margin: 0 auto;
            .content-head .title{
                font-size: 18px;
            }
            .icon-number{
                top:9px;
            }
            .content-body .process .process-detail{
                padding-left: 5%;
            }
            .content-body .process .process-detail .name{
                width: 32%;
            }
            .content-body .case-padding{
                width: 3rem;
            }
            .content-body .process .process-detail .time{
                line-height: 2.2;
            }
            .content-body .process .process-detail > span{
                font-size: 12px;
            }
            .el-checkbox__input .el-checkbox__inner{
                left: 0px;
            }
            .content-head .title-sm{
                font-size: 14px;
            }
            .content-head .title:after{
                width: 60px;
            }
            .case-process .content-body .process h5{
                font-size: 14px;
                margin-top: 10px;
            }
            .content-body .case-padding .warp .case-detail .title{
                font-size: 14px;
            }
            .content-body .case-padding .warp .case-detail .content{
                font-size: 12px;
            }
            .content-body .case-padding .warp h4{
                font-size: 16px;
            }
            .content-body .case-padding .warp .case-teamers .teamer-search{
                top:-57px;
            }
            .content-body .case-padding .warp .case-teamers .teamer-search li{
                width: 218px;
            }
            .content-body .case-padding .warp .case-teamers .icon-add{
                left: 67px;
            }
            .content-body .case-padding .warp .search-box .el-input__inner{
                font-size: 12px;
            }

            .el-fixed{
               margin-left: 0.12rem;
          }
        }
        .file-upload .el-input{
            width: 32%;
        }
        .case-process .btn-new{
            left: 85px;
        }
        .case-process .create-btn .btn-sm{
            width: 28%;
        }

    }
</style>
