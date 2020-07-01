/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, BaseEntry, HealthCheckRating, Entry, Diagnosis } from './types';
import { v4 as uuid } from 'uuid';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (label: string, data: any): string => {
  if (!data || !isString(data)) {
    throw new Error(`Incorrect or missing string: ${label}`);
  }

  return data;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

//https://css-tricks.com/everything-you-need-to-know-about-date-in-javascript/
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date: YYYY-MM-DD`);
  }
  const timestamp = Date.parse(date);
  const d: Date = new Date(timestamp);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${Object.values(Gender).join(' | ')}`);
  }
  return gender;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString('name', object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString('ssn', object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString('occupation', object.occupation)
  };
};

const parseArrayStringCodes = (data: any): Array<Diagnosis['code']> => {

  if (!data) {
    return [];
  }

  const codes: Array<Diagnosis['code']> = [];
  const error = '"diagnosisCodes" is an array of codes as string';

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const dataCodes: Array<Diagnosis['code']> = typeof data === 'object' ? data : JSON.parse(data);
    if (!Array.isArray(dataCodes)) throw new Error(error);

    dataCodes.forEach((code) => {
      if (!isString(code)) {
        throw new Error(error);
      }
      codes.push(code);
    });

  } catch (error) {
    throw new Error(error);
  }

  return codes;
};

const isRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating) {
    throw new Error(`Missing rating`);
  }
  const ratingNumber: number = parseInt(rating);
  if (isNaN(ratingNumber) || !isRating(ratingNumber)) {
    throw new Error(`Incorrect rating number: ${Object.values(HealthCheckRating).join(' | ')}`);
  }
  return ratingNumber;
};

export const toNewEntry = (object: any): Entry => {
  const baseEntry: BaseEntry = {
    id: uuid(),
    description: parseString('description', object.description),
    date: parseDate(object.date),
    specialist: parseString('specialist', object.specialist),
    diagnosisCodes: parseArrayStringCodes(object.diagnosisCodes),
  };
  if (!object.type || !isString(object.type)) {
    throw new Error(`Missing or invalid entry type`);
  }
  switch (object.type) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      };

    case 'Hospital':
      return {
        ...baseEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(object.dischargeDate),
          criteria: parseString('dischargeCriteria', object.dischargeCriteria)
        }
      };

    case 'OccupationalHealthcare':
      let sickLeave;
      if (object.sickLeaveStartDate && object.sickLeaveEndDate) {
        sickLeave = {
          startDate: parseDate(object.sickLeaveStartDate),
          endDate: parseDate(object.sickLeaveEndDate)
        };
      }
      return {
        ...baseEntry,
        type: 'OccupationalHealthcare',
        employerName: parseString('employerName', object.employerName),
        sickLeave
      };

    default:
      throw new Error(`Incorrect entry type`);
  }
};