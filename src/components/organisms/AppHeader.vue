<template>
  <div class="relative text-white p-4 pb-8 h-52 bg-gradient-to-b from-tertiary to-secondary">
    <div class="flex justify-between items-center text-sm font-medium mb-4 text-black">
      <span>9:41</span>
      <div class="flex items-center space-x-1">
        <Wifi class="w-4 h-4" />
        <BatteryFull class="w-4 h-4" />
      </div>
    </div>

    <div class="flex items-center">
      <button @click="$emit('back')" class="mr-4">
        <CircleArrowLeft class="w-6 h-6 text-black" />
      </button>

      <BaseText tag="h1" variant="heading-lg" class="text-primary poppins-bold">
        {{ title }}
      </BaseText>
    </div>

    <div class="absolute bottom-0 right-0">
      <img src="@/assets/logo.png" alt="Header Pattern" class="w-48 h-48 object-contain" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Wifi, BatteryFull, CircleArrowLeft } from 'lucide-vue-next'
import BaseText from '@/components/atoms/BaseText.vue'

interface Props {
  title: string
}

defineProps<Props>()
defineEmits<{
  back: []
}>()
</script>
