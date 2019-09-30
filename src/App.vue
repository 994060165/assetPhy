<template>
<div id="app">
  <router-view></router-view>
</div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
body{
  margin: 0;
  background-color: #eceff4;
}
p{
  -webkit-margin-before: .5em;
  -webkit-margin-after: .5em;
}
.el-dialog__headerbtn .el-dialog__close {
  color: white;
}
.el-dialog__headerbtn .el-dialog__close:hover {
  color: white;
}
.el-dialog__header {
  text-align: center;
}
</style>
