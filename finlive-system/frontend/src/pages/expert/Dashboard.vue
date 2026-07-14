<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon orange">
          <el-icon><Bell /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.pendingTasks }}</div>
          <div class="stat-label">待处理任务</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon green">
          <el-icon><CircleCheck /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.completedTasks }}</div>
          <div class="stat-label">本月已完成</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon blue">
          <el-icon><Clock /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.avgResponseTime }}分钟</div>
          <div class="stat-label">平均响应时间</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon purple">
          <el-icon><ChatDotRound /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.acceptanceRate }}%</div>
          <div class="stat-label">采纳率</div>
        </div>
      </div>
    </div>
    
    <div class="quick-actions">
      <h3>快速操作</h3>
      <div class="action-grid">
        <div class="action-card" @click="$router.push('/expert/tasks')">
          <div class="action-icon">
            <el-icon><Bell /></el-icon>
          </div>
          <div class="action-text">
            <div class="action-title">处理任务</div>
            <div class="action-desc">查看待审核的问题</div>
          </div>
          <div v-if="stats.pendingTasks > 0" class="action-badge">{{ stats.pendingTasks }}</div>
        </div>
        
        <div class="action-card" @click="$router.push('/expert/history')">
          <div class="action-icon">
            <el-icon><Histogram /></el-icon>
          </div>
          <div class="action-text">
            <div class="action-title">历史记录</div>
            <div class="action-desc">查看已完成的任务</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="recent-tasks">
      <h3>最近任务</h3>
      <div v-if="recentTasks.length === 0" class="empty-state">
        <el-icon :size="48" style="color: #ccc"><Bell /></el-icon>
        <p>暂无任务记录</p>
      </div>
      <el-table v-else :data="recentTasks" border>
        <el-table-column prop="id" label="任务ID" width="80" />
        <el-table-column prop="content" label="问题内容" width="300">
          <template #default="scope">
            <div class="question-content">{{ scope.row.content }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="confidence_score" label="置信度" width="120">
          <template #default="scope">
            <el-tag :type="getConfidenceType(scope.row.confidence_score)">
              {{ scope.row.confidence_score }}%
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="risk_level" label="风险等级" width="120">
          <template #default="scope">
            <el-tag :type="getRiskType(scope.row.risk_level)">
              {{ getRiskLabel(scope.row.risk_level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)">
              {{ getStatusLabel(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" />
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button size="small" @click="handleTask(scope.row)">处理</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bell, CircleCheck, Clock, ChatDotRound, Histogram } from '@element-plus/icons-vue'
import { questionApi } from '@/api'

const stats = ref({
  pendingTasks: 0,
  completedTasks: 0,
  avgResponseTime: 0,
  acceptanceRate: 0
})

const recentTasks = ref([])

const getConfidenceType = (score) => {
  if (score >= 85) return 'success'
  if (score >= 60) return 'warning'
  return 'danger'
}

const getRiskType = (level) => {
  const types = { low: 'success', medium: 'warning', high: 'danger' }
  return types[level] || 'info'
}

const getRiskLabel = (level) => {
  const labels = { low: '低风险', medium: '中风险', high: '高风险' }
  return labels[level] || level
}

const getStatusType = (status) => {
  const types = { pending: 'warning', answered: 'success', processing: 'info' }
  return types[status] || 'info'
}

const getStatusLabel = (status) => {
  const labels = { pending: '待处理', answered: '已回答', processing: '处理中' }
  return labels[status] || status
}

const fetchStats = async () => {
  try {
    const pendingRes = await questionApi.getQuestions({ status: 'pending', per_page: 1 })
    stats.value.pendingTasks = pendingRes.total
    
    const answeredRes = await questionApi.getQuestions({ status: 'answered', per_page: 1 })
    stats.value.completedTasks = answeredRes.total
    
    stats.value.avgResponseTime = 3
    stats.value.acceptanceRate = 98
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

const fetchRecentTasks = async () => {
  try {
    const res = await questionApi.getQuestions({ per_page: 5 })
    recentTasks.value = res.data
  } catch (error) {
    console.error('获取最近任务失败:', error)
  }
}

const handleTask = (row) => {
  window.location.href = `/expert/tasks?id=${row.id}`
}

onMounted(() => {
  fetchStats()
  fetchRecentTasks()
})
</script>

<style scoped>
.dashboard {
  padding: 24px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.stat-icon.orange { background: #fff7ed; color: #f97316; }
.stat-icon.green { background: #dcfce7; color: #22c55e; }
.stat-icon.blue { background: #dbeafe; color: #3b82f6; }
.stat-icon.purple { background: #f3e8ff; color: #a855f7; }

.stat-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.stat-label {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

.quick-actions {
  margin-bottom: 24px;
}

.quick-actions h3 {
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.action-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.action-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
}

.action-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.action-desc {
  font-size: 13px;
  color: #999;
  margin-top: 4px;
}

.action-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
}

.recent-tasks {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.recent-tasks h3 {
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  color: #999;
}

.empty-state p {
  margin: 16px 0;
}

.question-content {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
