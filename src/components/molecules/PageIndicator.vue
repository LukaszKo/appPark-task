<template>
  <div class="flex items-center justify-center space-x-8">
    <button
      v-for="(_, index) in total"
      :key="index"
      :class="[
        'w-6 h-6 rounded-full transition-colors cursor-pointer hover:bg-primary hover:scale-110 shadow-md shadow-gray-300',
        index === current ? 'bg-primary' : 'bg-transparent',
      ]"
      @click="$emit('pageChanged', index)"
    ></button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  current: number
  total: number
}

defineProps<Props>()
defineEmits<{
  pageChanged: [page: number]
}>()
</script>
