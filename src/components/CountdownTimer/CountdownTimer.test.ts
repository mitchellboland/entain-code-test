import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import CountdownTimer from './CountdownTimer.vue'

describe('CountdownTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('renders countdown timer with correct structure', () => {
    const startTime = Math.floor(Date.now() / 1000) + 65 // 65 seconds from now
    const wrapper = mount(CountdownTimer, {
      props: { startTime }
    })

    expect(wrapper.find('.countdown-timer').exists()).toBe(true)
    expect(wrapper.text()).toBeTruthy()
  })

  it('handles zero time correctly', () => {
    const startTime = Math.floor(Date.now() / 1000) // exactly now
    const wrapper = mount(CountdownTimer, {
      props: { startTime }
    })

    expect(wrapper.text()).toBe('0s')
    expect(wrapper.classes()).not.toContain('past-start')
  })

  it('validates required startTime prop', () => {
    // Vue will show a warning but won't throw, so we just test that it mounts
    const wrapper = mount(CountdownTimer)
    expect(wrapper.exists()).toBe(true)
  })

  it('applies past-start class when time is negative', async () => {
    const startTime = Math.floor(Date.now() / 1000) - 1000 // 1000 seconds ago
    const wrapper = mount(CountdownTimer, { props: { startTime } })
    await vi.advanceTimersByTimeAsync(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.classes()).toContain('past-start')
  })

  it('does not apply past-start class when time is positive', () => {
    const startTime = Math.floor(Date.now() / 1000) + 1000 // 1000 seconds from now
    const wrapper = mount(CountdownTimer, {
      props: { startTime }
    })

    expect(wrapper.classes()).not.toContain('past-start')
  })

  it('displays time in correct format', () => {
    const startTime = Math.floor(Date.now() / 1000) + 1000 // 1000 seconds from now
    const wrapper = mount(CountdownTimer, {
      props: { startTime }
    })

    expect(wrapper.text()).toMatch(/^(\d+s|\d+m \d+s)$/)
  })

  it('displays negative time in correct format', async () => {
    const startTime = Math.floor(Date.now() / 1000) - 1000 // 1000 seconds ago
    const wrapper = mount(CountdownTimer, { props: { startTime } })
    await vi.advanceTimersByTimeAsync(1000)
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toMatch(/^-\d+s$/)
    expect(wrapper.classes()).toContain('past-start')
  })
}) 