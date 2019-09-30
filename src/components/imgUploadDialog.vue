<template>
  <el-dialog
    :title="dialogTitle"
    width="80"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible" 
    :before-close="handleCancel">
    <div v-loading="loading">
      <el-upload
        class="avatar-uploader text-center"
        action=""
        :on-change="handleChange"
        :multiple="false"
        :show-file-list="false">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <div class="padding-10 dialog-footer text-center" slot="footer">
      <div>
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import {TokenAPI} from '@/request/TokenAPI.js'
import {FlowAPI} from '@/api/flowAPI.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default: ''
    },
    assetNum: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      active: 0,
      fixedArea: false,
      token: TokenAPI.getToken(),
      steps: [],
      loading: false,
      imageUrl: '',
      img: ''
    }
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    imgToBase64 (img) {
      let that = this
      let reader = new FileReader()
      reader.readAsDataURL(img)
      reader.onloadend = function () {
        let result = reader.result
        that.tijiao(result)
      }
    },
    handleChange (file, fileList) {
      console.log(file, fileList)
      this.imageUrl = URL.createObjectURL(file.raw)
      this.img = file.raw
    },
    handleCancel () {
      this.$emit('closeDialog')
    },
    submit () {
      this.imgToBase64(this.img)
    },
    tijiao (imgBase64Str) {
      this.loading = true
      let params = {
        token: this.token,
        c14: this.assetNum,
        imgbase64: imgBase64Str
      }
      FlowAPI.updateAssetLimitStatus(params).then(data => {
        if (data.ID === '1') {
          this.$message({
            type: 'success',
            message: `${data.msg}`
          })
        } else {
          this.$message({
            type: 'warning',
            message: `${data.msg}`
          })
        }
      }, () => {
        this.$message({
          type: 'error',
          message: '操作失败！'
        })
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
  .isFixed{
		position: fixed;
		background-color: #Fff;
		top: 100px;
		z-index: 99999;
    right: 20px;
		width: calc(100% - 200px);
  }
</style>
<style>
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