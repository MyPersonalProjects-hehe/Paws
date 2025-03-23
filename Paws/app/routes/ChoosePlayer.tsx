import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Obstacle from '../../components/obstacle/Obstacle';
import React from 'react';

export default function Home() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const players = [
    {
      characterName: 'Poki',
      superPowers: [
        { name: 'Immortality', value: 90 },
        { name: 'Deadly Points', value: 50 },
        { name: 'Can eat tuna fish for life', value: 75 },
      ],
      img: require('@/assets/images/cat.png'),
    },
    {
      characterName: 'Zeus',
      superPowers: [
        { name: 'Mise hunter', value: 85 },
        { name: 'Deadly Points', value: 30 },
        { name: 'Healer', value: 70 },
      ],
      img: require('@/assets/images/Zeus.png'),
    },
    {
      characterName: 'Mars',
      superPowers: [
        { name: 'Time travel', value: 95 },
        { name: 'Deadly Points', value: 70 },
        { name: 'Hates dogs', value: 60 },
      ],
      img: require('@/assets/images/Mars.png'),
    },
    {
      characterName: 'Vex',
      superPowers: [
        { name: 'Mind Reader', value: 80 },
        { name: 'Deadly points', value: 60 },
        { name: 'Charms', value: 90 },
      ],
      img: require('@/assets/images/Moonlight.png'),
    },
  ];

  const handleImageChange = () => {
    const newIndex = (index + 1) % players.length;
    setIndex(newIndex);
  };

  const choosePlayer = () => {
    localStorage.setItem('Player', JSON.stringify(players[index]));

    router.push('/routes/Gameplay');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/background.jpg')}
        style={styles.background}
      >
        <View style={styles.playerContainer}>
          <Text style={styles.titleText}>Choose Player</Text>
          <View style={styles.player}>
            <View>
              <Text style={styles.playerName}>
                {players[index].characterName}
              </Text>
              <FlatList
                data={players[index].superPowers}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.abilityContainer}>
                    <Text style={styles.superPower}>{item.name}</Text>
                    <View style={styles.statusBarBackground}>
                      <View
                        style={[
                          styles.statusBarFill,
                          { width: `${Math.min(item.value, 100)}%` },
                        ]}
                      />
                    </View>
                  </View>
                )}
              />
              <Pressable
                style={styles.arcadeButton}
                onPress={handleImageChange}
              >
                <Text style={styles.buttonText}>Next Player</Text>
              </Pressable>
            </View>

            <View>
              <Image
                style={styles.imageSize}
                source={players[index].img}
              />
              <Pressable
                style={styles.arcadeButton}
                onPress={choosePlayer}
              >
                <Text style={styles.buttonText}>Pick Player</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <Obstacle />
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
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  playerContainer: {
    margin: 'auto',
    width: '80%',
  },
  player: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00FF00',
    margin: 'auto',
    width: '80%',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 40,
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
  abilityContainer: {
    marginBottom: 15,
    width: 200,
  },
  superPower: {
    fontSize: 15,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statusBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: '#00FF00',
    borderWidth: 1,
  },
  statusBarFill: {
    height: '100%',
    backgroundColor: '#00FF00',
  },
  imageSize: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  arcadeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: '#00FF00',
    alignItems: 'center',
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});
