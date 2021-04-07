import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.namespaceToken = `${namespace}:token`;
  }

  async getAccessToken() {
    const token = await AsyncStorage.getItem(this.namespaceToken);

    return token ? token : "";
  }

  async setAccessToken(token) {
    await AsyncStorage.setItem(this.namespaceToken, token);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.namespaceToken);
  }
}

export default AuthStorage;