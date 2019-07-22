<template>
  <div id="user" class="user">
     <!--<el-row class="body-head">      -->
      <!--<el-col :span="24" >    -->
      <!--</el-col>-->
    <!--</el-row>-->
     <el-row class="user-info">    
      <el-col :span="12" class="info-form">      
        <div class="inline-row">

            <label for="">姓名：</label><input type="text" v-if="!isEdit"  v-model="userInfo.lawyerName">
                                          <input type="text" v-else disabled v-model="userInfo.lawyerName">
        </div>
        <div class="inline-row">
           <label for="">性别：</label>
          <div class="sexy"  v-if="!isEdit">
            <el-radio class ="icon-male"  v-model="userInfo.sex" label="0">男</el-radio>
          <el-radio   class ="icon-female"  v-model="userInfo.sex" label="1">女</el-radio>
          </div>
            <div class="sexy" v-else>
                <el-radio  class ="icon-male" disabled v-model="userInfo.sex" label="0">男</el-radio>
                <el-radio class ="icon-female"  disabled v-model="userInfo.sex" label="1">女</el-radio>
            </div>

        </div>         
        <!--<div class="inline-row">-->
          <!--<label for="">生日：</label><input type="text"  v-if="!isEdit" v-model="userInfo.birth">-->
                                        <!--<input type="text"  v-else disabled v-model="userInfo.birth">-->
        <!--</div>-->
        <div class="inline-row">
          <label for="">手机：</label><input type="text"  v-if="!isEdit" v-model="userInfo.tell">
                                        <input type="text" v-else disabled v-model="userInfo.tell">
        </div>
        <div class="inline-row">
          <label for="">固话：</label><input type="text" v-if="!isEdit" v-model="userInfo.fixTell">
                                         <input type="text" v-else disabled  v-model="userInfo.fixTell">
        </div>
        <div class="inline-row">
          <label for="">邮箱：</label><input type="text"  v-if="!isEdit" v-model="userInfo.email">
                                 <input type="text" v-else disabled  v-model="userInfo.email">
        </div>
        <div class="inline-row">
          <label for="">执业律所：</label><input type="text" v-if="!isEdit" v-model="userInfo.officeName">
                                            <input type="text"  v-else disabled v-model="userInfo.officeName">
        </div>
        <div class="inline-row">
          <label for="">执业证号：</label><input type="text"  v-if="!isEdit" v-model="userInfo.workCardNumber">
                                            <input type="text"  v-else disabled v-model="userInfo.workCardNumber">
        </div>
        <div class="inline-row">
          <label for="">地址：</label><input type="text" v-if="!isEdit"  v-model="userInfo.detailAddress">
                                      <input type="text"  v-else disabled v-model="userInfo.detailAddress">
        </div>
        <div class="inline-row">
          <label for="">学历：</label>
            <select  v-model="userInfo.education"  :disabled="isEdit">
                <option value="4">本科</option>
                <option value="2">硕士研究生</option>
                <option value="1">博士研究生</option>
            </select>

        </div>
        <div class="inline-row">
          <label for="">毕业院校：</label><input type="text" v-if="!isEdit" v-model="userInfo.school">
                                         <input type="text" v-else disabled v-model="userInfo.school">
        </div>
          <div class="inline-row">
              <label class="textarea-label" for="">个人简介：</label><textarea :disabled="isEdit"  v-model="userInfo.summary"></textarea>

          </div>
      </el-col>
      <el-col :span="12" class="info-pic">  
        <el-row>
          <el-col :span="24" >
            <label>头像</label><span>仅支持JPG,PNG格式，文件小于1M</span>
            <el-upload
              class="avatar-uploader uploader-img"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUploadForHead" >
              <img  :src="imageUrlHead" @error="imageError($event,'imgHead')" class="avatar"/>

                <i class="el-icon-plus avatar-uploader-icon"></i>

            </el-upload>
          </el-col>
        </el-row>  
        <el-row>
          <el-col :span="24" >
            <label>资质照片</label>
   <el-upload
              class="avatar-uploader uploader-img uploader-img-cert "
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUploadForCert">
              <img  :src="imageUrlCert" @error="imageError($event,'imgCert')" class="avatar" />
              <i  class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
              
          </el-col>
        </el-row> 
      </el-col>
    </el-row>
    <el-row class="body-footer">      
      <el-col :span="24" >

        <button v-if="isEdit" @click="setEdit">编辑</button>
          <button  v-else @click="setEdit">取消</button>
          <button :disabled="isEdit" @click="editUserInfo">保存</button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: "user",
  components: {},
  data() {
    return {
      radio: "0",
      imageUrlHead: "",
      imageUrlCert: "",
      userInfo: {},
      isEdit: true,
      fileList2: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  mounted() {
    let baseUrl = this.GLOBAL.baseUrl;
      let lawyerId = this.common.getCookie("lawyerId");
    this.$http
      .get(baseUrl + "/getLawyerDetailByRegisterId", {
        params: {
          registerId: "U1525405578581qbBSE",
            lawyerId:lawyerId
        }
      })
      .then(({ data }) => {
        let info = data.data;
        this.userInfo = info;
          this.imageUrlHead=info.imageUrl
          this.imageUrlCert=info.practiceImg
      });
  },
  methods: {
      imageError(e,type){
          if(type=="imgHead"){
              //let img = new Image()
              this.imageUrlHead = "http://icase360.com/src/icon_head_def.png";

          }else if(type=="imgCert"){
              this.imageUrlCert = "http://icase360.com/src/icon_cert_def.png";
          }

      },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUploadForHead(file) {
      let baseUrl = this.GLOBAL.baseUrl;
      let that = this;
      let userID = this.common.getCookie("userID");
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        // 图片转base64完成后返回reader对象
        that.$http
          .post(baseUrl + "/order/UpLoadBase64", {
            name: file.name,
            data: reader.result,
            path: "src/" + userID,
            createUser: userID
          })
          .then(({ data }) => {
            let picInfo = data.data;
            that.imageUrlHead = picInfo.staticUrl;
            let lawyerId = that.common.getCookie("lawyerId")
            that.$http.post(
                baseUrl+"/order/saveLawyerPhoto",that.qs.stringify({
                    lawyerId: lawyerId,
                    srcId: picInfo.srcId,
                   saveTo: 'lawyerPhoto',

                })
            ).then(({data})=>{

            });


          });
      };
      return false;
    },
    beforeAvatarUploadForCert(file) {
      let baseUrl = this.GLOBAL.baseUrl;
      let that = this;
      let userID = this.common.getCookie("userID");
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        // 图片转base64完成后返回reader对象
        that.$http
          .post(baseUrl + "/order/UpLoadBase64", {
            name: file.name,
            data: reader.result,
            path: "src/" + userID,
            createUser: userID
          })
          .then(({ data }) => {
            let picInfo = data.data;
              let lawyerId = that.common.getCookie("lawyerId")
            that.imageUrlCert = picInfo.staticUrl;
              that.$http.post(
                  baseUrl+"/order/saveLawyerPhoto",that.qs.stringify({
                      lawyerId: lawyerId,
                      srcId: picInfo.srcId,
                      saveTo: 'practiceImg',
                  })
              ).then(({data})=>{

              });

          });
      };
      return false;
    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
    },
    editUserInfo() {
      let baseUrl = this.GLOBAL.baseUrl;
      let userID = this.common.getCookie("userID");
      let token = this.common.getCookie("token");
      console.log(this.userInfo);
      
      this.$http
        .post(
          baseUrl + "/order/RegisterNewLawyer",
          this.qs.stringify({
            lawyerName: this.userInfo.lawyerName,
            tell: this.userInfo.tell,
            fixTell: this.userInfo.fixTell,
            email: this.userInfo.email,
            lawyerOfficeId: this.userInfo.lawyerOfficeId,
            workCardNumber: this.userInfo.workCardNumber,
            detailAddress: this.userInfo.detailAddress,
            school: this.userInfo.school,
            birth: this.userInfo.birth,
            sex: this.userInfo.sex,
            lawyerOid: this.userInfo.lawyerOid,
            education: this.userInfo.education,
              summary:this.userInfo.summary,
             userId: userID,
            token: token
          })
        )
        .then(({ data }) => {
          if (data.message == "成功") {
            this.isEdit = true; //
            this.$message({
              message: "保存成功",
              type: "success"
            });
          }
        });
    },
    setEdit() {

      this.isEdit = !this.isEdit;
    }
  }
};
</script>
<style lang="less">
#user {
  .body-head {
    height: 133px;
    background-color: #f6f6f8;
  }
    .sexy{
        padding-left: 0.1rem;
    }
    .icon-male{
        .el-radio__inner:before{
            content: " ";
            display: block;
            width: 20px;
            height: 20px;
            position: absolute;
            top: -6px;
            left: -2px;
            background-image: url("../assets/images/icon_male.png");
            background-size: 100% 100%;
            /*background-color: red;*/
        }
    }
    .icon-female{
        .el-radio__inner:before{
            content: " ";
            display: block;
            width: 20px;
            height: 20px;
            position: absolute;
            top: -2px;
            left: -6px;
            background-image: url("../assets/images/icon_female.png");
            background-size: 100% 100%;
            /*background-color: red;*/
        }
    }

  .body-footer {
    height: 160px;
    background-color: #f6f6f8;
    text-align: center;
    padding-top: 4%;
    button {
      cursor: pointer;
      width: 8%;
      height: 45px;
      border: none;
      border-radius: 5px;
      display: inline-block;
      vertical-align: top;
      color: #fff;
      font-size: 18px;
      background: linear-gradient(
        to right,
        rgb(40, 217, 206),
        rgb(51, 110, 206)
      );
    }
    button:nth-child(1) {
      margin-right: 50px;
    }
  }
  .user-info {
    text-align: right;
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
      .disabled{
           ;
      }
    input {
      // background-color: #fff;
      border: 1px solid #e7e7e9;
      padding-left: 10px;
      border-radius: 5px;
    }

    .inline-row {
      margin-bottom: 0.12rem;
        font-size: 18px;
        color:#626262;
    }
    .info-form {
      input {
        width: 50%;
        height: 0.32rem;
      }
        select{
            width: 51.2%;
            height: 0.32rem;
            border: 1px solid #e7e7e9;
            padding-left: 10px;
            border-radius: 5px;
        }
        textarea{
            width: 50%;
            height: 120px;
            resize: none;
            border: 1px solid #e7e7e9;
            padding-left: 10px;
            border-radius: 5px;
        }
        .textarea-label{
             position: relative;
            bottom: 108px;
        }
      .sexy {
        display: inline-block;
        width: 50%;
        height: 25px;
        vertical-align: middle;
        text-align: left;
      }
    }
    .info-pic {
      text-align: left;
      padding-left: 100px;
      padding-right: 15%;
      label {
          font-size: 18px;
        color: #626262;
        padding-right: 50px;
      }

      span {
        font-size: 16px;
        color: #a9aaaa;
      }
        span:before{
            content: ' ';
            width: 16px;
            height: 16px;
            display: inline-block;
            background-image: url("../assets/images/icon_tip.png");
            background-size: 100% 100%;
            margin-right: 10px;
            position: relative;
            top:0.02rem;
        }
      .upload-q span {
        color: #fff;
        font-size: 16px;
      }
      .avatar-uploader {
        margin-top: 43px;
        margin-bottom: 80px;
      }
      .upload-qua {
        margin-top: 43px;
      }
    }
  }
  //touxiang
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    line-height: 178px;
    text-align: center;
  }
    .uploader-img{
        width: 1.24rem;
        height: 1.24rem;

        .el-upload{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .avatar-uploader-icon{
            width: 1.24rem;
            height: 1.24rem;
            line-height: 1.24rem;
        }
        i{
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1000;
        }
        i:before{
             content: ' ';
        }
        i:hover{
            cursor: pointer;
            background-color: rgba(0,0,0,0.5);

        }
        i:hover:after{
            content: '上传新头像';
            color: #fff;
            display: block;
            position: absolute;
            top: 0.25rem;
            width: 100%;
            height: 0.2rem;
            font-size: 16px;
        }
        i:hover:before{
            content: ' ';
            display: inline-block;
            width: 0.64rem;
            height: 0.5rem;
            background-image: url("../assets/images/icon-upload.png");
            background-size: 100% 100%;
        }

    }
    .uploader-img-cert{
        width: 3.2rem;
        height: 1.6rem;
        .el-upload {
            border-radius: 0.1rem;

        }
        .avatar-uploader-icon{
            width: 3.2rem;
            height: 1.6rem;
            line-height: 1.6rem;
        }
        i:hover:after{
            content: '上传新资质证书';
        }

    }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  //end
}
</style>
