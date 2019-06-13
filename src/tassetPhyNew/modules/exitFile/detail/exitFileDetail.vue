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
            <el-form-item label="资产编号：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.asset_num}}
              </div>
            </el-form-item>
            <el-form-item label="部门：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.deparment}}
              </div>
            </el-form-item>
            <el-form-item label="出门理由：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.c03}}
              </div>
            </el-form-item>
            <el-form-item label="预计回归日期：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.c08}}
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产名称：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.name}}
              </div>
            </el-form-item>
            <el-form-item label="责任人：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.zzr_name}}
              </div>
            </el-form-item>
            <el-form-item label="去向地点：">
              <div class="panelBody" style="width: 100%;">
                {{assetFlowInfo.c04}}
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
      default: '出门条提醒设置'
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
      remindRate: ''
    }
  },
  mounted () {
  },
  methods: {
    confirm () {
      this.loading = true
      this.closeDialog()
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
