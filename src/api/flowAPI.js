import axios from '@/api/resources.js'
// 获取信息项设置列表
export class FlowAPI {
  // 查询工单信息
  static getOrderInfo (params) {
    return axios.post(`/flow/index/getOrderInfo`, params).then(res => res.data)
  }
  // 执行工单下一步
  static handleOutOrder (params) {
    return axios.post(`/flow/index/handleOutOrder`, params).then(res => res.data)
  }
}
