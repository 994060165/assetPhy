<template>
<div class="asset-search padding-20">
  <datagrid ref="datagrid"
    :server-page="true"
    :table-data="allAssets"
    :search-form="searchForm"
    @handleSearch="handleSearch"
    @downFile="exportExcel">
    <template slot="form">
      <el-row :gutter="16" style="padding-bottom: 30px;">
        <el-col :span="8">
          <el-form-item label="资产名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="searchForm.deparment" placeholder="请选择部门"></el-input>
            <!-- <el-select  filterable clearable>
              <el-option v-for="(item, index) in allDeparments" :key="index" :label="item" :value="item"></el-option>
            </el-select> -->
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
            <!-- <el-select filterable clearable v-model="searchForm.person" placeholder="请选择责任人">
              <el-option v-for="(item, index) in allPersons" :key="index" :label="item" :value="item"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="资产最大价值">
            <el-input-number v-model="searchForm.maxvalue" :min="0" :step="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="资产标签号">
            <el-input v-model="searchForm.tag_num"></el-input>
          </el-form-item>
          <!-- <el-form-item label="父资产名称">
            <el-input v-model="searchForm.parent_name"></el-input>
          </el-form-item> -->
          <el-form-item label="启用日期">
            <el-date-picker v-model="searchForm.start_time" type="daterange" placeholder="选择领用日期范围"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
    <template slot="action">
      <el-input 
        placeholder="请输入资产名称/资产编码/责任部门/责任人"
        v-model="keystr" @keyup.enter.native="handleEnterPageone">
        <el-button slot="append" icon="el-icon-search" @click="handleEnterPageone"></el-button>
      </el-input>
    </template>
    <template slot="table">
      <el-table-column prop="name" label="资产名称" width="140"></el-table-column>
      <el-table-column label="资产编码" width="140" prop="asset_num">
      </el-table-column>
      <el-table-column prop="outreason" label="出门受限原因 " show-overflow-tooltip></el-table-column>
      <!-- <el-table-column prop="tag_num" label="资产编号"></el-table-column> -->
      <el-table-column prop="location" label="资产位置"></el-table-column>
      <!-- <el-table-column prop="parent_tag_num" label="父资产标签号"></el-table-column>
      <el-table-column prop="parent_name" label="父资产名称"></el-table-column> -->
      <el-table-column prop="value" label="基本当前成本 "></el-table-column>
      <el-table-column prop="start_time" label="启用日期">
        <template slot-scope="scope">
          {{scope.row.start_time | moment}}
        </template>
      </el-table-column>
      <el-table-column prop="zrr_name" label="责任人姓名"></el-table-column>
      <el-table-column prop="deparment" label="部门 "></el-table-column>
      <el-table-column width="100" label="操作">
        <template slot-scope="scope">
          <el-button @click="seeDetail(scope.row)" title="查看" type="success" size="mini" icon="el-icon-view" ></el-button>
          <el-button @click="editAsset(scope.row)" title="设置出门受限" type="primary" size="mini" icon="el-icon-edit" ></el-button>
        </template>
      </el-table-column>
    </template>
  </datagrid>
  <detail 
    ref="detail"
    :visible="visible"
    :imgs="imgs"
    @closeDialog="closeDialog">
  </detail>
  <limitRelieve
    v-if="dialogVisible"
    :dialogVisible="dialogVisible"
    :dialogTitle="dialogTitle"
    :assetFlowInfo="assetFlowInfo"
    @closeDialog="closeLimitDialog"
    @uploadSuccess="uploadSuccess">

  </limitRelieve>
</div>
</template>

<script>
import datagrid from '@/components/common/datagrid.vue'
import detail from '@/components/asset/detail.vue'
import api from '@/api'
import moment from 'moment'
import { type } from '../../../../static/data'
import limitRelieve from './edit/limitRelieve.vue'
// import TokenAPI from '@/request/TokenAPI.js'
export default {
  mounted () {
    this.handleEnterPageone()
  },
  data () {
    return {
      allAssets: [],
      keystr: '',
      visible: false,
      searchForm: {
        name: '',
        tag_num: '',
        parent_name: '',
        asset_num: '',
        deparment: '',
        zrr_name: '',
        minvalue: '',
        maxvalue: 1000000,
        start_time: []
      },
      allPersons: [],
      isFuzzy: true,
      imgs: {},
      assetData: {},
      token: window.sessionStorage.getItem('token'),
      dialogVisible: false,
      dialogTitle: '设置出门受限资产',
      assetFlowInfo: {}
      // token: TokenAPI.getToken()
    }
  },
  methods: {
    handleEnterPageone () {
      api.searchAssetList(
        {
          keystr: this.keystr,
          page: 1,
          pagesize: this.$refs.datagrid.page.pageSize
        }
      ).then(data => {
        this.allAssets = data.data
        this.$refs.datagrid.table.loading = false
        this.$refs.datagrid.page.total = data.count
        this.isFuzzy = true
      })
    },
    handleEnter () {
      api.searchAssetList(
        {
          keystr: this.keystr,
          page: this.$refs.datagrid.page.currentPage,
          pagesize: this.$refs.datagrid.page.pageSize
        }
      ).then(data => {
        this.allAssets = data.data
        this.$refs.datagrid.table.loading = false
        this.$refs.datagrid.page.total = data.count
        this.isFuzzy = true
      })
    },
    handleSearch (isSearch) {
      if (!this.isFuzzy || isSearch) {
        let _params = Object.assign({}, this.searchForm)
        if (this.searchForm.start_time[0]) {
          _params.minDate = moment(this.searchForm.start_time[0].getTime()).format('YYYY-MM-DD')
          _params.maxDate = moment(this.searchForm.start_time[1].getTime()).format('YYYY-MM-DD')
        }
        _params.page = this.$refs.datagrid.page.currentPage
        _params.pagesize = this.$refs.datagrid.page.pageSize
        api.fetchAssetList(_params).then(data => {
          this.allAssets = data.data
          this.$refs.datagrid.page.total = data.count
          this.$refs.datagrid.table.loading = false
          this.isFuzzy = false
        })
      } else {
        this.handleEnter()
      }
    },
    downloadFile (fileName, filePath) {
      const a = document.createElement('a')
      a.setAttribute('download', fileName)
      a.setAttribute('href', filePath)
      document.body.appendChild(a)
      a.style.display = 'none'
      a.click()
      this.$refs.datagrid.downLoading = false
      // window.open(filePath)
    },
    exportExcel (isSearch) {
      this.$refs.datagrid.downLoading = true
      let params
      let path
      // 精确查询： getassetToExportExcel； 模糊查询： getassetlikeToExportExcel；
      if (!this.isFuzzy) {
        params = Object.assign({}, this.searchForm)
        if (this.searchForm.start_time[0]) {
          params.minDate = moment(this.searchForm.start_time[0].getTime()).format('YYYY-MM-DD')
          params.maxDate = moment(this.searchForm.start_time[1].getTime()).format('YYYY-MM-DD')
        }
        path = 'getassetToExportExcel'
      } else {
        params = {
          keystr: this.keystr
        }
        path = 'getassetlikeToExportExcel'
      }
      api.getassetToExportExcel(params, path).then(data => {
        if (data.ID === '-1') {
          this.$refs.datagrid.downLoading = false
          this.$message({
            type: 'error',
            message: `${data.message}`
          })
        } else {
          let splitPath = data.split('\\')
          console.log(splitPath)
          let path = `${window.location.origin}/${type}/public/ExportAsset/${splitPath[2]}`
          console.log(path)
          this.downloadFile(`${splitPath[2]}`, path)
        }
      }, () => {
        this.$refs.datagrid.downLoading = false
        this.$message({
          type: 'error',
          message: `下载失败，获取下载文件路径失败`
        })
      })
    },
    seeDetail (row) {
      this.visible = true
      this.$refs.detail.asset = row
      let params = {
        asset_id: row.asset_id,
        asset_num: row.asset_num,
        token: window.sessionStorage.getItem('token')
      }
      api.getAssetImg(params).then(data => {
        console.log(data)
        this.imgs = data
      })
    },
    closeDialog () {
      this.visible = false
    },
    closeLimitDialog () {
      this.dialogVisible = false
    },
    uploadSuccess () {
      this.dialogVisible = false
      this.handleEnterPageone()
    },
    editAsset (row) {
      this.assetFlowInfo = Object.assign({}, row)
      this.dialogVisible = true
    },
    changeAsset (assetForm) {
      let params = Object.assign({token: this.token}, assetForm)
      api.changeAsset(params).then(data => {
        if (data.ID === '1') {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.cancel()
          if (this.isFuzzy) {
            this.handleEnter()
          } else {
            this.handleSearch()
          }
        } else {
          this.$message({
            type: 'error',
            message: `修改失败!${data.msg}`
          })
        }
      }, err => {
        console.log(err)
        this.$message({
          type: 'error',
          message: `网络原因，修改失败!`
        })
      })
    },
    cancel () {
      this.dialogVisible = false
      this.assetData = {}
    }
  },
  computed: {
  },
  components: {
    datagrid, detail, limitRelieve
  }
}
</script>

<style lang="scss">
.asset-search{
  .datagrid__action {
    text-align: right;
    .el-input{
      width: 400px;
    }
  }
}
</style>
