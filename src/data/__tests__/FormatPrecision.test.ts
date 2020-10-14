import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from 'data/FormatPrecision'

describe('fixedPointPrecision', () => {
  it('rounds numbers greater than 1', () => {
    expect(fixedPointPrecision(11)).toEqual('10')
    expect(fixedPointPrecision(16)).toEqual('20')
    expect(fixedPointPrecision(230)).toEqual('200')
  })

  it('rounds numbers less than 1', () => {
    expect(fixedPointPrecision(0.11)).toEqual('0.1')
    expect(fixedPointPrecision(0.046)).toEqual('0.05')
  })

  it('adds commas', () => {
    expect(fixedPointPrecision(10000)).toEqual('10,000')
    expect(fixedPointPrecision(1e6)).toEqual('1,000,000')
  })
  it('shows precision for numbers close to 1e6', () => {
    expect(fixedPointPrecision(996700)).toEqual('997,000')
    expect(fixedPointPrecision(999920)).toEqual('999,920')
  })
})

describe('fixedPointPrecisionPercent', () => {
  it('rounds numbers and formats as percent', () => {
    expect(fixedPointPrecisionPercent(1)).toEqual('100%')
    expect(fixedPointPrecisionPercent(0.16)).toEqual('20%')
    expect(fixedPointPrecisionPercent(0.0022)).toEqual('0.2%')
  })

  it('shows precision for percentages close to 1', () => {
    expect(fixedPointPrecisionPercent(0.9992)).toEqual('99.92%')
  })
})
