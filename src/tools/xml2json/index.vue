<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdBanner from '@/components/AdBanner.vue'
import CodeEditor from '@/components/CodeEditor.vue'
import ToolButtonBar from '@/components/ToolButtonBar.vue'
import HistoryPanel from '@/components/HistoryPanel.vue'
import { useHistoryStore } from '@/stores/history'
import { useCopy } from '@/composables/useCopy'
import { usePageMeta } from '@/composables/usePageMeta'
import { xml2json } from './converter'

usePageMeta('XML转JSON', '在线XML转JSON工具，快速将XML数据转换为JSON格式')

const input = ref('<root>\n  <item id="1">Hello</item>\n</root>')
const output = ref('')
const showHistory = ref(false)
const historyStore = useHistoryStore()
const { copy } = useCopy()

function convert() {
  const res = xml2json(input.value)
  if (res.error) {
    output.value = '错误: ' + res.error
  } else {
    output.value = res.data || ''
    historyStore.add('xml2json', input.value, output.value)
  }
}

function copyOutput() { copy(output.value) }
function handleClear() { input.value = ''; output.value = '' }
function handlePaste() { setTimeout(convert, 10) }

onMounted(convert)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <AdBanner position="header" />
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-xl font-bold">XML 转 JSON</h1>
      <button @click="showHistory = !showHistory" class="text-sm px-3 py-1.5 rounded transition-colors" :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">历史</button>
    </div>
    <ToolButtonBar @convert="convert" @copy="copyOutput" @clear="handleClear" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" :class="showHistory ? 'lg:grid-cols-3' : ''">
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">XML</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="input" lang="xml" @paste="handlePaste" />
        </div>
      </div>
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">JSON</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="output" lang="json" :readonly="true" />
        </div>
      </div>
      <HistoryPanel v-if="showHistory" tool="xml2json" @select="(r: any) => { input = r.input; output = r.output }" />
    </div>
    <AdBanner position="footer" />
  </div>
</template>
