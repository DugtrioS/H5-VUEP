import request from '@/utils/request'

export function getApiAction(query) {
  return request({
    url: '/actions/',
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

export function getActionById(id) {
  return request({
    url: '/actions/' + id + '/',
    method: 'get'
  })
}
