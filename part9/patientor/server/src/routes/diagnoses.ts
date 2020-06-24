import express, { Request, Response } from 'express';
import diagnosesService from '../services/diagnoses';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const diagnoses = diagnosesService.getDiagnoses();
  res.send(diagnoses);
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

export default router;