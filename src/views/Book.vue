<template>
  <div id="book" class="book">
    <el-row class="body-head">      
      <el-col :span="8" :offset="8" class="serach"> 
        <el-input
          placeholder="输入法官名,然后选择法院进行搜索"
          suffix-icon="el-icon-search"
          class="search-box"
          v-model="searchValue" >
        </el-input>
      </el-col>
    </el-row>
    <el-row class="content-head">      
      <el-col :span="18"  class="list"> 
        <ul>
          <li v-for="item in bookList" :key="item.ids" @click="showTellBook(item,0)">
            <img :src="item.imageUrl" alt="">
            <p v-text="item.name"></p>
          </li>
        </ul>
      </el-col>


      <el-col :span="6"  class="list-history">
        <div class="history-title">
          <h4>历史记录</h4>
        </div>

       <ul>
         <!--<li>秦淮区法院 赵雪妍</li>-->
         <!--<li>秦淮区法院 赵雪妍</li>-->
         <!--<li>秦淮区法院 赵雪妍</li>-->
         <!--<li>秦淮区法院 赵雪妍</li>-->
         <!--<li>秦淮区法院 赵雪妍</li>-->
       </ul>
      </el-col>
    </el-row>
    <el-dialog
            width="80%"
            :visible.sync="dialogVisible"
            class='new-case' @opened="dialogOpen"  :top="dialogTop">

           <div>

             <table>
               <!--生成表格-->
               <thead>
                 <tr>

                   <td v-for="(state,index) in tableHeadResult "   v-if="state!=0"  class="col"  :colspan="(index%2)==0?2:1">
                     <span v-if="index%2==0">部门</span>
                     <span v-else="" >姓名</span>
                   </td>

                 </tr>
               </thead>
               <tbody>
               <!--<div class="judge_pop">-->
                 <!--<ul>-->
                   <!--<li><span>姓名</span><span>:</span><span>c.name</span></li>-->
                   <!--<li><span>固定电话</span><span>:</span><span>c.contactWay</span></li>-->
                   <!--<li><span>移动电话</span><span>:</span><span>c.mobile</span></li>-->
                   <!--<li><span>邮箱地址</span><span>:</span><span>c.email}}</span></li>-->
                   <!--<li><span>单位名称</span><span>:</span><span>c.workUnit</span></li>-->
                   <!--<li><span>单位地址</span><span>:</span><span>c.workAddress</span></li>-->

                 <!--</ul>-->
               <!--</div>-->

               <tr  v-for="(t,row) in tableResult">
                 <td    :rowspan="c.row" col="0" class="col" :class="'col_'+col%3"  v-if="c!=0" v-for="(c,col) in t" >

                   <el-popover class="active-table" v-if="(col+1)%3==0"
                   placement="right"
                               trigger="hover"
                   content="">
                   <div class="judge_pop">
                     <ul>
                       <li><span class="title">姓名</span><span>:</span><span class="content">{{c.name}}</span></li>
                       <li><span class="title">固定电话</span><span>:</span><span class="content">{{c.contactWay}}</span></li>
                       <li><span class="title">移动电话</span><span>:</span><span class="content">{{c.mobile}}</span></li>
                       <li><span class="title">邮箱地址</span><span>:</span><span class="content">{{c.email}}</span></li>
                       <li><span class="title">单位名称</span><span>:</span><span class="content">{{c.workUnit}}</span></li>
                       <li><span class="title">单位地址</span><span>:</span><span class="content">{{c.workAddress}}</span></li>

                     </ul>
                   </div>
                   <span  slot="reference" @click="saveJudge($event,c)"> {{c.name}}</span>

                   </el-popover>

                   <span v-else>{{c.name}}</span>

                 </td>
               </tr>
               </tbody>
             </table>
             <el-pagination v-if="maxPage!==0"
                            layout="prev, pager, next"
                            :total="maxPage*10"    @current-change="pageChange($event)" >
             </el-pagination>

           </div>
    </el-dialog>

  </div>


</template>
<script>
// @ is an alias to /src

export default {
  name: "book",
  components: {
    
  },
  data(){
    return{
      searchValue:"",
      bookList:[],
        dialogTop:"2vh",
      court:{},
        dialogVisible:false,
        tableCol:15,
        tableRow:25,
        maxPage:0,
        tableResult:[],
        tableHeadResult:[],
        bookData:[
            {}
        ]

    }
  },
  mounted(){
    let baseUrl = this.GLOBAL.baseUrl;
    let areaCode =  this.common.getCookie("areaCode")
     this.$http
      .get(baseUrl + "/order/getAddressBookCourt", {
        params: {
         code:areaCode,
         status:"1"
        }
      })
      .then(({ data }) => {
        this.bookList = data.data;
      });
  },
    methods:{
        saveJudge(e,o){

        },
        pageChange(e){
            this.showTellBook(this.court,e-1)
        },
        dialogOpen(){
            // order/getAddressBookList?name=&courtCode=22%2C&page=1
        },
        showTellBook(item,page){
            this.court=item;
            if(this.searchValue !==""){
                 item.search = this.searchValue;
            }
            this.dialogVisible=true;
            let tableInit =new Array();
            var that = this;
            function getBook(item,page) {


                let baseUrl = that.GLOBAL.baseUrl;
                that.$http
                    .get(baseUrl + "/order/getAddressBookList", {
                        params: {
                            courtCode:item.ids,
                            name:item.search,
                            size:125,
                            page:page
                        }
                    })
                    .then(({ data }) => {
                       that.maxPage = data.maxPage;

                    // this.bookList = data.data;
                //生成表格
                // 初始化二维数组
                for(let row =0;row<that.tableRow;row++){
                    tableInit[row]=new Array();
                    for (let col=0;col<that.tableCol;col++){
                        tableInit[row][col]=0
                    }
                }

                let  result = {};
                data = data.data;
                for(let idx in data ){
                    // 按一级部门->二级部门->人员进行整理
                    /*
                                  ->人员
                            二级
                *                 ->人员
                *   一级->
                *
                *          二级
                    */
                    idx = parseInt(idx);

                    let root = data[idx];
                    let officeName =root.officeAddress;
                    let roomName =root.officeTwice;
                    let room={};

                    if (!result[officeName]){
                        if(!room[roomName]){
                            room[roomName]={}
                            room[roomName].judge={}
                            let judge ={}
                            if(!judge[root.id]){
                                judge[root.id]=root

                            }
                            room[roomName].judge=judge;
                            room[roomName].count = 1;

                        }
                        result[officeName]={}
                        result[officeName].room={}
                        result[officeName].room = room;
                        result[officeName].room.count = 1;

                        result[officeName].count = 1
                    }else {
                        let temp = result[officeName]
                        temp.count += 1;
                        room = temp;
                        let judge ={}
                        if(!room[roomName]){
                            room[roomName]={}
                            room[roomName].judge=judge
                            room[roomName].count=1;

                        }else if(!room[roomName].judge[root.id]){
                            room[roomName].count+=1;
                        }
                        room[roomName].judge[root.id] = root
                    }
                    //
                    result[officeName] =room;



                }
                //计算出要合并的列,从哪行开始进行合并
                /*          按一级为n 二级为 n+1 三级为 n+2 的次序将每个元素对应到对应的二维数组中
                      *          当行数 n >rowMax时  列数变为 n= n+3
                      *          当 n 的元素超过rowMax时,重新列开始计数
                      *
                      * */


                let col =0;
                let row =0;
                let tempArr =[];

                for(let key in result) {
                    for(let room in result[key]){
                        for(let judge in result[key][room].judge){
                            tempArr.push({row:result[key].count,name:key})
                            tempArr.push({row:result[key][room].count,name:room})
                            result[key][room].judge[judge].row=1
                            tempArr.push(result[key][room].judge[judge])

                        }
                    }
                }
                console.log(result)
                let saveCol1 = "";

                let saveCount1=0;
                let saveObj1=[];
                let saveCol2 = "";
                let saveCount2=0;
                let saveObj2=[];
                console.log("length: ",tempArr.length);
                let nowCol =0;
                for(let idx=0; idx<tempArr.length/3;idx++){
                    let y = idx % that.tableRow;
                    let x = Math.floor((idx-y)/that.tableCol);
                    tableInit[y][x * 3] = tempArr[idx*3]
                    tableInit[y][x * 3].row=1;
                    tableInit[y][x*3+1] =tempArr[idx*3+1]
                    tableInit[y][x*3+1].row=1
                    tableInit[y][x*3+2] =tempArr[idx*3+2]
                    tableInit[y][x*3+2].row=1
                }
                let  colLength = tableInit[0].length/3;
                        let resultMap ={};

                  //计算head
                   let headResult = tableInit[0];
                   let hstate =[]
                   for(let idx=0;idx< headResult.length/3;idx++){
                       if(headResult[idx*3]==0){
                           hstate.push(0);
                           hstate.push(0);
                       }else{
                           hstate.push(1);
                           hstate.push(1);
                       }

                   }
                   that.tableHeadResult = hstate;
                function processTable(table,n,offest) {
                    let col = 0;
                    while(col<colLength){
                        let row =0;
                        while(row <table.length){
                            let result1 = table[row][col*n+offest];
                            if(result1 === 0){
                                row+=1;
                                continue;
                            }
                            let key = result1.name+"_"+row+"_"+(col*n+offest);
                            //遍历列看是否有重复的元素,直到有碰到不同的元素
                            resultMap[key] ={}
                            resultMap[key].pos =[row,col*n+offest]
                            resultMap[key].count =1;
                            let resultRow = row+1;
                            for(;resultRow <table.length;resultRow++){
                                let tempResult = table[resultRow][col*n+offest];
                                if(tempResult===0|| result1.name === tempResult.name){
                                    resultMap[key].count +=1;
                                    table[resultRow][col *n+offest] = 0;
                                }else if(result1.name !== tempResult.name){
                                    row = resultRow;
                                    break;
                                }
                            }
                            if(resultRow >=table.length){
                                break;
                            }

                        }
                        col++;

                    }
                    for(let key in resultMap){
                        let pos =  resultMap[key].pos;
                        table[pos[0]][pos[1]].row =  resultMap[key].count
                    }
                    return table;
                }

                 tableInit =processTable(tableInit,3,0);
                 tableInit =processTable(tableInit,3,1);
                that.tableResult =tableInit;



            });


            }


            getBook(item,page)



        },
    }
};
</script>
<style lang="less">
  .list-history .history-title{
      height:0.64rem;
      background-color: #f0f0f0;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
  }
  .el-dialog__body{
    padding: 15px 20px;
  }
  .el-pagination{
     text-align: center;
    padding: 0.12rem 0;
  }
  .col{
     color: #626262;
    text-align: center;
    font-size: 20px;
    padding: 2px;
    padding-bottom: 0.12rem;
  }

  .col_0,.col_1,.col_2{
     width: 1.2rem;
     color: #838485;
     font-size: 14px;
    padding-bottom: 0.02rem;

  }
  .col_0{
    width: 0.12rem;
  }

#book {
  /*background-color: #f6f6f8;*/
  width: 1366px;
  margin: 0 auto;
  .body-head {
    padding-top: 30px;
    padding-bottom: 21px;
  }
  .active-table{
     cursor: pointer;

  }
  .content-head{
    .list{
      padding-left: 47px;
      ul{
        padding: 0;
        margin: 0;
        li:hover{
           transform: scale(1.2);
           cursor: pointer;
          border-radius: 10px;
        }
        li{
          list-style: none;
          display: inline-block;
          width: 31%;
          margin-right: 1%;
          margin-bottom: 20px;
          background-color: #fff;
          vertical-align: top;
          text-align: center;
          img{
            width: 100%;
            height: 130px;
            border-top-right-radius: 0.1rem;
            border-top-left-radius: 0.1rem;
          }
          p{
            font-size: 16px;
            margin: 0;
            padding-top: 0.08rem;
            padding-bottom: 0.08rem;
            padding-left: 0.12rem;
            text-align: left;
            color: #626262;
            position: relative;
          }
          p:after{
            content: " ";
            display: inline-block;
            width: 0.24rem;
            height: 0.24rem;
            background-image: url("../assets/images/icon-court-detail.png");
            background-size: 100% 100%;
            position: absolute;
            right: 0;
            top: 0.1rem;
            margin-right: 10px;
          }

        }
      }
    }

    .list-history{
      /*padding-right: 5%;*/
      border: 1px solid #a9aaaa;
      border-radius:10px ;
      width: 3rem;
      height: 7.6rem;
      /*padding: 0 0.3rem;*/
      h4{
        font-size: 18px;
        font-weight: normal;
        padding:0.3rem;
        padding-top: 0.2rem;
        color:#626262;
        /*background-color: #E8EAEC;*/

        margin: 0;
        /*border-top-right-radius: 10px;*/
        /*border-top-left-radius: 10px;*/
        /*border: 1px solid #000;*/
        border-bottom: none;
      }
      ul{
        padding: 0;
        margin: 0;
        /*border: 1px solid #000;*/
        border-top: none;
        /*border-bottom-right-radius: 10px;*/
        /*border-bottom-left-radius: 10px;*/
        li{
          list-style: none;
          background-color: #fff;
          font-size: 16px;
          color: #838485;
          padding:0.12rem 0;


        }
        li:hover{
           color: #336fcf;
           cursor: pointer;
        }
        li:before{
           content: ' ';
           width: 0.16rem;
           height: 0.18rem;
          display: inline-block;
           margin-right: 0.12rem;
           background-image: url("../assets/images/icon-court-record.png");
           background-size: 100% 100%;
           position: relative;
           top: 0.03rem;
        }
      }
    }
  }
  @media screen  and (max-width: 1366px){
    .el-input__inner{
      font-size: 12px;
    }
    .content-head .list ul li p{
        font-size: 14px;
    }
    .content-head .list-history{
      width: 2.52rem;
    }
    .content-head .list ul li{
      width: 32%;
    }
    .content-head .list ul li p:after{
      width: 0.18rem;
      height: 0.18rem;
    }
    .content-head .list-history ul li{
      font-size: 14px;
    }
    .content-head .list-history ul li:before{
      width: 0.12rem;
      height: 0.16rem;
      margin-right: 0.08rem;
    }
  }

}

.judge_pop{
   width: 1.8rem;
   min-height: 1.8rem;
}
.judge_pop ul{
  padding: 0;
  list-style: none;
  li{
     padding: 0 0.06rem;
  }
  span{
     padding: 0.06rem 0;
  }
  .title{
    display: inline-block;
    padding-right: 0;
    width: 60px;
  }
  .content{
     padding-left: 0.06rem;
    color: #a9aaaa;
  }

}
  .el-popper{
    border-radius: 0.1rem;
    color: #626262;
  }

</style>
<!--1366 media-->
<style scoped lang="less">
  @media screen  and (max-width: 1366px){
    #book {
      width: 1024px;

    }
  }
</style>
