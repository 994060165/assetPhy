import axios from './index'

export class OrgnizationAPI {
  constructor () {
    this.baseUrl = '/sys/index'
  }
  queryDeptInfos (params) {
    return axios.post(`${this.baseUrl}/getOrgListForTokenToPhone`, params)
  }
  findAll (token) {
    return axios.get(`${this.baseUrl}/${token}/all`)
  }
  refresh (refreshToken) {
    return axios.put(`${this.baseUrl}/${refreshToken}`)
  }
  find (token) {
    return axios.get(`${this.baseUrl}/${token}`)
  }
  static getToken () {
    let token = sessionStorage.getItem('token')
    return token
  }
  static getStaff () {
    let staff = JSON.parse(sessionStorage.getItem('user'))
    return staff
  }
  static getOrg () {
    if (sessionStorage.getItem('org')) {
      let org = JSON.parse(sessionStorage.getItem('org'))
      return org
    } else {
      return null
    }
  }
}
