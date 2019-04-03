<template>
  <el-row class="changeCheckLabel">
    <el-row class="padding-10 text-left headerTitle">
      <el-button type="primary" @click="goBack">返回</el-button>
      <el-button type="primary" @click="submit">提交</el-button>
    </el-row>
    <el-row class="interval"></el-row>
    <el-collapse v-model="activeNames" v-loading="loading">
      <div class="padding-20">
        <assetInfoDetail
          v-if="dataLoad"
          :assetInfo="assetInfo">
        </assetInfoDetail>
      </div>
      <el-row class="interval"></el-row>
      <div class="m-t-10 padding-10">
        <assetImgDetail
          v-if="dataLoad"
          :assetNum="assetNum"
          :assetInfo="assetInfo">
        </assetImgDetail>
      </div>
      <el-row class="interval"></el-row>
      <div class="padding-10">
        <assetChangeEdit
          ref="changeForm"
          v-if="dataLoad"
          :changeInfo="changeInfo">
        </assetChangeEdit>
      </div>
    </el-collapse>
  </el-row>
</template>

<script>
import moment from 'moment'
import assetInfoDetail from './detail/assetInfo.vue'
import assetImgDetail from './detail/assetImg.vue'
import assetChangeEdit from './edit/assetChangeEdit.vue'
import {TokenAPI} from '@/request/TokenAPI'
import api from '@/api'
export default {
  data () {
    return {
      token: TokenAPI.getToken(),
      moment: moment,
      assetInfo: {},
      dataLoad: false,
      loading: false,
      assetNum: '',
      activeNames: ['1', '2', '3'],
      changeInfo: {}
    }
  },
  mounted () {
    this.assetNum = this.$route.params.assetNum
    this.getAssetInfo()
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 获取资产信息
    getAssetInfo () {
      this.loading = true
      let params = {
        asset_num: this.assetNum,
        token: this.token
      }
      api.fetchAssetList(params).then(data => {
        console.log('data', data)
        this.assetInfo = data.data[0]
      }).finally(() => {
        this.dataLoad = true
        this.loading = false
      })
    },
    // 提交
    submit () {
      let isValid = this.validateForm(['changeForm'])
      console.log(isValid)
    },
    // 判断表单验证
    validateForm (formArr) {
      let isValid = true
      formArr.forEach(value => {
        this.$refs[value].$refs[value].validate((valid) => {
          if (!valid) {
            isValid = false
          }
        })
      })
      return isValid
    }
  },
  components: {
    assetInfoDetail, assetImgDetail, assetChangeEdit
  }
}
</script>

<style lang="scss">
.el-collapse-item__header {
    height: 43px;
    line-height: 43px;
    padding-left: 15px;
    background-color: #fff;
    color: #48566a;
    cursor: pointer;
    border-bottom: 1px solid #ecdfdf;
    font-size: 13px;
}
.changeCheckLabel {
  padding-top: 0;
  .el-collapse {
    border-top: 0px;
  }
}
</style>
