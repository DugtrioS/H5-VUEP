import request from '@/utils/request'

export function getApiAction(query) {
  return request({
    url: '/actions/list',
    method: 'get',
    params: query
  })
}

export function getApiList1() {
  return request({
    url: '/api/',
    method: 'get'
  })
}
