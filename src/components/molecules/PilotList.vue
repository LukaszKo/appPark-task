<template>
  <div
    class="inline-flex flex-col bg-card border-2 rounded-2xl border-l-0 rounded-l-none overflow-hidden shadow-sm"
  >
    <div class="flex flex-col">
      <div
        v-for="(item, index) in items"
        :key="item.id"
        :class="[
          'px-6 py-3 font-medium text-center transition-colors duration-200',
          item.highlighted
            ? 'bg-tertiary text-primary'
            : 'bg-list-item text-foreground hover:bg-tertiary/50',
          index < items.length - 1 ? 'border-b' : '',
          index === items.length - 1 ? 'rounded-br-xl' : '',
        ]"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Item {
  id: string | number
  label: string
  highlighted?: boolean
}

defineProps<{
  items: Item[]
}>()
</script>
