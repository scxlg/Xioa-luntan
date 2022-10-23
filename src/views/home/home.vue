<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-affix>
        <el-menu
        class="el-menu-demo"
        mode="horizontal"
        router="true"
        :default-active = defaultIndex 
        @select="handleSelect"
        >
          <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" alt="" @click="toHome">
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/boilingPoint/boilingPointChild">沸点</el-menu-item>
          <!-- <el-menu-item :index="{path:'/boilingPoint/boilingPointChild',query:{show:true}}">沸点</el-menu-item> -->
          <el-menu-item index="/8">课程</el-menu-item>
          <el-menu-item index="/3">直播</el-menu-item>
          <el-menu-item index="/4">活动</el-menu-item>
          <el-menu-item index="/5">商城</el-menu-item>
          <el-menu-item index="/6">APP</el-menu-item>
          <el-menu-item index="/7">插件</el-menu-item>
          <div class="header-text">
            <img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f18abd4da28d4951bd2722e3b17f9a15~tplv-k3u1fbpfcp-zoom-1.image" alt="" style="width: 115px;height: 40px;">
          </div>
          <div class="mt-4 header-text">
            <el-input
              v-model="input3"
              placeholder="请输入搜索类容"
              class="input-with-select"
            >
              <template #append>
                <el-button :icon="Search" />
              </template>
            </el-input>
          </div>
          <div class="flex flex-wrap items-center header-text">
            <el-dropdown split-button type="primary" @click="handleClick">
              创作者中心
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="writeBtn">写文章</el-dropdown-item>
                  <el-dropdown-item>发沸点</el-dropdown-item>
                  <el-dropdown-item>写笔记</el-dropdown-item>
                  <el-dropdown-item>写代码</el-dropdown-item>
                  <el-dropdown-item>草稿箱</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="header-text" v-if="!$store.state.token">
            <el-popover v-model:visible="visible" placement="top" :width="300">
              <p>登录掘金后可立即获得以下权益：</p>
              <div style="text-align: center; margin: 0">
                <el-button size="default" @click='loginUser' style="width: 100%; margin:20px 0;color: #fff;background-color:#3370FF">登录</el-button>
              <p>首次使用？<el-button size="small" text @click='dialogFormVisible1 = true' style="color: #3370FF;">点我注册</el-button></p>
              </div>
              <template #reference>
                <el-button>登录 | 注册</el-button>
              </template>
            </el-popover>
          </div>
          <div class="header-text" v-else>
            <el-popover v-model:visible="visible1" placement="top" :width="300">
              <el-button  @click="logOut">退出登录</el-button>
              <template #reference>
                <el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
              </template>
            </el-popover>
          </div>
        </el-menu>
        <div style="box-sizing: border-box;padding: 10px 500px;background-color: #fff;border-bottom: 1px solid #eee;" v-if="showAside">
          <el-link :underline="false" @click="toTopAsideAll" style="color: #409EFF">综合</el-link>
          <el-link :underline="false">后端</el-link>
          <el-link :underline="false">前端</el-link>
          <el-link :underline="false">Android</el-link>
          <el-link :underline="false">IOS</el-link>
          <el-link :underline="false">人工智能</el-link>
          <el-link :underline="false">开发工具</el-link>
          <el-link :underline="false">代码人生</el-link>
          <el-link :underline="false">阅读</el-link>
        </div>
      </el-affix>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
  <el-dialog v-model="dialogFormVisible" title="手机登录" align-center="true" style="width: 300px;">
    <el-form :model="form" size="large" ref="ruleFormRef">
      <el-form-item>
          <el-input
            v-model="form.name"
            placeholder="请输入手机号"
            class="input-with-select"
            autofocus="true"
          >
            <template #prepend>
              <el-select v-model="form.select" style="width: 85px;">
                <el-option label="+86" value="+86" selected />
                <el-option label="+853" value="+853" />
                <el-option label="+852" value="+852" />
                <el-option label="+886" value="+886" />
              </el-select>
            </template>
          </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.verification_code" show-password />
      </el-form-item>
    </el-form>
      <span class="dialog-footer">
        <el-button type="primary" size="large" @click="submit(ruleFormRef)" style="width: 100%">登录</el-button
        >
      </span>
  </el-dialog>
  <el-dialog v-model="dialogFormVisible1" title="注册" align-center="true" style="width: 300px;">
    <el-form :model="form" size="large" ref="ruleFormRef">
      <el-form-item>
          <el-input
            v-model="form.name"
            placeholder="请输入手机号"
            class="input-with-select"
            autofocus="true"
          >
            <template #prepend>
              <el-select v-model="form.select" style="width: 85px;">
                <el-option label="+86" value="+86" selected />
                <el-option label="+853" value="+853" />
                <el-option label="+852" value="+852" />
                <el-option label="+886" value="+886" />
              </el-select>
            </template>
          </el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.verification_code" autocomplete="off"/>
      </el-form-item>
    </el-form>
      <span class="dialog-footer">
        <el-button type="primary" size="large" @click="registerUser(ruleFormRef)" style="width: 100%">注册</el-button
        >
      </span>
  </el-dialog>
  <el-backtop :right="100" :bottom="100" :visibility-height="100"/>
</template>
<script setup>
import { ref,getCurrentInstance, onMounted,reactive } from 'vue'
import { Search,ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const { proxy } = getCurrentInstance();
let showAside = ref(false)
const visible = ref(false)
const visible1 = ref(false)
let ruleFormRef = ref('')
let homeRef = ref('home')
let defaultIndex = ref('/home')
const dialogFormVisible = ref(false)
const dialogFormVisible1 = ref(false)
const form = reactive({
  name: '',
  verification_code:'',
  select:'',
})
const handleClick = () => {
  alert('button click')
}
const handleSelect = (index) => {
  if(index == '/home'){
  showAside.value = true
}else{
  showAside.value = false
}
}
const input3 = ref('')
function toHome() {
  proxy.$router.push({ path:'/home'})
}
onMounted( () => {
  //刷新高亮
  let url = proxy.$route.path
  if(url == '/home/topAsideAll') {
    showAside.value = true
    defaultIndex.value = '/home'
  }else if(url == '/boilingPoint/boilingPointChild') {
    defaultIndex.value = '/boilingPoint/boilingPointChild'
  }
})
const toTopAsideAll = () => {
  proxy.$router.push({path:'/home/topAsideAll'})
}
const loginUser = () => {
  dialogFormVisible.value = true
  visible.value  = false
}
//注册
const registerUser = () => {
  proxy.$axios({
    url:'/api/register',
    method: 'POST',
    data:{
      name: form.name,
      pw:form.verification_code,
      nick_name:form.name
    }
  }).then(res => {
    // localStorage.setItem('Token', res.data.data.token)
    if(res.data.code == '2000') {
      dialogFormVisible1.value = false
      ElMessage({
        message: '注册成功',
        type: 'success',
      })
      form.name = ''
      form.verification_code = ''
    }else{
      ElMessage({
      message: res.data.msg,
      type: 'warning',
    })
    }
  })
  dialogFormVisible1.value = true
  visible1.value  = false
}
//登录
const submit = () => {
  proxy.$axios({
    url:'/api/login', 
    method: 'POST',
    data:{
      name: form.name,
      pw:form.verification_code,
    }
  }).then(res => {
  console.log(res)
  if(res.data.code == '2000') {
    localStorage.setItem('Token', res.data.data.token)
    proxy.$router.go(0)
      dialogFormVisible.value = false
      ElMessage({
        message: '登录成功',
        type: 'success',
      })
    }else{
      ElMessage({
      message: res.data.msg,
      type: 'error',
    })
    }
  })
  dialogFormVisible.value = true
  visible.value  = false
  // if (ruleFormRef.value) {
  //   //所有的都回复初始
  //   ruleFormRef.value.resetFields();
  //   }
}
//退出
const logOut = () => {
    localStorage.removeItem('Token')
    proxy.$router.go(0)
  }
const writeBtn = () => {
  if(localStorage.getItem('Token') != null){
    proxy.$router.push({name:'writeArticle'})
  }else{
    ElMessage({
        message: '请登录',
        type: 'error',
      })
  }
}
</script>
<style>
body{
  background-color: #F4F5F5;
}
.el-header{
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
*{
  margin: 0;
  padding: 0;
}
.mt-4{
  margin-left: 100px;
}
.header-text{
  padding: 0 10px;
}
.el-menu-demo{
  
  justify-content: center;
  align-items: center;
}
:root{
  --el-menu-hover-bg-color: var(--el-fill-color-blank);
}
.el-main{
  overflow: hidden !important;
  width: 1200px;
  margin: 0 auto;
}
.el-link {
  margin: 0 10px;
}
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
li{ 
  cursor: pointer;
  list-style: none;
}
</style>
