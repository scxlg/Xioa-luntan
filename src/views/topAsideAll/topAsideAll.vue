<template>
  <div class="container">
    <el-row>
      <el-col :span="17" class="bg"><div class="grid-content ep-bg-purple" />
        <div v-if="showSkeleton" style="padding: 20px;">
          <el-skeleton :rows="5" animated style="margin-top: 30px;"/>
        </div>
    <div  class="infinite-list-wrapper"  v-else>
    <ul
      v-infinite-scroll="load"
      class="list"
      :infinite-scroll-disabled="disabled"
        style="margin-bottom:25px;"
    >
      <li v-for="(item, index) in homeData" :key="item.user_id" style="padding: 20px 20px 0;" class="warp-hover" @click="toDetails(index)">
              <!-- 骨架 -->
              <ul style="border-bottom: 1px solid #E5E6EB;display:flex;padding-bottom: 20px;">
              <li style="flex:4;" class=" home-text" >
                <div style="font-size: 14px;color: #4E5969;">
                <span>{{item.nick_name}}</span> | <span style="color: #86909C;">{{item.updated_at}}</span> | <span style="color: #86909C;"><span v-for="items in item.tags" :key="items" style="margin-right: 5px;">{{items.tag_name}}</span></span>
                </div>
                <div class="home-text" style="margin: 15px 0;font-weight: bold;font-size: 16px;color: #000;">
                  {{item.title}}
                </div>
                <div class=" home-text" style="font-size: 14px;color: #86909C;">
                {{item.describe}}
                </div>
                <div style="margin-top: 10px">
                  <span><el-icon style="margin-right: 5px;"><View /></el-icon>99+</span>
                  <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;"><Pointer /></el-icon>99+</span>
                  <span style="margin-left: 20px;"><el-icon style="margin-right: 5px;"><ChatRound /></el-icon>99+</span>
                </div>
              </li>
              <li style="flex:1c;padding: 0 0 0 20px;">
              <img style="max-width: 120px;max-height:100px" :src="item.pic" alt="">
              </li>
              </ul>
            </li>
    </ul>
    <p v-if="loading" v-loading="loading"></p>
    <p v-if="noMore">我是有底线的...</p>
        </div>
      </el-col>
      <el-col :span="6" style="margin-left: 20px;"><div class="grid-content ep-bg-purple" />
        <div class="bg" style="padding: 10px 20px 30px;">
          <div style="display:flex; justify-content: space-between;">
            <div>
              <el-icon><Burger /></el-icon>
              <span style="margin: 0 10px;font-size:20px">下午好</span>
            </div>
            <div>
              <el-button type="primary" round="true" style="color: #1576F4;background-color: #fff;margin-right;">去签到</el-button>
            </div>
          </div>
          <p style="text-align: center;margin-top: 10px;">点亮你在社区的每一天</p>
        </div>
        <el-affix :offset="90">
          <div ref="downloadApp">
            <div class="app-link bg" data-v-11c44dd5="" style="display:flex;margin-top: 20px;padding: 15px 10px; font-size: 14px;">
              <img  style="width: 50px;height: 50px;margin-right: 20px;" src="//lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/img/home.59780ae.png" class="qr-img" data-v-11c44dd5=""> 
              <div class="content-box" data-v-11c44dd5="" style="display:flex;flex-direction: column;justify-content: space-between;">
                <div class="headline" data-v-11c44dd5="">下载稀土掘金APP</div> 
                <div class="desc" data-v-11c44dd5="" style="font-size: 12px;">一个帮助开发者成长的社区</div>
              </div>
            </div>
          </div>
        </el-affix>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted, computed} from 'vue'
import { Burger,View,Pointer,ChatRound } from '@element-plus/icons-vue'
const { proxy } = getCurrentInstance();
let downloadApp = ref('')
const showSkeleton = ref(true)
let page = ref(1)
let size = ref(10)
let maxSize = ref('')
let homeData = ref([])
//小于10前面加0
function setDate(num) {
  return num < 10 ? '0' + num : num
}

//获取数据
const getData = () => {
  proxy.$axios({
    url: "api/articleList",
    method: "POST",
    data:{
      page: page.value,
      size: size.value
    }
  }).then( res => {
    maxSize.value =  res.data.data.count
    homeData.value = res.data.data.data
    homeData.value.forEach( (item,index) => {
      let date = new Date(item.updated_at*1000)
      let y = date.getFullYear()
      let m = date.getMonth()
      let d = setDate(date.getDate())
      let hh = setDate(date.getHours())
      let mm = setDate(date.getMinutes())
      let dt = setDate(date.getSeconds())
      item.updated_at = `${y}-${m+1}-${d} ${hh}:${mm}:${dt}`; 
    })
    showSkeleton.value = false
  })
}
getData()
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
//到详情页
const toDetails = (index) => {
  proxy.$router.push({name:'details'})
  localStorage.setItem('details',JSON.stringify(homeData.value[index]))
}
</script>

<style scoped>
.container {
  margin-top: 25px;
}
.home-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg {
  background-color: #fff !important;
}
.warp-hover:hover{
background-color: #fafafa;
}
</style>