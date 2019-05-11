<template>
  <!-- 部门选择组件 -->
  <div class="cn-form">
    <el-dialog title="部门选择组件" size="small" 
      :visible.sync="orgDialogVisable" 
      :modal="modalData" 
      :before-close="handleClose">
      <selectDept 
        :organizationID='orgId'
        @listenToClickEvent='showMessageFromChild'>
      </selectDept>
    </el-dialog>
  </div>
</template>
<script>
import selectDept from '@/components/selectDept.vue'
export default {
  props: {
    orgId: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      orgList: [],
      modalData: false,
      orgDialogVisable: false,
      extendInfo: {
        isDragRemoveNode: false,
        unfold: true
      }
    }
  },
  mounted () {
    this.orgDialogVisable = this.dialogVisible
  },
  methods: {
    showMessageFromChild (data) {
      this.orgList = []
      this.orgList.push(data)
      this.orgDialogVisable = false
      this.updateOrg()
    },
    handleClose () {
      this.orgDialogVisable = false
      this.$emit('closeOrgDialog')
    },
    updateOrg () {
      this.orgDialogVisable = false
      this.$emit('updateOrg', this.orgList)
    }
  },
  components: {
    selectDept
  }
}
</script>
