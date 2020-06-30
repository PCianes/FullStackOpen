import express, { Request, Response } from 'express';
import patientsService from '../services/patients';
import { toNewPatient, toNewEntry } from '../utils';
import { NewPatient, Entry } from '../types';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
  const patients = patientsService.getPatientsNonSensitive();

  res.send(patients);
});

router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = patientsService.getPatient(id);

  res.send(patient);
});

router.post('/:id/entries', (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const newEntry: Entry = toNewEntry(req.body);

    const addedEntry = patientsService.addEntry(id, newEntry);
    res.json(addedEntry);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Undefined error';
    res.status(400).send(errorMessage);
  }
});

router.post('/', (req: Request, res: Response) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);

    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Undefined error';

    res.status(400).send(errorMessage);
  }
});

export default router;