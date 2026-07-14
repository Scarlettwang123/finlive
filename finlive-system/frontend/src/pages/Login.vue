<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <div class="logo">
          <span class="logo-icon">F</span>
          <span class="logo-text">Fin<span class="logo-accent">Live</span></span>
        </div>
        <h2>金融智答系统</h2>
        <p>AI + 人类专家 · 双引擎驱动</p>
      </div>
      
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" prefix-icon="User" />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" prefix-icon="Lock" />
        </el-form-item>
        
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="AI工程师" value="engineer" />
            <el-option label="金融机构" value="company" />
            <el-option label="金融专家" value="expert" />
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" style="width:100%">
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="demo-info">
        <p>演示账号：</p>
        <div class="demo-accounts">
          <div>
            <span class="label">AI工程师：</span>
            <span class="value">admin@finlive.ai / 123456</span>
          </div>
          <div>
            <span class="label">金融机构：</span>
            <span class="value">company@test.com / 123456</span>
          </div>
          <div>
            <span class="label">金融专家：</span>
            <span class="value">expert@test.com / 123456</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { authApi } from '@/api'
import { useUserStore } from '@/store/user'

const formRef = ref(null)
const loading = ref(false)
const userStore = useUserStore()

const form = reactive({
  email: '',
  password: '',
  role: ''
})

const rules = {
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  role: [{ required: true, message: '请选择角色', trigger: 'change' }]
}

const handleLogin = async () => {
  await formRef.value.validate(async (valid) => {
    if (!valid) return
    
    loading.value = true
    try {
      const response = await authApi.login({
        email: form.email,
        password: form.password
      })
      
      if (response.user.role !== form.role) {
        ElMessage.error('所选角色与账号不匹配')
        return
      }
      
      userStore.setToken(response.token)
      userStore.setUser(response.user)
      
      ElMessage.success('登录成功')
      
      if (response.user.role === 'engineer') {
        window.location.href = '/engineer'
      } else if (response.user.role === 'company') {
        window.location.href = '/company'
      } else if (response.user.role === 'expert') {
        window.location.href = '/expert'
      }
    } catch (error) {
      ElMessage.error(error.response?.data?.error || '登录失败')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 40px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}

.logo-text {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.logo-accent {
  color: #667eea;
}

.login-header h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 6px;
}

.login-header p {
  font-size: 13px;
  color: #999;
}

.demo-info {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.demo-info p {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}

.demo-accounts div {
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
}

.demo-accounts .label {
  color: #666;
}

.demo-accounts .value {
  color: #333;
  font-family: monospace;
}
</style>
