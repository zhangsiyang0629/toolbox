<script setup lang="ts">
import { usePageMeta } from '@/composables/usePageMeta'

usePageMeta('在线工具箱 - 开发者转换工具集', '免费在线开发者工具集：JSON转Go Struct、XML转JSON、YAML转Go、SQL转GORM/entgo/ES/go-zero/MongoDB Model')

const tools = [
  { name: 'JSON转GO', desc: 'JSON 数据一键生成 Golang Struct，支持展开/嵌套模式', path: '/tools/json2go', icon: '{ }' },
  { name: 'XML转JSON', desc: 'XML 数据快速转换为 JSON 格式', path: '/tools/xml2json', icon: '</>' },
  { name: 'YAML转GO', desc: 'YAML 配置转换为 Golang Struct 定义', path: '/tools/yaml2go', icon: 'YML' },
  { name: 'SQL转GORM', desc: 'CREATE TABLE SQL 转换为 GORM Model 代码', path: '/tools/sql2gorm', icon: 'GORM' },
  { name: 'SQL转entgo', desc: 'SQL 表结构转换为 entgo Schema 定义', path: '/tools/sql2ent', icon: 'ent' },
  { name: 'SQL转ES', desc: 'SQL 表结构转换为 Elasticsearch Mapping', path: '/tools/sql2es', icon: 'ES' },
  { name: 'SQL转go-zero', desc: 'SQL 转换为 go-zero Model 代码', path: '/tools/sql2gozero', icon: 'go-z' },
  { name: 'SQL转MongoDB', desc: 'SQL 表结构转换为 MongoDB Schema/Collection 设计', path: '/tools/sql2mongodb', icon: 'MDB' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">在线开发者工具箱</h1>
      <p class="text-lg" :style="{ color: 'var(--text-secondary)' }">
        免费、快速、纯前端，你的数据不会离开浏览器
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link
        v-for="t in tools" :key="t.path"
        :to="t.path"
        class="tool-card p-5 rounded-xl border transition-all duration-200"
        :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }"
      >
        <div class="text-2xl font-bold mb-2" :style="{ color: 'var(--accent)' }">{{ t.icon }}</div>
        <h3 class="font-semibold mb-1">{{ t.name }}</h3>
        <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ t.desc }}</p>
      </router-link>
    </div>
  </div>
</template>
