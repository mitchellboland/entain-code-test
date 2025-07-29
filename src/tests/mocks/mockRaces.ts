import { RACE_CATEGORIES } from '../../constants/raceCategories'

export const mockRaces = [
    {
        race_id: '1',
        race_name: 'Race 1',
        race_number: 1,
        meeting_id: 'meeting1',
        meeting_name: 'Test Meeting 1',
        category_id: RACE_CATEGORIES.GREYHOUND.id,
        advertised_start: { seconds: Date.now() / 1000 + 300 }, // 5 minutes from now
        race_form: {
            distance: 500,
            distance_type: { id: '1', name: 'Metres', short_name: 'm' },
            distance_type_id: '1',
            track_condition: { id: '1', name: 'Good', short_name: 'Good' },
            track_condition_id: '1',
            weather: { id: '1', name: 'Fine', short_name: 'Fine', icon_uri: '' },
            weather_id: '1',
            race_comment: 'Test race',
            additional_data: '',
            generated: Date.now(),
            silk_base_url: '',
            race_comment_alternative: ''
        },
        venue_id: 'venue1',
        venue_name: 'Test Venue 1',
        venue_state: 'NSW',
        venue_country: 'Australia'
    },
    {
        race_id: '2',
        race_name: 'Race 2',
        race_number: 2,
        meeting_id: 'meeting2',
        meeting_name: 'Test Meeting 2',
        category_id: RACE_CATEGORIES.HARNESS.id,
        advertised_start: { seconds: Date.now() / 1000 + 600 }, // 10 minutes from now
        race_form: {
            distance: 1600,
            distance_type: { id: '1', name: 'Metres', short_name: 'm' },
            distance_type_id: '1',
            track_condition: { id: '1', name: 'Good', short_name: 'Good' },
            track_condition_id: '1',
            weather: { id: '1', name: 'Fine', short_name: 'Fine', icon_uri: '' },
            weather_id: '1',
            race_comment: 'Test race',
            additional_data: '',
            generated: Date.now(),
            silk_base_url: '',
            race_comment_alternative: ''
        },
        venue_id: 'venue2',
        venue_name: 'Test Venue 2',
        venue_state: 'VIC',
        venue_country: 'Australia'
    },
    {
        race_id: '3',
        race_name: 'Race 3',
        race_number: 3,
        meeting_id: 'meeting3',
        meeting_name: 'Test Meeting 3',
        category_id: RACE_CATEGORIES.HORSE.id,
        advertised_start: { seconds: Date.now() / 1000 + 900 }, // 15 minutes from now
        race_form: {
            distance: 1200,
            distance_type: { id: '1', name: 'Metres', short_name: 'm' },
            distance_type_id: '1',
            track_condition: { id: '1', name: 'Good', short_name: 'Good' },
            track_condition_id: '1',
            weather: { id: '1', name: 'Fine', short_name: 'Fine', icon_uri: '' },
            weather_id: '1',
            race_comment: 'Test race',
            additional_data: '',
            generated: Date.now(),
            silk_base_url: '',
            race_comment_alternative: ''
        },
        venue_id: 'venue3',
        venue_name: 'Test Venue 3',
        venue_state: 'QLD',
        venue_country: 'Australia'
    }
] 