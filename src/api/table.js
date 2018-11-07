import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cases/',
    method: 'get',
    params
  })
}

export function savelist(params) {
  return request({
    url: '/table/save',
    method: 'post',
    params
  })
}

export function getApiList(params) {
  return request({
    url: '/interfaces/',
    method: 'get',
    params
  })
}

export function schList(search, page_size) {
  return request({
    url: '/interfaces/',
    method: 'get',
    params: {
      search,
      page_size
    }
  })
}

export function getUiTestCase(id) {
  return request({
    url: '/show/UiTestCases/',
    method: 'get',
    params: {
      id
    }
  })
}

export function getUiTestCaseSet(id) {
  return request({
    url: '/show/UiTestCasesSet/',
    method: 'get',
    params: {
      id
    }
  })
}

export function updateUiTestCases(data) {
  return request({
    url: '/update/UiTestCases/',
    method: 'post',
    data
  })
}

export function updateUiTestCasesSet(data) {
  return request({
    url: '/update/UiTestCasesSet/',
    method: 'post',
    data
  })
}

export function runUiCases(data) {
  return request({
    url: '/run/UiTestCases/',
    method: 'post',
    data
  })
}
