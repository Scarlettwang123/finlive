<template>
  <div class="settings-page">
    <div class="settings-card">
      <h2>账号信息</h2>
      
      <el-form ref="formRef" :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        
        <el-form-item label="邮箱">
          <el-input v-model="form.email" />
        </el-form-item>
        
        <el-form-item label="公司名称">
          <el-input v-model="form.company" />
        </el-form-item>
        
        <el-form-item label="职位">
          <el-input v-model="form.position" />
        </el-form-item>
        
        <el-form-item label="联系电话">
          <el-input v-model="form.phone" />
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleSave">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="settings-card">
      <h2>修改密码</h2>
      
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
  company: userStore.user?.company || '',
  position: userStore.user?.position || '',
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
.settings-page {
  padding: 24px;
  max-width: 600px;
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
</style>
