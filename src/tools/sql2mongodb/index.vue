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
import { convert } from './converter'

const { t } = useLocale()
usePageMeta(t('tools.sql2mongodb.title'), t('seo.sql2mongodb'))

const input = ref('CREATE TABLE users (\n  id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL,\n  email VARCHAR(255) NOT NULL,\n  age INT\n);')
const output = ref('')
const showHistory = ref(false)
const historyStore = useHistoryStore()
const { copy } = useCopy()

function doConvert() {
  const res = convert(input.value)
  if (typeof res === 'object' && 'error' in res) {
    output.value = t('tool.error') + ': ' + (res as { error: string }).error
  } else {
    output.value = res as string
    historyStore.add('sql2mongodb', input.value, output.value)
  }
}

onMounted(doConvert)
function copyOutput() { copy(output.value) }
function handleClear() { input.value = ''; output.value = '' }
function handlePaste() { setTimeout(doConvert, 10) }
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <AdBanner position="header" />
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-xl font-bold">{{ t('tools.sql2mongodb.title') }}</h1>
      <button @click="showHistory = !showHistory" class="text-sm px-3 py-1.5 rounded transition-colors" :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">{{ t('tool.history') }}</button>
    </div>
    <ToolButtonBar @convert="doConvert" @copy="copyOutput" @clear="handleClear" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" :class="showHistory ? 'lg:grid-cols-3' : ''">
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.sql2mongodb.input') }}</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="input" lang="sql" />
        </div>
      </div>
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.sql2mongodb.output') }}</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="output" lang="javascript" :readonly="true" />
        </div>
      </div>
      <HistoryPanel v-if="showHistory" tool="sql2mongodb" @select="(r: any) => { input = r.input; output = r.output }" />
    </div>
    <AdBanner position="footer" />
  </div>
</template>
