<template>
<div class="asset-tpl">
  <el-row class="m-t-20 p-l-10">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="font-18">
      <el-breadcrumb-item>待处理列表</el-breadcrumb-item>
    </el-breadcrumb>
  </el-row>
  <el-row class="interval"></el-row>
  <!-- <el-row class="padding-10 text-right">
    <advancedSearch
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
    </advancedSearch>  
  </el-row> -->
  <el-row class="padding-10" v-loading="loading">
     <el-table :data="tableList">
      <el-table-column
        type="index" 
        label="序号" 
        width="80">
      </el-table-column>
      <el-table-column
        prop="asset_name"
        show-overflow-tooltip
        label="资产名称">
      </el-table-column>
      <el-table-column
        prop="asset_num" 
        width="140"
        label="资产编号">
      </el-table-column>
      <el-table-column
        prop="flow_id"
        show-overflow-tooltip
        width="240"
        label="申请类型">
        <template slot-scope="scope">
          {{flowNameOption[scope.row.flow_id]}}
        </template>
      </el-table-column>
      <el-table-column
        prop="create_user" 
        show-overflow-tooltip
        width="120"
        label="申请人">
      </el-table-column>
      <el-table-column
        prop="create_date" 
        show-overflow-tooltip
        width="180"
        label="申请时间">
      </el-table-column>
      <el-table-column
        width="50"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="goPath(scope.row)" icon="el-icon-search"></el-button>
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
</div>
</template>

<script>
import advancedSearch from '@/components/advancedSearch.vue'
import {TokenAPI} from '@/request/TokenAPI.js'
import {AssetChangeAPI} from '../../service/assetChangeAPI.js'
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
      flowNameOption: commonService.flowNameOption,
      flowTran: commonService.flowTran
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
        token: this.token,
        flow_ids: 'f_BianGeng_001,f_BianGeng_002,f_BianGeng_003'
      }
      AssetChangeAPI.getMyHandleOrder(params).then(data => {
        // let data = res.data
        this.total = data.count
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
