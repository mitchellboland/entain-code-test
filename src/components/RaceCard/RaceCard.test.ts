import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import RaceCard from './RaceCard.vue'
import { mockRaces } from '../../tests/mocks/mockRaces'

// Mock the CountdownTimer component
vi.mock('./CountdownTimer.vue', () => ({
  default: {
    name: 'CountdownTimer',
    props: ['startTime'],
    template: '<span class="countdown-timer">{{ startTime }}</span>'
  }
}))

describe('RaceCard', () => {
  it('renders race information correctly', () => {
    const race = mockRaces[0] // Use the first mock race (Greyhound)
    const wrapper = mount(RaceCard, {
      props: { race }
    })

    // Check if the race card exists
    expect(wrapper.find('[data-testid="race-card"]').exists()).toBe(true)

    // Check if race info is displayed correctly
    const raceInfo = wrapper.find('.race-info')
    expect(raceInfo.exists()).toBe(true)
    expect(raceInfo.text()).toBe(`${race.meeting_name} - R${race.race_number}`)
  })

  it('displays correct meeting name and race number', () => {
    const race = mockRaces[1] // Use the second mock race (Harness)
    const wrapper = mount(RaceCard, {
      props: { race }
    })

    const raceInfo = wrapper.find('.race-info')
    expect(raceInfo.text()).toBe('Test Meeting 2 - R2')
  })

  it('passes start time to CountdownTimer component', () => {
    const race = mockRaces[2] // Use the third mock race (Horse)
    const wrapper = mount(RaceCard, {
      props: { race }
    })

    // Check if CountdownTimer is rendered
    const countdownTimer = wrapper.findComponent({ name: 'CountdownTimer' })
    expect(countdownTimer.exists()).toBe(true)

    // Check if the correct start time is passed as prop
    expect(countdownTimer.props('startTime')).toBe(race.advertised_start.seconds)
  })

  it('renders with correct CSS classes', () => {
    const race = mockRaces[0]
    const wrapper = mount(RaceCard, {
      props: { race }
    })

    const raceCard = wrapper.find('.race-card')
    expect(raceCard.exists()).toBe(true)
    expect(raceCard.classes()).toContain('race-card')
  })

  it('displays different race information for different races', () => {
    // Test with Greyhound race
    const greyhoundRace = mockRaces[0]
    const greyhoundWrapper = mount(RaceCard, {
      props: { race: greyhoundRace }
    })
    expect(greyhoundWrapper.find('.race-info').text()).toBe('Test Meeting 1 - R1')

    // Test with Horse race
    const horseRace = mockRaces[2]
    const horseWrapper = mount(RaceCard, {
      props: { race: horseRace }
    })
    expect(horseWrapper.find('.race-info').text()).toBe('Test Meeting 3 - R3')
  })

  it('has correct structure with race info and countdown timer', () => {
    const race = mockRaces[0]
    const wrapper = mount(RaceCard, {
      props: { race }
    })

    // Should have race-info span and CountdownTimer component
    expect(wrapper.find('.race-info').exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'CountdownTimer' }).exists()).toBe(true)
  })

  it('validates required race prop', () => {
    // Test that component requires race prop
    expect(() => {
      mount(RaceCard)
    }).toThrow()
  })

  it('handles race with different data types correctly', () => {
    const raceWithDifferentData = {
      ...mockRaces[0],
      race_number: 999,
      meeting_name: 'Special Meeting',
      advertised_start: { seconds: Date.now() / 1000 + 120 } // 2 minutes from now
    }

    const wrapper = mount(RaceCard, {
      props: { race: raceWithDifferentData }
    })

    expect(wrapper.find('.race-info').text()).toBe('Special Meeting - R999')
  })

  it('renders with correct flex layout classes', () => {
    const race = mockRaces[0]
    const wrapper = mount(RaceCard, {
      props: { race }
    })

    const raceCard = wrapper.find('.race-card')
    expect(raceCard.classes()).toContain('race-card')
  })

  it('passes correct data-testid attribute', () => {
    const race = mockRaces[0]
    const wrapper = mount(RaceCard, {
      props: { race }
    })

    const raceCard = wrapper.find('[data-testid="race-card"]')
    expect(raceCard.exists()).toBe(true)
    expect(raceCard.attributes('data-testid')).toBe('race-card')
  })

  it('handles edge case with very large race numbers', () => {
    const raceWithLargeNumber = {
      ...mockRaces[0],
      race_number: 999999
    }

    const wrapper = mount(RaceCard, {
      props: { race: raceWithLargeNumber }
    })

    expect(wrapper.find('.race-info').text()).toBe('Test Meeting 1 - R999999')
  })

  it('handles edge case with empty meeting name', () => {
    const raceWithEmptyName = {
      ...mockRaces[0],
      meeting_name: ''
    }

    const wrapper = mount(RaceCard, {
      props: { race: raceWithEmptyName }
    })

    expect(wrapper.find('.race-info').text()).toBe('- R1')
  })

  it('handles edge case with zero race number', () => {
    const raceWithZeroNumber = {
      ...mockRaces[0],
      race_number: 0
    }

    const wrapper = mount(RaceCard, {
      props: { race: raceWithZeroNumber }
    })

    expect(wrapper.find('.race-info').text()).toBe('Test Meeting 1 - R0')
  })
}) 