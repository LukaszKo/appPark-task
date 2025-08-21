<template>
  <div class="pr-4 py-6">
    <GateSection
      :title="gateData.title"
      :subtitle="gateData.subtitle"
      :options="gateData.options"
      :pilot-items="gateData.pilotItems"
      @option-selected="$emit('optionSelected', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { GateData } from '@/types'
import GateSection from '@/components/molecules/GateSection.vue'

defineProps<{
  gateData: GateData
}>()

defineEmits(['optionSelected'])
</script>
