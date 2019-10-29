import axios from './resources'
export default {
  /**
   * [getassetlikeZRR 查询责任人资产 支持模糊查询]
   * @param {token,page,pagesize,keystr}
   */
  getassetlikeZRR: params => {
    return axios.post(`/res/index/getassetlikeZRR`, params).then(res => res.data)
  },
  /**
   * [getassetlikeZRR 查询责任人资产 支持模糊查询]
   * @param {token,page,pagesize,keystr}
   */
  getassetlike: params => {
    return axios.post(`/res/index/getassetlike`, params).then(res => res.data)
  },
  /**
   * [getassetlikeZRR 查询责任人资产 支持模糊查询]
   * @param {token,page,pagesize,keystr}
   */
  uploadLabelGrant: params => {
    return axios.post(`/res/label/uploadLabelGrant`, params).then(res => res.data)
  },
  /**
   * [getassetlikeZRR 查询责任人资产 支持模糊查询]
   * @param {token,page,pagesize,keystr}
   */
  searchDoorList: params => {
    return axios.post(`/res/door_guarder/search_rowlist`, params).then(res => res.data)
  },
  getAllOutOrder: params => {
    return axios.post(`/flow/index/getAllOutOrder`, params).then(res => res.data)
  },
  getsentLabel: params => {
    return axios.post(`/res/index/getsentLabel`, params).then(res => res.data)
  },
  // 资产退库列表
  finishAssetBackList: params => {
    return axios.post(`/flow/index/finishAssetBackList`, params).then(res => res.data)
  },
  savetimingTask: params => {
    return axios.post(`/flow/index/savetimingTask`, params).then(res => res.data)
  },
  savePlanTimingTask: params => {
    return axios.post(`/flow/index/savePlanTimingTask`, params).then(res => res.data)
  },
  saveStickTask: params => {
    return axios.post(`/flow/index/saveStickTask`, params).then(res => res.data)
  },
  getRuleLIst: params => {
    return axios.post(`/res/index/getRuleLIst`, params).then(res => res.data)
  },
  deleteRule: params => {
    return axios.post(`/res/index/deleteRule`, params).then(res => res.data)
  },
  updateRule: params => {
    return axios.post(`/res/index/updateRule`, params).then(res => res.data)
  },
  getStickLabelList: params => {
    return axios.post(`/res/index/getStickLabelList`, params).then(res => res.data)
  }
}
