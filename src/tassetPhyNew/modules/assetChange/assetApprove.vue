<template>
  <el-row class="changeCheckLabel">
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
        <div class="">
          变更流程
        </div>
        <flowStep
          v-if="flowStepVisible"
          :orderNo="orderNum">
        </flowStep>
      </div>
      <el-row class="interval"></el-row>
      <div class="padding-10">
        <assetChangeDetail
          ref="changeForm"
          :type="type"
          v-if="dataLoad"
          :assetFlowInfo="assetFlowInfo">
        </assetChangeDetail>
        <el-row class="padding-10 text-left headerTitle" id="create_protect_top">
          <el-button type="primary" @click="goBack">返回</el-button>
          <el-button type="danger" @click="reject">驳回</el-button>
          <el-button type="success" @click="submit('1')">同意</el-button>
        </el-row>
      </div>
    </el-collapse>
  </el-row>
</template>

<script>
import moment from 'moment'
import fixarea from '@/components/fixarea.vue'
import flowStep from '@/components/flowStep.vue'
import assetInfoDetail from '../../components/detail/assetInfo.vue'
import assetImgDetail from '../../components/detail/assetImg.vue'
import assetChangeDetail from './detail/assetChangeDetail.vue'
import {commonService} from '../../service/commonService.js'
import {TokenAPI} from '@/request/TokenAPI'
// import {AssetChangeAPI} from './service/assetChangeAPI.js'
import {FlowAPI} from '@/api/flowAPI.js'
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
      orderNum: '',
      activeNames: ['1', '2', '3'],
      assetFlowInfo: {},
      type: 'person',
      flowStepVisible: false,
      flow: commonService.changeFlow
    }
  },
  mounted () {
    this.assetNum = this.$route.params.assetNum
    this.orderNum = this.$route.params.orderNum
    this.type = this.$route.params.type
    this.getAssetInfo()
  },
  methods: {
    // 返回
    goBack () {
      this.$router.go(-1)
    },
    // 获取资产信息
    getAssetInfo () {
      this.flowStepVisible = true
      this.loading = true
      let params = {
        asset_num: this.assetNum,
        token: this.token
      }
      api.fetchAssetList(params).then(data => {
        console.log('data', data)
        this.assetInfo = data.data[0]
      }).finally(() => {
        this.getFlowInfo()
      })
    },
    getFlowInfo () {
      let params = {
        token: this.token,
        order_no: this.orderNum
      }
      FlowAPI.getOrderInfo(params).then(data => {
        if (data.orderaction) {
          this.assetFlowInfo = data.orderaction.act01
        }
      }).finally(() => {
        this.dataLoad = true
        this.loading = false
      })
    },
    // 驳回
    reject () {
      this.$confirm('是否驳回?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submit('0')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 提交
    submit (type) {
      let params = {
        token: this.token,
        'order_no': this.orderNum,
        'result_tag': type
      }
      console.log('params', params)
      FlowAPI.handleOutOrder(params).then(data => {
        if (data.ID === '-1') {
          this.errMsg('审核失败')
        } else {
          this.$message({
            type: 'success',
            message: '提交成功！'
          })
          this.goBack()
        }
      }, () => {
        this.errMsg('审核失败')
      })
    },
    errMsg (msg) {
      this.$message({
        type: 'error',
        message: msg
      })
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
    assetInfoDetail, assetImgDetail, assetChangeDetail, fixarea, flowStep
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
