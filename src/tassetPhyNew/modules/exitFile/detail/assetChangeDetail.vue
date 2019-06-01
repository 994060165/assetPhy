<template>
  <el-collapse-item title="变更信息" name="3" class="detail">
    <el-form ref="changeForm" :model="changeInfo" label-width="120px">
      <el-row class="m-t-20" v-if="type === 'dept' || type === 'all'">
        <el-col :span="12">
          <el-form-item label="变更部门">
            <div class="panelBody" style="width: 100%;">
            {{assetFlowInfo.c02}}
            </div>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row class="m-t-20" v-if="type === 'person' || type === 'all'">
        <el-col :span="12">
          <el-form-item label="变更责任人" required>
            <div class="panelBody" style="width: 100%;">
            {{assetFlowInfo.c01}}
            </div>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row class="m-t-20">
        <el-col :span="12">
          <el-form-item label="变更说明" prop="explain">
            {{assetFlowInfo.c03}}
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-collapse-item>
</template>

<script>
import moment from 'moment'
import searchUserDialog from '@/components/sysSelectPeople.vue'
import {TokenAPI} from '@/request/TokenAPI'
export default {
  props: {
    assetFlowInfo: {
      type: Object,
      default: {
        userList: [],
        deptList: []
      }
    },
    type: {
      type: String,
      default: 'person'
    }
  },
  data () {
    return {
      moment: moment,
      formRules: {
        explain: [
          { required: true, message: '变更信息不能为空', trigger: 'blur' }
        ]
      },
      userDialogVisible: false,
      dialogTitle: '选择人员',
      org: TokenAPI.getOrg(),
      deptDialogVisible: false
    }
  },
  mounted () {
  },
  methods: {
    selectPeople () {
      this.userDialogVisible = true
    },
    selectDept () {
      this.deptDialogVisible = true
    },
    handleDeleteUser () {
      this.changeInfo.userList = []
    },
    handleDeleteDept () {
      this.changeInfo.deptList = []
    },
    addMember (persons) {
      this.addCancel()
      let arr = []
      arr.push(persons[0])
      this.changeInfo.userList = arr
    },
    addCancel () {
      this.userDialogVisible = false
    },
    addDept (dept) {
      console.log(dept)
      this.closeDeptDialog()
      this.changeInfo.deptList = dept
    },
    closeDeptDialog () {
      this.deptDialogVisible = false
    }
  },
  components: {
    searchUserDialog
  }
}
</script>

<style lang="scss">

</style>
