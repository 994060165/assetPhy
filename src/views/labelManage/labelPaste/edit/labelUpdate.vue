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
              <span class="color-blue cursor" @click="downTemplate">点击下载批量导入模板</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="导入模板" class="readonly">
              <el-upload ref="upload"
                class="upload-demo"
                action=""
                :auto-upload="false"
                :file-list="fileList"
                :show-file-list="false" :limit="1"
                :on-change="handleChangeFile"
                :before-upload="beforeUploadFile">
                <el-input v-model="updateForm.fileName" placeholder="请选择导入的模板"></el-input>
              </el-upload>
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
export default {
  props: {
    formVisible: {
      type: Boolean,
      default: false
    },
    tableTitle: {
      type: String,
      default: '批量导入'
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
      }
    }
  },
  mounted () {
  },
  methods: {
    handleClose () {
      this.$emit('handleClose')
    },
    downTemplate () {

    },
    handleChangeFile (file, fileList) {

    },
    beforeUploadFile () {

    }
  },
  components: {
  }
}
</script>

<style lang="scss">

</style>
