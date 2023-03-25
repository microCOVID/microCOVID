import {
  fixedPointPrecision,
  formatPercent,
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

describe('formatPercent', () => {
  it('shows all integer digits for percentages', () => {
    expect(formatPercent(0)).toEqual('0%')
    expect(formatPercent(0.01)).toEqual('1%')
    expect(formatPercent(0.02)).toEqual('2%')
    expect(formatPercent(0.09)).toEqual('9%')
    expect(formatPercent(0.14)).toEqual('14%')
    expect(formatPercent(0.39)).toEqual('39%')
    expect(formatPercent(0.89)).toEqual('89%')
    expect(formatPercent(0.9)).toEqual('90%')
    expect(formatPercent(1)).toEqual('100%')
  })
  it('rounds numbers', () => {
    expect(formatPercent(0.478)).toEqual('48%')
    expect(formatPercent(0.0022)).toEqual('0.2%')
    expect(formatPercent(0.00030000000000000002)).toEqual('0.03%')
    expect(formatPercent(0.092)).toEqual('9%')
    expect(formatPercent(0.098)).toEqual('10%')
    expect(formatPercent(0.0098)).toEqual('1%')
  })
  it('handles percentages around 1%', () => {
    expect(formatPercent(0.008)).toEqual('0.8%')
    expect(formatPercent(0.0082)).toEqual('0.8%')
    expect(formatPercent(0.009)).toEqual('0.9%')
    expect(formatPercent(0.014)).toEqual('1%')
  })
  it('shows precision for percentages close to 100%', () => {
    expect(formatPercent(0.9992)).toEqual('99.92%')
    expect(formatPercent(0.99992)).toEqual('99.992%')
    expect(formatPercent(0.98)).toEqual('98%')
    expect(formatPercent(0.99)).toEqual('99%')
  })
  it('shows fixed decimal points', () => {
    expect(formatPercent(1 / 100, { decimalPointsToShow: 2 })).toEqual('1.00%')
    expect(formatPercent(0.00009, { decimalPointsToShow: 2 })).toEqual('0.01%')
    expect(
      formatPercent(4.3999999999999995 / 100, { decimalPointsToShow: 1 }),
    ).toEqual('4.4%')
  })
})
