<template>
  <el-dialog
    :title="tableTitle"
    :visible.sync="formVisible" 
    :close-on-click-modal="false" 
    :before-close="handleClose">
    <el-row v-loading="dataLoading">
      <el-form label-width="120px" :model="updateForm">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="模板文件" class="readonly">
              <span class="color-blue cursor-pointer" @click="downTemplate">点击下载模板</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="导入模板" class="readonly">
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
                    <el-button type="success">文件上传</el-button>
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
                   <el-button
                    size="small"
                    type="primary" 
                    @click="importFile" 
                    v-if="fileList.length > 0">
                    导入
                   </el-button>
                </el-col>
              </el-row>
              
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import {TokenAPI} from '@/request/TokenAPI.js'
import {UploadApi} from '@/service/index.js'
import { type } from '../../static/data'
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
      size: 0
    }
  },
  mounted () {
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
    // 上传文件
    importFile () {
      this.dataLoading = true
      this.$refs.upload.submit()
      setTimeout(() => {
        this.uploadFiles()
      }, 1000)
    },
    uploadFiles () {
      // this.formData.append('token', this.token)
      let that = this
      let formData = this.formData
      formData.append('token', that.token)
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
          let data = resData
          that.formData = new FormData()
          if (data.ID === '-1') {
            that.$message({
              type: 'error',
              message: `${data.msg}`
            })
          } else {
            that.$message({
              type: 'success',
              message: `上传成功!插入表中${data.saveRows}条。`
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
