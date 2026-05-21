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
import { yaml2go } from './converter'

const { t } = useLocale()
usePageMeta(t('tools.yaml2go.title'), t('seo.yaml2go'))

const input = ref('name: example\nversion: 1\nsettings:\n  debug: true')
const output = ref('')
const showHistory = ref(false)
const historyStore = useHistoryStore()
const { copy } = useCopy()

function convert() {
  const res = yaml2go(input.value)
  if (res.error) {
    output.value = t('tool.error') + ': ' + res.error
  } else {
    output.value = res.go || ''
    historyStore.add('yaml2go', input.value, output.value)
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
      <h1 class="text-xl font-bold">{{ t('tools.yaml2go.title') }}</h1>
      <button @click="showHistory = !showHistory" class="text-sm px-3 py-1.5 rounded transition-colors" :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">{{ t('tool.history') }}</button>
    </div>
    <ToolButtonBar @convert="convert" @copy="copyOutput" @clear="handleClear" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" :class="showHistory ? 'lg:grid-cols-3' : ''">
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.yaml2go.input') }}</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="input" lang="yaml" />
        </div>
      </div>
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.yaml2go.output') }}</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="output" lang="go" :readonly="true" />
        </div>
      </div>
      <HistoryPanel v-if="showHistory" tool="yaml2go" @select="(r: any) => { input = r.input; output = r.output }" />
    </div>
    <AdBanner position="footer" />
  </div>
</template>
