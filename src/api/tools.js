import request from '@/utils/request'

export function saveDailyReport(data) {
  return request({
    url: '/train/',
    method: 'post',
    data
  })
}
