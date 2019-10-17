<template>
  <el-dialog
    :title="tableTitle"
    :visible.sync="formVisible" 
    :close-on-click-modal="false" 
    :before-close="handleClose">
    <el-row v-loading="dataLoading">
      <el-form label-width="120px" ref="ruleForm" :model="updateForm" :rules="formRules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="法规标题" prop="rulename" class="readonly">
              <el-input v-model="updateForm.rulename" placeholder="请输入法规标题"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="法规内容" prop="rulebody" class="readonly">
              <el-input type="textarea" :rows="8" v-model="updateForm.rulebody" placeholder="请输入法规内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="上传附件" class="readonly">
              <el-row>
                <el-col :span="14">
                  <el-upload ref="upload"
                    class="upload-demo"
                    :multiple="true"
                    action=""
                    :auto-upload="false"
                    :file-list="fileList"
                    :show-file-list="true"
                    :on-change="handleChangeFile"
                    :on-exceed="exceedFile"
                    :http-request="uploadFiles"
                    :before-upload="beforeUploadFile">
                    <el-button type="success">附件上传</el-button>
                    <!-- <el-input v-model="updateForm.fileName" placeholder="请选择导入的模板"></el-input> -->
                  </el-upload>
                </el-col>
                <el-col :span="10">
                  <el-button
                   size="small"
                   type="danger" 
                   @click="clearFileList" 
                   v-if="fileList.length > 0">
                   清空文件
                   </el-button>
                </el-col>
              </el-row>
              
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row slot="footer" class="dialogFooter text-center">
      <!-- <el-button type="primary" @click="confirm()">确定</el-button>
      <el-button @click.native="closeDialog()">取消</el-button> -->
      <el-button type="primary" @click="importFile">上传</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import {TokenAPI} from '@/request/TokenAPI.js'
import {UploadApi} from '@/service/index.js'
import { type } from '../../../../../static/data'
import service from '@/api/service.js'
// import serviceApi from '@/api/service.js'
import $ from 'jquery'
export default {
  props: {
    // 控制显示隐藏
    formVisible: {
      type: Boolean,
      default: false
    },
    // 模块标题
    tableTitle: {
      type: String,
      default: '批量导入'
    },
    // 下载路径
    downPath: {
      type: String,
      default: ''
    },
    // 下载的模板的文件名称
    templateName: {
      type: String,
      default: ''
    },
    uploadUrl: {
      type: String,
      default: ''
    },
    formInfo: {
      type: Object,
      default: {}
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      token: TokenAPI.getToken(),
      moment: moment,
      dataLoading: false,
      fileList: [],
      updateForm: {
        fileName: ''
      },
      formData: new FormData(),
      type: type,
      size: 0,
      formRules: {
        rulename: [
          { required: true, message: '法规标题不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    if (this.formInfo) {
      this.updateForm = Object.assign({}, this.formInfo)
    }
  },
  methods: {
    // 关闭弹窗
    handleClose () {
      this.$emit('handleClose')
    },
    // 下载模板
    downTemplate () {
      let filePath = `/${this.type}/Public/${this.downPath}`
      UploadApi.downloadFile(`${this.templateName}`, filePath)
    },
    // 文件列表改变
    handleChangeFile (file, fileList) {
      this.updateForm.fileName = file.name
      this.fileList = fileList
    },
    // 超过文件上传数
    exceedFile (file, fileList) {
      if (file.length > 0) {
        this.$message({
          type: 'error',
          message: '模板文件仅可上传一个，请您清空文件列表后再次上传！'
        })
      }
    },
    // 上传文件前处理函数
    beforeUploadFile (file) {
      // let that = this
      // let formData = new FormData()
      // formData.append('file', file)
      // formData.append('token', that.token)
      // this.formData = formData
      this.formData.append(`file${this.size}`, file)
      this.size += 1
      return false
    },
    // 清空文件列表
    clearFileList () {
      this.$refs.upload.clearFiles()
      this.size = 0
      this.fileList = []
      this.updateForm.fileName = ''
    },
    editRule () {
      this.dataLoading = true
      let params = Object.assign({token: this.token}, this.updateForm)
      service.updateRule(params).then(data => {
        if (data.ID === '-1') {
          this.$message({
            type: 'error',
            message: '删除法规失败'
          })
        } else {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.handleEnterPageone()
        }
      }).finally(() => {
        this.dataLoading = false
      })
    },
    // 上传文件
    importFile () {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.editRule()
          } else {
            this.dataLoading = true
            this.$refs.upload.submit()
            setTimeout(() => {
              this.uploadFiles()
            }, 1000)
          }
        } else {
          this.$message({
            type: 'error',
            message: '请您完善必填项'
          })
        }
      })
    },
    uploadFiles () {
      // this.formData.append('token', this.token)
      let that = this
      let formData = this.formData
      formData.append('token', that.token)
      formData.append('rulename', that.updateForm.rulename)
      formData.append('rulebody', that.updateForm.rulebody)
      $.ajax({
        url: `/${type}${that.uploadUrl}`,
        type: 'post',
        processData: false,
        contentType: false,
        data: formData,
        // xhr: null,
        success: function (resData) {
          that.dataLoading = false
          that.clearFileList()
          let data = resData.data
          that.formData = new FormData()
          if (data.ID === '-1') {
            that.$message({
              type: 'error',
              message: `${data.msg}`
            })
          } else {
            that.$message({
              type: 'success',
              message: `上传成功!`
            })
          }
          that.$emit('uploadSuccess', resData)
        },
        error: function (resData) {
          that.dataLoading = false
          that.clearFileList()
          that.$message({
            type: 'error',
            message: `服务器错误，上传失败！`
          })
        }
      })
    }
  },
  components: {
  }
}
</script>

<style lang="scss">

</style>
