import { useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PickedPlayer } from '../interface/PickedPlayer';
import React from 'react';
import Obstacle from '@/components/obstacle/Obstacle';
import { useRoute } from '@react-navigation/native';

export default function Gameplay() {
  const route = useRoute();
  const { background }: any = route.params || {};
  const { player }: any = route.params || {};
  const pan = useRef(
    new Animated.ValueXY({
      x: 500,
      y: 350,
    })
  ).current;
  const [score, setScore] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    })
  ).current;

  return (
    <ImageBackground
      source={background}
      style={styles.backgroundImage}
    >
      <View>
        <Text style={styles.score}>Whiskas Points {score}</Text>
      </View>
      <View>
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <Image
            source={player.img}
            style={styles.imageSize}
          />
        </Animated.View>
      </View>
      <Obstacle setScore={setScore} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },

  imageSize: {
    width: 300,
    height: 300,
    cursor: 'pointer',
  },
  score: {
    alignContent: 'center',
    width: 500,
    height: 100,
    borderWidth: 2,
    borderColor: '#00FF00',
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00FF00',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    textAlign: 'center',
    boxShadow: '0px 0px 10px rgba(0, 255, 0, 0.9)',
    elevation: 10,
  },
});
