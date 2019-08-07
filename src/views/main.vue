<template>
    <div class="box">
        <Header class="header"  @handlerMenu="handlermenu"/>
        <div :style="contentStyle" >
            <!--<h2 class="title">&nbsp;</h2>-->
            <SearchLinks class="title" :links="getSearchLinks"  />
            <div class="content" >
                <LinkPanel   v-for="(link,index) in getGroupLinks"   :link="link" :label="index"  />
            </div>
        </div>
        <div class="warps" v-if="changebtn" :style="newContentStyle">
            <div class="warps-content">
                <div class="warps-content-contents" :style="warpsContentContentStyle">
                    <div class="warp-article" style="margin:0 24px;padding: 6px;position: relative;top: 12%;">
                        <h3 style="margin-bottom: 58px;">智能法律顾问</h3>
                        <div>
                            <h3 style="font-size: 26px; color:#f78543; ">AI Counsel</h3>
                            <p style="font-size: 28px;margin: 0;line-height: 1.2; color:#4c4c4c;">技术驱动常法创收</p>
                            <p style="color:#6b6b6b;">Alpha，集律所管理、法律大数据和专业服务为一体的智能办案系统，
                              将可视化、大数据和人工智能三大前沿技术融入每一个模块，提高律师专业判断的准确度，实时反馈团队成员的参与度，增强客户享受法律服务的满意度。</p>
                        </div>
                    </div>

                </div>
                <div class="warps-content-footer">
                    <ul>
                        <li class="li1">
                           <img src="../assets/images/xiaocase.jpg"/>
                            <p>请扫描二维码咨询</p>
                        </li>
                        <li>
                            <h4>提升效率</h4>
                            <p>智能合同审查</p>
                            <p>智能法律咨询</p>
                            <p>智能合同管理</p>
                            <p>...</p>
                        </li>
                        <li>
                            <h4>提高报价</h4>
                            <p>合同交易全流程风控</p>
                            <p>劳动用工合规风控</p>
                            <p>其他法律服务产品</p>
                            <p>...</p>
                        </li>
                        <li>
                            <h4>市场拓展</h4>
                            <p>法制体检</p>
                            <p>法律服务招投标信息</p>
                            <p>活动推广指导</p>
                            <p>市场人才培养计划</p>
                        </li>
                    </ul>
                    <p class="subline"><span >iCase360&nbsp;</span>与众不同的...</p>

                </div>
            </div>

        </div>

        <!--<span>邮箱&nbsp;：icase360@163.com</span>-->
        <div class="footer">

            <!--<p></p>-->
            <p><span>© 苏州法智科技有限公司</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>苏ICP备17060514号-1</span>&nbsp;&nbsp;&nbsp;&nbsp;<a class="alink" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32050802010594">苏公网安备32050802010594号</a></p>
        </div>

    </div>


</template>

<script>
    import  Header from  "../components/header/Header"
    import  SearchLinks from  "../components/searchLinks/index"
    import  LinkPanel from  "../components/LinkPanel/index"


    const links={
        "司法数据":[
            {
                name:"裁判文书网",
                href:"http://wenshu.court.gov.cn/",
                icon:"http://wenshu.court.gov.cn/favicon.ico"
            },
            {
                name:"检察案件信息",
                href:"http://www.ajxxgk.jcy.gov.cn/html/index.html",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"无讼案例",
                href:"https://www.itslaw.com/bj",
                icon:"https://www.itslaw.com/favicon.ico",
            },
            {
                name:"威科先行",
                href:"https://law.wkinfo.com.cn/",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"OpenLaw",
                href:"http://openlaw.cn/",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"北大法宝",
                href:"http://www.pkulaw.cn/",
                icon:"http://www.pkulaw.cn/favicon.ico"
            },
        ],
        "商业调查":[
            {
                name:"企业信用信息",
                href:"http://www.gsxt.gov.cn/index.html",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"企查查",
                href:"https://www.qichacha.com/",
                icon:"https://www.qichacha.com/favicon.ico"
            },
            {
                name:"天眼查",
                href:"https://www.tianyancha.com/",
                icon:"https://www.tianyancha.com/favicon.ico"
            },
            {
                name:"启信宝",
                href:"https://www.qixin.com/",
                icon:"https://www.qixin.com/favicon.ico"
            },
            {
                name:"巨潮资讯",
                href:"http://www.cninfo.com.cn/new/index",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"香港公司查册",
                href:"https://www.icris.cr.gov.hk/csci/",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
        ],
        "法律工具":[
            {
                name:"赔偿金计算",
                    href:"http://www.lawyouknow.com/product/gs.html#",
                icon:"http://www.lawyouknow.com/favicon.ico"
            },
            {
                name:"诉讼费计算",
                    href:"https://www.cnado.com/",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"在线作图",
                    href:"https://www.processon.com/",
                icon:"https://www.processon.com/favicon.ico"
            },
            {
                name:"Alpha",
                    href:"https://alphalawyer.cn",
                icon:"https://alphalawyer.cn/favicon.ico"
            },
            {
                name:"元典",
                    href:"https://legalmind.cn/lawyer/index",
                icon:"https://legalmind.cn/favicon.ico"
            },
            {
                name:"印象笔记",
                    href:"https://www.yinxiang.com/",
                icon:"https://www.yinxiang.com/favicon.ico"
            },
        ],
        "诉讼支持":[
            {
                name:"失信查询",
                href:"http://shixin.court.gov.cn/",
                icon:"http://shixin.court.gov.cn/favicon.ico"
            },
            {
                name:"司法拍卖",
                href:"https://sf.taobao.com/",
                icon:"https://sf.taobao.com/favicon.ico"
            },
            {
                name:"庭审公开",
                href:"http://tingshen.court.gov.cn/",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"诉讼保全",
                href:"http://www.jsfbdb.com/",
                icon:"http://www.ajxxgk.jcy.gov.cn/favicon.ico"
            },
            {
                name:"诉讼融资",
                href:"https://www.winhc.cn/",
                icon:"https://www.winhc.cn/favicon.ico"
            },
            {
                name:"中国仲裁网",
                href:"http://www.china-arbitration.com/",
                icon:"http://www.china-arbitration.com/favicon.ico"
            },
        ],
        "法律文件":[
            {
                name:"荣大二郎神",
                href:"http://www.elangshen.com/",
                icon:"http://www.elangshen.com/favicon.ico"
            },
            {
                name:"法天使",
                href:"https://www.fatianshi.cn/",
                icon:"https://www.fatianshi.cn/favicon.ico"
            },
            {
                name:"合同范本",
                href:"https://hk.lexiscn.com/",
                icon:"https://hk.lexiscn.com/favicon.ico"
            },
            {
                name:"法大大",
                href:"https://www.fadada.com/",
                icon:"https://www.fadada.com/favicon.ico"
            },
            {
                name:"律商",
                href:"https://hk.lexiscn.com/",
                icon:"https://hk.lexiscn.com/favicon.ico"
            },
            {
                name:"悦合同",
                href:"https://yuehetong.com/",
                icon:"https://yuehetong.com/favicon.ico"
            },
        ],

    }
    const searchLinks=[
        {name:"百度",path:"https://www.baidu.com/",
            onSearch: (obj)=>{
                return  obj.path+"s?wd="+obj.value
            }
        },
        {name:"搜狗",path:"https://www.sogou.com/",onSearch: (obj)=>{
                return  obj.path+"web?query="+obj.value
            }},
        {name:"360",path:"https://www.so.com/",
            onSearch:(obj)=>{
                return  obj.path+"s?q="+obj.value
            }
        },
        {name:"秘迹",path:"https://mijisou.com/",
            onSearch: (obj)=>{
                return  obj.path+"?q="+obj.value
            }
        },
        {name:"必应",path:"https://cn.bing.com/",
            onSearch: (obj)=>{
                return  obj.path+"search?q="+obj.value
            }
        },





    ]
    export default {
        name: "main",
        components:{
            Header,
            SearchLinks,
            LinkPanel
        },
        data(){
            return{
               changebtn:false,
               contentStyle:{
                   "min-height": "800px"
               },
                warpsContentContentStyle:{
                   "height":"610px"
                },
               newContentStyle:{
                    "min-height":"830px",
                    "top":-830+42+"px"
               },
                warpContentMaxTop:0,
                warpMaxTop:1
            }
        },
        computed:{
            getSearchLinks(){
                 return searchLinks
            },
            getGroupLinks(){
                 return links
            }
        },
        mounted(){
            let that = this


           window.onresize=()=>{
               that.contentStyle["min-height"] =`${window.innerHeight - 166}px`
               that.newContentStyle["min-height"] =`${window.innerHeight - 106}px`
               let ccHeight = window.innerHeight - 106
               this.warpsContentContentStyle["height"]=`${ccHeight - 220}px`
               that.warpContentMaxTop= -(window.innerHeight - 106-42);
               that.newContentStyle["top"] = `${ that.warpContentMaxTop}px`
           }
            this.newContentStyle["min-height"] =`${window.innerHeight - 106}px`;
            let ccHeight = window.innerHeight - 106
            this.warpsContentContentStyle["height"]=`${ccHeight - 220}px`
            this.warpContentMaxTop= - (window.innerHeight - 106-42);
            this.newContentStyle["top"] = `${ this.warpContentMaxTop}px`


            this.contentStyle["min-height"] =`${window.innerHeight - 166}px`

        },
        methods:{
            handlermenu(){
                this.changebtn = !this.changebtn
                let that = this;
                if(this.changebtn){
                    // this.warpStyle["newContentStyle"]="42px"
                    for(let i =this.warpContentMaxTop;i<=42;i++){
                        setTimeout(()=>{
                            this.newContentStyle["top"] = `${i}px`
                        },100)

                    }

                }else{
                    this.warpContentMaxTop= - (window.innerHeight - 106-42);
                    this.newContentStyle["top"] = `${ this.warpContentMaxTop}px`
                }



            }

        }

    }
</script>

<style scoped>
    .box{
        background-color: #efefef;
        position: relative;

    }
    .header{
        position: relative;
        z-index: 100;
    }
    .alink{
        text-decoration: none;
        color: white;
    }
    .alink:hover{
         transform: scale(1.2);
    }
   .title{
        margin: 60px 0;
        text-align: center;
        font-style: italic;
   }
   .warps{
       min-height: 830px;
       width: 100%;
       position: absolute;
       top: 42px;
       z-index: 90;
       background-color: rgba(0,0,0,0.5);

   }
   .warps-content-contents{
       height: 610px;
       background-color:white;

   }
   .warps-content-contents .warp-article{
        width: 580px;
        height:480px;
       font-size: 14px;
       line-height: 2.2;
   }
   .warps-content-contents h3{
       margin: 0;
   }
   .warps-content-footer{
        height:220px;
        background-color: #333333;
        color:white;
       font-size: 14px;
   }
    .warps-content-footer   .subline{
        margin: 0;
        line-height: 1.2;
        text-align: center;

    }
    .warps-content-footer .subline span{
         color:#e4a923;
    }

   .warps-content-footer ul{
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
   }
    .warps-content-footer li{
        min-width: 120px;
        height:160px;
        padding: 6px;
        margin: 8px 24px;
    }
    .warps-content-footer li p{
        margin: 12px 0;
        line-height: 1.2;
        color: #b9b9b9;
    }
    .warps-content-footer li h4{
        margin:0;
        line-height: 1.2;
    }

    .warps-content-footer .li1 img{
         width: 120px;
         height: 120px;
    }
    .warps-content-footer .li1 p{
        text-align: center;
        line-height: 1.2;
        margin: 0;
    }
   .warps-content{
        background-color: #efefef;

   }
    .content{
         margin: 0 auto;
         margin-top: 32px;
         width: 1070px;


    }
    .footer{
        height: 64px;
        /*background-color: #20a0ff;*/
        width: 100%;
        color: #7f7c7c;
    }
     .footer a{
         color: #7f7c7c;
     }
    .footer p{
         margin: 0;

         font-size: 14px;
        text-align: center;
        padding: 3px 0;
        position: relative;
        top: 20px;
    }
</style>