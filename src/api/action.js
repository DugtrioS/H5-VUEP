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
    url: '/actions/' + id,
    method: 'get'
  })
}

export function getApiListByKey(value) {
  return request({
    url: '/api/?search=' + value,
    method: 'get'
  })
}

export function saveAction(id, value) {
  return request({
    url: '/actions/' + id,
    method: 'post',
    data: value
  })
}

export function prepare_runAction(id, prepare) {
  return request({
    url: '/run/actions/' + id + '/',
    method: 'post',
    data: {
      'prepare': prepare
    }
  })
}
