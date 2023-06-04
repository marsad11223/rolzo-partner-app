export const defaultModeType = [
  { label: 'Transfer', value: 'airport_transfer' },
  { label: 'By The Hour', value: 'chauffeur_services' },
  { label: 'Car rental', value: 'car_rentals' },
  { label: 'Return transfer', value: 'return_transfer' },
  { label: 'Departure transfer', value: 'departure_transfer' },
  { label: 'Meet & greet', value: 'isMeetGreet' },
]

export const carYears = [
  {
    label: '2023',
    value: '2023'
  },
  {
    label: '2022',
    value: '2022'
  },
  {
    label: '2021',
    value: '2021'
  },
  {
    label: '2020',
    value: '2020'
  },
  {
    label: '2019',
    value: '2019'
  },
  {
    label: 'other',
    value: 'other'
  }
];

export const exteriorColors = [
  {
    label: 'Black',
    value: 'Black'
  },
  {
    label: 'Grey',
    value: 'Grey'
  },
  {
    label: 'Silver',
    value: 'Silver'
  },
  {
    label: 'White',
    value: 'White'
  },
  {
    label: 'Blue',
    value: 'Blue'
  },
  {
    label: 'Beige',
    value: 'Beige'
  },
  {
    label: 'Brown',
    value: 'Brown'
  },
  {
    label: 'Green',
    value: 'Green'
  },
  {
    label: 'Red',
    value: 'Red'
  },
  {
    label: 'Yellow',
    value: 'Yellow'
  }
];

export const interiorColors = [
  {
    label: 'Black',
    value: 'Black'
  },
  {
    label: 'Grey',
    value: 'Grey'
  },
  {
    label: 'Beige',
    value: 'Beige'
  },
  {
    label: 'Cream',
    value: 'Cream'
  },
  {
    label: 'White',
    value: 'White'
  },
  {
    label: 'Brown',
    value: 'Brown'
  },
  {
    label: 'Navy',
    value: 'Navy'
  },
  {
    label: 'Red',
    value: 'Red'
  }
];

export const declineReasons = [
  { id: 1, label: 'No availablity' },
  { id: 2, label: 'Wrong price' },
  { id: 3, label: 'Other' }
];

export function getLabelByValue(value) {
  const modeType = defaultModeType.find((item) => item.value === value);
  return modeType ? modeType.label : '';
}

export function secondsToMinutes(seconds) {
  const minutes = Math.floor(seconds / 60); // Get the whole number of minutes
  const remainingSeconds = seconds % 60; // Get the remaining seconds

  return `${minutes} minutes ${remainingSeconds} seconds`;
}

export function getStatus(status) {
  switch (status) {
    case 'pending':
      return {
        color: '#f5a623',
        label: 'PENDING'
      }
    case 'completed':
      return {
        color: '#0c0c0c',
        label: 'COMPLETED'
      }
    case 'accepted':
      return {
        color: '#417505',
        label: 'ACCEPTED'
      }
    case 'dispatched':
      return {
        color: '#f5a623',
        label: 'PENDING'
      }
    case 'planned':
      return {
        color: '#417505',
        label: 'ACCEPTED'
      }
    default:
      return {}
  }
}

