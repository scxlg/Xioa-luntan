<template>
  <div style="display:flex;margin-top: 30px;">
    <div class="aside-icon">
      <el-badge :value="99" type="info">
        <el-button circle="true"><el-icon><Pointer /></el-icon></el-button>
      </el-badge>
      <el-badge :value="99" type="info">
        <el-button circle="true"><el-icon><ChatDotRound /></el-icon></el-button>
      </el-badge>
      <el-badge>
        <el-button circle="true"><el-icon><StarFilled /></el-icon></el-button>
      </el-badge>
      <el-badge>
        <el-button circle="true"><el-icon><Share /></el-icon></el-button>
      </el-badge>
      <el-badge>
        <el-button circle="true"><el-icon><WarningFilled /></el-icon></el-button>
      </el-badge>
      <el-badge>
        <el-button circle="true"><el-icon><Camera /></el-icon></el-button>
      </el-badge>
    </div>
    <div>
    <div style="background-color: #fff;padding: 40px 30px;width: 750px;">
    <el-tooltip
        class="box-item"
        effect="dark"
        :content="details.title"
        placement="top-start"
      >
      <h1 style="overflow: hidden;text-overflow: ellipsis;">{{details.title}}</h1>
      </el-tooltip>
    <ul style="display:flex;padding: 30px 20px 10px;">
    <li style="margin-right: 10px;"><el-avatar :size="50" :src="details.icon" /></li>
    <li style="width: 100%;;display:flex;justify-content: space-between;">
      <div>
        <p style="margin-bottom: 10px">{{details.nick_name}}</p>
        <p style="margin-bottom: 10px;color: #86909C;">{{details.updated_at}}</p>
      </div>
      <div><el-button type="primary" plain @click="attention ='已关注'">{{attention}}</el-button></div>
    </li>
    </ul>
    <div class="info-data">
      <div v-html="details.info" style=" line-height: 50px;overflow: hidden;"></div>
    </div>
    <div><span style="margin-right: 100px;">{{details.article_type}}</span><span v-for="items in details.tags" :key="items" style="margin-right: 10px;">{{items.tag_name}}</span></div>
  </div>
  <div style="background-color: #fff;padding: 40px 30px;width: 750px;margin-top: 20px;">
    <div style="display: flex;">
      <div><el-avatar :size="50" :src="details.icon" /></div>
      <div style="margin-left: 10px;flex:1">
        <div style="border: 1px solid #1E80FF;margin-bottom: 10px;">
          <div contenteditable="true" ref="getUser" @input="commentInput" style="outline: none;padding: 10px"></div>
          <div style="outline: none;padding: 10px" ref="getImg">
            <img v-for="item in imageUrl" :key="item" :src="item" class="avatar" style="max-width:100px;max-height: 100px;margin-right: 5px;"/>
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
      <ul style="padding: 30px 20px 10px;" v-for="(item) in dataList" :key="item">
        <li style="margin-right: 10px;"><el-avatar :size="50" :src="item.icon" /></li>
        <li style="width: 100%;;display:flex;justify-content: space-between;">
          <div class="info-data">
            <p style="margin-bottom: 10px">{{item.nick_name}}</p>
            <p style="margin-bottom: 10px;color: #86909C;">{{item.created_at}}</p>
            <div v-html="item.comment_info" style="margin-bottom: 10px;"></div>
            <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;"><Pointer /></el-icon>99+</span>
            <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;" @click="showReplyBtn(item)"><ChatRound /></el-icon>99+</span>
          </div>
        </li>
        <li>
          <ul style="padding: 30px 20px 10px;background-color: #F9FAFB;margin-top: 20px;" v-for="(items) in item.child" :key="items">
            <li style="margin-right: 10px;"><el-avatar :size="50" :src="items.icon" /></li>
            <li style="width: 100%;;display:flex;justify-content: space-between;">
              <div class="info-data">
                <p style="margin-bottom: 10px">{{items.nick_name}}</p>
                <p style="margin-bottom: 10px;color: #86909C;">{{items.created_at}}</p>
                <div v-html="items.comment_info" style="margin-bottom: 10px;"></div>
                <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;"><Pointer /></el-icon>99+</span>
                <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;" @click="showReplyBtn(items)"><ChatRound /></el-icon>99+</span>
              </div>
            </li>
          </ul>
        </li>
        <li v-for="item in dataList1" :key="item">
          <div class="info-data">
            <p style="margin-bottom: 10px">{{item.nick_name}}</p>
            <p style="margin-bottom: 10px;color: #86909C;">{{item.created_at}}</p>
            <div v-html="item.comment_info" style="margin-bottom: 10px;"></div>
            <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;"><Pointer /></el-icon>99+</span>
            <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;" @click="showReplyBtn(item)"><ChatRound /></el-icon>99+</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  </div>
  <div style="background-color: #fff;padding:30px 10px;margin-left: 20px; height: 150px;">
    <div style="width: 100%;;display:flex;justify-content: space-between;margin-bottom: 20px;align-items: center;">
      <el-avatar :size="50" :src="details.icon" />
      <p style="margin-left: 10px;">{{details.nick_name}}</p>
    </div>
    <hr>
    <div style="margin-top: 20px;">
      <p style="margin-bottom: 20px">获得点赞</p>
      <p>文章被阅读</p>
    </div>
  </div>
  </div>
  <!-- 回复 -->
    <el-dialog v-model="showReply">
      <div style="background-color: #fff;padding: 40px 30px;width: 750px;margin-top: 20px;" v-if="showReply">
    <div style="display: flex;">
      <div><el-avatar :size="50" :src="details.icon" /></div>
      <div style="margin-left: 10px;flex:1">
        <div style="border: 1px solid #1E80FF;margin-bottom: 10px;">
          <div contenteditable="true" ref="getUser" @input="commentInput" style="outline: none;padding: 10px"></div>
          <div style="outline: none;padding: 10px" ref="getImg">
            <img v-for="item in imageUrl" :key="item" :src="item" class="avatar" style="max-width:100px;max-height: 100px;margin-right: 5px;"/>
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
          <button style="color: #fff;background-color: #1E80FF;border-radius:3px;border: 0;padding: 10px 15px;" @click="commentBtn1">发表评论</button>
        </div>
      </div>
    </div>
    </div>
    </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance } from 'vue'
import { Pointer, ChatDotRound, StarFilled, WarningFilled, Share, Camera, ChatRound, PictureFilled, PictureRounded } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
let details = JSON.parse(localStorage.getItem("details"));
let dataList = ref([])
let dataList1 = ref([])
let showReply = ref(false)
const imageUrl = ref([])
let idx = ref('')
let fId = ref(0)
//评论类容
let range
const { proxy } = getCurrentInstance();
let attention = ref('关注')
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value.push('http://api_devss.wanxikeji.cn/' + response.data)
}
function getLists() {
  proxy.$axios({
    url:'api/articleInfo',
    method: 'POST',
    data:{
      article_id:details.article_id,
      page:1,
      size:10,
    }
  }).then( res => {
    dataList.value = res.data.data.data
    dataList.value.forEach( item => {
      let newDate = new Date().getTime()
      let date = new Date(item.created_at).getTime()
      let time = newDate/1000 - date
      let h = Math.floor(time/60/60%24)
      let m = Math.floor(time/60%60)
      let s = Math.floor(time%60)
      if(h != 0){
        item.created_at = `${h}小时前`
      }else if( h = 0 || m != 0){
        item.created_at = `${m}分钟前`
      }else{
        item.created_at = `${s}秒前`
      }
      item.child.forEach( items => {
        let newDate = new Date().getTime()
      let date = new Date(items.created_at).getTime()
      let time = newDate/1000 - date
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
    })
  })
}
//二级评论列表
function getListsChild(father_id) {
  proxy.$axios({
    url:'api/articleInfo',
    method: 'POST',
    data:{
      article_id:details.article_id,
      page:1,
      size:10,
      father_id:father_id
    }
  }).then( res => {
    dataList1.value = res.data.data.data
    console.log(dataList1.value);
  }).then( () => {
    dataList1.value.forEach( item => {
      let newDate = new Date().getTime()
      let date = new Date(item.created_at).getTime()
      let time = newDate/1000 - date
      let h = Math.floor(time/60/60%24)
      let m = Math.floor(time/60%60)
      let s = Math.floor(time%60)
      if(h != 0){
        item.created_at = `${h}小时前`
      }else if( h = 0 || m != 0){
        item.created_at = `${m}分钟前`
      }else{
        item.created_at = `${s}秒前`
      }
      item.child.forEach( items => {
      let newDate = new Date().getTime()
      let date = new Date(items.created_at).getTime()
      let time = newDate/1000 - date
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
    })
  })
}
getLists();
const commentInput = () => {
  range = getSelection().getRangeAt(0)
}
//发表评论
function commentBtn() {
  if(localStorage.getItem('Token') != null){
    if( proxy.$refs.getUser.innerHTML != ''){
    proxy.$axios({
    url:'api/addComment',
    method:'POST',
    data: {
      token:localStorage.getItem("Token"),
      comment_info:proxy.$refs.getUser.innerHTML + '<br>' + proxy.$refs.getImg.innerHTML,
      article_id:details.article_id,
    }
  }).then( res => {
    ElMessage({
      message: '评论成功',
      type: 'success',
    })
    proxy.$refs.getUser.innerHTML = ''
    proxy.$refs.getImg.innerHTML  = ''
    getLists();
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
//回复评论
function commentBtn1() {
  //显示3级
  // getListsChild(idx.value.comment_id)
  if(localStorage.getItem('Token') != null){
    if( proxy.$refs.getUser.innerHTML != ''){
    proxy.$axios({
    url:'api/addComment',
    method:'POST',
    data: {
      token:localStorage.getItem("Token"),
      comment_info:proxy.$refs.getUser.innerHTML + '<br>' + proxy.$refs.getImg.innerHTML,
      article_id:details.article_id,
      father_id:idx.value.comment_id
    }
  }).then( res => {
    ElMessage({
      message: '评论成功',
      type: 'success',
    })
    showReply.value = false
    getLists();
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
// 回复
const showReplyBtn = index => {
  showReply.value = true
  return idx.value = index;
}
</script>

<style scoped>
.aside-icon{
  height:360px;
  margin-top: 50px;
  margin-right: 30px;
  display:flex;
  flex-direction: column;
  justify-content:space-between;
}
.aside-icon button{
  width: 40px;
  height: 40px;
}
.info-data{
  margin-bottom: 20px;
}
:deep(.info-data) img{
  width: 100%;
}
:deep(.info-data) p,:deep(.info-data){
  width: 100%;
  word-wrap:break-word;
}

</style>