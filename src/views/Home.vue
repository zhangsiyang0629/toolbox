<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
const { t } = useLocale()
const route = useRoute()

usePageMeta(t('home.title'), t('seo.home'))

type CategoryId = 'all' | 'statement' | 'keys' | 'timestamp' | 'json' | 'qrcode' | 'regex'

const categories: { id: CategoryId; labelKey: string }[] = [
  { id: 'all', labelKey: 'home.all' },
  { id: 'statement', labelKey: 'home.category.statement' },
  { id: 'keys', labelKey: 'home.category.keys' },
  { id: 'timestamp', labelKey: 'home.category.timestamp' },
  { id: 'json', labelKey: 'home.category.json' },
  { id: 'qrcode', labelKey: 'home.category.qrcode' },
  { id: 'regex', labelKey: 'home.category.regex' },
]

const tools = [
  { nameKey: 'home.json2go.name', descKey: 'home.json2go.desc', path: '/tools/json2go', icon: '{ }', category: 'statement' as CategoryId },
  { nameKey: 'home.xml2json.name', descKey: 'home.xml2json.desc', path: '/tools/xml2json', icon: '</>', category: 'statement' as CategoryId },
  { nameKey: 'home.yaml2go.name', descKey: 'home.yaml2go.desc', path: '/tools/yaml2go', icon: 'YML', category: 'statement' as CategoryId },
  { nameKey: 'home.sql2gorm.name', descKey: 'home.sql2gorm.desc', path: '/tools/sql2gorm', icon: 'GORM', category: 'statement' as CategoryId },
  { nameKey: 'home.sql2ent.name', descKey: 'home.sql2ent.desc', path: '/tools/sql2ent', icon: 'ent', category: 'statement' as CategoryId },
  { nameKey: 'home.sql2es.name', descKey: 'home.sql2es.desc', path: '/tools/sql2es', icon: 'ES', category: 'statement' as CategoryId },
  { nameKey: 'home.sql2gozero.name', descKey: 'home.sql2gozero.desc', path: '/tools/sql2gozero', icon: 'go-z', category: 'statement' as CategoryId },
  { nameKey: 'home.sql2mongodb.name', descKey: 'home.sql2mongodb.desc', path: '/tools/sql2mongodb', icon: 'MDB', category: 'statement' as CategoryId },
  { nameKey: 'home.uuid.name', descKey: 'home.uuid.desc', path: '/tools/uuid-generator', icon: 'UUID', category: 'keys' as CategoryId },
  { nameKey: 'home.password.name', descKey: 'home.password.desc', path: '/tools/password-generator', icon: '🔑', category: 'keys' as CategoryId },
  { nameKey: 'home.timestamp.name', descKey: 'home.timestamp.desc', path: '/tools/timestamp', icon: '⏱', category: 'timestamp' as CategoryId },
  { nameKey: 'home.jsonFormatter.name', descKey: 'home.jsonFormatter.desc', path: '/tools/json-formatter', icon: '{ }', category: 'json' as CategoryId },
  { nameKey: 'home.qrcode.name', descKey: 'home.qrcode.desc', path: '/tools/qrcode', icon: 'QR', category: 'qrcode' as CategoryId },
  { nameKey: 'home.regex.name', descKey: 'home.regex.desc', path: '/tools/regex', icon: '.*', category: 'regex' as CategoryId },
]

const activeCategory = ref<CategoryId>(
  (route.query.category as CategoryId) || 'all'
)

const filteredTools = computed(() =>
  activeCategory.value === 'all'
    ? tools
    : tools.filter(t => t.category === activeCategory.value)
)

function setCategory(id: CategoryId) {
  activeCategory.value = id
}

</script>

<template>
  <div class="max-w-5xl mx-auto px-4 py-12">
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold mb-3">{{ t('home.title') }}</h1>
      <p class="text-lg" :style="{ color: 'var(--text-secondary)' }">{{ t('home.desc') }}</p>
    </div>

    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <button
        v-for="cat in categories" :key="cat.id"
        @click="setCategory(cat.id)"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
        :style="activeCategory === cat.id
          ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
          : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }"
      >
        {{ t(cat.labelKey) }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <router-link
        v-for="tItem in filteredTools" :key="tItem.path"
        :to="tItem.path"
        class="tool-card p-5 rounded-xl border transition-all duration-200"
        :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }"
      >
        <div class="text-2xl font-bold mb-2" :style="{ color: 'var(--accent)' }">{{ tItem.icon }}</div>
        <h3 class="font-semibold mb-1">{{ t(tItem.nameKey) }}</h3>
        <p class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ t(tItem.descKey) }}</p>
      </router-link>
    </div>

    <div class="mt-20">
      <h2 class="text-2xl font-bold text-center mb-2">技术文章</h2>
      <p class="text-sm text-center mb-8" :style="{ color: 'var(--text-secondary)' }">深入学习技术原理，更好地使用工具箱</p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
        <router-link to="/knowledge/json"
          class="p-5 rounded-xl border transition-all duration-200 hover:translate-y-[-2px]"
          :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
          <div class="text-2xl mb-2">{ }</div>
          <h3 class="font-semibold mb-1">JSON 教程</h3>
          <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">JSON 语法、数据类型、parse/stringify、实际应用，从入门到精通</p>
        </router-link>

        <router-link to="/knowledge/regex"
          class="p-5 rounded-xl border transition-all duration-200 hover:translate-y-[-2px]"
          :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
          <div class="text-2xl mb-2">.*</div>
          <h3 class="font-semibold mb-1">正则表达式教程</h3>
          <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">元字符详解、分组捕获、预查匹配、常用表达式速查</p>
        </router-link>

        <router-link to="/knowledge/qrcode"
          class="p-5 rounded-xl border transition-all duration-200 hover:translate-y-[-2px]"
          :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
          <div class="text-2xl mb-2">QR</div>
          <h3 class="font-semibold mb-1">二维码原理</h3>
          <p class="text-xs" :style="{ color: 'var(--text-secondary)' }">QR 码结构、纠错机制、编码模式、掩码与版本详解</p>
        </router-link>
      </div>
    </div>
  </div>
</template>
