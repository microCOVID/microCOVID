import {
  fixedPointPrecision,
  fixedPointPrecisionPercent,
} from 'components/calculator/util/FormatPrecision'

describe('fixedPointPrecision', () => {
  it('rounds numbers greater than 1', () => {
    expect(fixedPointPrecision(11)).toEqual('11')
    expect(fixedPointPrecision(16)).toEqual('16')
    expect(fixedPointPrecision(233)).toEqual('230')
    expect(fixedPointPrecision(268)).toEqual('270')
    expect(fixedPointPrecision(269)).toEqual('270')
  })

  it('rounds numbers less than 1', () => {
    expect(fixedPointPrecision(0.11)).toEqual('0.1')
    expect(fixedPointPrecision(0.046)).toEqual('0.05')
    expect(fixedPointPrecision(0.37)).toEqual('0.4')
    expect(fixedPointPrecision(0.33)).toEqual('0.3')
    expect(fixedPointPrecision(0.949)).toEqual('0.9')
    expect(fixedPointPrecision(0.09539241516791933)).toEqual('0.1')
  })

  it('rounds numbers that will increase their order of magnitude', () => {
    expect(fixedPointPrecision(0.09539241516791933)).toEqual('0.1')
    expect(fixedPointPrecision(0.99)).toEqual('1')
    expect(fixedPointPrecision(99.7)).toEqual('100')
  })

  it('adds commas', () => {
    expect(fixedPointPrecision(10000)).toEqual('10,000')
    expect(fixedPointPrecision(1e6)).toEqual('1,000,000')
  })
  it('shows precision for numbers close to 1e6', () => {
    expect(fixedPointPrecision(996700)).toEqual('997,000')
    expect(fixedPointPrecision(999920)).toEqual('999,920')
    expect(fixedPointPrecision(1e6 - 0.1)).toEqual('999,999.9')
    expect(fixedPointPrecision(1e6)).toEqual('1,000,000')
  })
})

describe('fixedPointPrecisionPercent', () => {
  it('shows all integer digits for percentages', () => {
    expect(fixedPointPrecisionPercent(0)).toEqual('0%')
    expect(fixedPointPrecisionPercent(0.01)).toEqual('1%')
    expect(fixedPointPrecisionPercent(0.02)).toEqual('2%')
    expect(fixedPointPrecisionPercent(0.09)).toEqual('9%')
    expect(fixedPointPrecisionPercent(0.14)).toEqual('14%')
    expect(fixedPointPrecisionPercent(0.39)).toEqual('39%')
    expect(fixedPointPrecisionPercent(0.89)).toEqual('89%')
    expect(fixedPointPrecisionPercent(0.9)).toEqual('90%')
    expect(fixedPointPrecisionPercent(1)).toEqual('100%')
  })
  it('rounds numbers', () => {
    expect(fixedPointPrecisionPercent(0.478)).toEqual('48%')
    expect(fixedPointPrecisionPercent(0.0022)).toEqual('0.2%')
    expect(fixedPointPrecisionPercent(0.00030000000000000002)).toEqual('0.03%')
    expect(fixedPointPrecisionPercent(0.092)).toEqual('9%')
    expect(fixedPointPrecisionPercent(0.098)).toEqual('10%')
    expect(fixedPointPrecisionPercent(0.0098)).toEqual('1%')
  })
  it('handles percentages around 1%', () => {
    expect(fixedPointPrecisionPercent(0.008)).toEqual('0.8%')
    expect(fixedPointPrecisionPercent(0.0082)).toEqual('0.8%')
    expect(fixedPointPrecisionPercent(0.009)).toEqual('0.9%')
    expect(fixedPointPrecisionPercent(0.014)).toEqual('1%')
  })
  it('shows precision for percentages close to 100%', () => {
    expect(fixedPointPrecisionPercent(0.9992)).toEqual('99.92%')
    expect(fixedPointPrecisionPercent(0.99992)).toEqual('99.992%')
    expect(fixedPointPrecisionPercent(0.98)).toEqual('98%')
    expect(fixedPointPrecisionPercent(0.99)).toEqual('99%')
  })
})
