<template>
  <div class="flex items-center space-x-4">
    <div class="relative">
      <div
        class="w-20 h-72 border-2 border-blue-900 rounded-tl-none border-l-0 rounded-tr-4xl rounded-br-4xl relative bg-white"
      >
        <div class="absolute top-6 right-6 w-4 h-4 border-2 border-blue-900 rounded-full"></div>
        <PilotList class="mt-16 w-16" :items="pilotItems" />
      </div>
      <div class="w-10 h-4 border-2 rounded-br-4xl border-t-0 border-l-0 border-blue-900"></div>
    </div>

    <div class="flex-1">
      <BaseText variant="heading-md" color="primary" class="mb-4 dm-sans-bold text-2xl">
        {{ title }}
      </BaseText>

      <div class="space-y-3">
        <BaseButton
          v-for="option in options"
          :key="option.id"
          :variant="option.isSelected ? 'primary' : 'secondary'"
          class="w-full text-center lato-medium"
          @click="$emit('optionSelected', option.id)"
        >
          {{ option.name }}
        </BaseButton>
      </div>

      <BaseText variant="caption" class="mt-4 text-center">
        {{ subtitle }}
      </BaseText>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GateOption, PilotItem } from '@/types'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseText from '@/components/atoms/BaseText.vue'
import PilotList from './PilotList.vue'

interface Props {
  title: string
  subtitle: string
  options: GateOption[]
  pilotItems: PilotItem[]
}

defineProps<Props>()
defineEmits<{
  optionSelected: [optionId: string]
}>()
</script>
