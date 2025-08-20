<template>
  <component
    :is="tag"
    :class="[
      'text-gray-900',
      variant === 'heading-lg' && 'text-2xl font-bold',
      variant === 'heading-md' && 'text-xl font-semibold',
      variant === 'heading-sm' && 'text-lg font-medium',
      variant === 'body' && 'text-base',
      variant === 'caption' && 'text-sm text-gray-600',
      color === 'white' && 'text-white',
      color === 'primary' && 'text-primary',
    ]"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  variant?: 'heading-lg' | 'heading-md' | 'heading-sm' | 'body' | 'caption'
  color?: 'default' | 'white' | 'primary'
}

withDefaults(defineProps<Props>(), {
  tag: 'p',
  variant: 'body',
  color: 'default',
})
</script>
