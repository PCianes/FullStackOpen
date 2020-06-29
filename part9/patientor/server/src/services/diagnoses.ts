import diagnosesData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesData;

const getDiagnoses = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getDiagnoses,
};