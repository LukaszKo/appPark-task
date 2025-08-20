<template>
  <div class="min-h-screen bg-gray-50 flex flex-col max-w-screen-sm mx-auto">
    <AppHeader title="Otwórz bramę" @back="handleBack" />
    <div class="flex-1 bg-white">
      <GateControl
        :gate-data="currentGateData"
        :current-page="currentPage - 1"
        :total-pages="totalPages"
        @option-selected="handleOptionSelected"
      >
      </GateControl>
      <div class="mt-8">
        <PageIndicator
          :current="currentPage - 1"
          :total="totalPages"
          @page-changed="handlePageChanged"
        />
      </div>
    </div>
    <BottomNavigation :navigation-items="navigationItems" @navigate="handleNavigation" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'
import { useGateData } from '@/composables/useGateData'
import AppHeader from '@/components/organisms/AppHeader.vue'
import GateControl from '@/components/organisms/GateControl.vue'
import BottomNavigation from '@/components/organisms/BottomNavigation.vue'
import PageIndicator from '@/components/molecules/PageIndicator.vue'

const router = useRouter()
const { logout } = useAuth()
const { currentGateData, currentPage, totalPages, selectOption, goToPage } = useGateData(4)

const navigationItems = ref([
  { id: 'location', icon: 'location' as const, isActive: false },
  { id: 'ticket', icon: 'ticket' as const, isActive: false },
  { id: 'car', icon: 'car' as const, isActive: false },
  { id: 'card', icon: 'credit-card' as const, isActive: false },
  { id: 'menu', icon: 'menu' as const, isActive: true },
])

const handleBack = () => {
  logout()
  router.push('/login')
}

const handleNavigation = (itemId: string) => {
  navigationItems.value = navigationItems.value.map((item) => ({
    ...item,
    isActive: item.id === itemId,
  }))

  if (itemId === 'menu') {
    logout()
    router.push('/login')
  }
}

const handleOptionSelected = (optionId: string) => {
  selectOption(optionId)
}

const handlePageChanged = (pageIndex: number) => {
  goToPage(pageIndex + 1)
}
</script>
