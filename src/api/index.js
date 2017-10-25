import http from './public'
// 自评接口
const zyd = '/zsf'
export const self = (params) => {
  return http.fetchPost(zyd + '/selfeval/evaluate.json', params)
}
// 自评记录查询
export const selfQuery = (params) => {
  return http.fetchPost(zyd + '/selfeval/query.json', params)
}
// 重评接口
export const doubleSelf = (params) => {
  return http.fetchPost(zyd + '/selfeval/reEvaluate.json', params)
}
const aa = '/tzyd'
// 融资接口（当前在借总金额）
export const currentBorrowAmount = (params) => {
  return http.fetchPost(aa + '/apishow/currentBorrowAmount.json', params)
}
// 融资接口（借款记录）
export const borrowRecord = (params) => {
  return http.fetchPost(aa + '/apishow/borrowRecord.json', params)
}
// 融资接口（最近还款计划）
export const recentRepaymentPlan = (params) => {
  return http.fetchPost(aa + '/apishow/recentRepaymentPlan.json', params)
}
