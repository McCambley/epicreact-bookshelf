import {formatDate} from '../misc'

test('formatDate formats the date to look nice', () => {
  const today = new Date('November 11, 2024')
  expect(typeof formatDate(today)).toBe('string')
  expect(formatDate(today)).toBe('Nov 24')
})
