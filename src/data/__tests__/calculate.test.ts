import { eq } from 'lodash'

import { CalculatorData, calculate } from 'data/calculate'

describe('calculate', () => {
  it('returns the correct value', () => {
    const data: CalculatorData = {}

    const response = calculate(data)
    expect(response).toBe(1)
  })
})
