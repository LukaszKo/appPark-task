<template>
  <button
    :class="[
      'px-6 py-3 rounded-lg font-medium transition-colors',
      variant === 'primary'
        ? 'bg-primary text-white'
        : 'bg-white border border-primary text-primary',
      'hover:bg-primary/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
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
