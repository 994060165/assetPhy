<template>
  <el-collapse-item title="变更信息" name="3" class="detail">
    <el-form ref="form" :model="changeInfo" label-width="120px">
      <el-row>
        <el-form-item label="变更说明">
          <span>{{changeInfo.explain}}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="附件">
        </el-form-item>
      </el-row>
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
      moment: moment
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
