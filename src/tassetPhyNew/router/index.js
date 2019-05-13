// 此处写sys的分支路由信息
const assetPhyNew = r => require.ensure([], () => r(require('../App')), 'sys')
const assetChangeIndex = r => require.ensure([], () => r(require('../modules/assetChange/index')), 'assetChangeIndex')
const changeAssetDeorPer = r => require.ensure([], () => r(require('../modules/assetChange/changeAssetDeorPer')), 'changeAssetDeorPer')
const myChangeList = r => require.ensure([], () => r(require('../modules/assetChange/myChangeList')), 'myChangeList')

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
    }
  ]
}

export default assetPhyNewRoutes
