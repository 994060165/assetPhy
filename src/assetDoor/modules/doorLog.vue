<template>
<div class="asset-tpl">
  <el-row class="m-t-20 p-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="font-18">
      <el-breadcrumb-item>通道门日志查看</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row class="interval"></el-row>
  <el-row class="padding-10 text-right">
    <!-- <el-input class="w-300" v-model="keystr" @keyup.enter.native="handleEnterPageone">
      <el-button slot="append" icon="el-icon-search" @click="handleEnterPageone"></el-button>
    </el-input> -->
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
  <el-row class="padding-10" v-loading="loading">
     <el-table :data="tableList">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column 
          show-overflow-tooltip 
          label="资产名称">
          <template slot-scope="scope">
            <span class="color-red">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column 
          prop="num" 
          show-overflow-tooltip 
          label="资产编号">
        </el-table-column>
        <el-table-column
          prop="direction" 
          show-overflow-tooltip 
          label="方向">
        </el-table-column>
        <!-- <el-table-column prop="zrr_name" width="100" label="责任人"></el-table-column> -->
        <el-table-column label="记录日期">
          <template slot-scope="scope">
            <span class="color-red">
              {{parseInt(scope.row.check_time) | moment('YYYY-MM-DD HH:MM:ss')}}
            </span>
          </template>
        </el-table-column>
        <el-table-column 
          prop="epc" 
          show-overflow-tooltip 
          label="epc编码">
        </el-table-column>
        <el-table-column
          prop="ed_group"
          show-overflow-tooltip 
          label="设备组">
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
</div>
</template>

<script>
import assetTable from '@/tassetPhyNew/components/assetTable.vue'
import advancedSearch from '@/components/advancedSearch.vue'
import {TokenAPI} from '@/request/TokenAPI.js'
import service from '@/api/service.js'
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
      assetFlowInfo: {}
    }
  },
  mounted () {
    this.getTableList()
    this.lunxun()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getAssetBySearch () {
      this.$refs.search.toggleShow()
      this.handleEnterPageone()
    },
    lunxun () {
      let that = this
      window.setInterval(() => {
        that.handleEnterPageone()
      }, 1000)
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
      // this.loading = true
      let time = new Date().getTime() - (1000 * 60)
      let params = {
        keystr: this.keystr,
        page: this.page,
        pagesize: this.pagesize,
        token: this.token,
        index: 't_doorguarder',
        type: 't_doorguarder',
        times: time
      }
      service.searchDoorList(params).then(data => {
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
    }
  },
  components: {
    assetTable, advancedSearch
  }
}
</script>

<style lang="scss">
</style>
