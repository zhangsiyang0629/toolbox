<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { useCopy } from '@/composables/useCopy'
import AdBanner from '@/components/AdBanner.vue'

const { t } = useLocale()
const { copy } = useCopy()
usePageMeta(t('tools.timestamp.title'), t('seo.timestamp'))

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => { now.value = Date.now() }, 100)
})
onBeforeUnmount(() => clearInterval(timer))

const current = computed(() => ({
  sec: Math.floor(now.value / 1000),
  ms: now.value,
  date: new Date(now.value).toLocaleString(),
}))

const tsInput = ref('')
const tsUnit = ref<'s' | 'ms'>('s')
const dateFromTs = computed(() => {
  const num = Number(tsInput.value)
  if (!tsInput.value || isNaN(num)) return ''
  const ms = tsUnit.value === 's' ? num * 1000 : num
  const d = new Date(ms)
  if (d.toString() === 'Invalid Date') return ''
  return d.toLocaleString()
})

const dateInput = ref('')
const dateValue = computed(() => {
  if (!dateInput.value) return { sec: '', ms: '' }
  const d = new Date(dateInput.value)
  if (d.toString() === 'Invalid Date') return { sec: '', ms: '' }
  return {
    sec: String(Math.floor(d.getTime() / 1000)),
    ms: String(d.getTime()),
  }
})

function copyTs() {
  if (dateValue.value.sec) copy(`${dateValue.value.sec} (${dateValue.value.ms})`)
}

function nowTs() {
  tsInput.value = String(Math.floor(Date.now() / 1000))
  tsUnit.value = 's'
}

function nowDate() {
  dateInput.value = new Date().toISOString().slice(0, 16)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <AdBanner position="header" />
    <h1 class="text-2xl font-bold mb-6">{{ t('tools.timestamp.title') }}</h1>

    <div class="p-6 rounded-xl border mb-6 text-center"
      :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
      <div class="text-sm mb-1" :style="{ color: 'var(--text-secondary)' }">实时时间戳</div>
      <div class="text-3xl font-mono font-bold mb-2" :style="{ color: 'var(--accent)' }">{{ current.sec }}</div>
      <div class="text-xs font-mono mb-1" :style="{ color: 'var(--text-secondary)' }">{{ current.ms }} (ms)</div>
      <div class="text-sm" :style="{ color: 'var(--text-secondary)' }">{{ current.date }}</div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-6 rounded-xl border" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
        <h2 class="font-semibold mb-3">{{ t('tools.timestamp.tsToDate') }}</h2>
        <div class="flex gap-2 mb-3">
          <input v-model="tsInput" type="text" placeholder="1700000000"
            class="flex-1 px-3 py-2 rounded border font-mono"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          <select v-model="tsUnit"
            class="px-2 py-2 rounded border"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
            <option value="s">s</option>
            <option value="ms">ms</option>
          </select>
        </div>
        <div class="flex gap-2 mb-3">
          <input readonly :value="dateFromTs" type="text" placeholder="..."
            class="flex-1 px-3 py-2 rounded border font-mono"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          <button @click="copy(dateFromTs)"
            class="px-3 py-2 text-sm rounded transition-colors"
            :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
            {{ t('tool.copy') }}
          </button>
        </div>
        <button @click="nowTs"
          class="px-4 py-1.5 text-sm rounded transition-colors"
          :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
          {{ t('tools.timestamp.now') }}
        </button>
      </div>

      <div class="p-6 rounded-xl border" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
        <h2 class="font-semibold mb-3">{{ t('tools.timestamp.dateToTs') }}</h2>
        <div class="mb-3">
          <input v-model="dateInput" type="datetime-local"
            class="w-full px-3 py-2 rounded border"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="text-sm w-8">s:</span>
            <input readonly :value="dateValue.sec" type="text" placeholder="..."
              class="flex-1 px-3 py-2 rounded border font-mono text-sm"
              :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm w-8">ms:</span>
            <input readonly :value="dateValue.ms" type="text" placeholder="..."
              class="flex-1 px-3 py-2 rounded border font-mono text-sm"
              :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          </div>
        </div>
        <div class="flex gap-2 mt-3">
          <button @click="copyTs"
            class="px-4 py-1.5 text-sm rounded transition-colors"
            :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
            {{ t('tool.copy') }}
          </button>
          <button @click="nowDate"
            class="px-4 py-1.5 text-sm rounded transition-colors"
            :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
            {{ t('tools.timestamp.now') }}
          </button>
        </div>
      </div>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
