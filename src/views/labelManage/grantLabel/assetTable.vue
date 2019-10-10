<template>
  <el-table :data="tableList">
    <el-table-column type="index" label="序号" width="80"></el-table-column>
    <el-table-column prop="asset_id" label="资产编码">
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
