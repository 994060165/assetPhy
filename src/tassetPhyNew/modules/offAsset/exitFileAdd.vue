<template>
<div class="asset-tpl">
  <el-row class="m-t-20 p-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="font-18">
      <el-breadcrumb-item>新增出门条</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row>
    <el-form ref="form" :model="form" label-width="180px">
      <el-row class="contentArea">
        <el-form-item label="类型选择">
          <el-radio-group v-model="formType">
            <el-radio
              v-for="item in typeList"
              :key="item.value"
              :label="item.value">
                {{item.label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row class="contentArea m-t-20">
        <el-col :span="12">
          <el-form-item label="申请人：">
            <div class="formContent">{{form.UserName}}</div>
          </el-form-item>
          <el-form-item label="部门：">
            <div class="formContent">{{form.OrgName}}</div>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出门理由：">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="去向：">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="预计返回日期：">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="contentArea m-t-20">
        <el-col :span="12">
          <el-form-item label="资产名称：">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="所属单位：">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="是否为个人物品：">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="填写人">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
          <el-form-item label="两张资产照片">
            <el-input v-model="form.reason"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
</div>
</template>

<script>
import advancedSearch from '@/components/advancedSearch.vue'
import {TokenAPI} from '@/request/TokenAPI.js'
import {AssetChangeAPI} from '../../service/assetChangeAPI.js'
// import {commonService} from './service/commonService.js'
export default {
  data () {
    return {
      loading: false,
      token: TokenAPI.getToken(),
      userInfo: TokenAPI.getStaff(),
      form: {
        UserName: TokenAPI.getStaff().UserName,
        UserID: TokenAPI.getStaff().UserID,
        OrgName: TokenAPI.getOrg() ? TokenAPI.getOrg().OrgName : ''
      },
      formType: 1,
      typeList: [
        {
          label: '物理所固定资产',
          value: 1
        },
        {
          label: '物理所非固定资产/非物理所资产',
          value: 2
        }
      ]
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getAssetBySearch () {
      this.$refs.search.toggleShow()
      this.handleEnterPageone()
    },
    // 查询 页码归一
    handleEnterPageone () {
      this.page = 1
      this.getTableList()
    },
    // 改变页签
    handleChange (val) {
      this.page = val
      this.getTableList()
    },
    // 获取列表数据
    getTableList () {
      this.loading = true
      let params = {
        keystr: this.keystr,
        page: this.page,
        pagesize: this.pagesize,
        token: this.token
      }
      AssetChangeAPI.getMyBackOrder(params).then(data => {
        // this.total = data.count
        this.tableList = data.data
      }).finally(() => {
        this.loading = false
      })
    },
    // 点击申请更换责任人或部门或两者都换
    goPath (row) {
      this.$router.push(`/asset/assetApprove/${row.asset_num}/${row.order_no}/${this.flowTran[row.flow_id]}`)
    }
  },
  components: {
    advancedSearch
  }
}
</script>

<style lang="scss">
</style>
