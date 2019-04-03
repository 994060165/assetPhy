<template>
  <el-table :data="tableList">
    <el-table-column type="index" label="序号" width="80"></el-table-column>
    <el-table-column prop="name" label="资产名称"></el-table-column>
    <el-table-column prop="asset_num" label="资产编码">
    </el-table-column>
    <el-table-column prop="location" label="资产位置"></el-table-column>
    <el-table-column label="启用日期">
      <template slot-scope="scope">
          {{scope.row.start_time | moment}}
        </template>
    </el-table-column>
    <el-table-column prop="zrr_name" label="责任人"></el-table-column>
    <el-table-column prop="deparment" label="部门">
    </el-table-column>
    <slot name="handle">

    </slot>
  </el-table>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    tableList: {
      type: Array,
      default: []
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
