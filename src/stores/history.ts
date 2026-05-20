import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const MAX_HISTORY = 50

export const useHistoryStore = defineStore('history', () => {
  const records = ref<Record<string, { input: string; output: string; time: string }[]>>({})

  const saved = localStorage.getItem('toolbox_history')
  if (saved) {
    try { records.value = JSON.parse(saved) } catch {}
  }

  watch(records, (val) => {
    localStorage.setItem('toolbox_history', JSON.stringify(val))
  }, { deep: true })

  function add(tool: string, input: string, output: string) {
    if (!records.value[tool]) records.value[tool] = []
    records.value[tool].unshift({ input, output, time: new Date().toLocaleString() })
    if (records.value[tool].length > MAX_HISTORY) records.value[tool].length = MAX_HISTORY
  }

  function clear(tool: string) {
    records.value[tool] = []
  }

  function get(tool: string) {
    return records.value[tool] || []
  }

  return { records, add, clear, get }
})
