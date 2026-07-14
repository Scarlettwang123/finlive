<template>
  <div class="settings-page">
    <div class="settings-card">
      <h2>系统设置</h2>
      
      <el-form ref="formRef" :model="form" label-width="150px">
        <el-form-item label="系统名称">
          <el-input v-model="form.systemName" />
        </el-form-item>
        
        <el-form-item label="系统版本">
          <el-input v-model="form.version" disabled />
        </el-form-item>
        
        <el-form-item label="AI模型置信度阈值">
          <el-input-number v-model="form.confidenceThreshold" :min="0" :max="100" />
        </el-form-item>
        
        <el-form-item label="专家响应超时时间(分钟)">
          <el-input-number v-model="form.expertTimeout" :min="1" :max="60" />
        </el-form-item>
        
        <el-form-item label="数据保留时间(天)">
          <el-input-number v-model="form.dataRetention" :min="7" :max="365" />
        </el-form-item>
        
        <el-form-item label="合规过滤开关">
          <el-switch v-model="form.complianceEnabled" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存设置</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="settings-card">
      <h2>系统信息</h2>
      <div class="info-list">
        <div class="info-item">
          <span class="label">系统版本</span>
          <span class="value">1.0.0</span>
        </div>
        <div class="info-item">
          <span class="label">运行环境</span>
          <span class="value">development</span>
        </div>
        <div class="info-item">
          <span class="label">数据库类型</span>
          <span class="value">SQLite</span>
        </div>
        <div class="info-item">
          <span class="label">服务启动时间</span>
          <span class="value">{{ startupTime }}</span>
        </div>
        <div class="info-item">
          <span class="label">当前时间</span>
          <span class="value">{{ currentTime }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

const formRef = ref(null)
const startupTime = ref('')
const currentTime = ref('')
let timer = null

const form = reactive({
  systemName: 'FinLive 金融智答系统',
  version: '1.0.0',
  confidenceThreshold: 60,
  expertTimeout: 15,
  dataRetention: 90,
  complianceEnabled: true
})

const handleSave = () => {
  ElMessage.success('设置已保存')
}

const updateTime = () => {
  currentTime.value = new Date().toLocaleString('zh-CN')
}

onMounted(() => {
  startupTime.value = new Date().toLocaleString('zh-CN')
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.settings-page {
  padding: 24px;
  max-width: 800px;
}

.settings-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.settings-card h2 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.info-list {
  border-top: 1px solid #eee;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item .label {
  color: #666;
}

.info-item .value {
  color: #333;
  font-family: monospace;
}
</style>
