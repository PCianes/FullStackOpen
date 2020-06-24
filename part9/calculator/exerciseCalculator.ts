type rating = 1 | 2 | 3;

interface calculateResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: rating;
  ratingDescription: string;
  target: number;
  average: number;
}

function calculateExercises(
  targetDailyHours: number,
  dailyHours: number[]
): calculateResult {
  const totalHours: number = dailyHours.reduce(
    (total, hours) => total + hours,
    0
  );
  const average: number = totalHours / dailyHours.length;

  let rating: rating = 1;
  if (average >= targetDailyHours - 1) rating = 2;
  if (average >= targetDailyHours) rating = 3;
  const ratingDescription: { [key: number]: string } = {
    1: 'a little far from the target 😴',
    2: 'not too bad but could be better 😛',
    3: 'goal accomplished 🎉',
  };

  return {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((hours) => hours > 0).length,
    success: rating === 3,
    rating,
    ratingDescription: ratingDescription[rating],
    target: targetDailyHours,
    average,
  };
}

export { calculateExercises };

interface safeValues {
  targetDailyHours: number;
  dailyHours: number[];
}

const checkArguments = (args: Array<string>): safeValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNaN(Number(args[2]))) {
    throw new Error('First argument is the target of daily hours as number');
  }

  const dailyHoursArgs: string[] = args.slice(3);
  const dailyHours: number[] = [];

  dailyHoursArgs.forEach((hour) => {
    if (isNaN(Number(hour))) {
      throw new Error('Provided values were not numbers!');
    }
    dailyHours.push(Number(hour));
  });

  return {
    targetDailyHours: Number(args[2]),
    dailyHours,
  };
};

try {
  const { targetDailyHours, dailyHours } = checkArguments(process.argv);
  console.log(calculateExercises(targetDailyHours, dailyHours));
} catch (error) {
  if (error instanceof Error)
    console.log('Error, something bad happened, message: ', error.message);
}
