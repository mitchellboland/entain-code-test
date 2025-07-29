export const RACE_CATEGORIES = {
  GREYHOUND: {
    id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61',
    name: 'Greyhound Racing',
    shortName: 'Greyhound'
  },
  HARNESS: {
    id: '161d9be2-e909-4326-8c2c-35ed71fb460b',
    name: 'Harness Racing',
    shortName: 'Harness'
  },
  HORSE: {
    id: '4a2788f8-e825-4d36-9894-efd4baf1cfae',
    name: 'Horse Racing',
    shortName: 'Horse'
  }
} as const

export const ALL_CATEGORY_IDS = Object.values(RACE_CATEGORIES).map(cat => cat.id)

export type RaceCategoryId = typeof RACE_CATEGORIES[keyof typeof RACE_CATEGORIES]['id'] 