<template>
  <button
    :class="[
      'px-6 py-3 rounded-lg font-medium transition-colors',
      variant === 'primary' ? 'bg-blue-900 text-white' : 'bg-gray-200 text-gray-700',
      'hover:bg-blue-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary'
}

defineProps<Props>()
</script>
