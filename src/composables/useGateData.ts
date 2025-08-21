import { ref, computed } from 'vue'
import { GATES } from '@/utils/constants'
import type { GateOption, GateData } from '@/types'

function generateGateOptions(
  page: number,
  itemsPerPage: number,
  selectedPilotIndex: number,
): GateOption[] {
  const options: GateOption[] = []
  const startIndex = (page - 1) * itemsPerPage

  for (let i = 0; i < itemsPerPage; i++) {
    const index = startIndex + i

    const locationIndex = index % GATES.length
    const typeIndex = index % GATES.length

    options.push({
      id: `gate-${index + 1}`,
      name: `${GATES[typeIndex].type} ${GATES[locationIndex].location}`,
      isSelected: selectedPilotIndex === i,
    })
  }

  return options
}

export function useGateData(itemsPerPage = 4) {
  const currentPage = ref(1)
  const pilotItems = ref([
    { id: '1', label: 'A', highlighted: true },
    { id: '2', label: 'B' },
    { id: '3', label: 'C' },
    { id: '4', label: 'D' },
  ])
  const selectedPilotIndex = ref<number>(0)

  const totalPages = computed(() => Math.ceil(GATES.length / itemsPerPage))
  const currentGateData = computed<GateData>(() => {
    const options = generateGateOptions(currentPage.value, itemsPerPage, selectedPilotIndex.value)

    return {
      title: 'Długa nazwa pilota',
      subtitle: 'Wybierz bramę, by otworzyć',
      options,
      pilotItems: pilotItemsTransformed.value,
    }
  })
  const hasPreviousPage = computed(() => currentPage.value > 1)
  const pilotItemsTransformed = computed(() =>
    pilotItems.value.map((item, index) => ({
      ...item,
      highlighted: index === selectedPilotIndex.value,
    })),
  )

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function selectOption(optionId: string) {
    currentGateData.value.options.forEach((option, index) => {
      option.isSelected = option.id === optionId
      if (option.isSelected) {
        selectedPilotIndex.value = index
      }
    })
  }

  return {
    currentGateData,
    currentPage,
    totalPages,
    hasPreviousPage,
    goToPage,
    selectOption,
  }
}
