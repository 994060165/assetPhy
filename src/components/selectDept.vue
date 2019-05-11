<template>
  <div class="com-org-tree">
    <slot name="header"></slot>
    <el-tree
      :data="regions"
      :props="prop"
      :load="loadNode"
      :expand-on-click-node="false"
      node-key="OrgID"
      :default-expanded-keys="[curRootOrgID]"
      lazy
      :render-content="renderContent"
      @node-click="handleNodeClick"
      @dblclick.native="getInfo">
    </el-tree>
  </div>
</template>

<script type="text/ecmascript-6">
  import { OrgnizationAPI } from '../request/Organization'
  // import { LocalDeptAPI } from '../modules/system/service/LocalDeptService'
  import { TokenAPI } from '../request/TokenAPI'
  export default {
    // 组织机构树
    props: {
      organizationID: '',          // 组织机构唯一标示id
      extendInfo: {}               // 扩展字段
    },
    data () {
      return {
        regions: [{
          'name': '',
          'id': ''
        }],
        prop: {
          label: 'name',
          children: 'children',
          isLeaf: 'isLeaf'
        },
        curRootOrgID: this.organizationID,     // 当前机构树根节点id,默认值为organizationID
        toDealNode: {},        // 待处理的节点
        information: [],
        token: TokenAPI.getToken(),
        orgAPI: new OrgnizationAPI()
      }
    },
    computed: {
  
    },
    watch: {
      organizationID (val) {
        this.setCurRootOrgID(val)
        this.reloadRootItem()
      }
    },
    mounted () {
    },
    created () {
      this.setCurRootOrgID(this.organizationID)
    },
    methods: {
      // 设置顶级orgId
      setCurRootOrgID (orgID) {
        this.curRootOrgID = orgID
      },
      reloadRootItem () {
        let params = {
          token: this.token,
          OrgID: this.curRootOrgID
        }
        this.orgAPI.queryDeptInfos(params).then(res => {
          let data = res.data.data
          let arr = []
          data.forEach(value => {
            let item = {}
            item.name = value.OrgName
            item.OrgID = value.OrgID
            arr.push(item)
          })
          // let item = { name: data[0].OrgName, OrgID: data[0].OrgID }
          this.regions = arr
          // this.regions.push(item)
        })
      },
  
      // 加载子树
      loadNode (node, resolve) {
        if (node.level === 0) {
          this.loadTopNode(node, resolve)
        } else {
          this.loadSubNode(node, resolve)
        }
      },
      // 在加载时，判断是否为顶级  如果是则走这个函数
      loadTopNode (node, resolve) {
        let params = {
          token: this.token,
          OrgID: this.curRootOrgID
        }
        this.orgAPI.queryDeptInfos(params).then(res => {
          let data = res.data.data
          // let data = res.data.data
          let arr = []
          data.forEach(value => {
            let item = {}
            item.name = value.OrgName
            item.OrgID = value.OrgID
            item.isLeaf = value.childrenCount !== 0
            arr.push(item)
          })
          // resolve([{ name: data[0].OrgName, OrgID: data[0].OrgID }])
          resolve(arr)
        })
      },

      loadSubNode (node, resolve) {
        this.orgAPI.queryDeptInfos(node.data.orgId).then(data => {
          let pdata = []
          for (let val of data) {
            pdata.push({name: val.OrgName, OrgID: val.OrgID, data: val, isLeaf: val.childrenCount === 0})
          }
          resolve(pdata)
        })
      },
      // 点击节点事件
      handleNodeClick (data, node) {
        this.information = data
        this.$emit('listenToClickEvent', data)
      },
      // 双击事件
      getInfo () {
        console.log('双击事件')
        this.$emit('getInfo', this.information)
      },
      // 树组件内容 添加托拉拽事件
      renderContent (h, { node, data, store }) {
        return (
              <span
                draggable="true"
                on-click={() => this.handleNodeClick(data, node)}
                title={node.label}
              >
                {node.label}
            </span>
        )
      }
    }
  }
</script>

