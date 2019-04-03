<template>
  <el-collapse-item title="变更信息" name="3" class="detail">
    <el-form ref="changeForm" :model="changeInfo" :rules="formRules" label-width="120px">
      <el-row>
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
  </el-collapse-item>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    changeInfo: {
      type: Object,
      default: {}
    }
  },
  data () {
    return {
      moment: moment,
      formRules: {
        explain: [
          { required: true, message: '变更信息不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
  },
  components: {
  }
}
</script>

<style lang="scss">

</style>
