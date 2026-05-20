<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps<{ modelValue: string; lang?: string; placeholder?: string; readonly?: boolean }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
import { useDarkMode } from '@/composables/useDarkMode'
const { isDark } = useDarkMode()

import hljs from 'highlight.js/lib/core'
import json from 'highlight.js/lib/languages/json'
import xml from 'highlight.js/lib/languages/xml'
import go from 'highlight.js/lib/languages/go'
import yaml from 'highlight.js/lib/languages/yaml'
import sql from 'highlight.js/lib/languages/sql'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('json', json)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('go', go)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('javascript', javascript)

const highlighted = computed(() => {
  if (!props.modelValue) return ''
  try {
    const lang = props.lang === 'js' ? 'javascript' : (props.lang || 'json')
    const result = hljs.highlight(props.modelValue, { language: lang, ignoreIllegals: true })
    return result.value
  } catch {
    return escapeHtml(props.modelValue)
  }
})

const editorClass = computed(() => ({
  'hljs': true,
  'readonly': props.readonly,
}))

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

function setValue(val: string) { emit('update:modelValue', val) }
function getValue(): string { return props.modelValue }
defineExpose({ setValue, getValue })

function escapeHtml(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
</script>

<template>
  <div class="hl-wrap" :class="{ dark: isDark }">
    <pre v-if="readonly" class="hl-pre readonly"><code class="hljs" v-html="highlighted"></code></pre>
    <template v-else>
      <pre class="hl-pre" aria-hidden="true"><code class="hljs" v-html="highlighted"></code></pre>
      <textarea
        class="hl-ta"
        :value="modelValue"
        @input="onInput"
        :placeholder="placeholder"
        spellcheck="false"
      ></textarea>
    </template>
  </div>
</template>

<style scoped>
.hl-wrap {
  position: relative;
  height: 100%;
  min-height: 300px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}
.hl-pre {
  margin: 0;
  padding: 16px;
  height: 100%;
  overflow: auto;
  pointer-events: none;
  box-sizing: border-box;
}
.hl-pre.readonly {
  pointer-events: auto;
}
.hl-pre code {
  padding: 0 !important;
  background: transparent !important;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
}
.hl-ta {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  font-family: 'SF Mono', 'Fira Code', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  border: none;
  resize: none;
  outline: none;
  overflow: auto;
  color: transparent;
  background: transparent;
  caret-color: var(--text-primary);
  tab-size: 2;
  white-space: pre;
  box-sizing: border-box;
}
.hl-ta::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}
.hl-ta:focus {
  box-shadow: inset 0 0 0 2px var(--accent);
}

/* Dark mode overrides for highlight.js github theme */
.hl-wrap.dark :deep(.hljs) {
  background: #1e293b !important;
  color: #e2e8f0 !important;
}
.hl-wrap.dark :deep(.hljs-keyword),
.hl-wrap.dark :deep(.hljs-selector-tag),
.hl-wrap.dark :deep(.hljs-literal),
.hl-wrap.dark :deep(.hljs-section),
.hl-wrap.dark :deep(.hljs-link) { color: #c792ea !important; }
.hl-wrap.dark :deep(.hljs-string),
.hl-wrap.dark :deep(.hljs-title),
.hl-wrap.dark :deep(.hljs-name),
.hl-wrap.dark :deep(.hljs-type),
.hl-wrap.dark :deep(.hljs-attribute),
.hl-wrap.dark :deep(.hljs-symbol),
.hl-wrap.dark :deep(.hljs-number),
.hl-wrap.dark :deep(.hljs-regexp),
.hl-wrap.dark :deep(.hljs-selector-id),
.hl-wrap.dark :deep(.hljs-selector-class) { color: #c3e88d !important; }
.hl-wrap.dark :deep(.hljs-meta),
.hl-wrap.dark :deep(.hljs-built_in),
.hl-wrap.dark :deep(.hljs-builtin-name),
.hl-wrap.dark :deep(.hljs-attr) { color: #82aaff !important; }
.hl-wrap.dark :deep(.hljs-comment),
.hl-wrap.dark :deep(.hljs-quote),
.hl-wrap.dark :deep(.hljs-deletion) { color: #546e7a !important; }
</style>
