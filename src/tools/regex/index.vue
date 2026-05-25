<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { usePageMeta } from '@/composables/usePageMeta'
import { useCopy } from '@/composables/useCopy'
import AdBanner from '@/components/AdBanner.vue'

const { t } = useLocale()
const { copy } = useCopy()
usePageMeta(t('tools.regex.title'), t('seo.regex'))

const pattern = ref('')
const flags = ref('gm')
const testText = ref('')
const replaceText = ref('')
const replacement = ref('')
const activeTab = ref<'test' | 'replace'>('test')

const flagOptions = [
  { value: 'g', label: 'g (global)' },
  { value: 'i', label: 'i (ignore case)' },
  { value: 'm', label: 'm (multiline)' },
  { value: 's', label: 's (dotall)' },
  { value: 'u', label: 'u (unicode)' },
  { value: 'y', label: 'y (sticky)' },
]

const regexError = computed(() => {
  if (!pattern.value) return ''
  try {
    new RegExp(pattern.value, flags.value)
    return ''
  } catch (e: any) {
    return e.message
  }
})

const regex = computed(() => {
  if (!pattern.value) return null
  try {
    return new RegExp(pattern.value, flags.value)
  } catch { return null }
})

const matches = computed(() => {
  const r = regex.value
  if (!r || !testText.value) return []
  const results: { full: string; groups: string[]; index: number }[] = []
  let m: RegExpExecArray | null
  const g = r.global ? r : new RegExp(r.source, r.flags + 'g')
  while ((m = g.exec(testText.value)) !== null) {
    results.push({
      full: m[0],
      groups: m.slice(1),
      index: m.index,
    })
    if (m.index === g.lastIndex) g.lastIndex++
  }
  return results
})

const matchCount = computed(() => matches.value.length)

const replaceResult = computed(() => {
  const r = regex.value
  if (!r || !testText.value) return ''
  try {
    return testText.value.replace(r, replacement.value)
  } catch { return '' }
})

const highlightedText = computed(() => {
  if (!regex.value || !testText.value) return escapeHtml(testText.value)
  const r = regex.value
  const parts: string[] = []
  let last = 0
  const g = r.global ? r : new RegExp(r.source, r.flags + 'g')
  let m: RegExpExecArray | null
  while ((m = g.exec(testText.value)) !== null) {
    if (m.index > last) {
      parts.push(escapeHtml(testText.value.slice(last, m.index)))
    }
    parts.push(`<mark style="background:#fde68a;border-radius:2px;padding:0 2px">${escapeHtml(m[0])}</mark>`)
    last = g.lastIndex
    if (m.index === g.lastIndex) g.lastIndex++
  }
  if (last < testText.value.length) {
    parts.push(escapeHtml(testText.value.slice(last)))
  }
  return parts.join('')
})

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const commonPatterns = [
  { label: 'Email', pattern: '[\\w.-]+@[\\w.-]+\\.\\w+' },
  { label: 'URL', pattern: 'https?://[\\w./?-]+' },
  { label: 'Phone (CN)', pattern: '1[3-9]\\d{9}' },
  { label: 'IP v4', pattern: '\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}' },
  { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
  { label: 'Chinese', pattern: '[\\u4e00-\\u9fff]+' },
  { label: 'Hex Color', pattern: '#[0-9a-fA-F]{6}' },
  { label: 'Numbers', pattern: '\\d+' },
]

function applyPattern(p: string) {
  pattern.value = p
}

function toggleFlag(f: string) {
  const set = new Set(flags.value.split('').filter(Boolean))
  if (set.has(f)) set.delete(f)
  else set.add(f)
  flags.value = Array.from(set).sort().join('')
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <AdBanner position="header" />
    <h1 class="text-2xl font-bold mb-6">{{ t('tools.regex.title') }}</h1>

    <div class="p-6 rounded-xl border mb-6" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
      <label class="block text-sm font-medium mb-2">{{ t('tools.regex.pattern') }}</label>
      <div class="flex gap-2 mb-3">
        <div class="relative flex-1">
          <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-mono"
            :style="{ color: 'var(--text-secondary)' }">/</span>
          <input v-model="pattern"
            class="w-full pl-7 pr-3 py-2 rounded border text-sm font-mono"
            :class="{ 'border-red-400': regexError }"
            :style="{ backgroundColor: 'var(--bg-primary)', borderColor: regexError ? 'rgb(239,68,68)' : 'var(--border-color)', color: 'var(--text-primary)' }"
            placeholder=".*">
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-mono"
            :style="{ color: 'var(--text-secondary)' }">/{{ flags }}</span>
        </div>
      </div>

      <div class="flex flex-wrap gap-2 mb-3">
        <button
          v-for="f in flagOptions" :key="f.value"
          @click="toggleFlag(f.value)"
          class="px-2.5 py-1 rounded text-xs font-mono border transition-colors"
          :style="flags.includes(f.value)
            ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
            : { backgroundColor: 'var(--bg-primary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }"
        >
          {{ f.label }}
        </button>
      </div>

      <div v-if="regexError" class="text-xs mb-2" style="color:rgb(239,68,68)">{{ regexError }}</div>

      <div class="text-xs font-medium mb-2" :style="{ color: 'var(--text-secondary)' }">{{ t('tools.regex.common') }}</div>
      <div class="flex flex-wrap gap-1.5">
        <button
          v-for="cp in commonPatterns" :key="cp.label"
          @click="applyPattern(cp.pattern)"
          class="px-2 py-0.5 rounded text-xs border transition-colors"
          :style="{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }"
          :title="cp.pattern"
        >
          {{ cp.label }}
        </button>
      </div>
    </div>

    <div class="flex gap-2 mb-4">
      <button
        @click="activeTab = 'test'"
        class="px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 border"
        :style="activeTab === 'test'
          ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
          : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }"
      >
        {{ t('tools.regex.test') }}
      </button>
      <button
        @click="activeTab = 'replace'"
        class="px-4 py-1.5 rounded text-sm font-medium transition-all duration-200 border"
        :style="activeTab === 'replace'
          ? { backgroundColor: 'var(--accent)', color: '#fff', borderColor: 'var(--accent)' }
          : { backgroundColor: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderColor: 'var(--border-color)' }"
      >
        {{ t('tools.regex.replace') }}
      </button>
    </div>

    <div class="grid grid-cols-1 gap-4 mb-4">
      <div>
        <label class="block text-sm font-medium mb-1">{{ t('tools.regex.testText') }}</label>
        <textarea v-model="testText" rows="6"
          class="w-full px-4 py-3 rounded border font-mono text-sm resize-y"
          :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
          placeholder="Input test text..."></textarea>
      </div>

      <template v-if="activeTab === 'replace'">
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('tools.regex.replacement') }}</label>
          <input v-model="replacement"
            class="w-full px-3 py-2 rounded border text-sm font-mono"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"
            placeholder="$1">
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">{{ t('tools.regex.replaceResult') }}</label>
          <textarea readonly :value="replaceResult" rows="4"
            class="w-full px-4 py-3 rounded border font-mono text-sm resize-y"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }"></textarea>
          <button @click="copy(replaceResult)" class="mt-1 px-3 py-1 rounded text-xs transition-colors"
            :style="{ backgroundColor: 'var(--btn-bg)', color: 'var(--text-primary)' }">
            {{ t('tool.copy') }}
          </button>
        </div>
      </template>

      <template v-if="activeTab === 'test'">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-sm font-medium">{{ t('tools.regex.matches') }}</span>
            <span class="text-xs" :style="{ color: 'var(--text-secondary)' }">{{ matchCount }} {{ t('tools.regex.matchCount') }}</span>
          </div>
          <div class="p-4 rounded border font-mono text-sm whitespace-pre-wrap break-all leading-relaxed"
            :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)', minHeight: '6rem' }"
            v-html="highlightedText || escapeHtml(testText)"></div>
        </div>

        <div v-if="matches.length" class="p-4 rounded border" :style="{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }">
          <div class="text-sm font-medium mb-2">{{ t('tools.regex.matchDetail') }}</div>
          <div class="space-y-1 max-h-48 overflow-y-auto">
            <div v-for="(m, i) in matches" :key="i"
              class="flex gap-3 text-xs font-mono px-2 py-1 rounded"
              :style="{ backgroundColor: 'var(--bg-primary)' }">
              <span class="shrink-0" :style="{ color: 'var(--text-secondary)' }">#{{ i + 1 }}</span>
              <span class="shrink-0" :style="{ color: 'var(--accent)' }">@{{ m.index }}</span>
              <span class="break-all" :style="{ color: 'var(--text-primary)' }">{{ m.full }}</span>
              <span v-if="m.groups.length" class="break-all" :style="{ color: 'var(--text-secondary)' }">
                → {{ m.groups.join(', ') }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </div>

    <AdBanner position="footer" />
  </div>
</template>
