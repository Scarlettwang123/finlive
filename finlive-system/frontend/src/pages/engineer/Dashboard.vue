<template>
  <div class="dashboard">
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon blue">
          <el-icon><ChatSquare /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.totalQuestions }}</div>
          <div class="stat-label">今日问题总数</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon green">
          <el-icon><CircleCheck /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.answeredQuestions }}</div>
          <div class="stat-label">已回答问题</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon orange">
          <el-icon><User /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.totalUsers }}</div>
          <div class="stat-label">系统用户数</div>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon purple">
          <el-icon><TrendCharts /></el-icon>
        </div>
        <div class="stat-content">
          <div class="stat-value">{{ stats.avgConfidence }}%</div>
          <div class="stat-label">平均置信度</div>
        </div>
      </div>
    </div>
    
    <div class="charts-row">
      <div class="chart-card">
        <h3>问题分布</h3>
        <div class="chart-content">
          <div class="pie-chart">
            <div class="pie-slice low" style="--percent: 30"></div>
            <div class="pie-slice medium" style="--percent: 50"></div>
            <div class="pie-slice high" style="--percent: 20"></div>
            <div class="pie-center">
              <div class="pie-value">100%</div>
              <div class="pie-label">问题分布</div>
            </div>
          </div>
          <div class="pie-legend">
            <div><span class="dot low"></span> 低置信度 30%</div>
            <div><span class="dot medium"></span> 中置信度 50%</div>
            <div><span class="dot high"></span> 高置信度 20%</div>
          </div>
        </div>
      </div>
      
      <div class="chart-card">
        <h3>系统状态</h3>
        <div class="status-grid">
          <div class="status-item">
            <span class="status-dot online"></span>
            <div>
              <div class="status-title">路由引擎</div>
              <div class="status-desc">运行正常</div>
            </div>
          </div>
          <div class="status-item">
            <span class="status-dot online"></span>
            <div>
              <div class="status-title">AI模型服务</div>
              <div class="status-desc">运行正常</div>
            </div>
          </div>
          <div class="status-item">
            <span class="status-dot online"></span>
            <div>
              <div class="status-title">数据库</div>
              <div class="status-desc">运行正常</div>
            </div>
          </div>
          <div class="status-item">
            <span class="status-dot warning"></span>
            <div>
              <div class="status-title">合规过滤</div>
              <div class="status-desc">待优化</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="recent-questions">
      <h3>最近问题</h3>
      <el-table :data="recentQuestions" border>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="content" label="问题内容" width="300" />
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
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ChatSquare, CircleCheck, User, TrendCharts } from '@element-plus/icons-vue'
import { questionApi, userApi } from '@/api'

const stats = ref({
  totalQuestions: 0,
  answeredQuestions: 0,
  totalUsers: 0,
  avgConfidence: 0
})

const recentQuestions = ref([])

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
    const questionsRes = await questionApi.getQuestions({ per_page: 1 })
    stats.value.totalQuestions = questionsRes.total
    
    const answeredRes = await questionApi.getQuestions({ status: 'answered', per_page: 1 })
    stats.value.answeredQuestions = answeredRes.total
    
    const usersRes = await userApi.getUsers({ per_page: 1 })
    stats.value.totalUsers = usersRes.total
    
    stats.value.avgConfidence = 78
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

const fetchRecentQuestions = async () => {
  try {
    const res = await questionApi.getQuestions({ per_page: 5 })
    recentQuestions.value = res.data
  } catch (error) {
    console.error('获取最近问题失败:', error)
  }
}

onMounted(() => {
  fetchStats()
  fetchRecentQuestions()
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

.stat-icon.blue { background: #dbeafe; color: #3b82f6; }
.stat-icon.green { background: #dcfce7; color: #22c55e; }
.stat-icon.orange { background: #fff7ed; color: #f97316; }
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

.charts-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 24px;
}

.chart-card {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chart-card h3 {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.chart-content {
  display: flex;
  align-items: center;
  gap: 30px;
}

.pie-chart {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    #ef4444 0% 30%,
    #f59e0b 30% 80%,
    #22c55e 80% 100%
  );
  position: relative;
}

.pie-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pie-value {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.pie-label {
  font-size: 10px;
  color: #999;
}

.pie-legend {
  flex: 1;
}

.pie-legend div {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  color: #666;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.low { background: #ef4444; }
.dot.medium { background: #f59e0b; }
.dot.high { background: #22c55e; }

.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 8px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-dot.online { background: #22c55e; }
.status-dot.warning { background: #f59e0b; }

.status-title {
  font-size: 14px;
  color: #333;
}

.status-desc {
  font-size: 12px;
  color: #999;
}

.recent-questions {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.recent-questions h3 {
  font-size: 16px;
  margin-bottom: 16px;
  color: #333;
}
</style>
