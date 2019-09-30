<template>
<div class="asset-tpl">
  <el-row class="m-t-20 p-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="font-18">
      <el-breadcrumb-item>出门条管理</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row class="interval"></el-row>
  <el-row class="padding-10  text-right">
    <el-button type="primary" @click="goBack">返回</el-button>
    <el-button type="success" @click="uploadAlls">导入出门记录</el-button>
    <el-input 
      class="w-400"
      placeholder="请输入资产名称/资产编码"
      v-model="keystr" @keyup.enter.native="handleEnterPageone">
      <el-button slot="append" icon="el-icon-search" @click="handleEnterPageone"></el-button>
    </el-input>
  </el-row>
  <!-- <el-row class="padding-10 text-right">
      <advancedSearch
        :advance="true"
      >
        <div slot="search">
          <el-form label-width="120px">
          </el-form>
        </div>
      </advancedSearch>
  </el-row> -->
  <el-row class="padding-10" v-loading="loading">
     <el-table :data="tableList">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="asset_num" label="资产编码">
        </el-table-column>
        <el-table-column 
          prop="asset_name" 
          label="资产名称">
        </el-table-column>
        <el-table-column
          prop="c05" 
          show-overflow-tooltip 
          label="部门">
        </el-table-column>
        <!-- <el-table-column prop="zrr_name" width="100" label="责任人"></el-table-column> -->
        <el-table-column label="申请日期">
          <template slot-scope="scope">
            {{scope.row.start_time | moment}}
          </template>
        </el-table-column>
        <el-table-column 
          prop="c03" 
          show-overflow-tooltip 
          label="出门理由">
        </el-table-column>
        <el-table-column
          prop="c04"
          show-overflow-tooltip 
          label="去向地点">
        </el-table-column>
        <el-table-column
          show-overflow-tooltip 
          label="预计回归日期">
            <template slot-scope="scope">
              {{scope.row.c08 | moment}}
            </template>
        </el-table-column>
        <el-table-column 
          show-overflow-tooltip 
          label="申请类型">
            <template slot-scope="scope">
              {{flowNameOption[scope.row.flow_id]}}
            </template>
        </el-table-column>
        <el-table-column
          width="80"
          show-overflow-tooltip 
          label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                icon="el-icon-edit"
                title="设置提醒"
                type="success"
                @click="remind(scope.row)">
              </el-button>
            </template>
        </el-table-column>
      </el-table>
  </el-row>
  <el-row class="padding-10 text-right">
    <el-pagination
      @current-change="handleChange"
      :current-page="page"
      :page-size="pagesize"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </el-row>
  <exitFileDetail
    v-if="dialogVisible"
    :dialogVisible="dialogVisible"
    :dialogTitle="dialogTitle"
    :assetFlowInfo="assetFlowInfo"
    @closeDialog="closeDialog">

  </exitFileDetail>
  <uploadFileDialog
    :formVisible="uploadFileVisible"
    :tableTitle="uploadFileTitle"
    :downPath="downPath"
    :templateName="templateName"
    :uploadUrl="uploadUrl"
    @handleClose="handleClose"
    @uploadSuccess="uploadSuccess">
  </uploadFileDialog>
</div>
</template>

<script>
import assetTable from '@/tassetPhyNew/components/assetTable.vue'
import advancedSearch from '@/components/advancedSearch.vue'
import {TokenAPI} from '@/request/TokenAPI.js'
import service from '@/api/service.js'
import exitFileDetail from './detail/exitFileDetail.vue'
import uploadFileDialog from './edit/uploadFileDialog.vue'
import {commonService} from '../../service/commonService.js'
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
      // 文件上传控制
      uploadFileVisible: false,
      // 模块标题
      uploadFileTitle: '出门情况文件导入',
      // 模板下载路径
      // downPath: '上传贴签完成情况模板.xlsx',
      downPath: '出门条模板.xlsx',
      // 下载的模板的文件名称
      templateName: '',
      uploadUrl: '/flow/index/uploadAllExt',
      flowNameOption: commonService.flowNameOption
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
        token: this.token,
        flow_ids: 'f_ChuMen_001'
      }
      service.getAllOutOrder(params).then(data => {
        if (data.ID === '-1') {
          this.$message({
            type: 'error',
            message: '获取出门条信息失败'
          })
        } else {
          this.total = data.count
          this.tableList = data.data
        }
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
    uploadAlls () {
      this.uploadFileVisible = true
    },
    handleClose () {
      this.uploadFileVisible = false
    },
    uploadSuccess (resData) {
      this.handleClose()
      console.log(resData)
    }
  },
  components: {
    assetTable, advancedSearch, exitFileDetail, uploadFileDialog
  }
}
</script>

<style lang="scss">
</style>
