<script setup lang="ts">
import { useHistoryStore } from '@/stores/history'
import { useLocale } from '@/composables/useLocale'

const props = defineProps<{ tool: string }>()
const emit = defineEmits<{ select: [record: { input: string; output: string }] }>()
const historyStore = useHistoryStore()
const records = historyStore.get(props.tool)
const { t } = useLocale()

function select(r: { input: string; output: string }) { emit('select', r) }
function clearAll() { historyStore.clear(props.tool) }
</script>

<template>
  <div class="border rounded p-3" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-sm font-semibold">{{ t('tool.historyTitle') }} ({{ records.length }})</h3>
      <button v-if="records.length" @click="clearAll" class="text-xs px-2 py-1 rounded" :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">{{ t('tool.clearHistory') }}</button>
    </div>
    <div class="space-y-2 max-h-[500px] overflow-y-auto">
      <div
        v-for="(r, i) in records" :key="i"
        @click="select(r)"
        class="p-2 rounded text-xs cursor-pointer border transition-colors"
        :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }"
      >
        <div class="truncate font-mono mb-1">{{ r.input.slice(0, 80) }}{{ r.input.length > 80 ? '...' : '' }}</div>
        <div :style="{ color: 'var(--text-secondary)' }">{{ r.time }}</div>
      </div>
      <div v-if="!records.length" class="text-xs text-center py-4" :style="{ color: 'var(--text-secondary)' }">{{ t('tool.noHistory') }}</div>
    </div>
  </div>
</template>
