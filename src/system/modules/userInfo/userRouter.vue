<template>
  <div>
    <!-- <el-row>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row> -->
    <el-row>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"> 个人信息</span>
          <userInfo></userInfo>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
          <changePassword></changePassword>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import userInfo from './userInfo.vue'
import changePassword from './changePassword.vue'
export default {
  data () {
    return {
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
  },
  components: {
    /* 注册组件 */
    userInfo, changePassword
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>