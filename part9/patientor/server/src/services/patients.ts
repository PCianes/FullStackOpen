import patientsData from '../../data/patients';
import { NewPatient, Patient, PublicPatient } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getPatientsNonSensitive = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({ id, name, dateOfBirth, gender, occupation }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...patient,
    entries: []
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatient,
  getPatients,
  getPatientsNonSensitive,
  addPatient
};