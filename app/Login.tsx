import { useState } from 'react';


const LoginScreen = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await loginUser({ login, password });
      
      if (response) {
        setUserData(response);
        console.log('Login successful:', response);
        // Here you'll typically:
        // 1. Store the token/user in your state management
        // 2. Navigate to the home screen
      }
    } catch (error) {
      setError('Invalid login credentials');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      <Button
        title={isLoading ? 'Loading...' : 'Login'}
        onPress={handleLogin}
        disabled={isLoading}
      />

      {userData && (
        <View style={styles.userInfo}>
          <Text>Login successful!</Text>
          <Text>User ID: {userData.id}</Text>
          {/* Display other relevant user info */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  error: { color: 'red', marginBottom: 10 },
  userInfo: { marginTop: 20 }
});

export default LoginScreen;