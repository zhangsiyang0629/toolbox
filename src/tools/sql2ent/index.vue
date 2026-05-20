<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdBanner from '@/components/AdBanner.vue'
import CodeEditor from '@/components/CodeEditor.vue'
import ToolButtonBar from '@/components/ToolButtonBar.vue'
import HistoryPanel from '@/components/HistoryPanel.vue'
import { useHistoryStore } from '@/stores/history'
import { useCopy } from '@/composables/useCopy'
import { usePageMeta } from '@/composables/usePageMeta'
import { convert } from './converter'

usePageMeta('SQL转entgo Schema', '在线SQL转entgo Schema工具，CREATE TABLE语句生成entgo Schema字段定义')

const input = ref('CREATE TABLE users (\n  id BIGINT AUTO_INCREMENT PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);')
const output = ref('')
const showHistory = ref(false)
const historyStore = useHistoryStore()
const { copy } = useCopy()

function doConvert() {
  const res = convert(input.value)
  if (typeof res === 'object' && 'error' in res) {
    output.value = '错误: ' + (res as { error: string }).error
  } else {
    output.value = res as string
    historyStore.add('sql2ent', input.value, output.value)
  }
}
function copyOutput() { copy(output.value) }
function handleClear() { input.value = ''; output.value = '' }
function handlePaste() { setTimeout(doConvert, 10) }

onMounted(doConvert)
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-4">
    <AdBanner position="header" />
    <div class="flex items-center justify-between mb-2">
      <h1 class="text-xl font-bold">SQL 转 entgo Schema</h1>
      <button @click="showHistory = !showHistory" class="text-sm px-3 py-1.5 rounded transition-colors" :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">历史</button>
    </div>
    <ToolButtonBar @convert="doConvert" @copy="copyOutput" @clear="handleClear" />
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4" :class="showHistory ? 'lg:grid-cols-3' : ''">
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">SQL</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="input" lang="sql" @paste="handlePaste" />
        </div>
      </div>
      <div class="flex flex-col">
        <label class="text-sm font-medium mb-1" :style="{ color: 'var(--text-secondary)' }">entgo Schema</label>
        <div class="flex-1 min-h-[400px]">
          <CodeEditor v-model="output" lang="go" :readonly="true" />
        </div>
      </div>
      <HistoryPanel v-if="showHistory" tool="sql2ent" @select="(r: any) => { input = r.input; output = r.output }" />
    </div>
    <AdBanner position="footer" />
  </div>
</template>
