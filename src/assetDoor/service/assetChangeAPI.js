import axios from '@/api/resources.js'
// 获取信息项设置列表
export class AssetChangeAPI {
  // 申请变更部门或负责人
  static setChangeDeporPer (params) {
    return axios.post(`/flow/index/addOutOrder`, params).then(res => res.data)
  }
  // 查询我申请的单据
  static getMyBackOrder (params) {
    return axios.post(`/flow/index/getMyBackOrder`, params).then(res => res.data)
  }
  // 分类查询我处理的单据
  static getMyHandleOrder (params) {
    return axios.post(`/flow/index/getMyHandleOrder`, params).then(res => res.data)
  }
  // 查询我的出门条
  static getCanUseOutOrder (params) {
    return axios.post(`/flow/index/getCanUseOutOrder`, params).then(res => res.data)
  }
  // 授权给别人出门条
  static grantOthers (params) {
    return axios.post(`/flow/index/grantOthers`, params).then(res => res.data)
  }
  // 查询受监控资产
  static getAssetIsLimit (params) {
    return axios.post(`/flow/index/getAssetIsLimit`, params).then(res => res.data)
  }
  // 更新受限字段
  static updateAssetLimitStatus (params) {
    return axios.post(`/flow/index/updateAssetLimitStatus`, params).then(res => res.data)
  }
}
