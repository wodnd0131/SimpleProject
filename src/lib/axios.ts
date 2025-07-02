import axios from 'axios'
import toastService from '@/lib/toast'

const baseURL = import.meta.env.VITE_API_BASE_URL

let logoutFunction = null

export const setLogoutHandler = (logoutFn) => {
  logoutFunction = logoutFn
}

const axiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosInstance.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `API 요청: ${config.method?.toUpperCase() || 'GET'} ${config.url}`
      )
    }
    return config
  },
  (error) => {
    console.error('API 요청 준비 중 오류:', error)
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `API 응답 성공: ${response.config.method?.toUpperCase() || 'GET'} ${response.config.url}`,
        response.status
      )
    }
    return response
  },
  (error) => {
    const errorDetails = {
      url: error.config?.url,
      method: error.config?.method?.toUpperCase() || 'GET',
      status: error.response?.status,
      statusText: error.response?.statusText,
    }

    console.error('API 오류:', errorDetails)

    if (error.response?.status === 401) {
      console.warn('인증이 필요하거나 세션이 만료되었습니다.')
      error.isAuthError = true

      if (logoutFunction) {
        logoutFunction()
      }

    } else if (error.response?.status === 403) {
      console.warn('접근 권한이 없습니다.')
      error.isPermissionError = true

      if (logoutFunction) {
        logoutFunction()
      }
    }

    let errorMessage = '서버 연결에 실패했습니다.'

    if (error.response) {
      console.log('에러 응답 데이터:', error.response.data)

      if (error.response.status === 401) {
        errorMessage = '로그인이 필요하거나 세션이 만료되었습니다.'
      } else if (error.response.status === 403) {
        errorMessage = '이 작업을 수행할 권한이 없습니다.'
      } else if (error.response.status === 404) {
        errorMessage = '요청한 리소스를 찾을 수 없습니다.'
      } else if (error.response.status >= 500) {
        errorMessage = '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.'
      } else if (error.response.data) {
        errorMessage =
          error.response.data.detail ||
          error.response.data.data?.message ||
          '에러가 발생했습니다.'
      }
    } else if (error.message && error.message !== 'Network Error') {
      errorMessage = error.message
    }

    toastService.show(errorMessage, 'danger')

    return Promise.reject(new Error(errorMessage))
  }
)

export default axiosInstance
