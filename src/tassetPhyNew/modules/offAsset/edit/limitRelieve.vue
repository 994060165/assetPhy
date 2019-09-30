<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :show-close="false"
    :before-close="closeDialog"
    v-loading="loading">
    <el-row>
      <el-form ref="changeForm" :model="assetFlowInfo" :rules="rules" label-width="120px">
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
          <el-col :span="24">
            <el-form-item label="出门受限原因:" prop="backreason">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                v-model="assetFlowInfo.backreason">
              </el-input>
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
      default: '设置退库受限资产'
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
      imgFile: '',
      rules: {
        backreason: [
          { required: true, message: '请输入受限原因', trigger: 'change' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    confirm () {
      this.$refs['changeForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          let params = {
            token: this.token,
            asset_num: this.assetFlowInfo.asset_num,
            isbacklimit: true,
            backreason: this.assetFlowInfo.backreason
          }
          AssetChangeAPI.changeAssetForbidBack(params).then(data => {
            if (data.ID === '-1') {
              this.$message({
                type: 'error',
                message: `${data.msg}`
              })
            } else {
              this.$message({
                type: 'success',
                message: `设置成功！${data.msg}`
              })
              this.$emit('uploadSuccess')
            }
          }).finally(() => {
            this.loading = false
          })
        }
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
