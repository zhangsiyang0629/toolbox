<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'
import { useRouter } from 'vue-router'

const { isDark, toggle } = useDarkMode()
const router = useRouter()

const tools = [
  { name: 'JSON转GO', path: '/tools/json2go' },
  { name: 'XML转JSON', path: '/tools/xml2json' },
  { name: 'YAML转GO', path: '/tools/yaml2go' },
  { name: 'SQL转GORM', path: '/tools/sql2gorm' },
  { name: 'SQL转entgo', path: '/tools/sql2ent' },
  { name: 'SQL转ES', path: '/tools/sql2es' },
  { name: 'SQL转go-zero', path: '/tools/sql2gozero' },
  { name: 'SQL转MongoDB', path: '/tools/sql2mongodb' },
]
</script>

<template>
  <header class="border-b sticky top-0 z-50" :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold flex items-center gap-2" :style="{ color: 'var(--accent)' }">
        <span class="text-2xl">&#x1F9F0;</span>
        <span>ToolBox</span>
      </router-link>

      <nav class="hidden md:flex items-center gap-1">
        <router-link
          v-for="t in tools" :key="t.path"
          :to="t.path"
          class="px-3 py-1.5 rounded text-sm transition-colors"
          :class="$route.path === t.path ? 'font-medium' : 'hover:opacity-80'"
          :style="$route.path === t.path ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' } : { color: 'var(--text-secondary)' }"
        >
          {{ t.name }}
        </router-link>
      </nav>

      <div class="flex items-center gap-3">
        <button
          @click="toggle"
          class="p-2 rounded transition-colors"
          :style="{ backgroundColor: 'var(--btn-bg)' }"
          :title="isDark ? '切换亮色模式' : '切换暗色模式'"
        >
          <span v-if="isDark">&#x2600;&#xFE0F;</span>
          <span v-else>&#x1F319;</span>
        </button>
      </div>
    </div>
  </header>
</template>
