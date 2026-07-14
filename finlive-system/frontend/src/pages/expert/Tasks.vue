<template>
  <div class="tasks-page">
    <div class="search-bar">
      <el-input v-model="searchKeyword" placeholder="搜索问题内容" prefix-icon="Search" style="width: 300px" />
      <el-select v-model="filterRisk" placeholder="风险等级筛选">
        <el-option label="全部" value="" />
        <el-option label="低风险" value="low" />
        <el-option label="中风险" value="medium" />
        <el-option label="高风险" value="high" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    
    <div class="tasks-list">
      <div v-if="tasks.length === 0" class="empty-state">
        <el-icon :size="48" style="color: #ccc">Bell</el-icon>
        <p>暂无待处理任务</p>
      </div>
      
      <div v-else v-for="task in tasks" :key="task.id" class="task-card" @click="selectTask(task)">
        <div class="task-header">
          <span class="task-id">任务 #{{ task.id }}</span>
          <el-tag :type="getRiskType(task.risk_level)">
            {{ getRiskLabel(task.risk_level) }}
          </el-tag>
        </div>
        <div class="task-content">{{ task.content }}</div>
        <div class="task-meta">
          <span>置信度：{{ task.confidence_score }}%</span>
          <span>{{ task.created_at }}</span>
        </div>
      </div>
    </div>
    
    <div v-if="selectedTask" class="task-detail">
      <h3>任务详情</h3>
      
      <div class="detail-section">
        <h4>问题内容</h4>
        <p>{{ selectedTask.content }}</p>
      </div>
      
      <div class="detail-section">
        <h4>AI初步回答</h4>
        <div class="ai-answer">
          <div class="answer-header">
            <span class="badge">AI生成</span>
            <span class="confidence">置信度：{{ selectedTask.confidence_score }}%</span>
          </div>
          <p>根据AI分析，您的问题的回答如下：这是一个自动生成的AI回答，置信度为{{ selectedTask.confidence_score }}%。请注意：AI生成的答案仅供参考，不构成投资建议。</p>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>专家审核</h4>
        <el-form ref="formRef" :model="form">
          <el-form-item label="审核意见">
            <el-input v-model="form.content" type="textarea" :rows="6" placeholder="请输入审核意见..." />
          </el-form-item>
          
          <el-form-item label="审核结果">
            <el-radio-group v-model="form.result">
              <el-radio label="approve">采纳</el-radio>
              <el-radio label="revise">修订润色</el-radio>
              <el-radio label="reject">驳回重新生成</el-radio>
            </el-radio-group>
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="handleSubmit" :loading="loading">提交审核</el-button>
            <el-button @click="selectedTask = null">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Bell } from '@element-plus/icons-vue'
import { questionApi } from '@/api'

const tasks = ref([])
const searchKeyword = ref('')
const filterRisk = ref('')
const selectedTask = ref(null)
const formRef = ref(null)
const loading = ref(false)

const form = reactive({
  content: '',
  result: 'approve'
})

const getRiskType = (level) => {
  const types = { low: 'success', medium: 'warning', high: 'danger' }
  return types[level] || 'info'
}

const getRiskLabel = (level) => {
  const labels = { low: '低风险', medium: '中风险', high: '高风险' }
  return labels[level] || level
}

const fetchTasks = async () => {
  try {
    const params = {
      status: 'pending',
      per_page: 20
    }
    const res = await questionApi.getQuestions(params)
    tasks.value = res.data
  } catch (error) {
    console.error('获取任务列表失败:', error)
  }
}

const handleSearch = () => {
  fetchTasks()
}

const selectTask = (task) => {
  selectedTask.value = task
  form.content = ''
  form.result = 'approve'
}

const handleSubmit = async () => {
  if (!form.content) {
    ElMessage.error('请输入审核意见')
    return
  }
  
  loading.value = true
  try {
    await questionApi.submitAnswer(selectedTask.value.id, {
      content: form.content,
      source_type: 'expert',
      expert_id: 3,
      is_verified: form.result === 'approve'
    })
    
    ElMessage.success('审核提交成功')
    selectedTask.value = null
    fetchTasks()
  } catch (error) {
    ElMessage.error('提交失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchTasks()
})
</script>

<style scoped>
.tasks-page {
  padding: 24px;
  display: flex;
  gap: 24px;
}

.tasks-list {
  flex: 1;
  max-width: 400px;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.task-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s;
}

.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.task-id {
  font-size: 12px;
  color: #999;
}

.task-content {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

.task-detail {
  flex: 2;
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.task-detail h3 {
  font-size: 18px;
  margin-bottom: 24px;
  color: #333;
}

.detail-section {
  margin-bottom: 24px;
}

.detail-section h4 {
  font-size: 14px;
  margin-bottom: 12px;
  color: #666;
}

.detail-section p {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
}

.ai-answer {
  background: #f9fafb;
  border-radius: 8px;
  padding: 16px;
}

.answer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 20px;
  color: #999;
  background: #fff;
  border-radius: 12px;
}

.empty-state p {
  margin: 16px 0;
}
</style>
