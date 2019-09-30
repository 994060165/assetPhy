<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :show-close="false"
    :before-close="closeDialog"
    v-loading="loading">
    <el-row>
      <el-form ref="changeForm" :model="assetFlowInfo" label-width="120px">
        <el-row class="m-t-20">
          <el-col :span="12">
            <el-form-item label="资产编号：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.asset_num}}
              </div>
            </el-form-item>
            <el-form-item label="部门：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.deparment}}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产名称：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.name}}
              </div>
            </el-form-item>
            <el-form-item label="责任人：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.zrr_name}}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片上传:">
              <el-upload
                class="avatar-uploader"
                action=""
                :auto-upload="false"
                :show-file-list="false"
                :on-change="handleChangeFile"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row slot="footer" class="dialogFooter text-center">
      <el-button type="primary" @click="confirm()">确定</el-button>
      <el-button @click.native="closeDialog()">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import searchUserDialog from '@/components/sysSelectPeople.vue'
import {TokenAPI} from '@/request/TokenAPI'
import {AssetChangeAPI} from '../../../service/assetChangeAPI'
import {remindOptions, remindTypes} from '@/service/common.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    assetFlowInfo: {
      type: Object,
      default: {}
    },
    dialogTitle: {
      type: String,
      default: '出门限制资产申请出门'
    }
  },
  data () {
    return {
      moment: moment,
      loading: false,
      token: TokenAPI.getToken(),
      remindOptions: remindOptions,
      remindTypes: remindTypes,
      remindWay: ['information'],
      remindRate: '',
      imageUrl: '',
      imgFile: ''
    }
  },
  mounted () {
  },
  methods: {
    confirm () {
      let img = this.imgFile
      console.log(this.imgFile)
      if (img) {
        this.loading = true
        let reader = new FileReader()
        reader.readAsDataURL(img)
        let that = this
        reader.onloadend = function () {
          let result = reader.result
          that.postImgInfo(result)
        }
      } else {
        this.$message({
          type: 'error',
          message: '请您选择图片！'
        })
      }
    },
    postImgInfo (imgbase64) {
      let params = {
        token: this.token,
        imgbase64: imgbase64,
        asset_num: this.assetFlowInfo.asset_num
      }
      AssetChangeAPI.updateAssetbackLimitStatus(params).then(data => {
        if (data.ID === '-1') {
          this.$message({
            type: 'error',
            message: `${data.msg}`
          })
        } else {
          this.$message({
            type: 'success',
            message: `上传成功！${data.msg}`
          })
          this.$emit('uploadSuccess')
        }
      }).finally(() => {
        this.loading = false
      })
    },
    closeDialog  () {
      this.$nextTick(() => {
        this.$emit('closeDialog')
      })
    },
    addCancel () {
      this.closeDialog()
    },
    addDept (dept) {
      this.closeDeptDialog()
      this.changeInfo.deptList = dept
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    beforeUpload (file) {
      let fd = new FormData()
      fd.append('files', file)
      fd.append('filePath', 'image')
      // let that = this
      // tailAPI.postFile(fd).then(function (data) {
      //   that.fileList.push(file)
      //   let url = data.objBean.id
      //   that.imgUrl = url
      //   console.log(url)
      // })
      return false
    },
    changeImg () {
      this.imgUrl = ''
    },
    handlePreview (file) {
      console.log(file)
    },
    // 文件列表改变
    handleChangeFile (file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.imgFile = file.raw
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
  },
  components: {
    searchUserDialog
  }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
