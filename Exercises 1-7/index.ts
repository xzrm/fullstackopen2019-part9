import express from "express";
const app = express();
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator'
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  const { height, weight } = req.query;

  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      height,
      weight,
      bmi
    });
  } else {
    res.json({
      error: "malformatted parameters"
    });
  }
});

app.get('/exercise', (req, res) => {
  if (Object.keys(req.body).length !== 2) {
    return res.status(400).json({
      error: "parameters missing"
    })
  }

  const { daily_exercises, target } = req.body;

  if (Array.isArray(daily_exercises) &&
    daily_exercises.length !== 0 &&
    !isNaN(Number(target)) &&
    daily_exercises.every((arg: any) => !isNaN(Number(arg)))) {
    const result = calculateExercises(daily_exercises, target)
    return res.json(result)
  }
  else {
    return res.status(400).json({
      error: "malformatted parameters"
    })
  }
})


const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});