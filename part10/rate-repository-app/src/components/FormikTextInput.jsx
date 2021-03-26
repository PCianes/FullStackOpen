import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { useField } from 'formik';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  input: { 
    height: 60, 
    borderColor: theme.colors.textSecondary, 
    color: theme.colors.textSecondary, 
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 20
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: 5,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  const inputStyles = [
    styles.input,
    showError && styles.inputError
  ];

  return (
    <>
      <TextInput
        style={inputStyles}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text bold style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;