<script setup lang="ts">
import { ref } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { useCopy } from '@/composables/useCopy'
import AdBanner from '@/components/AdBanner.vue'

const { t } = useLocale()
const { copy } = useCopy()
usePageMeta(t('tools.password.title'), t('seo.password'))

const length = ref(16)
const count = ref(3)
const useUpper = ref(true)
const useLower = ref(true)
const useDigits = ref(true)
const useSymbols = ref(false)
const output = ref<string[]>([])

const upperChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerChars = 'abcdefghijklmnopqrstuvwxyz'
const digitChars = '0123456789'
const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'

function generatePassword(): string {
  let chars = ''
  if (useUpper.value) chars += upperChars
  if (useLower.value) chars += lowerChars
  if (useDigits.value) chars += digitChars
  if (useSymbols.value) chars += symbolChars
  if (!chars) chars = lowerChars
  let pwd = ''
  for (let i = 0; i < length.value; i++) {
    pwd += chars[Math.floor(Math.random() * chars.length)]
  }
  return pwd
}

function generate() {
  output.value = Array.from({ length: count.value }, () => generatePassword())
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
    <h1 class="text-2xl font-bold mb-6">{{ t('tools.password.title') }}</h1>

    <div class="p-6 rounded-xl border mb-6" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('tools.password.length') }}: {{ length }}</label>
          <input type="range" min="4" max="64" v-model.number="length" class="w-full">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('tools.password.count') }}</label>
          <input type="number" min="1" max="50" v-model.number="count"
            class="w-full px-3 py-2 rounded border"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
        </div>
      </div>
      <div class="flex flex-wrap gap-4 mb-4">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="useUpper" class="w-4 h-4 rounded">
          <span class="text-sm">A-Z</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="useLower" class="w-4 h-4 rounded">
          <span class="text-sm">a-z</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="useDigits" class="w-4 h-4 rounded">
          <span class="text-sm">0-9</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="useSymbols" class="w-4 h-4 rounded">
          <span class="text-sm">!@#$%</span>
        </label>
      </div>
      <div class="flex justify-end">
        <button @click="generate"
          class="px-6 py-2 rounded font-medium transition-colors"
          :style="{ backgroundColor: 'var(--accent)', color: '#fff' }">
          {{ t('tools.password.generate') }}
        </button>
      </div>
    </div>

    <div v-if="output.length" class="p-6 rounded-xl border" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
      <div class="flex items-center justify-between mb-3">
        <span class="font-medium">{{ t('tools.password.result') }}</span>
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
