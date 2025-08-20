<template>
  <button
    :class="[
      'flex flex-col items-center justify-center p-4 transition-colors hover:text-primary',
      isActive ? 'text-primary' : 'text-gray-400',
    ]"
    @click="$emit('click')"
  >
    <component :is="iconComponent" :class="sizeClass" />
    <span v-if="label" class="text-xs mt-1">{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { MapPin, Ticket, Car, CreditCard, SquareMenu } from 'lucide-vue-next'

interface Props {
  icon: 'location' | 'ticket' | 'car' | 'credit-card' | 'menu'
  label?: string
  isActive?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const iconComponent = computed(() => {
  const iconMap = {
    location: MapPin,
    ticket: Ticket,
    car: Car,
    'credit-card': CreditCard,
    menu: SquareMenu,
  }
  return iconMap[props.icon]
})

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4'
    case 'lg':
      return 'w-8 h-8'
    default:
      return 'w-6 h-6'
  }
})

defineEmits<{
  click: []
}>()
</script>
