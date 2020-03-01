import {request} from './request'

export function getGoodInfo(params){
  return request({
    url:'/detail',
    params
  })
}