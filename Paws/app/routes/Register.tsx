import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { UserContext } from '../contextProviders/User';
import { signUserWithGmail } from '../authFunctions/authentication';

export default function Register() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();
  const userContext = useContext(UserContext);

  const onChange = (key: any, input: string) => {
    setUser({
      ...user,
      [key]: input,
    });
  };

  const handleRegister = async () => {
    const signedUser = await signUserWithGmail();

    if (signedUser) {
      userContext?.setUser({
        email: signedUser?.email || '',
        username: signedUser?.displayName || '',
      });
      router.push('/routes/ChoosePlayer');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/register-background.jpg')}
        style={styles.background}
      >
        <Text style={styles.title}>Save Galaxy and earn points!</Text>
        <View style={styles.formContainer}>
          <Text style={styles.registerTitle}>Register</Text>
          <TextInput
            style={styles.input}
            placeholder='Email'
            value={user.email}
            onChangeText={(text) => onChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry
            value={user.password}
            onChangeText={(text) => onChange('password', text)}
          />
          <Text style={styles.heading}>Or</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={handleRegister}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='30'
                height='30'
                viewBox='0 0 16 16'
                fill='#4285F4'
              >
                <path d='M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z' />
              </svg>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  formContainer: {
    width: '80%',
    maxWidth: 400,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 8,
    alignItems: 'center',
    fontSize: 20,
  },
  registerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
    fontWeight: '600',
    fontSize: 20,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    width: '80%',
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
});
