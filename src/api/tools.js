import request from '@/utils/request'

export function saveDailyReport(data) {
  return request({
    url: '/train/',
    method: 'post',
    data
  })
}

export function pushDingMsg(data) {
  return request({
    url: '/ding_msg/',
    method: 'post',
    data
  })
}
