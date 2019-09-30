<template>
<div class="asset-tpl">
  <el-row class="m-t-20 p-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="font-18">
      <el-breadcrumb-item>审批出门条</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row class="interval"></el-row>
  <el-row class="padding-10 text-right">
    <el-input class="w-300" v-model="keystr" @keyup.enter.native="handleEnterPageone">
      <el-button slot="append" icon="el-icon-search" @click="handleEnterPageone"></el-button>
    </el-input>
    <!-- 高级搜索 -->
    <!-- <advancedSearch
      :searchPlaceholder="searchPlaceholder"
      :searchStyle="searchStyle"
      :advance="false"
      @search="handleEnterPageone"
      ref="search">
        <div slot="search">
          <el-row>
            <el-form ref="searchForm" label-width="100px" :model="searchForm">
              <el-row :gutter="16">
                <el-col :span="8">
                  <el-form-item label="资产名称">
                    <el-input v-model="searchForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="部门">
                    <el-input v-model="searchForm.deparment" placeholder="请输入部门"></el-input>
                  </el-form-item>
                  <el-form-item label="资产最小价值">
                    <el-input-number v-model="searchForm.minvalue" :min="0" :step="100"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="资产编码">
                    <el-input v-model="searchForm.asset_num"></el-input>
                  </el-form-item>
                  <el-form-item label="责任人">
                    <el-input v-model="searchForm.zrr_name" placeholder="请输入人员姓名"></el-input>
                  </el-form-item>
                  <el-form-item label="资产最大价值">
                    <el-input-number v-model="searchForm.maxvalue" :min="0" :step="100"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="资产标签号">
                    <el-input v-model="searchForm.tag_num"></el-input>
                  </el-form-item>
                  <el-form-item label="启用日期">
                    <el-date-picker v-model="searchForm.start_time" type="daterange" placeholder="选择领用日期范围"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-row>
          <el-row class="text-right">
            <el-button type="primary" @click="getAssetBySearch">筛选</el-button>
          </el-row>
        </div>
    </advancedSearch>   -->
  </el-row>
  <!-- <el-row class="text-center">
    <el-radio-group v-model="tabs" @change="changeTab">
      <el-radio-button label="pending">待审批</el-radio-button>
      <el-radio-button label="processing">已审批</el-radio-button>
    </el-radio-group>
  </el-row> -->
  <el-row class="padding-10" v-loading="loading">
    <el-table :data="tableList" v-if="tabs === 'pending'">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="asset_num" label="资产编码">
        </el-table-column>
        <el-table-column 
          prop="asset_name" 
          label="资产名称">
        </el-table-column>
        <el-table-column
          prop="create_user" 
          show-overflow-tooltip 
          label="申请人">
        </el-table-column>
        <el-table-column label="申请日期">
          <template slot-scope="scope">
            {{scope.row.create_date | moment}}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip 
          label="申请类型">
          <template slot-scope="scope">
          <span>{{flowNameOption[scope.row.flow_id]}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column
          show-overflow-tooltip 
          label="归还日期">
            <template slot-scope="scope">
              {{scope.row.create_date | moment}}
            </template>
        </el-table-column> -->
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="success" 
              size="mini" 
              title="查看流程" 
              icon="el-icon-view" 
              @click="viewStep(scope.row)">
            </el-button>
            <el-button
              type="primary"
              size="mini" 
              title="审批" 
              icon="el-icon-edit" 
              @click="goPath(scope.row)">
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row class="padding-10 text-right">
        <el-pagination
          @current-change="handleChange"
          :current-page="page"
          :page-size="pagesize"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </el-row>
  </el-row>
  <exitFileDetail
    v-if="dialogVisible"
    :dialogVisible="dialogVisible"
    :dialogTitle="dialogTitle"
    :assetFlowInfo="assetFlowInfo"
    @closeDialog="closeDialog">

  </exitFileDetail>
  
  <flowStepDialog
    v-if="viewDialogVisible"
    :dialogVisible="viewDialogVisible"
    :orderNo="orderNum"
    @closeDialog="closeStepDialog">
  </flowStepDialog>
</div>
</template>

<script>
import assetTable from '@/tassetPhyNew/components/assetTable.vue'
import advancedSearch from '@/components/advancedSearch.vue'
import flowStepDialog from '@/components/flowStepDialog.vue'
import {TokenAPI} from '@/request/TokenAPI.js'
import {AssetChangeAPI} from '../../service/assetChangeAPI.js'
import {commonService} from '../../service/commonService.js'
import exitFileDetail from './detail/exitFileDetail.vue'
export default {
  data () {
    return {
      searchStyle: 'width: auto;max-width: 294px;', // 高级搜索组件的input样式
      searchPlaceholder: '请输入查询内容', // 搜索框的默认
      keystr: '',
      addTpl: false,
      viewTpl: false,
      formData: {},
      tableList: [],
      page: 1,
      pagesize: 10,
      total: 0,
      loading: false,
      token: TokenAPI.getToken(),
      grantShow: false,
      searchForm: {
      },
      dialogVisible: false,
      dialogTitle: '出门条提醒设置',
      assetFlowInfo: {},
      tabs: 'pending',
      flowNameOption: commonService.flowNameOption,
      flowTran: commonService.flowTran,
      viewDialogVisible: false,
      orderNum: ''
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
      // let params = Object.assign({}, this.searchForm)
      // if (this.searchForm.start_time[0]) {
      //   params.minDate = moment(this.searchForm.start_time[0].getTime()).format('YYYY-MM-DD')
      //   params.maxDate = moment(this.searchForm.start_time[1].getTime()).format('YYYY-MM-DD')
      // }
      this.loading = true
      let params = {
        keystr: this.keystr,
        page: this.page,
        pagesize: this.pagesize,
        flow_ids: 'f_ChuMen_001,f_ChuMen_002,f_ChuMen_003',
        token: this.token
      }
      AssetChangeAPI.getMyHandleOrder(params).then(data => {
        this.total = data.count
        this.tableList = data.data
      }).finally(() => {
        this.loading = false
      })
    },
    remind (row) {
      this.assetFlowInfo = Object.assign({}, row)
      this.dialogVisible = true
    },
    closeDialog () {
      this.dialogVisible = false
    },
    // 点击申请更换责任人或部门或两者都换
    changeAsset (row, type) {
      this.$router.push(`/asset/changeAsset/${row.asset_num}/${type}`)
    },
    importLabel () {
      this.grantShow = true
    },
    handleClose () {
      this.grantShow = false
    },
    // 点击审批出门条
    goPath (row) {
      this.$router.push(`/asset/exitFileApprove/${row.asset_num}/${row.order_no}/${row.flow_id}`)
    },
    // 查看流程
    viewStep (row) {
      this.orderNum = row.order_no
      this.viewDialogVisible = true
    },
    closeStepDialog () {
      this.viewDialogVisible = false
      this.orderNum = ''
    }
  },
  components: {
    assetTable, advancedSearch, exitFileDetail, flowStepDialog
  }
}
</script>

<style lang="scss">
</style>
