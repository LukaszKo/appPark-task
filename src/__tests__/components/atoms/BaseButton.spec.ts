import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseButton from '@/components/atoms/BaseButton.vue'

describe('BaseButton', () => {
  it('renders with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    })

    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click me')
    expect(button.classes()).toContain('px-6')
    expect(button.classes()).toContain('py-3')
    expect(button.classes()).toContain('rounded-lg')
  })

  it('renders primary variant correctly', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary',
      },
      slots: {
        default: 'Primary Button',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-primary')
    expect(button.classes()).toContain('text-white')
  })

  it('renders secondary variant correctly', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'secondary',
      },
      slots: {
        default: 'Secondary Button',
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('bg-white')
    expect(button.classes()).toContain('border-primary')
    expect(button.classes()).toContain('text-primary')
  })

  it('handles click events', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click me',
      },
    })

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('applies disabled styles when disabled', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true,
      },
    })

    const button = wrapper.find('button')
    expect(button.classes()).toContain('disabled:opacity-50')
    expect(button.classes()).toContain('disabled:cursor-not-allowed')
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('renders slot content correctly', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: '<span>Custom Content</span>',
      },
    })

    expect(wrapper.html()).toContain('<span>Custom Content</span>')
  })
})
