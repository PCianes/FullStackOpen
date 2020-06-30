import patientsData from '../../data/patients';
import { NewPatient, Patient, PublicPatient, Entry } from '../types';
import { v4 as uuid } from 'uuid';

const patients: Patient[] = patientsData;

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  return patients.find(patient => patient.id === id);
};

const getPatientsNonSensitive = (): PublicPatient[] => {
  return patients;
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

const addEntry = (patientId: string, entry: Entry): Entry => {

  const patient: Patient | undefined = getPatient(patientId);
  if (!patient) {
    throw new Error(`Incorrect patient id`);
  }

  patient.entries.push(entry);

  return entry;
};

export default {
  getPatient,
  getPatients,
  getPatientsNonSensitive,
  addPatient,
  addEntry
};