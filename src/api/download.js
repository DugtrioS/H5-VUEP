import request from '@/utils/request'

export function downLoad(params) {
  return request({
    url: '/download/package/',
    method: 'get',
    params
  })
}
