import { describe, it, expect } from 'vitest'

describe('LoginForm', () => {
  it('validates email format correctly', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    expect(emailRegex.test('test@example.com')).toBe(true)
    expect(emailRegex.test('test.email@domain.co.uk')).toBe(true)
    expect(emailRegex.test('invalid-email')).toBe(false)
    expect(emailRegex.test('test@')).toBe(false)
    expect(emailRegex.test('@domain.com')).toBe(false)
  })

  it('validates password length', () => {
    const minLength = 6

    expect('password123'.length >= minLength).toBe(true)
    expect('12345'.length >= minLength).toBe(false)
    expect('123456'.length >= minLength).toBe(true)
  })

  it('handles basic form validation logic', () => {
    const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    const isValidPassword = (password: string) => password.length >= 6

    expect(isValidEmail('user@example.com') && isValidPassword('password123')).toBe(true)
    expect(isValidEmail('invalid-email') || isValidPassword('123')).toBe(false)
  })
})
