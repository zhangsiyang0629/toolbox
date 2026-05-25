<script setup lang="ts">
import { ref } from 'vue'
import { useDarkMode } from '@/composables/useDarkMode'
import { useLocale } from '@/composables/useLocale'
import { useRouter } from 'vue-router'

const { isDark, toggle: toggleDark } = useDarkMode()
const { t, locale, toggle: toggleLang } = useLocale()
const router = useRouter()

const categories = [
  { id: 'statement', labelKey: 'header.category.statement' },
  { id: 'keys', labelKey: 'header.category.keys' },
  { id: 'timestamp', labelKey: 'header.category.timestamp' },
  { id: 'json', labelKey: 'header.category.json' },
  { id: 'qrcode', labelKey: 'header.category.qrcode' },
  { id: 'regex', labelKey: 'header.category.regex' },
]

const openMenu = ref<string | null>(null)

function toggleMenu(id: string) {
  openMenu.value = openMenu.value === id ? null : id
}

function goToCategory(id: string) {
  openMenu.value = null
  router.push({ path: '/', query: { category: id } })
}

const dropdownTools: Record<string, { nameKey: string; path: string }[]> = {
  statement: [
    { nameKey: 'header.json2go', path: '/tools/json2go' },
    { nameKey: 'header.xml2json', path: '/tools/xml2json' },
    { nameKey: 'header.yaml2go', path: '/tools/yaml2go' },
    { nameKey: 'header.sql2gorm', path: '/tools/sql2gorm' },
    { nameKey: 'header.sql2ent', path: '/tools/sql2ent' },
    { nameKey: 'header.sql2es', path: '/tools/sql2es' },
    { nameKey: 'header.sql2gozero', path: '/tools/sql2gozero' },
    { nameKey: 'header.sql2mongodb', path: '/tools/sql2mongodb' },
  ],
  keys: [
    { nameKey: 'home.uuid.name', path: '/tools/uuid-generator' },
    { nameKey: 'home.password.name', path: '/tools/password-generator' },
  ],
  timestamp: [
    { nameKey: 'home.timestamp.name', path: '/tools/timestamp' },
  ],
  json: [
    { nameKey: 'home.jsonFormatter.name', path: '/tools/json-formatter' },
  ],
  qrcode: [
    { nameKey: 'home.qrcode.name', path: '/tools/qrcode' },
  ],
  regex: [
    { nameKey: 'home.regex.name', path: '/tools/regex' },
  ],
}

document.addEventListener('click', () => {
  openMenu.value = null
})
</script>

<template>
  <header class="border-b sticky top-0 z-50" :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }">
    <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
      <router-link to="/" class="text-xl font-bold flex items-center gap-2" :style="{ color: 'var(--accent)' }">
        <span class="text-2xl">&#x1F9F0;</span>
        <span>{{ t('header.siteName') }}</span>
      </router-link>

      <nav class="hidden md:flex items-center gap-1">
        <div
          v-for="cat in categories" :key="cat.id"
          class="relative"
          @click.stop="toggleMenu(cat.id)"
        >
          <button
            class="px-3 py-1.5 rounded text-sm transition-colors flex items-center gap-1"
            :style="{ color: 'var(--text-secondary)' }"
          >
            {{ t(cat.labelKey) }}
            <span class="text-xs">&#x25BE;</span>
          </button>
          <div
            v-if="openMenu === cat.id"
            class="absolute top-full left-0 mt-1 w-48 rounded-xl border shadow-lg py-2 z-50"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }"
            @click.stop
          >
            <router-link
              v-for="tool in dropdownTools[cat.id]"
              :key="tool.path"
              :to="tool.path"
              class="block px-4 py-2 text-sm transition-colors"
              :style="{ color: 'var(--text-secondary)' }"
              @click="openMenu = null"
            >
              {{ t(tool.nameKey) }}
            </router-link>
            <hr class="my-1" :style="{ borderColor: 'var(--border-color)' }">
            <button
              @click="goToCategory(cat.id)"
              class="block w-full text-left px-4 py-2 text-xs transition-colors"
              :style="{ color: 'var(--accent)' }"
            >
              {{ t('home.all') }} {{ t(cat.labelKey) }} &rarr;
            </button>
          </div>
        </div>
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
