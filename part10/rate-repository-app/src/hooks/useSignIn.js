import { useApolloClient, useMutation } from '@apollo/client';
import { GET_TOKEN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(GET_TOKEN);

  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        user: username,
        pass: password
      }
    });

    if (response.data) {
      const token = response.data?.authorize?.accessToken;
      console.log("new token", token);

      await authStorage.setAccessToken(token);

      apolloClient.resetStore();

      return true;
    }

    return false;
  };

  return [signIn, result];
};

export default useSignIn;