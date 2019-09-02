import axios from '@/api/resources.js'
let baiduUrl = `https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic`
function postOCR (fileStr) {
  let params = {
    access_token: '24.6a44bf4a6ddf8a33c61a415796e0e835.2592000.1563725557.282335-16602223',
    image: fileStr
  }
  axios.post(baiduUrl, params, {headers: {'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*'}}).then(res => {
    console.log(res.data)
  })
}
function enCodeBase64 (baseFile) {
  // let fileStr = encodeURI(baseFile)
  // this.transfrom = this.transfrom.replace(/\s/g, '&nbsp;')
  let fileStr = baseFile.replace(/\r\n/g, '')
  fileStr = fileStr.replace(/\\+/g, '%2B')
  fileStr = fileStr.replace('data:image/jpeg;base64,', '')
  console.log(fileStr)
  postOCR(fileStr)
}

function imgToBase64 (img) {
  console.log('img', img)
  let reader = new FileReader()
  reader.readAsDataURL(img)
  reader.onloadend = function () {
    let result = reader.result
    console.log('reader', reader)
    enCodeBase64(result)
  }
}
export {imgToBase64}
