// 此处写sys的分支路由信息
const doorLog = r => require.ensure([], () => r(require('../modules/exitFile/doorLog')), 'exitFile/doorLog')
// 法规管理
const lawManage = r => require.ensure([], () => r(require('../modules/law/lawManage')), 'lawManage')
// 资产变更
const assetPhyNew = r => require.ensure([], () => r(require('../App')), 'sys')
const assetChangeIndex = r => require.ensure([], () => r(require('../modules/assetChange/index')), 'assetChangeIndex')
const changeAssetDeorPer = r => require.ensure([], () => r(require('../modules/assetChange/changeAssetDeorPer')), 'changeAssetDeorPer')
const myChangeList = r => require.ensure([], () => r(require('../modules/assetChange/myChangeList')), 'myChangeList')
const assetChangeManage = r => require.ensure([], () => r(require('../modules/assetChange/assetChangeManage')), 'assetChangeManage')
const assetApprove = r => require.ensure([], () => r(require('../modules/assetChange/assetApprove')), 'assetApprove')
// 出门流程
const exitFileAdd = r => require.ensure([], () => r(require('../modules/exitFile/exitFileAdd')), 'exitFile/exitFileAdd')
const exitFileList = r => require.ensure([], () => r(require('../modules/exitFile/exitFileList')), 'exitFile/exitFileList')
const receiveExitFile = r => require.ensure([], () => r(require('../modules/exitFile/receiveExitFile')), 'exitFile/receiveExitFile')
const myExitFileList = r => require.ensure([], () => r(require('../modules/exitFile/myExitFileList')), 'exitFile/myExitFileList')
const monitor = r => require.ensure([], () => r(require('../modules/exitFile/monitor')), 'exitFile/monitor')
const exitFileApprove = r => require.ensure([], () => r(require('../modules/exitFile/assetApprove')), 'exitFileApprove')
const assetCMManage = r => require.ensure([], () => r(require('../modules/exitFile/assetCMManage')), 'assetCMManage')
// 退库
const offAssetList = r => require.ensure([], () => r(require('../modules/offAsset/offAssetList')), 'offAsset/offAssetList')
const offAssetApproveList = r => require.ensure([], () => r(require('../modules/offAsset/offAssetApproveList')), 'offAsset/offAssetApproveList')
const reteatAssetManage = r => require.ensure([], () => r(require('../modules/offAsset/reteatAssetManage')), 'offAsset/reteatAssetManage')

const modulePath = '/asset'

const assetPhyNewRoutes = {
  path: `${modulePath}`,
  name: 'assetPhyNew',
  component: assetPhyNew,
  children: [
    // 通道门日志管理
    {
      path: 'doorLog',
      component: doorLog
    },
    // 法规
    {
      path: 'lawManage',
      component: lawManage
    },
    // 变更
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
      path: 'assetChangeManage',
      component: assetChangeManage
    },
    {
      path: 'assetApprove/:assetNum/:orderNum/:type',
      component: assetApprove
    },
    // 出门条
    {
      path: 'exitFileAdd',
      component: exitFileAdd
    },
    // 出门条管理
    {
      path: 'exitFileList',
      component: exitFileList
    },
    // 领用出门条
    {
      path: 'receiveExitFile',
      component: receiveExitFile
    },
    // 可用出门条
    {
      path: 'myExitFileList',
      component: myExitFileList
    },
    // 出门受监控资产
    {
      path: 'exit/monitor',
      component: monitor
    },
    // 出门条审批
    {
      path: 'exitFileApprove/:assetNum/:orderNum/:type',
      component: exitFileApprove
    },
    // 出门监控资产申请
    {
      path: 'assetCMManage',
      component: assetCMManage
    },
    // 退库
    {
      path: 'offAsset/offAssetList',
      component: offAssetList
    },
    // 退库审批列表
    {
      path: 'offAsset/offAssetApproveList',
      component: offAssetApproveList
    },
    // 受监控资产审批
    {
      path: 'offAsset/reteatAssetManage',
      component: reteatAssetManage
    }
  ]
}

export default assetPhyNewRoutes
