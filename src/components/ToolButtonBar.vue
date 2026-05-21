<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { t } = useLocale()
</script>

<template>
  <div style="display: flex; justify-content: center; gap: 12px; padding: 12px 0;">
    <button @click="$emit('convert')" class="btn-act"> {{ t('tool.convert') }} </button>
    <button @click="$emit('copy')" class="btn-act"> {{ t('tool.copy') }} </button>
    <button @click="$emit('clear')" class="btn-act"> {{ t('tool.clear') }} </button>
  </div>
</template>

<style scoped>
.btn-act {
  padding: 8px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}
.btn-act:first-child {
  background-color: #3b82f6;
  color: white;
}
.btn-act:not(:first-child) {
  background-color: #e5e7eb;
  color: #1a1a2e;
}
.btn-act:hover {
  opacity: 0.85;
}
</style>
