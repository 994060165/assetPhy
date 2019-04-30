import $ from 'jquery'
// import vue from 'VUE'
// let that = vue
export class UploadApi {
  constructor (url, formData, uploadProgressStr, successFun) {
    this.url = url
    this.formData = formData
    this.uploadProgressStr = uploadProgressStr
    this.successFun = successFun
  }
  xhrOnProgress (fun) {
    this.xhrOnProgress.onprogress = fun // 绑定监听
    // 使用闭包实现监听绑
    return function () {
      // 通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
      var xhr = $.ajaxSettings.xhr()
      // 判断监听函数是否为函数
      if (typeof this.xhrOnProgress.onprogress !== 'function') {
        return xhr
      }
      // 如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
      if (this.xhrOnProgress.onprogress && xhr.upload) {
        xhr.upload.onprogress = this.xhrOnProgress.onprogress
      }
      return xhr
    }
  }
  upload () {
    let that = this
    console.log('url', that.url)
    console.log('formData', that.formData)
    $.ajax({
      url: that.url,
      type: 'post',
      processData: false,
      contentType: false,
      data: that.formData,
      xhr: that.xhrOnProgress(function (e) {
        console.log('e', e)
        let complete = parseFloat((e.loaded / e.total * 100 | 0))
        if (complete === 100) {
          that.uploadProgressStr = 99
        } else {
          that.uploadProgressStr = complete
        }
      }),
      success: function (resData) {
        return resData
      },
      error: function (resData) {
        that.$message({
          type: 'error',
          message: `服务器错误，上传失败！`
        })
      }
    })
  }
  static downloadFile (fileName, filePath) {
    const a = document.createElement('a')
    a.setAttribute('download', fileName)
    a.setAttribute('href', filePath)
    document.body.appendChild(a)
    a.style.display = 'none'
    a.click()
  }
}
