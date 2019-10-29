<template>
  <el-dialog
    :title="tableTitle"
    :visible.sync="formVisible" 
    :close-on-click-modal="false" 
    :before-close="handleClose">
    <el-row v-loading="dataLoading">
      <el-form label-width="120px" ref="ruleForm" :model="formInfo" :rules="formRules">
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="法规标题:" prop="rulename" class="readonly">
              <div v-html="formInfo.rulename"></div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="法规内容:" prop="rulebody" class="readonly">
              <div v-html="formInfo.rulebody"></div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item label="法规附件" class="readonly">
            <div v-for="(item, index) in fileList" :key="index">
              <span>{{item.filename}}</span>
               <el-tooltip placement="top">
                  <div slot="content" style="max-width: 600px; word-wrap: break-word;">
                    <!--  @click="preview(item)" -->
                    <div>{{item.filename}}</div>
                  </div>
                </el-tooltip>
                <el-button @click="download(item)">下载</el-button>
            </div>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <el-row slot="footer" class="dialogFooter text-center">
      <el-button @click.native="handleClose()">取消</el-button>
      <!-- <el-button type="primary" @click="confirm()">确定</el-button>
       -->
      <!-- <el-button type="primary" @click="importFile">上传</el-button> -->
    </el-row>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import {TokenAPI} from '@/request/TokenAPI.js'
import {UploadApi} from '@/service/index.js'
import { type } from '../../../../../static/data'
// import service from '@/api/service.js'
// import serviceApi from '@/api/service.js'
// import $ from 'jquery'
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
      default: '法规详情'
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
    this.handleFormData()
  },
  methods: {
    // 关闭弹窗
    handleClose () {
      this.$emit('handleClose')
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
    handleFormData () {
      let obj = {
        filename: this.formInfo.filename,
        filetype: this.formInfo.filetype,
        filepath: this.formInfo.filepath.replace(/\\/g, '/') + this.formInfo.filename
      }
      this.fileList = [obj]
    },
    // 下载模板
    downTemplate () {
      let filePath = `/${this.type}/Public/${this.downPath}`
      UploadApi.downloadFile(`${this.templateName}`, filePath)
    },
    download (item) {
      let filePath = `/${this.type}/${item.filepath}`
      UploadApi.downloadFile(``, filePath)
    },
    preview (item) {

    }
  },
  components: {
  }
}
</script>

<style lang="scss">

</style>
