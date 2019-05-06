<template>
  <el-collapse-item title="变更信息" name="3" class="detail">
    <el-form ref="changeForm" :model="changeInfo" :rules="formRules" label-width="120px">
      <el-row v-if="type === 'person' || type === 'all'">
        <el-form-item label="变更责任人">
          <el-button type="primary" @click="selectPeople">选择人员</el-button>
        </el-form-item>
      </el-row>
      <el-row class="m-t-20" v-if="type === 'deparment' || type === 'all'">
        <el-form-item label="变更部门">
          <el-input 
            type="textarea"
            placeholder="请填入新的部门"
            v-model="changeInfo.department">
          </el-input>
        </el-form-item>
      </el-row>
      <el-row class="m-t-20">
        <el-form-item label="变更说明" prop="explain">
          <el-input 
            type="textarea"
            placeholder="请填入变更说明"
            v-model="changeInfo.explain">
          </el-input>
        </el-form-item>
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
  </el-collapse-item>
</template>

<script>
import moment from 'moment'
import searchUserDialog from '@/components/sysSelectPeople.vue'
import {TokenAPI} from '@/request/TokenAPI'
export default {
  props: {
    changeInfo: {
      type: Object,
      default: {}
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
      org: TokenAPI.getOrg()
    }
  },
  mounted () {
  },
  methods: {
    selectPeople () {
      this.userDialogVisible = true
    },
    addMember (persons) {
      console.log(persons)
      this.addCancel()
    },
    addCancel () {
      this.userDialogVisible = false
    }
  },
  components: {
    searchUserDialog
  }
}
</script>

<style lang="scss">

</style>
