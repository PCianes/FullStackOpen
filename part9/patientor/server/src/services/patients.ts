import patientsData from '../../data/patients';
import { NewPatient, Patient, PatientNonSensitive } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatientsNonSensitive = (): PatientNonSensitive[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsNonSensitive,
  addPatient
};