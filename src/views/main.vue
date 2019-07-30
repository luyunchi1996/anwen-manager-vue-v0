<template>
    <div class="box">
        <Header/>
        <h2 class="title">icase360.com</h2>
        <SearchLinks :links="getSearchLinks"  />
        <div class="content" :style="contentStyle" >
        <LinkPanel   v-for="(link,index) in getGroupLinks"   :link="link" :label="index"  />
        </div>
        <div class="footer">
            <p><span>© 苏州法智科技有限公司</span>&nbsp;&nbsp;<span>邮箱&nbsp;：icase360@163.com</span></p>
            <p><span>苏ICP备17060514号-1</span>&nbsp;&nbsp;&nbsp;&nbsp;<a class="alink" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32050802010594">苏公网安备32050802010594号</a></p>
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
               contentStyle:{
                   "min-height": "608px"
               }
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
                 that.contentStyle["min-height"] =`${window.innerHeight - 329}px`
           }

            this.contentStyle["min-height"] =`${window.innerHeight - 329}px`

        },
        methods:{

        }

    }




</script>

<style scoped>
    .box{
        background-color: #efefef;

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
    .content{
         margin: 0 auto;
         margin-top: 32px;
        width: 1070px;


    }
    .footer{
        height: 64px;
        background-color: #20a0ff;
        width: 100%;

    }
    .footer p{
         margin: 0;
         color: white;
         font-size: 14px;
        text-align: center;
        padding: 3px 0;
        position: relative;
        top: 8px;
    }
</style>