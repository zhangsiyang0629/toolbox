<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'
import { useLocale } from '@/composables/useLocale'
import { useRouter } from 'vue-router'

const { isDark, toggle: toggleDark } = useDarkMode()
const { t, locale, toggle: toggleLang } = useLocale()
const router = useRouter()

const tools = [
  { nameKey: 'header.json2go', path: '/tools/json2go' },
  { nameKey: 'header.xml2json', path: '/tools/xml2json' },
  { nameKey: 'header.yaml2go', path: '/tools/yaml2go' },
  { nameKey: 'header.sql2gorm', path: '/tools/sql2gorm' },
  { nameKey: 'header.sql2ent', path: '/tools/sql2ent' },
  { nameKey: 'header.sql2es', path: '/tools/sql2es' },
  { nameKey: 'header.sql2gozero', path: '/tools/sql2gozero' },
  { nameKey: 'header.sql2mongodb', path: '/tools/sql2mongodb' },
]
</script>

<template>
  <header class="border-b sticky top-0 z-50" :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold flex items-center gap-2" :style="{ color: 'var(--accent)' }">
        <span class="text-2xl">&#x1F9F0;</span>
        <span>{{ t('header.siteName') }}</span>
      </router-link>

      <nav class="hidden md:flex items-center gap-1">
        <router-link
          v-for="tItem in tools" :key="tItem.path"
          :to="tItem.path"
          class="px-3 py-1.5 rounded text-sm transition-colors"
          :style="$route.path === tItem.path ? { backgroundColor: 'var(--bg-secondary)', color: 'var(--accent)' } : { color: 'var(--text-secondary)' }"
          :class="$route.path === tItem.path ? 'font-medium' : ''"
        >
          {{ t(tItem.nameKey) }}
        </router-link>
      </nav>

      <div class="flex items-center gap-2">
        <button
          @click="toggleLang"
          class="px-2 py-1 rounded text-xs transition-colors"
          :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }"
        >
          {{ t('header.langSwitch') }}
        </button>
        <button
          @click="toggleDark"
          class="p-2 rounded transition-colors"
          :style="{ backgroundColor: 'var(--btn-bg)' }"
          :title="isDark ? t('header.lightMode') : t('header.darkMode')"
        >
          <span v-if="isDark">&#x2600;&#xFE0F;</span>
          <span v-else>&#x1F319;</span>
        </button>
      </div>
    </div>
  </header>
</template>
