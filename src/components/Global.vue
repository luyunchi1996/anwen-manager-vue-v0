<script type="text/javascript">
  var urlMap= {
      "http://icase360.com":{appid:"wxe8b809ec20dde1de"},
      "http://www.anwenwen.com":{appid:"wx724c736ab2fec33c"},
      "http://localhost:8080":{appid:"wx724c736ab2fec33c",serverOri:"http://icase360.com" },
      "https://icase360.com":{appid:"wxe8b809ec20dde1de"},
      "http://ytm.mynatapp.cc":{appid:"wx724c736ab2fec33c"},
  }


  var base =  location.origin;
  var baseConfig = urlMap[base];
  if(baseConfig.serverOri){
      base = baseConfig.serverOri
  }

// const baseUrl = "http://icase360.com/api";
// const callbackIp = "http://icase360.com";
//const appid="wxe8b809ec20dde1de";
const baseUrl = base+"/api";
const callbackIp = base;
const appid=urlMap[base].appid;
const caseTypeProgress ={
    "0":{
        "1":{name:"收案",style:"label_yellow"},
        "2":{name:"起诉",style:"label_orange"},
        "3":{name:"庭审",style:"label_puss"},
        "4":{name:"结案",style:"label_green"}

    },
    "1":{
        "1":{name:"收案",style:"label_yellow"},
        "2":{name:"起诉",style:"label_orange"},
        "3":{name:"庭审",style:"label_puss"},
        "4":{name:"结案",style:"label_green"}
    },
    "2":{
        "1":{name:"收案",style:"label_yellow"},
        "2":{name:"公安",style:"label_orange"},
        "3":{name:"检察院",style:"label_puss"},
        "4":{name:"法院",style:"label_blue"},
        "5":{name:"结案",style:"label_green"}


    },
    "3":{
        "1":{name:"收案",style:"label_yellow"},
        "2":{name:"起诉",style:"label_orange"},
        "3":{name:"庭审",style:"label_puss"},
        "4":{name:"结案",style:"label_green"}
    },
    "4":{
        "1":{name:"签约",style:"label_yellow"},
        "2":{name:"咨询",style:"label_orange"},
        "3":{name:"培训",style:"label_puss"},
        "4":{name:"文书",style:"label_blue"},
        "5":{name:"管理",style:"label_green"}
    },

}


const  caseType ={
    "1":"民事",
    "2":"刑事",
    "3":"行政",
    "4":"法律顾问"
}

const bailorType ={
     "0":"原告","1":"被告","2":"第三人","3":"上诉人","4":"被上诉人"
}
export default
{
  baseUrl:baseUrl,
    caseTypeProgress:caseTypeProgress,
    caseType:caseType,
    bailorType:bailorType,
    callbackIp:callbackIp,
    appid:appid
}
</script>