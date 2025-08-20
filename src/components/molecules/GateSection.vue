<template>
  <div class="flex items-center space-x-4">
    <div class="relative">
      <div
        class="w-20 h-72 border-2 border-blue-900 rounded-tl-none border-l-0 rounded-tr-4xl rounded-br-4xl relative bg-white"
      >
        <div class="absolute top-6 right-6 w-4 h-4 border-2 border-blue-900 rounded-full"></div>
        <div
          class="w-16 h-48 border-2 border-blue-900 rounded-tl-none border-l-0 rounded-tr-4xl rounded-br-4xl mt-16 grid"
        >
          <div class="border-b-2 border-blue-900 flex justify-center items-center">
            <BaseText variant="heading-lg" tag="span" class="font-normal">A</BaseText>
          </div>
          <div class="border-b-2 border-blue-900 flex justify-center items-center">
            <BaseText variant="heading-lg" tag="span" class="font-normal">B</BaseText>
          </div>
          <div class="border-b-2 border-blue-900 flex justify-center items-center">
            <BaseText variant="heading-lg" tag="span" class="font-normal">C</BaseText>
          </div>
          <div class="bg-tertiary rounded-br-4xl flex justify-center items-center">
            <BaseText variant="heading-lg" tag="span" class="font-normal">D</BaseText>
          </div>
        </div>
      </div>
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

      <BaseText variant="caption" class="mt-4">
        {{ subtitle }}
      </BaseText>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GateOption } from '@/types'
import BaseButton from '@/components/atoms/BaseButton.vue'
import BaseText from '@/components/atoms/BaseText.vue'

interface Props {
  title: string
  subtitle: string
  options: GateOption[]
}

defineProps<Props>()
defineEmits<{
  optionSelected: [optionId: string]
}>()
</script>
