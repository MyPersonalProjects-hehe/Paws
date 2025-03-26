import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function CreateProfile() {
  const route: any = useNavigation();
  const [profileInfo, setProfileInfo] = useState({
    username: '',
    age: '',
    hates: '',
    superpowers: '',
    avatar: require('@/assets/images/profile-pictures/pic-1.png'),
  });

  const [imageIndex, setImageIndex] = useState(0);
  /**Toggle button color */
  const [isSelected, setIsSelected] = useState(false);

  const avatar = [
    {
      image: require('@/assets/images/profile-pictures/pic-1.png'),
    },
    {
      image: require('@/assets/images/profile-pictures/pic-2.jpg'),
    },
    {
      image: require('@/assets/images/profile-pictures/pic-3.png'),
    },
  ];

  const handleChange = (input: any, prop: any) => {
    setProfileInfo((prev) => ({
      ...prev,
      [prop]: input,
    }));
  };

  const changeImage = () => {
    const newIndex = (imageIndex + 1) % avatar.length;
    setImageIndex(newIndex);
    setIsSelected(false);
  };

  const submitForm = async () => {
    try {
      if (profileInfo.username) {
        const response = await axios.post(
          'http://localhost:3000/api/createProfile',
          profileInfo
        );
        response.status === 200
          ? route.navigate('ChoosePlayer')
          : alert('Error');
      } else {
        alert('Please fill in at least username!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/backgrounds/main-background.jpg')}
        style={styles.background}
      >
        <View style={styles.greenContainer}>
          <View style={styles.section}>
            <Text style={[styles.heading]}>Fill In The Fields </Text>
            <TextInput
              style={styles.input}
              placeholder='Username'
              value={profileInfo.username}
              onChangeText={(input) => handleChange(input, 'username')}
            />
            <TextInput
              style={styles.input}
              placeholder='Age'
              value={profileInfo.age}
              onChangeText={(input) => handleChange(input, 'age')}
            />
            <TextInput
              style={styles.input}
              placeholder='Hates'
              value={profileInfo.hates}
              onChangeText={(input) => handleChange(input, 'hates')}
            />
            <TextInput
              style={styles.input}
              placeholder='Superpowers'
              value={profileInfo.superpowers}
              onChangeText={(input) => handleChange(input, 'superpowers')}
            />
            <Pressable
              style={styles.button}
              onPress={submitForm}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </Pressable>
          </View>
          <View style={styles.section}>
            <Text style={styles.heading}>Choose Avatar</Text>
            <Image
              source={avatar[imageIndex].image}
              style={styles.avatar}
            />
            <Pressable
              onPress={changeImage}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Next</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsSelected(true)}
              style={[
                styles.button,
                isSelected && {
                  backgroundColor: '#00FF00',
                },
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  isSelected && {
                    color: 'black',
                  },
                ]}
              >
                Select
              </Text>
            </Pressable>
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
    width: '100%',
    height: '100%',
  },
  greenContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 70,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00FF00',
    width: '60%',
    margin: 'auto',
  },
  section: {
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  input: {
    color: 'white',
    borderColor: '#00FF00',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginBottom: 20,
    width: 250,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderWidth: 3,
    borderColor: '#00FF00',
    boxShadow: '0px 0px 10px rgba(0, 255, 0, 0.9)',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  heading: {
    color: '#00FF00',
    paddingBottom: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  avatar: {
    width: 270,
    height: 270,
    borderColor: '#00FF00',
    borderWidth: 2,
    borderRadius: 8,
    marginBottom: 15,
  },
});
