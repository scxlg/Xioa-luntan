<template>
  <div style="display:flex;background-color: #eee">
    <div style="flex:1"><input v-model="input" placeholder="请输入文章标题..." size="large" /></div>
    <div style="width: 100px;display:flex;align-items: center;"><el-button type="primary" style="padding:20px;font-size: 16px;" @click="dialogVisible=true">发布</el-button></div>
  </div>
      <div>
        <Toolbar
      style="border-bottom: 1px solid #ccc;border-top: 1px solid #ccc;"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
      <div style="display:flex;width: 100%;">
        <Editor
      style=" height:85vh;width:50%;overflow-y: hidden;"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      />
      <div style="width:50% ; word-wrap:break-word;" v-html="text"></div>
      </div>
      </div>
      <!-- 发布dialog -->
      <div v-if="dialogVisible" style="position: absolute;top: 70px;right: 50px;background-color: #fff;" class="show-div">
    <h4 style="padding: 25px 20px;font-weight: normal;font-size: 20px;">发布文章</h4>
    <hr>
    <el-form :model="form" label-width="100px" style="padding: 10px 20px">
    <el-form-item label="分类：">
      <div>
    <el-radio-group v-model="form.radio" size="small" style="border: none;">
      <el-radio-button label="前端" style="margin-right: 10px;" />
      <el-radio-button label="后端" style="margin-right: 10px;" />
      <el-radio-button label="人工智能" style="margin-right: 10px;" />
      <el-radio-button label="代码人生" />
    </el-radio-group>
  </div>
    </el-form-item>
    <el-form-item label="添加标签：">
      <el-select v-model="form.region" placeholder="请添加标签" multiple="true">
        <el-option label="前端" value="前端" />
        <el-option label="后端" value="后端" />
      </el-select>
    </el-form-item>
  <el-form-item label="文章封面：">
    <el-upload
    class="avatar-uploader"
    list-type="picture-card" 
    action="http://api_devss.wanxikeji.cn/api/savePic"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    name='img'
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
    </el-form-item>
    <el-form-item label="编辑摘要：">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="submit">确认并发布</el-button>
    </el-form-item>
  </el-form>
      </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { onBeforeUnmount, ref, shallowRef, onMounted,watch, getCurrentInstance, reactive } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
const imageUrl = ref('')
const form = reactive({
  radio:'前端',
  region: '',
  desc: '',
})
const handleAvatarSuccess = (
  response,
  uploadFile
) => {
  imageUrl.value = 'http://api_devss.wanxikeji.cn/' + response.data
}
const { proxy } = getCurrentInstance();
const dialogVisible = ref(false)
const input = ref('')
const text = ref('')
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')
    // 模拟 ajax 异步获取内容
    onMounted(() => {
        setTimeout(() => {
            valueHtml.value = '<p></p>'
        }, 1500)
    })
    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...',
    MENU_CONF:{
      uploadImage:{
      async customUpload(file, insertFn) { 
        let formd = new FormData();
        formd.append('img',file)
        proxy.$axios({
          url:'api/savePic',
          headers:{"Content-Type":"multipart/form-data"},
          method: 'POST',
          data:formd
        }).then( ( res) => {
          console.log(res)
          insertFn('http://api_devss.wanxikeji.cn/' +res.data.data)
        })               // JS 语法
    },
}
    }
    }
    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })
    const submitEditor = () => {
      console.log(valueHtml.value)
    }
    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }
watch(
  () => valueHtml.value,
  (valNew) => {
    text.value = valNew
  }
)
//发布
function submit() {
if(input.value != '' && valueHtml.value != '') {
  proxy.$axios({
  url: "api/addModifyArticle",
  method: "POST",
  data:{
    token:localStorage.getItem("Token"),
    title:input.value,
    info:valueHtml.value,
    type:1,
    tags_name:form.region,
    pic:imageUrl.value,
    article_type:form.radio,
    describe:form.desc,
  }
}).then((res) => {
  ElMessage({
      message: '发布成功',
      type: 'success',
    })
    proxy.$router.push({name:'topAsideAll'})
})
dialogVisible.value = false
}else{
  console.log(form)
  ElMessage({
      message: '标题和内容不能为空',
      type: 'warning',
    })
}
}
</script>
<style scoped>
input {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  font-size: 24px;
  background-color: #eee; 
  border: none;
  outline: none;
  padding: 0 20px;
}
.w-e-text-container{
  background-color: #594088;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
:deep(.el-radio-button__inner){
  border-left: 1px solid #eee;
  border-radius: 1px;
}
.show-div::before{
  content: "";
  display:block;
  position: absolute;
  border:10px solid #594088;
  border-color: transparent transparent #fff transparent;
  top: -30px;
  right: 10px;
  z-index: 999;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>