type centimeters = number
type kilograms = number

function calculateBmi(height: centimeters, weight: kilograms): string {
  const bmi: number = weight / Math.pow(height / 100, 2)
  let result: string = ''

  if (bmi < 15) result = 'Very severely underweight'
  if (bmi >= 15 && bmi < 16) result = 'Severely underweight'
  if (bmi >= 16 && bmi < 18.5) result = 'Underweight'
  if (bmi >= 18.5 && bmi < 25) result = 'Normal (healthy weight)'
  if (bmi >= 25 && bmi < 30) result = 'Overweight'
  if (bmi >= 30 && bmi < 35) result = 'Obese Class I (Moderately obese)'
  if (bmi >= 35 && bmi < 40) result = 'Obese Class II (Severely obese)t'
  if (bmi >= 40) result = 'Obese Class III (Very severely obese)'

  return result
}

console.log(calculateBmi(180, 45))
console.log(calculateBmi(180, 50))
console.log(calculateBmi(180, 58))
console.log(calculateBmi(180, 74))
console.log(calculateBmi(180, 85))
console.log(calculateBmi(180, 105))
console.log(calculateBmi(180, 115))
console.log(calculateBmi(180, 130))
