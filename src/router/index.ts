import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const routes = [
  { path: '/', name: 'home', component: Home, meta: { title: '在线工具箱 - 开发者转换工具集' } },
  { path: '/tools/json2go', name: 'json2go', component: () => import('@/tools/json2go/index.vue'), meta: { title: 'JSON转Go Struct - 在线工具' } },
  { path: '/tools/xml2json', name: 'xml2json', component: () => import('@/tools/xml2json/index.vue'), meta: { title: 'XML转JSON - 在线工具' } },
  { path: '/tools/yaml2go', name: 'yaml2go', component: () => import('@/tools/yaml2go/index.vue'), meta: { title: 'YAML转Go Struct - 在线工具' } },
  { path: '/tools/sql2gorm', name: 'sql2gorm', component: () => import('@/tools/sql2gorm/index.vue'), meta: { title: 'SQL转GORM Model - 在线工具' } },
  { path: '/tools/sql2ent', name: 'sql2ent', component: () => import('@/tools/sql2ent/index.vue'), meta: { title: 'SQL转entgo Schema - 在线工具' } },
  { path: '/tools/sql2es', name: 'sql2es', component: () => import('@/tools/sql2es/index.vue'), meta: { title: 'SQL转ES Mapping - 在线工具' } },
  { path: '/tools/sql2gozero', name: 'sql2gozero', component: () => import('@/tools/sql2gozero/index.vue'), meta: { title: 'SQL转go-zero Model - 在线工具' } },
  { path: '/tools/sql2mongodb', name: 'sql2mongodb', component: () => import('@/tools/sql2mongodb/index.vue'), meta: { title: 'SQL转MongoDB Schema - 在线工具' } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
