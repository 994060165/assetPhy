<template>
  <el-dialog
    class="sys userDialog"
    width="70%"
    :title="dialogTitle"
    :visible="dialogVisible"
    :before-close="handleCancel">
    <el-row class="text-right">
      <el-input
        placeholder="请输入检索关键字"
        v-model="queryKey"
        @keyup.enter.native="retrieveData"
        style="width: 50%; text-align: right;">
        <el-button slot="append" icon="el-icon-search" @click="retrieveData"></el-button>
      </el-input>
      </el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="member-table"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="100px">
        </el-table-column>
        <el-table-column
          prop="UserID"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="UserName"
          label="真实姓名"
          width="120px">
        </el-table-column>
        <el-table-column
          prop="UserEmail"
          label="邮箱"
          width="200px">
        </el-table-column>
        <el-table-column
          prop="UserMobile"
          label="手机号"
          width="160px">
        </el-table-column>
    </el-table>
    <el-row class="padding-10 pull-right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-row>
    <div class="padding-10 dialog-footer text-center" slot="footer">
      <div>
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleConfirm">确 定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      'default' () {
        return {}
      }
    },
    OrgID: {
      type: String,
      default: ''
    },
    dialogTitle: {
      type: String,
      default: '添加人员'
    },
    roleId: {
      type: String,
      'default' () {
        return ''
      }
    }
  },
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      queryKey: '',
      total: 0,
      localVisible: this.dialogVisible,
      selectCandidates: []
    }
  },
  mounted () {
    this.retrieveData()
  },
  computed: {
  },
  watch: {
    dialogVisible () {
      this.localVisible = this.dialogVisible
    }
  },
  created () {
  },
  methods: {
    extractCorpOrgIds (users) {
      let orgIds = {}
      let list = []
      for (let user of users) {
        if (orgIds[user.corpOrgId] !== true) {
          orgIds[user.corpOrgId] = true
          list.push(user.corpOrgId)
        }
      }
      return list
    },
    makeOrgNameMap (orgs) {
      let nameMap = {}
      for (let org of orgs) {
        nameMap[org.orgId] = org.deptName
      }
      return nameMap
    },
    // 查找人员
    retrieveData () {
      let params = {
        UserID: this.queryKey,
        page: this.currentPage,
        pagesize: this.pageSize,
        OrgID: this.OrgID
        // OrgID: 'cnicg'
      }
      // this.$request.post('/sys/index/getAlluser', params).then(res => {
      this.$request.post('/sys/index/getUsersByOrgID', params).then(res => {
        let data = res.data
        if (res.data) {
          this.tableData = data.data
          this.total = data.count
        }
      })
    },
    orgNameFormatter (row, column) {
      return this.orgNameMap[row.corpOrgId]
    },
    handleConfirm () {
      let arr = this.selectCandidates
      if (arr.length > 0) {
        this.$emit('addSuccess', arr)
      } else {
        this.$emit('addCancel')
      }
    },
    handleCancel () {
      this.$emit('addCancel')
    },
    handleSelectionChange (val) {
      this.selectCandidates = val
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.retrieveData()
      this.selectCandidates = []
    },
    handleCurrentChange (page) {
      this.currentPage = page
      this.retrieveData()
      this.selectCandidates = []
    }
  },
  components: {
  }
}
</script>
<style lang="css" scoped="scope">
  .member-table {
    text-align: left;
  }
</style>
<style lang="scss">
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  } 
  .el-dialog__headerbtn:hover .el-dialog__close{
    color: white;
  }
</style>
