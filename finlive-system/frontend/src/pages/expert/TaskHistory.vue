<template>
  <div class="history-page">
    <div class="search-bar">
      <el-input v-model="searchKeyword" placeholder="搜索问题内容" prefix-icon="Search" style="width: 300px" />
      <el-select v-model="filterResult" placeholder="审核结果筛选">
        <el-option label="全部" value="" />
        <el-option label="采纳" value="approve" />
        <el-option label="修订" value="revise" />
        <el-option label="驳回" value="reject" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
    </div>
    
    <el-table :data="tasks" border style="width: 100%">
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
      <el-table-column prop="created_at" label="处理时间" width="180" />
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { questionApi } from '@/api'

const tasks = ref([])
const searchKeyword = ref('')
const filterResult = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

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

const fetchTasks = async () => {
  try {
    const params = {
      page: currentPage.value,
      per_page: pageSize.value,
      status: 'answered'
    }
    const res = await questionApi.getQuestions(params)
    tasks.value = res.data
    total.value = res.total
  } catch (error) {
    console.error('获取任务列表失败:', error)
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchTasks()
}

const handleSizeChange = (size) => {
  pageSize.value = size
  fetchTasks()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchTasks()
}

const viewDetail = (row) => {
  console.log(row)
}

onMounted(() => {
  fetchTasks()
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
</style>
