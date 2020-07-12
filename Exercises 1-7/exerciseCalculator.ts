interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface TrainingHours {
  target: number,
  hours: Array<number>
}

const parseHours = (args: Array<string>): TrainingHours => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const trainingHours = process.argv.slice(3);
  const target = args[2];

  if (!isNaN(Number(target)) &&
    trainingHours.every(arg => !isNaN(Number(arg)))) {
    return {
      target: Number(target),
      hours: trainingHours.map(arg => Number(arg))
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};


export const calculateExercises = (daily_exercises: Array<number>, target: number): Result => {
  const average = daily_exercises.reduce((a, b) => a + b) / daily_exercises.length;

  let rating;
  if (average >= target) {
    rating = 3;
  } else if (average >= 0.8 * target) {
    rating = 2;
  } else {
    rating = 1;
  }

  const ratingDescription = (rating: number): string => {
    switch (rating) {
      case 3:
        return 'You met your target result. Well done!';
      case 2:
        return 'You managed to meet 80% of the target result. Not bad!';
      case 1:
        return 'You are below 80 % of the target result. Next time better!';
      default:
        return "";
    }
  };
  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter(a => a !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription(rating),
    average: average,
    target: target
  };
};

if(process.argv.includes("exerciseCalculator"))
  try {
    const { target, hours } = parseHours(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }


