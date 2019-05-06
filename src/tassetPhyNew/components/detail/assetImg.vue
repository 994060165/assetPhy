<template>
<div>
  <el-collapse-item title="资产图片" name="1">
    <el-row :gutter="10">
      <el-col :span="6">
        <div class="text-center">标签与铭牌合照</div>
        <img v-if="assetImgs.img_bq" :src="assetImgs.img_bq" alt="" class="w-full" @click="showImgPlus('img_bq')">
        <div v-else class="text-center m-t-10">
          <img :src="require(`@/assets/images/noimage.jpg`)" alt="">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="text-center">标签与局部合照</div>
        <img  v-if="assetImgs.img_jb" :src="assetImgs.img_jb" alt="" class="w-full" @click="showImgPlus('img_jb')">
        <div v-else class="text-center m-t-10">
          <img :src="require(`@/assets/images/noimage.jpg`)" alt="">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="text-center">资产正面整体照片</div>
        <img v-if="assetImgs.img_zt" :src="assetImgs.img_zt" alt="" class="w-full" @click="showImgPlus('img_zt')">
        <div v-else class="text-center m-t-10">
          <img :src="require(`@/assets/images/noimage.jpg`)" alt="">
        </div>
      </el-col>
      <el-col :span="6">
        <div class="text-center"> 其他照片</div>
        <img v-if="assetImgs.img_qt" :src="assetImgs.img_qt" alt="" class="w-full" @click="showImgPlus('img_qt')">
        <div v-else class="text-center m-t-10">
          <img :src="require(`@/assets/images/noimage.jpg`)" alt="">
        </div>
      </el-col>
    </el-row>
  </el-collapse-item>
  <el-dialog  
    title="图片详情" 
    v-if="imgVisible" 
    :visible="imgVisible" 
    size="large" 
    :before-close="closeImgDialog" 
    :modal="true" >
    <div class="imgDiv">
      <img :src="imgPlus" alt="">
    </div>
  </el-dialog>
</div>
</template>

<script>
import moment from 'moment'
import { type } from '../../../../static/data'
import {TokenAPI} from '@/request/TokenAPI'
import api from '@/api'
export default {
  props: {
    assetInfo: {
      type: Object,
      default: {}
    },
    assetNum: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      moment: moment,
      imgVisible: false,
      type: type,
      token: TokenAPI.getToken(),
      assetImgs: {}
    }
  },
  mounted () {
    this.getAssetImg()
  },
  methods: {
    getAssetImg () {
      let params = {
        asset_id: this.assetInfo.asset_id,
        asset_num: this.assetNum,
        token: this.token
      }
      api.getAssetImg(params).then(data => {
        if (data.ID === '-1') {
          this.$message({
            type: 'error',
            message: `${data.msg}`
          })
        } else {
          this.assetImgs = data
        }
      })
    },
    showImgPlus (img) {
      this.imgPlus = `/${this.type}/${this.assetImgs[img]}`
      this.imgVisible = true
    },
    closeImgDialog () {
      this.imgVisible = false
    }
  },
  components: {
  }
}
</script>

<style lang="scss">
</style>
