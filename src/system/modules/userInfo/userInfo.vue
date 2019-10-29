<template>
  <div class="registerForm">
    <el-row>
      <el-col :span="24">
        <el-form :model="form" label-width="120px" ref="form" :rules="formRules">
          <el-col :span="12">
            <el-form-item label="用户名：" prop="UserName">
              <el-input v-model="form.UserName" auto-complete="off" placeholder="【用户名】" :disabled="formDisabled"></el-input>
            </el-form-item>
            <el-form-item label="手机号：" prop="UserMobile" >
              <el-input v-model="form.UserMobile" auto-complete="off" placeholder="【手机号】" :disabled="formDisabled"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12" class="personFormRight">
            <el-form-item label="用户ID：" prop="UserID" >
              <!-- <el-radio class="radio" v-model="form.gender" label="M" :disabled="formDisabled">男</el-radio>
              <el-radio class="radio" v-model="form.gender" label="W" :disabled="formDisabled">女</el-radio> -->
              <el-input v-model="form.UserID" auto-complete="off" placeholder="【手机号】" :disabled="formDisabled"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="UserEmail" >
              <el-input v-model="form.UserEmail" auto-complete="off" placeholder="【邮箱】" :disabled="formDisabled"></el-input>
            </el-form-item>
            </el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="padding-bottom: 40px;">
      <el-col :span="12">
        <div class="dialog-footer">
          <!-- <el-button @click.native="changeInfo">修改</el-button>
          <el-button type="primary" @click.native="addSubmit" :disabled="changeDisabled" style="margin: 0 auto;">确认</el-button> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import {getUser, updateUser} from '../../service/user.js'
import {TokenAPI} from '@/request/TokenAPI'
export default {
  props: {
  },
  data () {
    return {
      // userId: JSON.parse(sessionStorage.getItem('arpUser')).staff.userId,
      // form: {},
      form: TokenAPI.getStaff(),
      formLoading: false,
      cardType: [],
      country: [],
      formDisabled: true,
      changeDisabled: false,
      countryList: [],
      formRules: {
        userName: [
          { required: true, message: '请您完善此项', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请您完善此项', trigger: 'blur' }
        ],
        bankName: [
          { required: true, message: '请您完善此项', trigger: 'blur' }
        ],
        bankAccount: [
          { validator: (rule, value, callback) => {
            if (/^\d+$/.test(value) === false) {
              callback(new Error('银行账户不能为空且只能输入数字！'))
            } else {
              callback()
            }
          },
            trigger: 'blur',
            required: true
          }
        ],
        bankUserName: [
          { required: true, message: '请您完善此项', trigger: 'blur' }
        ],
        idNumber: [
          { required: true, message: '请您完善此项', trigger: 'blur' }
        ],
        mobile: [
          { validator: (rule, value, callback) => {
            if (/^[1][0-9][0-9]{9}$/.test(value) === false) {
              callback(new Error('请您输入正确的手机号！'))
            } else {
              callback()
            }
          },
            trigger: 'change',
            required: true
          }
        ],
        mail: [
          { validator: (rule, value, callback) => {
            if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value) === false) {
              callback(new Error('请您输入正确的邮箱！'))
            } else {
              callback()
            }
          },
            trigger: 'change',
            required: true
          }
        ]
      },
      CardOptions: [
        {
          value: 'IDCard',
          label: '身份证'
        },
        {
          value: 'passport',
          label: '护照'
        }
      ],
      selectOptions: []
    }
  },
  created () {
    // queryCountry().then(res => {
    //   let data = res.data
    //   let arr = []
    //   for (let i in data) {
    //     arr.push({
    //       value: data[i].code,
    //       label: data[i].country
    //     })
    //   }
    //   this.countryList = arr
    // })
  },
  mounted () {
    // this.getUserInfo()
  },
  methods: {
    // 提交之后处理的函数
    afterSub (res) {
      if (res.status === 200) {
        this.$message({
          message: '注册成功',
          type: 'success'
        })
        this.formLoading = false
        this.$refs['form'].resetFields()
      } else {
        this.$message({
          message: '非常抱歉，注册失败',
          type: 'error'
        })
        this.formLoading = false
      }
    },
    // 证件类型选择
    handleCardChange (value) {
      this.form.cardType = value
    },
    // 国籍选择
    handleCountryChange (value) {
      this.form.country = value
    },
    handleModuleChange (value) {
      this.editModule = value
    },
    // 修改个人信息
    changeInfo () {
      this.formDisabled = false
    },
    // 确认个人信息
    addSubmit () {
      // this.formDisabled = true
      // updateUser(this.form).then(data => {
      //   this.$message({
      //     message: '修改成功',
      //     type: 'success',
      //     duration: 2000
      //   })
      //   this.getUserInfo()
      // }, () => {
      //   this.$message({
      //     message: '修改失败',
      //     type: 'error',
      //     duration: 2000
      //   })
      // })
    },
    // 获取人员信息
    getUserInfo () {
      // getUser(this.userId).then(data => {
      //   this.form = data
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
<style lang="scss">
.registerForm {
  .el-select {
    width: 100%;
  }
  .dialog-footer {
    width: 50%;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
}
.registerForm .el-input.is-disabled .el-input__inner {
  color: black;
}
</style>
