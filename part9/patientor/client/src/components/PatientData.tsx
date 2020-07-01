import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Header,
  Segment,
  Divider,
  Card,
  Icon,
  SemanticICONS,
  Button,
} from 'semantic-ui-react';

import { Diagnosis, Patient, Gender, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import {
  useStateValue,
  updatePatient,
  setDiagnosisList,
  addEntry,
} from '../state';
import EntryDetails from './EntryDetails';
import { AddEntryModal } from '../AddPatientModal';
import { EntryFormValues } from '../AddPatientModal/AddPatientForm';

const PatientData: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientData);
        dispatch(updatePatient(patientData));
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDiagnosisList = async () => {
      try {
        const { data: diagnosisListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnosis`
        );
        dispatch(setDiagnosisList(diagnosisListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
      fetchDiagnosisList();
      fetchPatient();
    }
  }, [id]);

  const genderIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case 'male':
        return 'mars';

      case 'female':
        return 'venus';

      default:
        return 'genderless';
    }
  };

  const getDiagnosisDescription = (code: string): string => {
    return diagnosis[code].name;
  };

  const getEntryView = (entry: Entry, lastEntry: boolean) => {
    return (
      <div key={entry.id}>
        <Header as="h4">{entry.date}</Header>
        <p>{entry.description}</p>
        <Header as="h3">{entry.specialist}</Header>
        <EntryDetails entry={entry} />
        {entry.diagnosisCodes && (
          <>
            <Header as="h4">Diagnoses</Header>
            <ul>
              {entry.diagnosisCodes.map((code) => (
                <li key={code}>
                  {code} {getDiagnosisDescription(code)}
                </li>
              ))}
            </ul>
          </>
        )}
        {!lastEntry && <Divider section />}
      </div>
    );
  };

  const totalEntries = patient ? patient.entries.length : 0;

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${values.id}/entries`,
        values
      );
      dispatch(addEntry(values.id, newEntry));
      patient && patient.entries.push(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  return (
    <>
      {patient && (
        <section>
          <Card>
            <Card.Content header={patient.name} />
            <Card.Content description={patient.occupation} />
            <Card.Content extra>
              <Icon name={genderIcon(patient.gender)} />
              {patient.ssn}
            </Card.Content>
          </Card>
          {totalEntries > 0 && (
            <>
              <h3>entries</h3>
              <Segment>
                {patient.entries.map((entry, index) =>
                  getEntryView(entry, index + 1 === totalEntries)
                )}
              </Segment>
            </>
          )}
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitNewEntry}
            error={error}
            onClose={closeModal}
            patientId={patient.id}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </section>
      )}
    </>
  );
};

export default PatientData;
