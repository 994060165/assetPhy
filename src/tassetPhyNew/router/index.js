// 此处写sys的分支路由信息
// 资产变更
const assetPhyNew = r => require.ensure([], () => r(require('../App')), 'sys')
const assetChangeIndex = r => require.ensure([], () => r(require('../modules/assetChange/index')), 'assetChangeIndex')
const changeAssetDeorPer = r => require.ensure([], () => r(require('../modules/assetChange/changeAssetDeorPer')), 'changeAssetDeorPer')
const myChangeList = r => require.ensure([], () => r(require('../modules/assetChange/myChangeList')), 'myChangeList')
const assetApprove = r => require.ensure([], () => r(require('../modules/assetChange/assetApprove')), 'assetApprove')
// 出门流程
const exitFileAdd = r => require.ensure([], () => r(require('../modules/exitFile/exitFileAdd')), 'exitFile/exitFileAdd')

const modulePath = '/asset'

const assetPhyNewRoutes = {
  path: `${modulePath}`,
  name: 'assetPhyNew',
  component: assetPhyNew,
  children: [
    {
      path: 'assetChangeIndex',
      name: 'assetChangeIndex',
      component: assetChangeIndex
    },
    {
      path: 'changeAsset/:assetNum/:type',
      component: changeAssetDeorPer
    },
    {
      path: 'myChangeList',
      component: myChangeList
    },
    {
      path: 'assetApprove/:assetNum/:orderNum/:type',
      component: assetApprove
    },
    // 出门条
    {
      path: 'exitFileAdd',
      component: exitFileAdd
    }
  ]
}

export default assetPhyNewRoutes
