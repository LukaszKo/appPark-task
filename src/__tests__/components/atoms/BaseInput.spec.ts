import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseInput from '@/components/atoms/BaseInput.vue'

describe('BaseInput', () => {
  it('renders with default props', () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('type')).toBe('text')
    expect(input.classes()).toContain('w-full')
  })

  it('renders with custom props', () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'email',
        label: 'Email Address',
        placeholder: 'Enter your email',
      },
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')

    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('placeholder')).toBe('Enter your email')
    expect(label.text()).toBe('Email Address')
  })

  it('shows error state correctly', () => {
    const wrapper = mount(BaseInput, {
      props: {
        error: 'This field is required',
      },
    })

    const input = wrapper.find('input')
    const errorText = wrapper.find('p')

    expect(input.classes()).toContain('border-red-500')
    expect(input.classes()).toContain('bg-red-50')
    expect(errorText.text()).toBe('This field is required')
    expect(errorText.classes()).toContain('text-red-600')
  })

  it('updates model value correctly', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: 'initial value',
        'onUpdate:modelValue': (value: string) => wrapper.setProps({ modelValue: value }),
      },
    })

    const input = wrapper.find('input')
    expect(input.element.value).toBe('initial value')

    await input.setValue('new value')
    expect(wrapper.props('modelValue')).toBe('new value')
  })

  it('emits blur event', async () => {
    const wrapper = mount(BaseInput)
    const input = wrapper.find('input')

    await input.trigger('blur')
    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('generates unique input id', () => {
    const wrapper1 = mount(BaseInput, { props: { label: 'Test' } })
    const wrapper2 = mount(BaseInput, { props: { label: 'Test' } })

    const input1 = wrapper1.find('input')
    const input2 = wrapper2.find('input')

    expect(input1.attributes('id')).toBeDefined()
    expect(input2.attributes('id')).toBeDefined()
    expect(input1.attributes('id')).not.toBe(input2.attributes('id'))
  })

  it('associates label with input correctly', () => {
    const wrapper = mount(BaseInput, {
      props: { label: 'Test Label' },
    })

    const input = wrapper.find('input')
    const label = wrapper.find('label')

    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('applies correct classes for different states', () => {
    const normalWrapper = mount(BaseInput)
    const errorWrapper = mount(BaseInput, {
      props: { error: 'Error message' },
    })

    const normalInput = normalWrapper.find('input')
    const errorInput = errorWrapper.find('input')

    expect(normalInput.classes()).toContain('border-gray-300')
    expect(normalInput.classes()).toContain('bg-white')
    expect(errorInput.classes()).toContain('border-red-500')
    expect(errorInput.classes()).toContain('bg-red-50')
  })
})
