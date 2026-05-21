<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
const { t } = useLocale()

usePageMeta(t('home.title'), t('seo.home'))

const tools = [
  { nameKey: 'home.json2go.name', descKey: 'home.json2go.desc', path: '/tools/json2go', icon: '{ }' },
  { nameKey: 'home.xml2json.name', descKey: 'home.xml2json.desc', path: '/tools/xml2json', icon: '</>' },
  { nameKey: 'home.yaml2go.name', descKey: 'home.yaml2go.desc', path: '/tools/yaml2go', icon: 'YML' },
  { nameKey: 'home.sql2gorm.name', descKey: 'home.sql2gorm.desc', path: '/tools/sql2gorm', icon: 'GORM' },
  { nameKey: 'home.sql2ent.name', descKey: 'home.sql2ent.desc', path: '/tools/sql2ent', icon: 'ent' },
  { nameKey: 'home.sql2es.name', descKey: 'home.sql2es.desc', path: '/tools/sql2es', icon: 'ES' },
  { nameKey: 'home.sql2gozero.name', descKey: 'home.sql2gozero.desc', path: '/tools/sql2gozero', icon: 'go-z' },
  { nameKey: 'home.sql2mongodb.name', descKey: 'home.sql2mongodb.desc', path: '/tools/sql2mongodb', icon: 'MDB' },
]
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">{{ t('home.title') }}</h1>
      <p class="text-lg" :style="{ color: 'var(--text-secondary)' }">{{ t('home.desc') }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link
        v-for="tItem in tools" :key="tItem.path"
        :to="tItem.path"
        class="tool-card p-5 rounded-xl border transition-all duration-200"
        :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }"
      >
        <div class="text-2xl font-bold mb-2" :style="{ color: 'var(--accent)' }">{{ tItem.icon }}</div>
        <h3 class="font-semibold mb-1">{{ t(tItem.nameKey) }}</h3>
        <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ t(tItem.descKey) }}</p>
      </router-link>
    </div>
  </div>
</template>
