<template>
<div class="com-search" >
  <div class="search-mask" @click.stop="hiddenMask" ref="searchModal"></div>
  <div class="searchDiv">
    <el-input
      class="searchBox"
      :style="searchStyle"
      :placeholder="searchPlaceholder"
      icon="search"
      v-model="searchKey"
      v-on:input="inputChange"
      @keyup.enter.native="search">
      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>
    <div class="advancebtn">
      <el-button type="primary" @click.native="toggleShow()" v-show="advance">
        高级<i class="el-icon--right" :class="advanceIcon"></i>
      </el-button>
    </div>
    <div class="pullDownPanel" v-show="panelShow">
      <div class="triangle"></div>
      <el-row :span="24">
          <slot name="search"></slot>
      </el-row>
      <el-row style="padding-bottom:15px;"></el-row>
      <el-row v-show="showOptionBtn">
        <div style="float: right">
        <el-button @click="search" type="primary">搜索</el-button>
        <el-button @click="reset">重置</el-button>
        </div>
      </el-row>
      <i class="up-icon iconfont icon-down-trangle el-icon-arrow-up" @click="toggleShow()"></i>
    </div>
 </div>
</div>
</template>
<script>
  // import Vue from 'vue'
export default {
    props: {
      searchStyle: String,
      searchPlaceholder: String,
      advance: {
        type: Boolean,
        default: false
      },
      showOptionBtn: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        panelShow: false,
        advanceIcon: 'el-icon-arrow-down',
        searchKey: ''
      }
    },
    created () {
    },
    mounted () {
      this.hiddenMask()
    },
    computed: {
    },
    watch: {
    },
    methods: {
      search () {
        this.$nextTick(() => {
          this.$emit('search', this.searchKey)
        })
      },
      reset () {
        this.$emit('reset')
      },
      // 隐藏遮罩层
      hiddenMask (event) {
        this.$refs.searchModal.style.display = 'none'
        this.hiddenDlg()
      },
      // 显示遮罩层
      showMask () {
        this.$refs.searchModal.style.display = ''
      },
      // 隐藏高级搜索项
      hiddenDlg () {
        this.panelShow = false
      },
      toggleShow () {
        this.panelShow = !this.panelShow
        if (!this.panelShow) {
          this.advanceIcon = 'el-icon-arrow-down'
          this.hiddenMask()
        } else if (this.panelShow) {
          this.advanceIcon = 'el-icon-arrow-up'
          this.showMask()
        }
      },
      inputChange () {
        this.$emit('update:searchKey', this.searchKey)
      }
    },
    components: {
    }
}
</script>
<style lang="scss">
.com-search {
  z-index: 69;
  position:relative;
  .search-mask {
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    z-index: 8;
    opacity: 0;
    background: #000;
  }
  .searchDiv {
    position: relative;
    z-index: 9;
    .searchBox {
      width: 260px;
    }
    .pullDownPanel {
      background-color: #fff;
      border-style: solid;
      border-width: 1px;
      border-color: #42a5f5;
      position: absolute;
      padding: 10px;
      top: 56px;
      right: -10px;
      min-width: 800px;
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      border-radius: 5px;
    .el-input-number {
      width: 100%;
    }
    .el-range-editor.el-input__inner {
      width: 100%;
    }
    .up-icon {
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -24px;
      color: #42a5f5;
      text-align: center;
      /*height: 15px*/
      width: 48px;
      border-bottom: 15px solid #eff2f7;
      border-left: 15px solid transparent;
      border-right: 15px solid transparent;

      span.up-icon::before {
        position: absolute;
        left: 16px;
        bottom: -15px;
      }
    }
  }
}
  .triangle:before {
    display: inline-block;
    border: 10px solid transparent;
    border-bottom-color: #42a5f5;
    content: "";
    position: absolute;
    top: -20px;
    right: 50px;
  }
    .triangle:after {
    display: inline-block;
    border: 10px solid transparent;
    border-bottom-color: #fff;
    content: "";
    position: absolute;
    top: -18px;
    right: 50px;
  }

  .advancebtn {
    display: inline-block;
    margin-right: 16px;
  }
}
</style>
<style>
.com-search {
  .searchDiv .el-input__icon {
      cursor: pointer;
    }
  .el-border-primary {
    border-color: #42a5f5;
  }
}
</style>
