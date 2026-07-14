<template>
  <div class="history-page">
    <div class="search-bar">
      <el-input v-model="searchKeyword" placeholder="搜索问题内容" prefix-icon="Search" style="width: 300px" />
      <el-select v-model="filterStatus" placeholder="状态筛选">
        <el-option label="全部" value="" />
        <el-option label="待处理" value="pending" />
        <el-option label="已回答" value="answered" />
        <el-option label="处理中" value="processing" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    
    <el-table :data="questions" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
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
      <el-table-column prop="routing_decision" label="路由决策" width="150">
        <template #default="scope">
          <el-tag type="info">{{ getRoutingLabel(scope.row.routing_decision) }}</el-tag>
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
          <el-button size="small" @click="viewDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      style="margin-top: 20px; text-align: right"
    />
    
    <el-dialog v-model="dialogVisible" title="问题详情" width="600px">
      <div v-if="selectedQuestion">
        <div class="detail-item">
          <span class="label">问题内容：</span>
          <span class="value">{{ selectedQuestion.content }}</span>
        </div>
        <div class="detail-item">
          <span class="label">置信度：</span>
          <el-tag :type="getConfidenceType(selectedQuestion.confidence_score)">
            {{ selectedQuestion.confidence_score }}%
          </el-tag>
        </div>
        <div class="detail-item">
          <span class="label">路由决策：</span>
          <el-tag type="info">{{ getRoutingLabel(selectedQuestion.routing_decision) }}</el-tag>
        </div>
        <div class="detail-item">
          <span class="label">状态：</span>
          <el-tag :type="getStatusType(selectedQuestion.status)">
            {{ getStatusLabel(selectedQuestion.status) }}
          </el-tag>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { questionApi } from '@/api'

const questions = ref([])
const searchKeyword = ref('')
const filterStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const dialogVisible = ref(false)
const selectedQuestion = ref(null)

const getConfidenceType = (score) => {
  if (score >= 85) return 'success'
  if (score >= 60) return 'warning'
  return 'danger'
}

const getRoutingLabel = (decision) => {
  const labels = { ai_direct: 'AI直接回答', single_expert: '单专家验证', double_expert: '双专家验证' }
  return labels[decision] || decision
}

const getStatusType = (status) => {
  const types = { pending: 'warning', answered: 'success', processing: 'info' }
  return types[status] || 'info'
}

const getStatusLabel = (status) => {
  const labels = { pending: '待处理', answered: '已回答', processing: '处理中' }
  return labels[status] || status
}

const fetchQuestions = async () => {
  try {
    const params = {
      page: currentPage.value,
      per_page: pageSize.value
    }
    if (filterStatus.value) {
      params.status = filterStatus.value
    }
    const res = await questionApi.getQuestions(params)
    questions.value = res.data
    total.value = res.total
  } catch (error) {
    console.error('获取问题列表失败:', error)
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchQuestions()
}

const handleSizeChange = (size) => {
  pageSize.value = size
  fetchQuestions()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchQuestions()
}

const viewDetail = async (row) => {
  try {
    const res = await questionApi.getQuestion(row.id)
    selectedQuestion.value = res.question
    dialogVisible.value = true
  } catch (error) {
    ElMessage.error('获取详情失败')
  }
}

onMounted(() => {
  fetchQuestions()
})
</script>

<style scoped>
.history-page {
  padding: 24px;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.question-content {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.detail-item {
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.detail-item .label {
  font-weight: bold;
  color: #666;
  flex-shrink: 0;
}

.detail-item .value {
  color: #333;
  flex: 1;
}
</style>
