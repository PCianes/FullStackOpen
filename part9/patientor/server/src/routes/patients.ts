import express, { Request, Response } from 'express';
import patientsService from '../services/patients';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const patients = patientsService.getPatientsNonSensitive();

  res.send(patients);
});

router.post('/', (req: Request, res: Response) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as Patient;
  const newPatient = patientsService.addPatient({ name, dateOfBirth, ssn, gender, occupation });

  res.send(newPatient);
});

export default router;