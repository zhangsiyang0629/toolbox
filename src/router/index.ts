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
  { path: '/tools/uuid-generator', name: 'uuid-generator', component: () => import('@/tools/uuid-generator/index.vue'), meta: { title: 'UUID生成器 - 在线工具' } },
  { path: '/tools/password-generator', name: 'password-generator', component: () => import('@/tools/password-generator/index.vue'), meta: { title: '随机密码生成器 - 在线工具' } },
  { path: '/tools/timestamp', name: 'timestamp', component: () => import('@/tools/timestamp/index.vue'), meta: { title: '在线时间戳转换 - 在线工具' } },
  { path: '/tools/json-formatter', name: 'json-formatter', component: () => import('@/tools/json-formatter/index.vue'), meta: { title: 'JSON格式化验证 - 在线工具' } },
  { path: '/tools/qrcode', name: 'qrcode', component: () => import('@/tools/qrcode/index.vue'), meta: { title: '二维码工具 - 在线工具' } },
  { path: '/tools/regex', name: 'regex', component: () => import('@/tools/regex/index.vue'), meta: { title: '正则表达式测试 - 在线工具' } },
  { path: '/knowledge/json', name: 'json-tutorial', component: () => import('@/knowledge/JsonTutorial.vue'), meta: { title: 'JSON 教程 - 从入门到精通' } },
  { path: '/knowledge/regex', name: 'regex-tutorial', component: () => import('@/knowledge/RegexTutorial.vue'), meta: { title: '正则表达式教程 - 从入门到精通' } },
  { path: '/knowledge/qrcode', name: 'qrcode-article', component: () => import('@/knowledge/QRCodeArticle.vue'), meta: { title: '二维码原理 - QR码技术详解' } },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
