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
  savetimingTask: params => {
    return axios.post(`/flow/index/savetimingTask`, params).then(res => res.data)
  },
  getCheckplanToDetail: params => {
    return axios.post(`/res/index/getCheckplanToDetail`, params).then(res => res.data)
  }
}
