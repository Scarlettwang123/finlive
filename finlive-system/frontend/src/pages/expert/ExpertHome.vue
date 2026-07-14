<template>
  <div class="expert-home">
    <aside class="sidebar">
      <div class="logo">
        <span class="logo-icon">F</span>
        <span class="logo-text">Fin<span class="logo-accent">Live</span></span>
      </div>
      
      <div class="nav-menu">
        <router-link to="/expert" :class="{ active: $route.name === 'ExpertDashboard' }">
          <el-icon><DataAnalysis /></el-icon>
          <span>工作台</span>
        </router-link>
        <router-link to="/expert/tasks" :class="{ active: $route.name === 'ExpertTasks' }">
          <el-icon><Bell /></el-icon>
          <span>待处理任务</span>
          <span v-if="pendingCount > 0" class="badge">{{ pendingCount }}</span>
        </router-link>
        <router-link to="/expert/history" :class="{ active: $route.name === 'ExpertHistory' }">
          <el-icon><Histogram /></el-icon>
          <span>已完成任务</span>
        </router-link>
        <router-link to="/expert/profile" :class="{ active: $route.name === 'ExpertProfile' }">
          <el-icon><User /></el-icon>
          <span>个人资料</span>
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
import { computed, ref } from 'vue'
import { DataAnalysis, Bell, Histogram, User, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()

const pendingCount = ref(3)

const pageTitle = computed(() => {
  const titles = {
    'ExpertDashboard': '工作台',
    'ExpertTasks': '待处理任务',
    'ExpertHistory': '已完成任务',
    'ExpertProfile': '个人资料'
  }
  return titles[window.location.pathname.split('/')[2] || ''] || '工作台'
})

const handleLogout = () => {
  userStore.logout()
  window.location.href = '/'
}
</script>

<style scoped>
.expert-home {
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
  background: linear-gradient(135deg, #f59e0b, #d97706);
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
  color: #f59e0b;
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
  position: relative;
}

.nav-menu a:hover {
  background: #f5f7fa;
  color: #333;
}

.nav-menu a.active {
  background: #f59e0b;
  color: #fff;
}

.badge {
  position: absolute;
  right: 16px;
  background: #ef4444;
  color: #fff;
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 10px;
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
