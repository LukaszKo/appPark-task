import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PageIndicator from '@/components/molecules/PageIndicator.vue'

describe('PageIndicator', () => {
  it('renders correct number of indicators', () => {
    const wrapper = mount(PageIndicator, {
      props: {
        current: 0,
        total: 5,
      },
    })

    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(5)
  })

  it('emits pageChanged event when indicator is clicked', async () => {
    const wrapper = mount(PageIndicator, {
      props: {
        current: 0,
        total: 5,
      },
    })

    const buttons = wrapper.findAll('button')
    await buttons[3].trigger('click')

    expect(wrapper.emitted('pageChanged')).toHaveLength(1)
    expect(wrapper.emitted('pageChanged')?.[0]).toEqual([3])
  })
})
