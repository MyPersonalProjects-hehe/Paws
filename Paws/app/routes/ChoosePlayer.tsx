import { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

export default function ChoosePlayer() {
  /**Keeping track of rotation*/
  const [indexes, setIndexes] = useState({
    playerIndex: 0,
    modeIndex: 0,
    weaponIndex: 0,
  });
  /**Toggle button color */
  const [isSelected, setIsSelected] = useState({
    playerSelected: false,
    weaponSelected: false,
  });
  const router = useNavigation<any>();
  const players = [
    {
      characterName: 'Galaxy',
      superPowers: [
        { name: 'Immortality', value: 90 },
        { name: 'Deadly Points', value: 50 },
        { name: 'Can eat tuna fish for life', value: 75 },
      ],
      img: require('@/assets/images/players/Galaxy.png'),
    },
    {
      characterName: 'Rocket',
      superPowers: [
        { name: 'Mise hunter', value: 85 },
        { name: 'Deadly Points', value: 30 },
        { name: 'Healer', value: 70 },
      ],
      img: require('@/assets/images/players/Rocket.png'),
    },
    {
      characterName: 'Mars',
      superPowers: [
        { name: 'Time travel', value: 95 },
        { name: 'Deadly Points', value: 70 },
        { name: 'Hates dogs', value: 60 },
      ],
      img: require('@/assets/images/players/Mars.png'),
    },
    {
      characterName: 'Vex',
      superPowers: [
        { name: 'Mind Reader', value: 80 },
        { name: 'Deadly points', value: 60 },
        { name: 'Charms', value: 90 },
      ],
      img: require('@/assets/images/players/Vex.png'),
    },
  ];

  /**Keeping track of selection */
  const [selectedItems, setSelectedItems] = useState({
    mode: require('@/assets/images/backgrounds/background.jpg'),
    player: players[0],
    weapon: require('@/assets/images/weapons/weapon-1.png'),
  });

  const modes = [
    {
      background: require('@/assets/images/backgrounds/background-2.jpg'),
    },
    {
      background: require('@/assets/images/backgrounds/background-3.jpg'),
    },
    {
      background: require('@/assets/images/backgrounds/background-4.jpg'),
    },
    {
      background: require('@/assets/images/backgrounds/background.jpg'),
    },
  ];

  const weapons = [
    {
      weapon: require('@/assets/images/weapons/weapon-1.png'),
    },
    {
      weapon: require('@/assets/images/weapons/weapon-2.png'),
    },
    {
      weapon: require('@/assets/images/weapons/weapon-3.png'),
    },
  ];

  const ChangeMode = () => {
    setIndexes((prev) => ({
      ...prev,
      modeIndex: (prev.modeIndex + 1) % modes.length,
    }));
  };

  const changePlayer = () => {
    setIndexes((prev) => ({
      ...prev,
      playerIndex: (prev.playerIndex + 1) % players.length,
    }));
    setIsSelected((prev) => ({
      ...prev,
      playerSelected: false,
    }));
  };

  const selectPlayer = () => {
    setSelectedItems((prev) => ({
      ...prev,
      player: players[indexes.playerIndex],
    }));
    setIsSelected((prev) => ({
      ...prev,
      playerSelected: true,
    }));
  };

  const changeWeapon = () => {
    setIndexes((prev) => ({
      ...prev,
      weaponIndex: (prev.weaponIndex + 1) % weapons.length,
    }));
    setIsSelected((prev) => ({
      ...prev,
      weaponSelected: false,
    }));
  };

  const selectWeapon = () => {
    setSelectedItems((prev) => ({
      ...prev,
      weapon: weapons[indexes.weaponIndex],
    }));
    setIsSelected((prev) => ({
      ...prev,
      weaponSelected: true,
    }));
  };

  const startGame = () => {
    router.navigate('Gameplay', {
      background: selectedItems.mode,
      player: selectedItems.player,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={selectedItems.mode}
        style={styles.background}
      >
        <Text
          style={[
            {
              margin: 'auto',
            },
            styles.textStyling,
          ]}
        >
          Select player and weapon to blast obstacles
        </Text>
        <Pressable
          style={[
            styles.button,
            {
              width: '20%',
              margin: 'auto',
            },
          ]}
          onPress={startGame}
        >
          <Text style={styles.buttonText}>Start Game</Text>
        </Pressable>
        <View style={styles.gameSettings}>
          {/**Player Abilities*/}
          <View style={styles.greenContainers}>
            <View
              style={{
                marginTop: 70,
              }}
            >
              <Text style={styles.textStyling}>
                {players[indexes.playerIndex].characterName}
              </Text>
              <FlatList
                data={players[indexes.playerIndex].superPowers}
                keyExtractor={(_, index) => index.toString()}
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
            </View>
            {/**Players */}
            <View>
              <Image
                style={styles.imageSize}
                source={players[indexes.playerIndex].img}
              />
              <Pressable
                style={[
                  styles.button,
                  isSelected.playerSelected && {
                    backgroundColor: '#00FF00',
                  },
                ]}
                onPress={selectPlayer}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isSelected.playerSelected && {
                      color: 'black',
                    },
                  ]}
                >
                  Select
                </Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={changePlayer}
              >
                <Text style={styles.buttonText}>Next Player</Text>
              </Pressable>
            </View>
          </View>
          {/**Gameplay */}
          <View style={styles.greenContainers}>
            {/**Weapon */}
            <View>
              <View style={styles.weapon}>
                <Image
                  source={weapons[indexes.weaponIndex].weapon}
                  style={styles.weaponSize}
                />
              </View>
              <Pressable
                style={styles.button}
                onPress={changeWeapon}
              >
                <Text style={styles.buttonText}>Next Weapon</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  isSelected.weaponSelected && {
                    backgroundColor: '#00FF00',
                  },
                ]}
                onPress={selectWeapon}
              >
                <Text
                  style={[
                    styles.buttonText,
                    isSelected.weaponSelected && {
                      color: 'black',
                    },
                  ]}
                >
                  Select
                </Text>
              </Pressable>
            </View>
            {/**Mode */}
            <View>
              <View style={styles.border}>
                <Image
                  source={modes[indexes.modeIndex].background}
                  style={styles.backgroundImage}
                />
              </View>
              <Pressable
                style={styles.button}
                onPress={ChangeMode}
              >
                <Text style={styles.buttonText}>Next</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() =>
                  setSelectedItems((prev) => ({
                    ...prev,
                    mode: modes[indexes.modeIndex].background,
                  }))
                }
              >
                <Text style={styles.buttonText}>Change Mode</Text>
              </Pressable>
            </View>
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
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  gameSettings: {
    margin: 'auto',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  greenContainers: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 50,
    paddingHorizontal: 70,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00FF00',
    margin: 'auto',
    gap: 35,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 40,
  },
  textStyling: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 20,
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
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 3,
    borderColor: '#00FF00',
    alignItems: 'center',
    boxShadow: '0px 0px 10px rgba(0, 255, 0, 0.9)',
    elevation: 10,
    borderRadius: 8,
    marginVertical: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
  },
  backgroundImage: {
    width: 270,
    height: 270,
    borderRadius: 8,
  },
  weaponSize: {
    width: 230,
    height: 230,
  },
  weapon: {
    boxShadow: '0px 0px 10px rgba(0, 255, 0, 0.9)',
    elevation: 10,
    borderRadius: 8,
    padding: 20,
  },
  border: {
    boxShadow: '0px 0px 10px rgba(0, 255, 0, 0.9)',
    borderRadius: 8,
  },
});
