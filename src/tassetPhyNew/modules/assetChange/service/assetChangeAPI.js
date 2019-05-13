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
}
