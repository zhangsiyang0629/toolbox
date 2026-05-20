<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  modelValue: string
  lang?: string
  placeholder?: string
  readonly?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value)
}

function setValue(val: string) {
  emit('update:modelValue', val)
}

function getValue(): string {
  return props.modelValue
}

defineExpose({ setValue, getValue })
</script>

<template>
  <textarea
    :value="modelValue"
    @input="onInput"
    :placeholder="placeholder"
    :readonly="readonly"
    class="code-textarea w-full h-full p-4 font-mono text-sm leading-relaxed border rounded resize-none focus:outline-none focus:ring-2 transition-colors"
    :style="{
      backgroundColor: 'var(--bg-editor)',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-color)',
      '--tw-ring-color': 'var(--accent)',
    }"
    spellcheck="false"
  ></textarea>
</template>

<style scoped>
.code-textarea {
  min-height: 300px;
  tab-size: 2;
}
.code-textarea::placeholder {
  color: var(--text-secondary);
  opacity: 0.6;
}
</style>
