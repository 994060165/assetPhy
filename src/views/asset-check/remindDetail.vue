<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="dialogVisible"
    :show-close="false"
    :before-close="closeDialog"
    v-loading="loading">
    <el-row>
      <el-form ref="changeForm" :model="assetFlowInfo" label-width="120px">
        <el-row class="m-t-20">
          <el-col :span="12">
            <el-form-item label="盘点计划：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.plan_name}}
              </div>
            </el-form-item>
            <el-form-item label="截止时间：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.deadline}}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="计划说明：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.plan_memo}}
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="提醒方式：" >
              <el-checkbox-group v-model="remindWay" >
                <el-checkbox v-for="(item, index) in remindTypes" :key="index" :label="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="提醒频率：">
              <div class="panelBody" style="width: 100%;">
                <el-select v-model="remindRate" placeholder="请选择">
                  <el-option
                    v-for="item in remindOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row slot="footer" class="dialogFooter text-center">
      <el-button type="primary" @click.native="confirm">确定</el-button>
      <el-button @click.native="closeDialog()">取消</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import moment from 'moment'
import searchUserDialog from '@/components/sysSelectPeople.vue'
import {TokenAPI} from '@/request/TokenAPI'
import service from '@/api/service.js'
import {remindOptions, remindTypes} from '@/service/common.js'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    assetFlowInfo: {
      type: Object,
      default: {}
    },
    dialogTitle: {
      type: String,
      default: '盘点到期提醒设置'
    }
  },
  data () {
    return {
      moment: moment,
      loading: false,
      token: TokenAPI.getToken(),
      remindOptions: remindOptions,
      remindTypes: remindTypes,
      remindWay: ['information'],
      remindRate: '24'
    }
  },
  mounted () {
  },
  methods: {
    confirm () {
      this.loading = true
      let scdType = ''
      if (this.remindWay.length > 0) {
        this.remindWay.forEach((value, index) => {
          if (index === this.remindWay.length - 1) {
            scdType += `${value}`
          } else {
            scdType += `${value},`
          }
        })
      }
      let params = {
        token: this.token,
        scd_type: scdType,
        scd_frequency: this.remindRate,
        deadline: this.assetFlowInfo.deadline,
        create_person: this.assetFlowInfo.create_person,
        plan_name: this.assetFlowInfo.plan_name
      }
      service.savePlanTimingTask(params).then(data => {
        if (data.ID === '-1') {
          this.$message({
            type: 'error',
            message: '提醒设置失败！'
          })
        } else {
          this.$message({
            type: 'success',
            message: '提醒设置成功！'
          })
          this.closeDialog()
        }
      }).finally(() => {
        this.loading = false
      })
    },
    closeDialog  () {
      this.$nextTick(() => {
        this.$emit('closeDialog')
      })
    },
    addCancel () {
      this.closeDialog()
    },
    addDept (dept) {
      this.closeDeptDialog()
      this.changeInfo.deptList = dept
    }
  },
  components: {
    searchUserDialog
  }
}
</script>

<style lang="scss">

</style>
