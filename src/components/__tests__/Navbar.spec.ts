import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Navbar from '@/components/common/Navbar.vue'

// Stub RouterLink to render slot content so text assertions work
const global = { stubs: { RouterLink: { template: '<a><slot /></a>' } } }

describe('Navbar', () => {
  it('renders brand and links', () => {
    const wrapper = mount(Navbar, { global })
    const text = wrapper.text()
    expect(wrapper.get('img').attributes('alt')).toBe('CityPulse')
    expect(text).toContain('Home')
    expect(text).toContain('Compare')
    expect(text).toContain('Favorites')
  })
})
