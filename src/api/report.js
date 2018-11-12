import request from '@/utils/request'

export function getUiRepById(id) {
  return request({
    url: '/ui-set-results/' + id + '/',
    method: 'get'
  })
}

export function getUiRep() {
  return request({
    url: '/ui-set-results/',
    method: 'get'
  })
}
