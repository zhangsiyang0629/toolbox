<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { useCopy } from '@/composables/useCopy'
import AdBanner from '@/components/AdBanner.vue'

const { t } = useLocale()
const { copy } = useCopy()
usePageMeta(t('tools.uuid.title'), t('seo.uuid'))

const count = ref(5)
const uppercase = ref(false)
const useHyphens = ref(true)
const output = ref<string[]>([])

function generateUUID(): string {
  const hex = '0123456789abcdef'
  const chars = uppercase.value ? hex.toUpperCase() : hex
  const template = useHyphens.value
    ? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'
  return template.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return chars[v]
  })
}

function generate() {
  output.value = Array.from({ length: count.value }, () => generateUUID())
}

function copyAll() {
  copy(output.value.join('\n'))
}

function copyOne(val: string) {
  copy(val)
}
</script>

<template>
  <div class="max-w-3xl mx-auto px-4 py-8">
    <AdBanner position="header" />
    <h1 class="text-2xl font-bold mb-6">{{ t('tools.uuid.title') }}</h1>

    <div class="p-6 rounded-xl border mb-6" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('tools.uuid.count') }}</label>
          <input type="number" min="1" max="100" v-model.number="count"
            class="w-full px-3 py-2 rounded border"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
        </div>
        <div class="flex items-end gap-4">
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="uppercase"
              class="w-4 h-4 rounded border"
              :style="{ borderColor: 'var(--border-color)' }">
            <span class="text-sm">{{ t('tools.uuid.uppercase') }}</span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" v-model="useHyphens"
              class="w-4 h-4 rounded border"
              :style="{ borderColor: 'var(--border-color)' }">
            <span class="text-sm">{{ t('tools.uuid.hyphens') }}</span>
          </label>
        </div>
        <div class="flex items-end justify-end">
          <button @click="generate"
            class="px-6 py-2 rounded font-medium transition-colors"
            :style="{ backgroundColor: 'var(--accent)', color: '#fff' }">
            {{ t('tools.uuid.generate') }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="output.length" class="p-6 rounded-xl border" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
      <div class="flex items-center justify-between mb-3">
        <span class="font-medium">{{ t('tools.uuid.result') }}</span>
        <button @click="copyAll"
          class="px-3 py-1 text-sm rounded transition-colors"
          :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
          {{ t('tool.copy') }}
        </button>
      </div>
      <div class="space-y-2">
        <div v-for="(val, idx) in output" :key="idx"
          class="flex items-center justify-between px-4 py-2 rounded border text-sm font-mono"
          :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }">
          <span>{{ val }}</span>
          <button @click="copyOne(val)"
            class="px-2 py-0.5 text-xs rounded transition-colors"
            :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-secondary)' }">
            {{ t('tool.copy') }}
          </button>
        </div>
      </div>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
