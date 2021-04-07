import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-dom";
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: { 
    padding: 20
  },
  submit: {
    marginTop: 20,
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters: One Uppercase, One Lowercase, One Number and one special case Character"
    )
});

const LoginForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry={true} />
      <View style={styles.submit}>
        <Button onPress={onSubmit} title="Sign in"/>
      </View>
    </View>
  );
};

const SignIn = () => {
  let history = useHistory();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const response = await signIn({ username, password });

      if( response ){
        history.push('/');
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}       
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <LoginForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;