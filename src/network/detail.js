import {request} from './request'

// 获取商品详情数据
export function getGoodInfo(params){
  return request({
    url:'/detail',
    params
  })
}

// 获取商品推荐信息
export function getRecommendInfo(params){
  return request({
    url:'/recommend',
    params
  })
}