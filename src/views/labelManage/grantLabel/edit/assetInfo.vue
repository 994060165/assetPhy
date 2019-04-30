<template>
  <el-collapse-item title="资产信息" name="2" class="detail">
    <el-form ref="form" :model="assetInfo" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="资产名称">
            <span>{{assetInfo.name}}</span>
          </el-form-item>
          <el-form-item label="资产品牌">
            <span>{{assetInfo.maker_name}}</span>
          </el-form-item>
          <el-form-item label="资产型号">
            <span>{{assetInfo.model_num}}</span>
          </el-form-item>
          <el-form-item label="资产标签号">
            <span>{{assetInfo.tag_num}}</span>
          </el-form-item>
          <el-form-item label="采购金额">
            <span>{{assetInfo.value}}</span>
          </el-form-item>
          <el-form-item label="资产类别">
            <span>{{assetInfo.financial_category}}</span>
          </el-form-item>
          <el-form-item label="资产位置">
            <span>{{assetInfo.location}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="资产编码">
            <span>{{assetInfo.asset_num}}</span>
          </el-form-item>
          <el-form-item label="责任部门">
            <span>{{assetInfo.deparment}}</span>
          </el-form-item>
          <el-form-item label="领用人">
            <span>{{assetInfo.person}}</span>
          </el-form-item>
          <el-form-item label="领用时间">
            <span>{{assetInfo.start_time}}</span>
          </el-form-item>
          <el-form-item label="资产状态">
            <span>{{assetInfo.status}}</span>
          </el-form-item>
          <el-form-item label="所属课题">
            <span>{{assetInfo.topic}}</span>
          </el-form-item>
          <el-form-item label="责任人">
            <span>{{assetInfo.zrr_name}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-collapse-item>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    assetInfo: {
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
