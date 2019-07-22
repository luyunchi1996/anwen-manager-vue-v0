<script type="text/javascript">
// const baseUrl = "http://icase360.com/api";
// const callbackIp = "http://icase360.com";
//const appid="wxe8b809ec20dde1de";
const baseUrl = "http://www.anwenwen.com/api";
const callbackIp = "http://www.anwenwen.com";
const appid="wx724c736ab2fec33c";

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