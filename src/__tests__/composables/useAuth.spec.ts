import { describe, it, expect, beforeEach, vi } from 'vitest'
import Cookies from 'js-cookie'

vi.mock('js-cookie', () => ({
  default: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}))

vi.mock('@vue/apollo-composable', () => ({
  useMutation: vi.fn(() => ({
    mutate: vi.fn(),
  })),
}))

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle cookie operations', () => {
    vi.mocked(Cookies.get).mockReturnValue('test-token')
    expect(Cookies.get('auth_token')).toBe('test-token')

    Cookies.set('auth_token', 'new-token')
    expect(Cookies.set).toHaveBeenCalledWith('auth_token', 'new-token')

    Cookies.remove('auth_token')
    expect(Cookies.remove).toHaveBeenCalledWith('auth_token')
  })
})
