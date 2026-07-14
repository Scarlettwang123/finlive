import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('finlive_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('finlive_token')
      localStorage.removeItem('finlive_user')
      window.location.href = '/'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: data => api.post('/auth/login', data),
  register: data => api.post('/auth/register', data),
  verifyToken: data => api.post('/auth/verify-token', data)
}

export const questionApi = {
  getQuestions: params => api.get('/questions', { params }),
  getQuestion: id => api.get(`/questions/${id}`),
  createQuestion: data => api.post('/questions', data),
  submitAnswer: (id, data) => api.post(`/questions/${id}/answer`, data),
  complianceCheck: (id, data) => api.post(`/questions/${id}/compliance`, data)
}

export const userApi = {
  getUsers: params => api.get('/users', { params }),
  getUser: id => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: id => api.delete(`/users/${id}`)
}

export default api
