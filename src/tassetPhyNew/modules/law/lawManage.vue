<template>
<div class="asset-tpl">
  <el-row class="m-t-20 p-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="font-18">
      <el-breadcrumb-item>法规管理</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row class="interval"></el-row>
  <el-row class="padding-10  text-right">
    <el-button type="primary" @click="goBack">返回</el-button>
    <el-button type="success" @click="uploadAlls">增加法规</el-button>
    <el-input 
      class="w-400"
      placeholder="请输入法规标题"
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
        <el-table-column label="法规">
          <template slot-scope="scope">
            <div v-html="scope.row.rulename">
              
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="delRule(scope.row)"></el-button>
            <el-button type="warning" size="mini" icon="el-icon-view" @click="viewRule(scope.row)"></el-button>
            <el-button type="success" size="mini" icon="el-icon-edit" @click="editRule(scope.row)"></el-button>
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
  <uploadFileDialog
    :formVisible="uploadFileVisible"
    :tableTitle="uploadFileTitle"
    :downPath="downPath"
    :templateName="templateName"
    :uploadUrl="uploadUrl"
    :isEdit="isEdit"
    v-if="uploadFileVisible"
    :formInfo="formDataInfo"
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
      assetFlowInfo: {},
      // 文件上传控制
      uploadFileVisible: false,
      // 模块标题
      uploadFileTitle: '上传法规',
      // 模板下载路径
      // downPath: '上传贴签完成情况模板.xlsx',
      downPath: '退库模板.xlsx',
      // 下载的模板的文件名称
      templateName: '',
      uploadUrl: '/res/index/addrule',
      flowNameOption: commonService.flowNameOption,
      formDataInfo: {},
      isEdit: false
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
      service.getRuleLIst(params).then(data => {
        if (data.ID === '-1') {
          this.$message({
            type: 'error',
            message: '获取法规信息失败'
          })
        } else {
          this.total = data.count
          this.tableList = data.data
        }
      }).finally(() => {
        this.loading = false
      })
    },
    // 点击申请更换责任人或部门或两者都换
    changeAsset (row, type) {
      this.$router.push(`/asset/changeAsset/${row.asset_num}/${type}`)
    },
    uploadAlls () {
      this.isEdit = false
      this.uploadFileVisible = true
    },
    handleClose () {
      this.uploadFileVisible = false
    },
    uploadSuccess (resData) {
      this.handleClose()
      console.log(resData)
    },
    editRule (row) {
      console.log(row)
      this.isEdit = true
      this.uploadFileVisible = true
      this.formDataInfo = Object.assign({}, row)
    },
    delRule (row) {
      this.$confirm('是否删除该条法规?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          token: this.token,
          ruleID: row.ruleID
        }
        service.deleteRule(params).then(data => {
          if (data.ID === '-1') {
            this.$message({
              type: 'error',
              message: '删除法规失败'
            })
          } else {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.handleEnterPageone()
          }
        }).finally(() => {
          this.loading = false
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    viewRule (row) {
      console.log(row)
    }
  },
  components: {
    assetTable, advancedSearch, uploadFileDialog
  }
}
</script>

<style lang="scss">
</style>
