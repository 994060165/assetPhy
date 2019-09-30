<template>
<div>
    <navbar></navbar>
    <div class="main">
      <div class="content-container whiteBg" style="padding:20px 60px;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from '@/components/common/navbar.vue'
import sidebar from '@/components/common/sidebar.vue'
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'currentMenu'
    ]),
    title () {
      let menu = [].concat(this.currentMenu)
      menu.push(
        {
          title: 'assetBindCheck',
          name: '盘点清单'
        },
        {
          title: 'assetTpl',
          name: '打印模板'
        },
        {
          title: 'assetUpload',
          name: '资产导入'
        },
        {
          title: 'assetSearchPerson',
          name: '个人资产查询'
        }
      )
      for (let i = 0; i < menu.length; i++) {
        let m = menu[i]
        if (m.title && m.title === this.$route.name) {
          return m.name
        } else if (m.path === this.$route.path) {
          return m.name
        }
      }
    }
  },
  components: {
    navbar,
    sidebar
  },
  mounted () {
  },
  // 移除监听
  beforeDestroy: function () {
  },
  methods: {
  }
}
</script>

<style src="./assets/base.css"></style>
<style lang="scss">
@import '../assets/styles/base.scss';

@include b(main) {
  @include e(wrapper) {
    margin-left: $global-sidebar-width;
    padding: $global-gap*2 + $global-navbar-height $global-gap*2 $global-gap*2;
    > .title {
      background-color: #fff;
      padding-bottom: $global-gap*1.5;
      padding-top: $global-gap*1.5;
      padding-left: $global-gap* 2;
      h3 {
            -webkit-margin-before: 0;
            -webkit-margin-after: 0;
            border-left: 4px solid #20a0ff;
            padding-left: $global-gap;
            
          }
    }
  }
  @include e(view) {
    background: #fff;
    padding: $global-gap*3;
    border-top:1px solid #f0f0f0;
    // box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
  }
  .el-breadcrumb {
    margin-bottom: $global-gap*2;
  }
  .main__view {
    padding: 0;
  }
}
</style>
<style lang="scss">
.main {
  display: flex;
  width: 100%;
  position: absolute;
  top: 63px;
  bottom: 0px;
  overflow: hidden;
  aside {
    flex:0 0 220px;
    width: 220px;
    z-index: 999;
    .el-menu{
      height: 100%;
    }
    .collapsed{
      width:60px;
      .item{
        position: relative;
      }
      .submenu{
        position:absolute;
        top:0px;
        left:60px;
        z-index:99999;
        height:auto;
        display:none;
      }
    }
  }
  .menu-collapsed{
    flex:0 0 60px;
    width: 60px;
  }
  .menu-expanded{
    flex:0 0 220px;
    width: 220px;
  }
  .content-container {
    flex:1;
    padding: 10px;
    overflow-x: hidden;
  }
}
.whiteBg {
  background: white;
}
</style>

