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
        <assetChangeEdit
          ref="changeForm"
          :type="type"
          v-if="dataLoad"
          :changeInfo="changeInfo">
        </assetChangeEdit>
        <el-row class="padding-10 text-left headerTitle" id="create_protect_top">
          <el-button type="primary" @click="goBack">取消</el-button>
          <el-button type="primary" @click="submit">提交</el-button>
        </el-row>
      </div>
    </el-collapse>
  </el-row>
</template>

<script>
import moment from 'moment'
import fixarea from '@/components/fixarea.vue'
import assetInfoDetail from '../../components/detail/assetInfo.vue'
import assetImgDetail from '../../components/detail/assetImg.vue'
import assetChangeEdit from './edit/assetChangeEdit.vue'
import {commonService} from './service/commonService.js'
import {TokenAPI} from '@/request/TokenAPI'
import {AssetChangeAPI} from './service/assetChangeAPI.js'
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
      changeInfo: {
        userList: [],
        deptList: []
      },
      type: 'person',
      flow: commonService.changeFlow
    }
  },
  mounted () {
    this.assetNum = this.$route.params.assetNum
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
      console.log('changeInfo', this.changeInfo)
      let isValid = this.validateForm(['changeForm'])
      if (isValid) {
        let judge = this.judgeObj()
        if (judge) {
          let params = {
            token: this.token,
            'asset_num': this.assetNum,
            'flow_id': this.flow[this.type],
            c01: this.changeInfo.userList[0] ? this.changeInfo.userList[0].UserID : '',
            c02: this.changeInfo.deptList[0] ? this.changeInfo.deptList[0].OrgID : '',
            c03: this.changeInfo.explain
          }
          console.log('params', params)
          AssetChangeAPI.setChangeDeporPer(params).then(data => {
            if (data.result === '-1') {
              this.$message({
                type: 'error',
                message: '提交失败！'
              })
            } else {
              this.$message({
                type: 'success',
                message: '提交成功！'
              })
              this.goBack()
            }
          }, () => {
            this.$message({
              type: 'error',
              message: `网络原因，提交失败！`
            })
          })
        }
      }
    },
    judgeObj () {
      let userList = this.changeInfo.userList
      let deptList = this.changeInfo.deptList
      let judge = false
      if (this.type === 'person') {
        if (userList.length > 0) {
          judge = true
        } else {
          this.errMsg('请您选则一个责任人！')
          return false
        }
      } else if (this.type === 'dept') {
        if (deptList.length > 0) {
          judge = true
        } else {
          this.errMsg('请您选则部门！')
          return false
        }
      } else {
        if (userList.length > 0 && deptList.length > 0) {
          judge = true
        } else {
          this.errMsg('请您选中要变更部门和人员！')
          return false
        }
      }
      return judge
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
    assetInfoDetail, assetImgDetail, assetChangeEdit, fixarea
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
