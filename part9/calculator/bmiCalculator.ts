type centimeters = number;
type kilograms = number;

function calculateBmi(height: centimeters, weight: kilograms): string {
  const bmi: number = weight / Math.pow(height / 100, 2);
  let result = '';

  if (bmi < 15) result = 'Very severely underweight';
  if (bmi >= 15 && bmi < 16) result = 'Severely underweight';
  if (bmi >= 16 && bmi < 18.5) result = 'Underweight';
  if (bmi >= 18.5 && bmi < 25) result = 'Normal (healthy weight)';
  if (bmi >= 25 && bmi < 30) result = 'Overweight';
  if (bmi >= 30 && bmi < 35) result = 'Obese Class I (Moderately obese)';
  if (bmi >= 35 && bmi < 40) result = 'Obese Class II (Severely obese)t';
  if (bmi >= 40) result = 'Obese Class III (Very severely obese)';

  return result;
}

export { calculateBmi };

interface MultiplyValues {
  height: centimeters;
  weight: kilograms;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error) {
  if (error instanceof Error)
    console.log('Error, something bad happened, message: ', error.message);
}
