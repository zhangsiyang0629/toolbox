<script setup lang="ts">
const emit = defineEmits<{ convert: []; copy: []; clear: [] }>()
</script>

<template>
  <div style="display: flex; justify-content: center; gap: 12px; padding: 12px 0;">
    <button
      @click="emit('convert')"
      class="px-6 py-2 rounded-lg text-white font-medium"
      style="background-color: #3b82f6; border: none; cursor: pointer;"
    >
      转换
    </button>
    <button
      @click="emit('copy')"
      class="px-4 py-2 rounded-lg"
      style="background: #e5e7eb; color: #1a1a2e; border: none; cursor: pointer;"
    >
      复制
    </button>
    <button
      @click="emit('clear')"
      class="px-4 py-2 rounded-lg"
      style="background: #e5e7eb; color: #1a1a2e; border: none; cursor: pointer;"
    >
      清空
    </button>
  </div>
</template>
