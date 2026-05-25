<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { useCopy } from '@/composables/useCopy'
import AdBanner from '@/components/AdBanner.vue'

const { t } = useLocale()
const { copy } = useCopy()
usePageMeta(t('tools.jsonFormatter.title'), t('seo.jsonFormatter'))

type Mode = 'format' | 'minify' | 'validate' | 'escape' | 'unescape' | 'unicodeToCn' | 'cnToUnicode'

const mode = ref<Mode>('format')
const input = ref('')
const output = ref('')
const error = ref('')
const indent = ref(2)

const modes: { id: Mode; labelKey: string }[] = [
  { id: 'format', labelKey: 'tools.jsonFormatter.format' },
  { id: 'minify', labelKey: 'tools.jsonFormatter.minify' },
  { id: 'validate', labelKey: 'tools.jsonFormatter.validate' },
  { id: 'escape', labelKey: 'tools.jsonFormatter.escape' },
  { id: 'unescape', labelKey: 'tools.jsonFormatter.unescape' },
  { id: 'unicodeToCn', labelKey: 'tools.jsonFormatter.unicodeToCn' },
  { id: 'cnToUnicode', labelKey: 'tools.jsonFormatter.cnToUnicode' },
]

const showIndent = computed(() => mode.value === 'format')
const runLabelKey = computed(() => `tools.jsonFormatter.${mode.value}`)

function run() {
  error.value = ''
  output.value = ''
  const val = input.value
  if (!val) return

  try {
    switch (mode.value) {
      case 'format': {
        const parsed = JSON.parse(val)
        output.value = JSON.stringify(parsed, null, indent.value)
        break
      }
      case 'minify': {
        const parsed = JSON.parse(val)
        output.value = JSON.stringify(parsed)
        break
      }
      case 'validate': {
        JSON.parse(val)
        error.value = ''
        output.value = t('tools.jsonFormatter.valid')
        break
      }
      case 'escape':
        output.value = JSON.stringify(val)
        break
      case 'unescape': {
        output.value = JSON.parse(val)
        break
      }
      case 'unicodeToCn':
        output.value = val.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
          String.fromCharCode(parseInt(hex, 16))
        )
        break
      case 'cnToUnicode':
        output.value = val.split('').map(c => {
          const code = c.charCodeAt(0)
          return code > 127 ? '\\u' + code.toString(16).padStart(4, '0') : c
        }).join('')
        break
    }
  } catch (e: any) {
    error.value = e.message || 'Error'
    output.value = ''
  }
}

function handleClear() {
  input.value = ''
  output.value = ''
  error.value = ''
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <AdBanner position="header" />
    <h1 class="text-2xl font-bold mb-6">{{ t('tools.jsonFormatter.title') }}</h1>

    <div class="flex flex-wrap items-center gap-2 mb-4">
      <button
        v-for="m in modes" :key="m.id"
        @click="mode = m.id"
        class="px-3 py-1.5 rounded text-sm transition-all duration-200 border"
        :style="mode === m.id
          ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
          : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }"
      >
        {{ t(m.labelKey) }}
      </button>
    </div>

    <div class="flex items-center gap-2 mb-4">
      <template v-if="showIndent">
        <span class="text-xs" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.jsonFormatter.indent') }}:</span>
        <select v-model.number="indent"
          class="px-2 py-1 rounded border text-xs"
          :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }">
          <option :value="2">2 {{ t('tools.jsonFormatter.spaces') }}</option>
          <option :value="4">4 {{ t('tools.jsonFormatter.spaces') }}</option>
        </select>
      </template>
      <div class="flex gap-2" :class="showIndent ? 'ml-auto' : 'ml-auto'">
        <button @click="run"
          class="px-4 py-1.5 rounded text-sm font-medium transition-colors"
          :style="{ backgroundColor: 'var(--accent)', color: '#fff' }">
          {{ t(runLabelKey) }}
        </button>
        <button @click="handleClear"
          class="px-4 py-1.5 rounded text-sm transition-colors"
          :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
          {{ t('tool.clear') }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium mb-1">{{ t('tools.jsonFormatter.input') }}</label>
        <textarea v-model="input"
          rows="16"
          class="w-full px-4 py-3 rounded border font-mono text-sm resize-y"
          :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
          :placeholder="mode === 'escape' ? 'text to escape' : mode === 'unescape' ? 'escaped text' : mode === 'unicodeToCn' ? 'text with \\\\uXXXX' : mode === 'cnToUnicode' ? 'text with Chinese' : '{ &quot;key&quot;: &quot;value&quot; }'"></textarea>
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">{{ t('tools.jsonFormatter.output') }}</label>
        <textarea readonly :value="output" rows="16"
          class="w-full px-4 py-3 rounded border font-mono text-sm resize-y"
          :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
          :placeholder="t('tools.jsonFormatter.placeholder')"></textarea>
      </div>
    </div>

    <div v-if="error" class="px-4 py-3 rounded border text-sm"
      :style="{ backgroundColor: 'rgba(239,68,68,0.1)', borderColor: 'rgba(239,68,68,0.3)', color: 'rgb(239,68,68)' }">
      {{ error }}
    </div>

    <div class="flex gap-2 mt-2">
      <button @click="copy(output)"
        class="px-4 py-1.5 rounded text-sm transition-colors"
        :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
        {{ t('tool.copy') }}
      </button>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
