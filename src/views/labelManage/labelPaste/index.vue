<template>
<div class="asset-tpl">
  <!-- <el-row class="m-t-20 p-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>标签</el-breadcrumb-item>
      <el-breadcrumb-item><span class="color-blue">发放标签</span> </el-breadcrumb-item>
    </el-breadcrumb>
  </el-row> -->
  <el-row class="padding-10  text-right">
    <el-button type="primary" @click="goBack">返回</el-button>
    <el-button type="success" @click="uploadAlls">导入粘贴标签完成情况</el-button>
    <el-input 
      class="w-400"
      placeholder="请输入资产名称/资产编码/责任部门/责任人"
      v-model="keystr" @keyup.enter.native="handleEnterPageone">
      <el-button slot="append" icon="el-icon-search" @click="handleEnterPageone"></el-button>
    </el-input>
  </el-row>
  <el-row class="padding-10" v-loading="loading">
    <assetTable
      :tableList="tableList">
      <el-table-column label="标签领用人" width="120" align="center" slot="handle">
        <template slot-scope="scope">
          <span>{{scope.row.bind_person}}</span>
        </template>
      </el-table-column>
      <el-table-column label="领取时间"  align="center" slot="handle">
        <template slot-scope="scope">
          <span>{{scope.row.bind_date}}</span>
        </template>
      </el-table-column>
      <el-table-column label="提醒" width="120" slot="handle">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" title="操作" type="success" @click="changeCheckLabel(scope.row)"></el-button>
        </template>
      </el-table-column>
    </assetTable>
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
  <uploadFileDialog
    :formVisible="uploadFileVisible"
    :tableTitle="uploadFileTitle"
    :downPath="downPath"
    :templateName="templateName"
    :uploadUrl="uploadUrl"
    @handleClose="handleClose"
    @uploadSuccess="uploadSuccess">
  </uploadFileDialog>
  <exitFileDetail
  :dialogVisible="remindVisible"
  :assetFlowInfo="assetInfo"
  @closeDialog="closeRemind">
  </exitFileDetail>
</div>
</template>

<script>
import assetTable from './assetTable.vue'
// import labelGrant from './edit/labelGrant.vue'
import {TokenAPI} from '@/request/TokenAPI.js'
import uploadFileDialog from '@/components/uploadFileDialog.vue'
import exitFileDetail from './edit/exitFileDetail.vue'
import service from '@/api/service.js'
export default {
  data () {
    return {
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
      // 文件上传控制
      uploadFileVisible: false,
      // 模块标题
      uploadFileTitle: '粘贴标签完成情况文件导入',
      // 模板下载路径
      // downPath: '上传贴签完成情况模板.xlsx',
      downPath: '上传贴签完成情况模板.xlsx',
      // 下载的模板的文件名称
      templateName: '',
      uploadUrl: '/res/index/uploadpastelabelexcel',
      remindVisible: false,
      assetInfo: {}
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
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
      service.getStickLabelList(params).then(data => {
        this.total = data.count
        this.tableList = data.data
      }).finally(() => {
        this.loading = false
      })
    },
    // 点击设置提醒频率
    changeCheckLabel (row) {
      this.remindVisible = true
      this.assetInfo = Object.assign({}, row)
    },
    closeRemind () {
      this.remindVisible = false
      this.assetInfo = {}
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
    assetTable, uploadFileDialog, exitFileDetail
  }
}
</script>

<style lang="scss">
</style>
