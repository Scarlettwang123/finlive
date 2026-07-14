<template>
  <div class="engineer-home">
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">F</span>
        <span class="logo-text">Fin<span class="logo-accent">Live</span></span>
      </div>
      
      <div class="nav-menu">
        <router-link to="/engineer" :class="{ active: $route.name === 'EngineerDashboard' }">
          <el-icon><DataAnalysis /></el-icon>
          <span>数据概览</span>
        </router-link>
        <router-link to="/engineer/questions" :class="{ active: $route.name === 'EngineerQuestions' }">
          <el-icon><ChatSquare /></el-icon>
          <span>问题管理</span>
        </router-link>
        <router-link to="/engineer/users" :class="{ active: $route.name === 'EngineerUsers' }">
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </router-link>
        <router-link to="/engineer/settings" :class="{ active: $route.name === 'EngineerSettings' }">
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </router-link>
      </div>
      
      <div class="logout" @click="handleLogout">
        <el-icon><SwitchButton /></el-icon>
        <span>退出登录</span>
      </div>
    </aside>
    
    <main class="main-content">
      <header class="header">
        <div class="header-left">
          <h1>{{ pageTitle }}</h1>
        </div>
        <div class="header-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="36">{{ userStore.user?.username?.charAt(0) }}</el-avatar>
              <span>{{ userStore.user?.username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>
      
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { DataAnalysis, ChatSquare, User, Setting, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const pageTitle = computed(() => {
  const titles = {
    'EngineerDashboard': '数据概览',
    'EngineerQuestions': '问题管理',
    'EngineerUsers': '用户管理',
    'EngineerSettings': '系统设置'
  }
  return titles[window.location.pathname.split('/')[2] || ''] || '数据概览'
})

const handleLogout = () => {
  userStore.logout()
  window.location.href = '/'
}
</script>

<style scoped>
.engineer-home {
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
}

.sidebar {
  width: 240px;
  background: #fff;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.logo-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.logo-accent {
  color: #667eea;
}

.nav-menu {
  flex: 1;
  padding: 0 10px;
}

.nav-menu a {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #666;
  text-decoration: none;
  border-radius: 8px;
  margin-bottom: 4px;
  transition: all 0.2s;
}

.nav-menu a:hover {
  background: #f5f7fa;
  color: #333;
}

.nav-menu a.active {
  background: #667eea;
  color: #fff;
}

.logout {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: #999;
  margin: 0 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.logout:hover {
  background: #fef2f2;
  color: #ef4444;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.header-left h1 {
  font-size: 18px;
  color: #333;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}
</style>
