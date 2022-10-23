<template>
  <div v-if="showSkeleton" style="padding: 20px;background-color: #fff;">
    <el-skeleton :rows="5" animated style="margin-top: 30px;"/>
  </div>
  <div  class="infinite-list-wrapper"  v-else>
    <ul
      v-infinite-scroll="load"
      class="list"
      :infinite-scroll-disabled="disabled"
        style="margin-bottom:25px;"
    >
    <li v-for="(item,index) in boilingPointData" :key="item.article_id" style="background-color: #fff;margin-bottom: 10px;">
    <ul style="display:flex;padding: 30px 20px 10px;">
    <li style="margin-right: 10px;"><el-avatar :size="50" :src="item.icon" /></li>
    <li>
      <p style="margin-bottom: 10px">{{item.nick_name}}</p>
      <p style="margin-bottom: 10px;color: #86909C;">{{item.updated_at}}</p>
      <div style="overflow: hidden;text-overflow: ellipsis;max-width: 700px;margin-bottom: 10px;-webkit-line-clamp: 6;display:-webkit-box;-webkit-box-orient: vertical"  :ref="'showText'+index" v-html="item.info" ></div>
      <el-image v-for="items in item.pic" :key="items" :src="items" style="width: 100px; height: 100px;margin-right: 10px;" :preview-src-list="item.pic" />
      <p v-if="item.showTextBtn">
        <span style="color: #79BBFF;float: right;" v-if="item.open" @click="showBtn(item,index)">展开更多</span>
        <span style="color: #79BBFF;float: right;" v-else @click="showBtn(item,index)">收起</span>
      </p>
    </li>
    </ul>
    <div style="padding: 10px 0;display:flex;justify-content:space-around;border-top: 1px solid #eee;">
      <div>分享</div>
      <div style="cursor: pointer;" @click="showReplyBtn(index)">回复</div>
      <div>点赞</div>
    </div>
    <div style="background-color: #fff;padding: 40px 30px;width: 750px;margin-top: 20px;" v-if="index == idx">
    <div style="display: flex;">
      <div><el-avatar :size="50" :src="details" /></div>
      <div style="margin-left: 10px;flex:1">
        <div style="border: 1px solid #1E80FF;margin-bottom: 10px;">
          <div contenteditable="true" ref="getUser" @input="commentInput" style="outline: none;padding: 10px;margin-right: 5px;"></div>
          <div style="outline: none;padding: 10px" ref="getImg">
            <el-image v-for="item in imageUrl" :key="item" :src="item" class="avatar" style="max-width:100px;max-height: 100px;margin-right: 5px;" :preview-src-list="imageUrl" />
          </div>
        </div>
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <p style="display:flex;"><span style="margin-right: 20px;"><el-icon style="margin-right: 5px;vertical-align: middle;"><PictureRounded /></el-icon>表情</span>
          <span>
            <el-upload
              action="http://api_devss.wanxikeji.cn/api/savePic"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name='img'
            >
              <el-icon style="margin-right: 5px;vertical-align: middle;"><PictureFilled /></el-icon>图片
            </el-upload>
          </span>
          </p>
          <button style="color: #fff;background-color: #1E80FF;border-radius:3px;border: 0;padding: 10px 15px;" @click="commentBtn">发表评论</button>
        </div>
      </div>
    </div>
    <div>
      <ul style="padding: 30px 20px 10px;margin-left: 30px;background-color: #eee;margin-top: 10px;" v-for="(items,indexs) in item.boilingPointChildData" :key="items">
        <li style="margin-right: 10px;"><el-avatar :size="50" :src="items.icon" /></li>
        <li style="width: 100%;;display:flex;justify-content: space-between;">
          <div class="info-data">
            <p style="margin-bottom: 10px">{{items.nick_name}}</p>
            <p style="margin-bottom: 10px;color: #86909C;">{{items.created_at}}</p>
            <div v-html="items.comment_info" style="margin-bottom: 10px;overflow: hidden;text-overflow: ellipsis;max-width: 400px;"></div>
          </div>
        </li>
        <li>
              <div style="padding: 10px 0;display:flex;justify-content:space-around;border-top: 1px solid #eee;background-color: #fff;">
              <div>分享</div>
              <div style="cursor: pointer;" @click="showReplyChildBtn(indexs)">回复</div>
              <div>点赞</div>
            </div>
        </li>
    <li v-if="indexs == idxChild">
    <div style="background-color: #fff;padding: 30px;width: 620px;margin-top: 20px">
    <div style="display: flex;">
      <div style="margin-left: 20px;flex:1;padding: 10px">
        <div style="border: 1px solid #1E80FF;margin-bottom: 10px;">
          <div contenteditable="true" ref="getUserChild" @input="commentInputChild" style="outline: none;padding: 10px"></div>
          <div style="outline: none;padding: 10px" ref="getImgChild">
            <el-image v-for="item in imageUrl" :key="item" :src="item" class="avatar" style="max-width:100px;max-height: 100px;margin-right: 5px;" :preview-src-list="imageUrl"/>
          </div>
        </div>
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <p style="display:flex;"><span style="margin-right: 20px;"><el-icon style="margin-right: 5px;vertical-align: middle;"><PictureRounded /></el-icon>表情</span>
          <span>
            <el-upload
              action="http://api_devss.wanxikeji.cn/api/savePic"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name='img'
            >
              <el-icon style="margin-right: 5px;vertical-align: middle;"><PictureFilled /></el-icon>图片
            </el-upload>
          </span>
          </p>
          <button style="color: #fff;background-color: #1E80FF;border-radius:3px;border: 0;padding: 10px 15px;" @click="commentBtnChild(items)">发表评论</button>
        </div>
      </div>
    </div>
    </div>
        </li>
        <li style="background-color: #fff;margin-top: 20px;margin-left: 10px;padding: 30px 20px 10px;" v-for="(items,indexss) in items.child" :key="items">
          <div style="margin-right: 10px;"><el-avatar :size="50" :src="item.icon" /></div>
        <div style="width: 100%;;display:flex;justify-content: space-between;">
          <div class="info-data">
            <p style="margin-bottom: 10px">{{items.nick_name}}</p>
            <p style="margin-bottom: 10px;color: #86909C;">{{items.created_at}}</p>
            <div v-html="items.comment_info" style="margin-bottom: 10px;overflow: hidden;text-overflow: ellipsis;max-width: 400px;"></div>
          </div>
        </div>
          <!--  -->
          <div style="margin-left: 10px; padding: 10px 0;display:flex;justify-content:space-around;border-top: 1px solid #eee;background-color: #fff;">
            <div>分享</div>
            <div style="cursor: pointer;" @click="showReplyChildBtn1(indexss)">回复</div>
            <div>点赞</div>
          </div>
          <div v-if="indexss == idxChild1">
    <div style="background-color: #fff;padding: 30px;width: 580px;margin-top: 20px;border-top: 1px solid #eee;">
    <div style="display: flex;">
      <div style="margin-left: 20px;flex:1;padding: 10px">
        <div style="border: 1px solid #1E80FF;margin-bottom: 10px;">
          <div contenteditable="true" ref="getUserChild" @input="commentInputChild" style="outline: none;padding: 10px"></div>
          <div style="outline: none;padding: 10px" ref="getImgChild">
            <el-image v-for="item in imageUrl" :key="item" :src="item" class="avatar" style="max-width:100px;max-height: 100px;margin-right: 5px;" :preview-src-list="imageUrl"/>
          </div>
        </div>
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <p style="display:flex;"><span style="margin-right: 20px;"><el-icon style="margin-right: 5px;vertical-align: middle;"><PictureRounded /></el-icon>表情</span>
          <span>
            <el-upload
              action="http://api_devss.wanxikeji.cn/api/savePic"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name='img'
            >
              <el-icon style="margin-right: 5px;vertical-align: middle;"><PictureFilled /></el-icon>图片
            </el-upload>
          </span>
          </p>
          <button style="color: #fff;background-color: #1E80FF;border-radius:3px;border: 0;padding: 10px 15px;" @click="commentBtnChild1(items)">发表评论</button>
        </div>
      </div>
    </div>
    </div>
        </div>
        <!-- 三级 -->
        <div v-for="itemss in items.child" :key="itemss" style="margin-left: 10px;border: 1px solid #1E80FF;padding: 20px;">
          <div style="margin-right: 10px;"><el-avatar :size="50" :src="itemss.icon" /></div>
        <div style="width: 100%;;display:flex;justify-content: space-between;">
          <div class="info-data">
            <p style="margin-bottom: 10px">{{itemss.nick_name}}</p>
            <p style="margin-bottom: 10px;color: #86909C;">{{itemss.created_at}}</p>
            <div v-html="itemss.comment_info" style="margin-bottom: 10px;overflow: hidden;text-overflow: ellipsis;max-width: 400px;"></div>
          </div>
        </div>
        </div>
        </li>
      </ul>
    </div>
    </div>
  </li>
    </ul>
      <p v-if="loading" v-loading="loading"></p>
      <p v-if="noMore">我是有底线的...</p>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Pointer, ChatRound, PictureFilled, PictureRounded } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance();
let page = ref(1)
let size = ref(10)
let maxSize = ref('')
let idx = ref(-1)
let showSkeleton = ref(true)
let idxChild = ref(-1)
let idxChild1 = ref(-1)
let range
let rangeChild
let boilingPointData = ref([])
let dataList = ref([])
let imageUrl = ref([])
//小于10前面加0
function setDate(num) {
  return num < 10 ? '0' + num : num
}
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value.push('http://api_devss.wanxikeji.cn/' + response.data)
}
//获取数据
function getData() {
  proxy.$axios({
    url: 'api/articleList',
    method: 'POST',
    data: {
      page:page.value,
      size:size.value,
      type: 2,
    }
  }).then( res => {
    maxSize.value =  res.data.data.count
    boilingPointData.value = res.data.data.data
    boilingPointData.value.forEach( (item,index) => {
      item.open = true
      let date = new Date(item.updated_at*1000)
      let y = date.getFullYear()
      let m = date.getMonth()
      let d = setDate(date.getDate())
      let hh = setDate(date.getHours())
      let mm = setDate(date.getMinutes())
      let dt = setDate(date.getSeconds())
      if(item.pic != null){
          if(item.pic.includes('[')){
            item.pic = JSON.parse(item.pic)
      }
      }
      item.updated_at = `${y}-${m+1}-${d} ${hh}:${mm}:${dt}`;
      item.comment.forEach( items => {
        let newDate = new Date().getTime()
        let date1 = new Date(items.created_at).getTime()
        let time = newDate/1000 - date1
        let h = Math.floor(time/60/60%24)
        let m = Math.floor(time/60%60)
        let s = Math.floor(time%60)
        if(h != 0){
          items.created_at = `${h}小时前`
        }else if( h = 0 || m != 0){
          items.created_at = `${m}分钟前`
        }else{
          items.created_at = `${s}秒前`
        }
        })
        item.boilingPointChildData = []
        item.comment.forEach( items => {
          if(items.father_id == 0){
            item.boilingPointChildData.push(items)
          }
          item.comment.forEach( items => {
          items.child = []
          item.comment.forEach( child => {
            if(items.comment_id == child.father_id){
              items.child.push(child)
            }
          })
        })
      })
    })
    showSkeleton.value = false
  }).then( () =>{
    boilingPointData.value.forEach( (item,index) => {
      item.showTextBtn = false
          if(proxy.$refs['showText'+index][0].offsetHeight >= 110){
            item.showTextBtn = true
          }
    })
      })
}
getData()
const commentInput = () => {
  range = getSelection().getRangeAt(0)
}
const commentInputChild = () => {
  rangeChild = getSelection().getRangeAt(0)
}
//下拉
const loading = ref(false)
const noMore = computed(() => size.value >= maxSize.value)
const disabled = computed(() => loading.value || noMore.value)
const load = () => {
  loading.value = true
  setTimeout(() => {
    size.value += 5
    getData()
    loading.value = false
  }, 2000)
}
//回复
function commentBtn() {
  if(localStorage.getItem('Token') != null){
    if(proxy.$refs.getUser[0].innerHTML != ''){
    proxy.$axios({
    url:'api/addComment',
    method:'POST',
    data: {
      token:localStorage.getItem("Token"),
      comment_info:proxy.$refs.getUser[0].innerHTML + '<br>' + proxy.$refs.getImg[0].innerHTML,
      article_id:boilingPointData.value[idx.value].article_id,
    }
  }).then( res => {
    proxy.$refs.getUser[0].innerHTML = ''  
    proxy.$refs.getImg[0].innerHTML = ''  
    ElMessage({
      message: '评论成功',
      type: 'success',
    })
    getData()
  })
  }else{
    ElMessage({
      message: '评论不能为空',
      type: 'error',
    })
  }
  }else{
    ElMessage({
        message: '请登录',
        type: 'error',
      })
  }
}
//子级回复
const commentBtnChild = (item) => {
  if(localStorage.getItem('Token') != null){
    if(proxy.$refs.getUserChild[0].innerHTML != ''){
    proxy.$axios({
    url:'api/addComment',
    method:'POST',
    data: {
      token:localStorage.getItem("Token"),
      comment_info:proxy.$refs.getUserChild[0].innerHTML + '<br>' + proxy.$refs.getImgChild[0].innerHTML,
      article_id:boilingPointData.value[idx.value].article_id,
      father_id:item.comment_id
    }
  }).then( res => {
    proxy.$refs.getUserChild.innerHTML = ''  
    proxy.$refs.getImgChild.innerHTML = ''  
    ElMessage({
      message: '评论成功',
      type: 'success',
    })
    getData()
  })
  }else{
    ElMessage({
      message: '评论不能为空',
      type: 'error',
    })
  }
  }else{
    ElMessage({
        message: '请登录',
        type: 'error',
      })
  }
}
const commentBtnChild1 = (item) => {
  if(localStorage.getItem('Token') != null){
    if(proxy.$refs.getUserChild[0].innerHTML != ''){
    proxy.$axios({
    url:'api/addComment',
    method:'POST',
    data: {
      token:localStorage.getItem("Token"),
      comment_info:proxy.$refs.getUserChild[0].innerHTML + '<br>' + proxy.$refs.getImgChild[0].innerHTML,
      article_id:boilingPointData.value[idx.value].article_id,
      father_id:item.comment_id
    }
  }).then( res => {
    proxy.$refs.getUserChild.innerHTML = ''  
    proxy.$refs.getImgChild.innerHTML = ''  
    ElMessage({
      message: '评论成功',
      type: 'success',
    })
    getData()
  })
  }else{
    ElMessage({
      message: '评论不能为空',
      type: 'error',
    })
  }
  }else{
    ElMessage({
        message: '请登录',
        type: 'error',
      })
  }
}
// 二级回复
const showReplyBtn = index => {
  return idx.value = index;
}
// 三级回复
const showReplyChildBtn = index => {
  idxChild1.value = -1
  return idxChild.value = index;
}
const showReplyChildBtn1 = index => {
  idxChild.value = -1
  return idxChild1.value = index;
}
//展开按钮
const showBtn = (item,index) => {
  proxy.$refs['showText'+index].forEach( items => {
      if( items.style.display !=""){
        items.style.display=""
        item.open = false
      }else{
        items.style.display="-webkit-box"
        item.open = true
      }
  })
}
</script>

<style scoped>
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>