export const defaultModeType = [
  { label: 'Transfer', value: 'airport_transfer' },
  { label: 'By the hour', value: 'chauffeur_services' },
  { label: 'Car rental', value: 'car_rentals' },
  { label: 'Return transfer', value: 'return_transfer' },
  { label: 'Departure transfer', value: 'departure_transfer' },
  { label: 'Meet & greet', value: 'isMeetGreet' },
]

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
        label: 'Completed'
      }

    default:
      return {}
  }
}