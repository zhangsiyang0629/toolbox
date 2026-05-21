<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
defineProps<{ position?: string }>()
const { t } = useLocale()
</script>

<template>
  <div
    class="flex items-center justify-center rounded my-3 overflow-hidden"
    :style="{ backgroundColor: 'var(--bg-secondary)', minHeight: '90px', border: '1px dashed var(--border-color)' }"
  >
    <span class="text-xs" :style="{ color: 'var(--text-secondary)' }">
      {{ t('ad.placeholder') }}{{ position ? ' (' + position + ')' : '' }}
    </span>
  </div>
</template>
