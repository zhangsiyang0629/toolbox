<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdBanner from '@/components/AdBanner.vue'
import CodeEditor from '@/components/CodeEditor.vue'
import ToolButtonBar from '@/components/ToolButtonBar.vue'
import HistoryPanel from '@/components/HistoryPanel.vue'
import { useHistoryStore } from '@/stores/history'
import { useCopy } from '@/composables/useCopy'
import { usePageMeta } from '@/composables/usePageMeta'
import { useLocale } from '@/composables/useLocale'
import { json2go } from './converter'

const { t } = useLocale()
usePageMeta(t('tools.json2go.title'), t('seo.json2go'))

const input = ref('{\n  "name": "example",\n  "age": 25\n}')
const output = ref('')
const tagName = ref('json')
const flatten = ref(true)
const showHistory = ref(false)
const historyStore = useHistoryStore()
const { copy } = useCopy()

function convert() {
  const res = json2go(input.value, tagName.value, flatten.value)
  if (res.error) {
    output.value = t('tool.error') + ': ' + res.error
  } else {
    output.value = res.go
    historyStore.add('json2go', input.value, output.value)
  }
}

onMounted(convert)

function copyOutput() { copy(output.value) }
function handleClear() { input.value = ''; output.value = '' }
function handlePaste() { setTimeout(convert, 10) }
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <AdBanner position="header" />

    <div class="flex items-center justify-between mb-2">
      <h1 class="text-xl font-bold">{{ t('tools.json2go.title') }}</h1>
      <div class="flex items-center gap-3">
        <label class="text-sm flex items-center gap-1" :style="{ color: 'var(--text-secondary)' }">
          {{ t('tool.mode') }}：
          <select v-model="flatten" class="px-2 py-1 rounded text-sm border" :style="{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }">
            <option :value="true">{{ t('tool.expand') }}</option>
            <option :value="false">{{ t('tool.nest') }}</option>
          </select>
        </label>
        <label class="text-sm flex items-center gap-1" :style="{ color: 'var(--text-secondary)' }">
          {{ t('tool.tag') }}：
          <input v-model="tagName" class="px-2 py-1 rounded text-sm border w-16" :style="{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-color)' }" />
        </label>
        <button @click="showHistory = !showHistory" class="text-sm px-3 py-1.5 rounded transition-colors" :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
          {{ t('tool.history') }}
        </button>
      </div>
    </div>

    <ToolButtonBar @convert="convert" @copy="copyOutput" @clear="handleClear" />

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" :class="showHistory ? 'lg:grid-cols-3' : ''">
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.json2go.input') }}</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="input" lang="json" />
        </div>
      </div>
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.json2go.output') }}</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="output" lang="go" :readonly="true" />
        </div>
      </div>
      <HistoryPanel v-if="showHistory" tool="json2go" @select="(r: any) => { input = r.input; output = r.output }" />
    </div>

    <AdBanner position="footer" />
  </div>
</template>
