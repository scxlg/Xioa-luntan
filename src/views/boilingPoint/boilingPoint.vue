<template>
  <div class="container">
    <el-affix :offset="70">
    <div style="flex:2">
      <el-row class="tac">
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        router="true"
      >
        <el-menu-item index="/boilingPoint/boilingPointChild">
          <span>最新</span>
        </el-menu-item>
        <el-menu-item index="/boilingPoint/1">
          <span>热门</span>
        </el-menu-item>
        <el-menu-item index="/boilingPoint">
          <span>关注</span>
        </el-menu-item>
        <el-menu-item index="/boilingPoint">
          <span>我的圈子</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
    </div>
  </el-affix>
    <div style="flex:9;">
      <div style="display: flex;">
      <div style="flex:1;background-color: #fff;margin-bottom: 10px;padding: 20px">
        <div ref="div" style="margin-bottom: 10px;background-color: #eee;">
          <div contenteditable="true" ref="getUser" @input="commentInput" @focus="focusInput" @blur="blurInput" style="outline: none;padding: 10px;"></div>
          <div style="outline: none;padding: 10px" ref="getImg">
            <el-image  v-for="item in imageUrl" :key="item" :src="item" class="avatar" style="max-width:100px;max-height: 100px;margin-right: 5px;" :preview-src-list="imageUrl" />
          </div>
        </div>
        <div style="display:flex;justify-content: space-between;align-items: center;">
          <p style="display:flex;">
            <div>
      <V3Emoji :disable-group="disableGroup"
        @click-emoji="appendText"
        :options-name="optionsName"
        :recent="true"
        :keep="true"
        >
          <span style="margin-right: 20px;cursor: pointer;font-size: 16px;"  @click="addBq"><el-icon style="margin-right: 5px;vertical-align: middle;"><PictureRounded /></el-icon>表情</span>
      </V3Emoji>
  </div>
          <span style="margin-right: 20px;">
            <el-upload
              action="http://api_devss.wanxikeji.cn/api/savePic"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              name='img'
            >
            <el-icon style="margin-right: 5px;vertical-align: middle;"><PictureFilled /></el-icon>图片
          </el-upload>
        </span>
        <span style="margin-right: 20px;"><el-icon style="margin-right:5px;vertical-align: middle;"><Link /></el-icon>链接</span>
        <span style="margin-right: 20px;cursor: pointer;" @click="showSelect = true"><el-icon style="margin-right:5px;vertical-align: middle;"><ChatDotSquare /></el-icon>话题</span>
          </p>
          <button style="color: #fff;background-color: #1E80FF;border-radius:3px;border: 0;padding: 10px 15px;" @click="commentBtn">发表沸点</button>
        </div>
      </div>
    </div>
    <router-view></router-view>
    </div>
  <el-affix :offset="70">
    <div style="flex:3">
      <div class="bg" style="padding: 25px 20px;">
        <div  style="display:flex;margin-bottom: 20px;">
          <el-avatar :size="50" :src="circleUrl" />
          <div style="margin-left: 10px;">
          <p>登录/注册</p>
          <p>即刻玩转沸点</p>
        </div>
        </div>
        <hr>
        <div style="display:flex;justify-content: space-around;margin-top: 20px;">
          <div>
            <p>{{boilingPointNum}}</p>
            <p>沸点</p>
          </div>
          <div>
            <p>{{circleNum}}</p>
            <p>圈子</p>
          </div>
          <div>
            <p>{{attentionNum}}</p>
            <p>关注</p>
          </div>
          <div>
            <p>{{fansNum}}</p>
            <p>关注者</p>
          </div>
        </div>
      </div>
    </div>
  </el-affix>
  </div>
  <el-dialog v-model="showSelect" style="width: 300px;">
    <el-select v-model="form.region" placeholder="请选择话题" multiple="true" @change="addTitle">
        <el-option label="#前端" value="#前端" />
        <el-option label="#后端" value="#后端" />
        <el-option label="#JAVA" value="#JAVA" />
        <el-option label="#HTML" value="#HTML" />
      </el-select>
    </el-dialog>
</template>

<script setup>
import { ref, getCurrentInstance,reactive, onMounted } from 'vue'
import { PictureFilled,PictureRounded,Link,ChatDotSquare } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import V3Emoji from 'vue3-emoji'
import 'vue3-emoji/dist/style.css'
const { proxy } = getCurrentInstance();
let showSelect = ref(false)
let boilingPointNum = ref('-')
let circleNum = ref('-')
let attentionNum = ref('-')
let fansNum = ref('-')
const textarea = ref('')
let imageUrl = ref([])
let form = reactive({
  region:''
})
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value.push('http://api_devss.wanxikeji.cn/' + response.data)
}
//选择话题
const addTitle = (val) => {
  proxy.$refs.getUser.innerHTML += val
}
//发布沸点
const commentBtn = () => {
  proxy.$axios({
    url:'api/addModifyArticle',
    method:'POST',
    data: {
      token:localStorage.getItem("Token"),
      info:proxy.$refs.getUser.innerHTML,
      pic:JSON.stringify(imageUrl.value),
      tags_name:form.region,
      type:2,
    }
  }).then( res => {
    proxy.$refs.getUser.innerHTML = ''
    if(res.data.code == 2000){
      ElMessage({
      message: '评论成功',
      type: 'success',
    })
    proxy.$router.go(0)
    }else{
      ElMessage({
      message: res.data.msg,
      type: 'error',
    })
    }
  })
}
//获取焦点背景变白色
const focusInput = () => {
  proxy.$refs.div.style.backgroundColor = '#fff'
  proxy.$refs.div.style.border = '1px solid #1E80FF'
}
const blurInput = () => {
  proxy.$refs.div.style.backgroundColor = '#eee'
  proxy.$refs.div.style.border = 'none'
}
//添加表情
// const addBq = () =>{
//   proxy.$refs.getUser.innerHTML += `&#128562;`
// }
const appendText = (val) => {
  proxy.$refs.getUser.innerHTML += val
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content:space-between
}
.bg{
  background-color: #fff;
}
.container>div:nth-child(2){
  margin: 0 20px;
}
a{
  text-decoration: none;
}
:deep(.pollup){
  top: 30px;
  left: -20px;
}
</style>