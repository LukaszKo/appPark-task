<template>
  <div class="bg-white border-t border-gray-200 px-4 py-2">
    <div class="flex justify-around items-center">
      <NavigationItem
        v-for="item in navigationItems"
        :key="item.id"
        :icon="item.icon"
        :is-active="item.isActive"
        @click="$emit('navigate', item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavigationItem from '@/components/molecules/NavigationItem.vue'

interface NavigationItemType {
  id: string
  icon: 'location' | 'ticket' | 'car' | 'credit-card' | 'menu'
  isActive?: boolean
}

interface Props {
  navigationItems: NavigationItemType[]
}

defineProps<Props>()
defineEmits<{
  navigate: [id: string]
}>()
</script>
