<template>
    <div>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step 
          v-for="(item, index) in steps"
          :key="index">
          <div slot="name">
          </div>
          <div
            slot="title">
            {{item.act_stats}}
          </div>
          <div
            slot="description">
            处理人： {{item.act_user}}
          </div>
        </el-step>
      </el-steps>
    </div>
</template>
<script>
import {FlowAPI} from '@/api/flowAPI.js'
import {TokenAPI} from '@/request/TokenAPI.js'
export default {
  props: {
    orderNo: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      active: 0,
      fixedArea: false,
      token: TokenAPI.getToken(),
      steps: []
    }
  },
  mounted () {
    this.getSteps()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getSteps () {
      let params = {
        token: this.token,
        order_no: this.orderNo
      }
      FlowAPI.getFlowActionsToOrderNO(params).then(data => {
        this.steps = data.data
      })
      FlowAPI.getOrderInfo(params).then(data => {
        let arr = []
        let obj = data.orderaction
        for (let value in obj) {
          arr.push(obj[value])
        }
        arr.forEach(value => {
          this.steps.forEach(value2 => {
            if (value2.act_id === value.act_id) {
              value2.act_user = value.act_user
            }
          })
        })
        this.active = arr.length
      })
    }
  },
  created () {
  },
  beforeDestroy: function () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  components: {
  }
}
</script>
<style scoped lang="scss">
  .isFixed{
		position: fixed;
		background-color: #Fff;
		top: 100px;
		z-index: 99999;
    right: 20px;
		width: calc(100% - 200px);
  }
</style>
