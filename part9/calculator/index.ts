import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res
      .status(400)
      .send({ error: 'Not enough arguments: height(cm), weight(kg)' });
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).send({ error: 'malformatted parameters' });
  }

  const bmi: { height: number; weight: number; bmi: string } = {
    weight: weightNumber,
    height: heightNumber,
    bmi: calculateBmi(heightNumber, weightNumber),
  };

  res.json(bmi);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
