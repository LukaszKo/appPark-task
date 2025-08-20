import { ref, computed } from 'vue'
import { GATE_LOCATIONS, GATE_TYPES } from '@/utils/constants'
import type { GateOption, GateData } from '@/types'

function generateGateOptions(page: number, itemsPerPage: number): GateOption[] {
  const options: GateOption[] = []
  const startIndex = (page - 1) * itemsPerPage

  for (let i = 0; i < itemsPerPage; i++) {
    const index = startIndex + i
    const locationIndex = index % GATE_LOCATIONS.length
    const typeIndex = index % GATE_TYPES.length
    const buildingNumber = Math.floor(index / 3) + 1

    options.push({
      id: `gate-${index + 1}`,
      name: `${GATE_TYPES[typeIndex]} ${GATE_LOCATIONS[locationIndex]} ${buildingNumber}`,
      isSelected: i === 0,
    })
  }

  return options
}

export function useGateData(itemsPerPage = 4) {
  const currentPage = ref(1)
  const totalItems = ref(16)

  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

  const currentGateData = computed<GateData>(() => {
    const options = generateGateOptions(currentPage.value, itemsPerPage)

    return {
      title: 'Długa nazwa pilota',
      subtitle: 'Wybierz bramę, by otworzyć',
      options,
    }
  })

  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPreviousPage = computed(() => currentPage.value > 1)

  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  function previousPage() {
    if (hasPreviousPage.value) {
      currentPage.value--
    }
  }

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function selectOption(optionId: string) {
    currentGateData.value.options.forEach((option) => {
      option.isSelected = option.id === optionId
    })
  }

  return {
    currentGateData,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    nextPage,
    previousPage,
    goToPage,
    selectOption,
    totalItems,
  }
}
