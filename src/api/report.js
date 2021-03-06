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

export function getUiCaseRepById(id) {
  return request({
    url: '/ui-case-results/' + id + '/',
    method: 'get'
  })
}

export function getReports() {
  return request({
    url: '/reports/',
    method: 'get'
  })
}

export function getReportDetail(id) {
  return request({
    url: '/reports/' + id,
    method: 'get'
  })
}
