import request from '@/utils/request'

export function getEnv() {
  return request({
    url: '/envs/',
    method: 'get',
    params: {}
  })
}

export function createEnv(env, name, db_config) {
  return request({
    url: '/envs/',
    method: 'post',
    data: {
      env,
      name,
      db_config
    }
  })
}

export function getEnvById(env_id) {
  return request({
    url: '/envs/' + env_id,
    method: 'get'
  })
}
export function touchEnv(id) {
  return request({
    url: '/env-links/' + id + '/',
    method: 'get'
  })
}

export function updateEnv(env_id, env, name, db_config) {
  return request({
    url: '/envs/' + env_id + '/',
    method: 'post',
    data: {
      env,
      name,
      db_config
    }
  })
}
