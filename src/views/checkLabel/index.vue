<template>
<div class="asset-tpl">
  <el-row class="padding-10 text-right">
    <el-input class="w-300" v-model="keystr" @keyup.enter.native="handleEnterPageone">
      <el-button slot="append" icon="el-icon-search" @click="handleEnterPageone"></el-button>
    </el-input>
  </el-row>
  <el-row class="padding-10" v-loading="loading">
    <assetTable
      :tableList="tableList">
      <el-table-column label="操作" width="120" slot="handle">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-edit" title="更换标签" type="success" @click="changeCheckLabel(scope.row)"></el-button>
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
</div>
</template>

<script>
import assetTable from './assetTable.vue'
import {TokenAPI} from '@/request/TokenAPI.js'
import service from '@/api/service.js'
export default {
  data () {
    return {
      token: TokenAPI.getToken(),
      keystr: '',
      addTpl: false,
      viewTpl: false,
      formData: {},
      tableList: [],
      page: 1,
      pagesize: 10,
      total: 0,
      loading: false
    }
  },
  mounted () {
    this.getTableList()
  },
  methods: {
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
      service.getassetlikeZRR(params).then(data => {
        this.total = data.count
        this.tableList = data.data
      }).finally(() => {
        this.loading = false
      })
    },
    // 点击申请更换标签
    changeCheckLabel (row) {
      this.$router.push(`/changeCheckLabel/${row.asset_num}`)
    }
  },
  components: {
    assetTable
  }
}
</script>

<style lang="scss">
</style>
