<template>
  <div class="ask-page">
    <div class="ask-card">
      <h2>发起提问</h2>
      <p class="subtitle">输入您的金融问题，获取专业解答</p>
      
      <el-form ref="formRef" :model="form" :rules="rules" label-width="0">
        <el-form-item prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="6"
            placeholder="请输入您的问题，例如：近期宏观经济形势如何影响A股市场？"
            resize="none"
          />
        </el-form-item>
        
        <el-form-item>
          <div class="tips">
            <el-icon><InfoFilled /></el-icon>
            <span>系统将根据问题置信度自动路由至AI或专家进行解答</span>
          </div>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading" style="width:100%;height:44px;font-size:16px">
            提交提问
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div v-if="showResult" class="result-card">
      <h3>提问已提交</h3>
      <div class="result-info">
        <div class="info-item">
          <span class="label">问题ID：</span>
          <span class="value">{{ resultData.question.id }}</span>
        </div>
        <div class="info-item">
          <span class="label">置信度：</span>
          <el-tag :type="getConfidenceType(resultData.question.confidence_score)">
            {{ resultData.question.confidence_score }}%
          </el-tag>
        </div>
        <div class="info-item">
          <span class="label">路由决策：</span>
          <el-tag type="info">{{ getRoutingLabel(resultData.question.routing_decision) }}</el-tag>
        </div>
      </div>
      
      <div v-if="resultData.ai_answer" class="ai-answer">
        <h4>AI初步回答</h4>
        <div class="answer-content">{{ resultData.ai_answer.content }}</div>
        <div class="answer-footer">
          <span class="badge">AI生成</span>
          <span class="confidence">置信度：{{ resultData.ai_answer.ai_confidence }}%</span>
        </div>
      </div>
      
      <el-button @click="resetForm">继续提问</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import { questionApi } from '@/api'

const formRef = ref(null)
const loading = ref(false)
const showResult = ref(false)
const resultData = ref(null)

const form = reactive({
  content: ''
})

const rules = {
  content: [{ required: true, message: '请输入问题内容', trigger: 'blur' }]
}

const getConfidenceType = (score) => {
  if (score >= 85) return 'success'
  if (score >= 60) return 'warning'
  return 'danger'
}

const getRoutingLabel = (decision) => {
  const labels = { ai_direct: 'AI直接回答', single_expert: '单专家验证', double_expert: '双专家验证' }
  return labels[decision] || decision
}

const handleSubmit = async () => {
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    loading.value = true
    try {
      const response = await questionApi.createQuestion({
        content: form.content,
        user_id: 2,
        company_id: 1
      })
      
      resultData.value = response
      showResult.value = true
      ElMessage.success('提问成功')
    } catch (error) {
      ElMessage.error(error.response?.data?.error || '提交失败')
    } finally {
      loading.value = false
    }
  })
}

const resetForm = () => {
  showResult.value = false
  resultData.value = null
  form.content = ''
  formRef.value.resetFields()
}
</script>

<style scoped>
.ask-page {
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
}

.ask-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.ask-card h2 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #333;
}

.subtitle {
  font-size: 14px;
  color: #999;
  margin-bottom: 24px;
}

.tips {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: #f0fdf4;
  border-radius: 8px;
  font-size: 13px;
  color: #166534;
}

.result-card {
  margin-top: 24px;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.result-card h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.result-info {
  margin-bottom: 24px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.info-item .label {
  font-size: 14px;
  color: #666;
  width: 80px;
}

.info-item .value {
  font-size: 14px;
  color: #333;
}

.ai-answer {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}

.ai-answer h4 {
  font-size: 14px;
  margin-bottom: 12px;
  color: #333;
}

.answer-content {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  white-space: pre-wrap;
}

.answer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.badge {
  font-size: 12px;
  color: #f59e0b;
  background: #fef3c7;
  padding: 2px 8px;
  border-radius: 4px;
}

.confidence {
  font-size: 12px;
  color: #999;
}
</style>
