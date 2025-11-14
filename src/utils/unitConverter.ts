import { UNIT_CONVERSIONS } from '@/constants/units'

export function convertUnit(
  amount: number,
  fromUnit: string,
  toUnit: string
): number | null {
  const normalizedFrom = fromUnit.toLowerCase()
  const normalizedTo = toUnit.toLowerCase()

  if (normalizedFrom === normalizedTo) {
    return amount
  }

  const fromFactor = UNIT_CONVERSIONS[normalizedFrom]
  const toFactor = UNIT_CONVERSIONS[normalizedTo]

  if (!fromFactor || !toFactor) {
    return null
  }

  const baseAmount = amount * fromFactor
  return baseAmount / toFactor
}

export function formatAmount(amount: number): string {
  if (amount % 1 === 0) {
    return amount.toString()
  }

  if (amount < 1) {
    const fraction = getFraction(amount)
    return fraction || amount.toFixed(2).replace(/\.?0+$/, '')
  }

  const whole = Math.floor(amount)
  const decimal = amount - whole
  const fraction = getFraction(decimal)

  if (fraction) {
    return whole > 0 ? `${whole} ${fraction}` : fraction
  }

  return amount.toFixed(2).replace(/\.?0+$/, '')
}

function getFraction(decimal: number): string | null {
  const tolerance = 0.01

  if (Math.abs(decimal - 0.25) < tolerance) return '1/4'
  if (Math.abs(decimal - 0.33) < tolerance) return '1/3'
  if (Math.abs(decimal - 0.5) < tolerance) return '1/2'
  if (Math.abs(decimal - 0.66) < tolerance) return '2/3'
  if (Math.abs(decimal - 0.75) < tolerance) return '3/4'

  return null
}

