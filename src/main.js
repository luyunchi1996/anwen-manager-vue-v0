import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import Qs from 'qs'
import global_ from './components/Global'
import common from './assets/js/common.js'
import flexible from './assets/js/flexible.js'
import FromValidate from './assets/js/validate/FromValidate.js'

Vue.prototype.$http= axios;
Vue.prototype.qs= Qs;
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.GLOBAL = global_;
Vue.prototype.common = common;
Vue.prototype.$echarts = echarts;
Vue.prototype.FromValidate = FromValidate;
Vue.prototype.sha1 = require('sha1');
String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}


Node.prototype.attr = function (key,value) {
    if(value) this.setAttribute(key,value);
    else  return this.getAttribute(key);
    return this;
}

//增加class
Node.prototype.addClass=function(className) {
    let obj_class=this.className,//获取class的内容；
        blank = ( obj_class != '' ) ? ' ' : '';//判断获取的class是否为空，如果不为空，则添加空格；
    let  added = obj_class + blank + className;//组合原来的class和需要添加的class，中间加上空格；
    this.className = added;//替换原来的class;
    return this
}
//移除class
Node.prototype.removeClass=function(className){
    this.className =  this.className.replaceAll(className,"");//替换原来的class
    return this;
}
//获取Class
function getByClass(className){
    if(this.getElementsByClassName){
        return this.getElementsByClassName(className);
    }else{
        let res = [];
        let re = new RegExp(' ' + sClass + ' ', 'i')
        let aEle = this.getElementsByTagName('*');
        for(let i = 0; i < aEle.length; i++){
            if(re.test(' ' + aEle[i].className + ' ')){
                res.push(aEle[i]);
            }
        }
        return this;
    }
}
Node.prototype.toggleClass=function(class1,class2) {
    //查找class
    let toggleMap = {}
    this.className = this.className.replaceAll(class1,"");

    if (class2) {
        this.className = this.className.replaceAll(class1,class2);
    }
    return this
 }


flexible.flexible(750,750)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
