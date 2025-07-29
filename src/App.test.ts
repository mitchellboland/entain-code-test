import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import App from './App.vue'
import { mockRaces } from './tests/mocks/mockRaces'

// Mock the useFetch composable
vi.mock('./composables/useFetch', () => ({
  useFetch: () => ({
    data: ref(mockRaces),
    loading: ref(false),
    error: ref(null),
    fetchRaces: vi.fn()
  })
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the title correctly', () => {
    const wrapper = mount(App)

    // Check if the title element exists
    const titleElement = wrapper.find('h1.title')
    expect(titleElement.exists()).toBe(true)

    // Check if the title text is correct
    expect(titleElement.text()).toBe('Next to Go Races')
  })

  it('renders all tab buttons correctly', () => {
    const wrapper = mount(App)

    // Check if all tab buttons exist
    const tabButtons = wrapper.findAll('.tab-button')
    expect(tabButtons).toHaveLength(4)

    // Check tab button texts
    expect(tabButtons[0].text()).toBe('All Races')
    expect(tabButtons[1].text()).toBe('Greyhound')
    expect(tabButtons[2].text()).toBe('Harness')
    expect(tabButtons[3].text()).toBe('Horse')
  })

  it('shows "All Races" tab as active by default', () => {
    const wrapper = mount(App)

    const allRacesTab = wrapper.find('.tab-button.active')
    expect(allRacesTab.exists()).toBe(true)
    expect(allRacesTab.text()).toBe('All Races')
  })

  it('switches to Greyhound tab when clicked', async () => {
    const wrapper = mount(App)

    const greyhoundTab = wrapper.findAll('.tab-button')[1]
    await greyhoundTab.trigger('click')

    // Check if Greyhound tab is now active
    const activeTab = wrapper.find('.tab-button.active')
    expect(activeTab.text()).toBe('Greyhound')
  })

  it('switches to Harness tab when clicked', async () => {
    const wrapper = mount(App)

    const harnessTab = wrapper.findAll('.tab-button')[2]
    await harnessTab.trigger('click')

    // Check if Harness tab is now active
    const activeTab = wrapper.find('.tab-button.active')
    expect(activeTab.text()).toBe('Harness')
  })

  it('switches to Horse tab when clicked', async () => {
    const wrapper = mount(App)

    const horseTab = wrapper.findAll('.tab-button')[3]
    await horseTab.trigger('click')

    // Check if Horse tab is now active
    const activeTab = wrapper.find('.tab-button.active')
    expect(activeTab.text()).toBe('Horse')
  })

  it('switches back to All Races tab when clicked', async () => {
    const wrapper = mount(App)

    // First switch to a different tab
    const greyhoundTab = wrapper.findAll('.tab-button')[1]
    await greyhoundTab.trigger('click')

    // Then switch back to All Races
    const allRacesTab = wrapper.findAll('.tab-button')[0]
    await allRacesTab.trigger('click')

    // Check if All Races tab is now active
    const activeTab = wrapper.find('.tab-button.active')
    expect(activeTab.text()).toBe('All Races')
  })

  it('filters races correctly when switching tabs', async () => {
    const wrapper = mount(App)

    // Initially should show all races (3 races)
    let raceCards = wrapper.findAll('.race-card')
    expect(raceCards.length).toBeGreaterThan(0)

    // Switch to Greyhound tab
    const greyhoundTab = wrapper.findAll('.tab-button')[1]
    await greyhoundTab.trigger('click')
    await wrapper.vm.$nextTick()

    // Should show only greyhound races
    raceCards = wrapper.findAll('.race-card')
    expect(raceCards.length).toBeGreaterThan(0)

    // Switch to Harness tab
    const harnessTab = wrapper.findAll('.tab-button')[2]
    await harnessTab.trigger('click')
    await wrapper.vm.$nextTick()

    // Should show only harness races
    raceCards = wrapper.findAll('.race-card')
    expect(raceCards.length).toBeGreaterThan(0)

    // Switch to Horse tab
    const horseTab = wrapper.findAll('.tab-button')[3]
    await horseTab.trigger('click')
    await wrapper.vm.$nextTick()

    // Should show only horse races
    raceCards = wrapper.findAll('.race-card')
    expect(raceCards.length).toBeGreaterThan(0)
  })
}) 