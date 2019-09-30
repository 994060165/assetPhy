// 此处写sys的分支路由信息
const assetDoor = r => require.ensure([], () => r(require('../App')), 'assetDoor')
const doorLog = r => require.ensure([], () => r(require('../modules/doorLog')), 'assetDoor/doorLog')

const modulePath = '/assetDoor'

const assetDoorRoutes = {
  path: `${modulePath}`,
  name: 'assetDoorRoutes',
  component: assetDoor,
  children: [
    // 通道门日志管理
    {
      path: 'doorLog',
      component: doorLog
    }
  ]
}

export default assetDoorRoutes
