import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Icon, SemanticICONS } from 'semantic-ui-react';

import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';

const PatientData: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const [patient, setPatient] = useState<Patient | undefined>();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientData);
        dispatch({ type: 'UPDATE_PATIENT', payload: patientData });
      } catch (error) {
        console.log(error);
      }
    };
    if (patients[id] && patients[id].ssn) {
      setPatient(patients[id]);
    } else {
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

  return (
    <>
      {patient && (
        <Card>
          <Card.Content header={patient.name} />
          <Card.Content description={`occupation: ${patient.occupation}`} />
          <Card.Content extra>
            <Icon name={genderIcon(patient.gender)} />
            {patient.ssn}
          </Card.Content>
        </Card>
      )}
    </>
  );
};

export default PatientData;
