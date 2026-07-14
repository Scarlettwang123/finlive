<template>
  <div class="profile-page">
    <div class="profile-card">
      <div class="profile-header">
        <el-avatar :size="100">{{ userStore.user?.username?.charAt(0) }}</el-avatar>
        <div class="profile-info">
          <h2>{{ userStore.user?.username }}</h2>
          <p class="position">{{ userStore.user?.position }}</p>
          <p class="company">{{ userStore.user?.company }}</p>
        </div>
      </div>
      
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-value">24</div>
          <div class="stat-label">本月完成</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">98%</div>
          <div class="stat-label">采纳率</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">3分钟</div>
          <div class="stat-label">平均响应</div>
        </div>
      </div>
    </div>
    
    <div class="info-card">
      <h3>基本信息</h3>
      
      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        
        <el-form-item label="专业领域">
          <el-input v-model="form.expert_fields" />
        </el-form-item>
        
        <el-form-item label="职位">
          <el-input v-model="form.position" />
        </el-form-item>
        
        <el-form-item label="公司">
          <el-input v-model="form.company" />
        </el-form-item>
        
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="info-card">
      <h3>修改密码</h3>
      
      <el-form ref="passwordFormRef" :model="passwordForm" :rules="passwordRules" label-width="120px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passwordForm.oldPassword" type="password" />
        </el-form-item>
        
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" />
        </el-form-item>
        
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleChangePassword">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const formRef = ref(null)
const passwordFormRef = ref(null)

const form = reactive({
  username: userStore.user?.username || '',
  email: userStore.user?.email || '',
  expert_fields: userStore.user?.expert_fields || '',
  position: userStore.user?.position || '',
  company: userStore.user?.company || '',
  phone: userStore.user?.phone || ''
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRules = {
  oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
  newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
  confirmPassword: [{ required: true, message: '请确认新密码', trigger: 'blur' }]
}

const handleSave = () => {
  ElMessage.success('信息已保存')
}

const handleChangePassword = async () => {
  await passwordFormRef.value.validate((valid) => {
    if (!valid) return
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      ElMessage.error('两次输入的密码不一致')
      return
    }
    ElMessage.success('密码修改成功')
    passwordForm.oldPassword = ''
    passwordForm.newPassword = ''
    passwordForm.confirmPassword = ''
  })
}
</script>

<style scoped>
.profile-page {
  padding: 24px;
  max-width: 700px;
}

.profile-card {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 24px;
  color: #fff;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
}

.profile-header h2 {
  font-size: 24px;
  margin-bottom: 8px;
}

.position {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 4px;
}

.company {
  font-size: 13px;
  opacity: 0.7;
}

.stats-row {
  display: flex;
  gap: 32px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
}

.stat-label {
  font-size: 13px;
  opacity: 0.8;
  margin-top: 4px;
}

.info-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
}

.info-card h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}
</style>
