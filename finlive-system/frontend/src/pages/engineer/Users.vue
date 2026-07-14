<template>
  <div class="users-page">
    <div class="search-bar">
      <el-input v-model="searchKeyword" placeholder="搜索用户名或邮箱" prefix-icon="Search" style="width: 300px" />
      <el-select v-model="filterRole" placeholder="角色筛选">
        <el-option label="全部" value="" />
        <el-option label="AI工程师" value="engineer" />
        <el-option label="金融机构" value="company" />
        <el-option label="金融专家" value="expert" />
      </el-select>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button type="success" @click="showAddDialog = true">新增用户</el-button>
    </div>
    
    <el-table :data="users" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="username" label="用户名" width="150" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="role" label="角色" width="120">
        <template #default="scope">
          <el-tag :type="getRoleType(scope.row.role)">
            {{ getRoleLabel(scope.row.role) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="company" label="公司" width="150" />
      <el-table-column prop="position" label="职位" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'active' ? 'success' : 'danger'">
            {{ scope.row.status === 'active' ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" width="180" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="editUser(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="deleteUser(scope.row)">删除</el-button>
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
    
    <el-dialog v-model="showAddDialog" :title="isEditing ? '编辑用户' : '新增用户'" width="500px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role">
            <el-option label="AI工程师" value="engineer" />
            <el-option label="金融机构" value="company" />
            <el-option label="金融专家" value="expert" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司">
          <el-input v-model="form.company" />
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.position" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userApi } from '@/api'

const users = ref([])
const searchKeyword = ref('')
const filterRole = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const showAddDialog = ref(false)
const isEditing = ref(false)
const formRef = ref(null)

const form = reactive({
  username: '',
  email: '',
  password: '',
  role: 'company',
  company: '',
  position: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

const getRoleType = (role) => {
  const types = { engineer: 'primary', company: 'success', expert: 'warning' }
  return types[role] || 'info'
}

const getRoleLabel = (role) => {
  const labels = { engineer: 'AI工程师', company: '金融机构', expert: '金融专家' }
  return labels[role] || role
}

const fetchUsers = async () => {
  try {
    const params = {
      page: currentPage.value,
      per_page: pageSize.value
    }
    if (filterRole.value) {
      params.role = filterRole.value
    }
    const res = await userApi.getUsers(params)
    users.value = res.data
    total.value = res.total
  } catch (error) {
    console.error('获取用户列表失败:', error)
  }
}

const handleSearch = () => {
  currentPage.value = 1
  fetchUsers()
}

const handleSizeChange = (size) => {
  pageSize.value = size
  fetchUsers()
}

const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchUsers()
}

const editUser = (row) => {
  isEditing.value = true
  form.username = row.username
  form.email = row.email
  form.password = ''
  form.role = row.role
  form.company = row.company || ''
  form.position = row.position || ''
  showAddDialog.value = true
}

const deleteUser = (row) => {
  ElMessageBox.confirm('确定要删除这个用户吗？', '确认删除', {
    type: 'warning'
  }).then(async () => {
    try {
      await userApi.deleteUser(row.id)
      ElMessage.success('删除成功')
      fetchUsers()
    } catch (error) {
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

const handleSubmit = async () => {
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    try {
      if (isEditing.value) {
        await userApi.updateUser(1, form)
        ElMessage.success('更新成功')
      } else {
        await userApi.register(form)
        ElMessage.success('创建成功')
      }
      showAddDialog.value = false
      fetchUsers()
    } catch (error) {
      ElMessage.error(error.response?.data?.error || '操作失败')
    }
  })
}

onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.users-page {
  padding: 24px;
}

.search-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}
</style>
