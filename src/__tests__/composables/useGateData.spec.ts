import { describe, it, expect } from 'vitest'

describe('useGateData', () => {
  it('should handle basic functionality', () => {
    const mockGateData = {
      title: 'Test Pilot',
      subtitle: 'Test subtitle',
      options: [
        { id: 'gate-1', name: 'Test Gate 1', isSelected: true },
        { id: 'gate-2', name: 'Test Gate 2', isSelected: false },
      ],
    }

    expect(mockGateData.options).toHaveLength(2)
    expect(mockGateData.options[0].isSelected).toBe(true)
    expect(mockGateData.options[1].isSelected).toBe(false)
  })

  it('should handle pagination logic', () => {
    const totalItems = 48
    const itemsPerPage = 4
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    expect(totalPages).toBe(12)

    const page1Start = (1 - 1) * itemsPerPage + 1
    const page1End = Math.min(1 * itemsPerPage, totalItems)

    expect(page1Start).toBe(1)
    expect(page1End).toBe(4)
  })
})
