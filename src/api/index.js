import http from './public'
// 自评接口
const zyd = '/zsf'
// const zyd = '/rz'
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
// 动作接口
export const action = (params) => {
  return http.fetchPost(zyd + '/selfeval/actionRecord', params)
}
// 动作接口
export const addRecord = (params) => {
  return http.fetchPost(zyd + '/selfeval/addRecord', params)
}
// 提额总数
export const query = (params) => {
  return http.fetchPost(zyd + '/promoteQuota/query.json', params)
}
const aa = '/zyd'
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
// 融资接口（还款计划）
export const repaymentPlan = (params) => {
  return http.fetchPost(aa + '/apishow/repaymentPlan.json', params)
}
// 借款记录（最近6个月)
export const timeTableList = (params) => {
  return http.fetchPost(aa + '/common/date/sixMonth.json', params)
}

