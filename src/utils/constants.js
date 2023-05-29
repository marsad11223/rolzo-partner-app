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