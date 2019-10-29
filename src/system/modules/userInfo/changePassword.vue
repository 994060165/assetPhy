<template>
    <el-row class="changePassword">
      <el-form :model="form" label-width="120px" ref="form" :rules="formRules">
        <el-form-item label="原始密码：" prop="OldPassword">
          <el-input v-model="form.OldPassword" type="password" auto-complete="off" placeholder="【原始密码】"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="Password">
          <el-input v-model="form.Password" type="password" auto-complete="off" placeholder="【新密码】"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码：" prop="repassword">
          <el-input v-model="form.repassword" type="password" placeholder="【确认新密码】" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" style="margin-left: 80px;width: 120px;" @click.native="addSubmit" :disabled="changeDisabled">确认</el-button>
    </el-row>
</template>

<script>
import {TokenAPI} from '@/request/TokenAPI'
export default {
  data () {
    return {
      form: {
        OldPassword: '',
        Password: '',
        repassword: ''
      },
      changeDisabled: false,
      formRules: {
        OldPassword: {
          required: true, message: '请输入原始密码', trigger: 'blur'
        },
        Password: {
          required: true, message: '请输入新密码', trigger: 'blur'
        },
        repassword: {
          required: true, message: '请输入新密码', trigger: 'blur'
        }
      },
      staff: TokenAPI.getStaff()
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    addSubmit () {
      this.$refs['form'].validate((vaild) => {
        if (vaild) {
          let UserID = this.staff.UserID
          if (this.form.Password === this.form.repassword) {
            let params = Object.assign({UserID: UserID}, this.form)
            // params.OldPassword = this.$md5(params.OldPassword)
            // params.Password = this.$md5(params.Password)
            // params.repassword = this.$md5(params.repassword)
            this.$request.post('/sys/index/putPassword', params).then(res => {
              let data = res.data
              if (data.ID === '-1') {
                this.$message({
                  type: 'warning',
                  message: `${data.msg}`
                })
              } else {
                this.form = {
                  OldPassword: '',
                  Password: '',
                  repassword: ''
                }
                this.$message({
                  type: 'success',
                  message: `更新成功`
                })
              }
            }, err => {
              console.log(err)
              this.$message({
                type: 'warning',
                message: '网络错误'
              })
            })
          } else {
            this.$message({
              type: 'warning',
              message: '请您确认两次输入的密码是否一致'
            })
          }
        }
      })
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.changePassword {
  .el-input {
    width: 200px;
  }
}
</style>