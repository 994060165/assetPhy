<template>
  <el-collapse-item title="变更信息" name="3" class="detail">
    <el-form ref="changeForm" :model="changeInfo" :rules="formRules" label-width="120px">
      <el-row class="m-t-20" v-if="type === 'dept' || type === 'all'">
        <el-col :span="12">
          <el-form-item label="变更部门" required>
            <div class="panelBody" style="width: 100%;">
              <el-tag
                :key="tag.id"
                v-for="tag in changeInfo.deptList"
                :closable="true"
                :close-transition="false"
                @close.stop="handleDeleteDept(tag)"
              >{{tag.name}}</el-tag>
              <el-button type="primary" class="" @click="selectDept">选择部门</el-button>
            </div>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row class="m-t-20" v-if="type === 'person' || type === 'all'">
        <el-col :span="12">
          <el-form-item label="变更责任人" required>
            <div class="panelBody" style="width: 100%;">
              <el-tag
                :key="tag.id"
                v-for="tag in changeInfo.userList"
                :closable="true"
                :close-transition="false"
                @close.stop="handleDeleteUser(tag)"
              >{{tag.UserName}}</el-tag>
              <el-button type="primary" class="" @click="selectPeople">选择人员</el-button>
            </div>
          </el-form-item>
        </el-col>
        
      </el-row>
      <el-row class="m-t-20">
        <el-col :span="12">
          <el-form-item label="变更说明" prop="explain">
            <el-input 
              type="textarea"
              placeholder="请填入变更说明"
              v-model="changeInfo.explain">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-form-item label="上传附件">
        </el-form-item>
      </el-row> -->
    </el-form>
    <searchUserDialog
      :OrgID="org.OrgID"
      :dialogVisible="userDialogVisible"
      :dialogTitle="dialogTitle"
      v-if="userDialogVisible"
      @addSuccess="addMember"
      @addCancel="addCancel">
    </searchUserDialog>
    <selectDept
      v-if="deptDialogVisible"
      :orgId="org.OrgID"
      :dialogVisible="deptDialogVisible"
      @updateOrg='addDept'
      @closeOrgDialog="closeDeptDialog">
    </selectDept>
  </el-collapse-item>
</template>

<script>
import moment from 'moment'
import searchUserDialog from '@/components/sysSelectPeople.vue'
import selectDept from './deptDialog.vue'
import {TokenAPI} from '@/request/TokenAPI'
export default {
  props: {
    changeInfo: {
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
    searchUserDialog, selectDept
  }
}
</script>

<style lang="scss">

</style>
