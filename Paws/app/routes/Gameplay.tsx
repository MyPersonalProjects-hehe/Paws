import { useRef, useState } from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';
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
        <Animated.View
          style={{
            transform: [{ translateX: pan.x }, { translateY: pan.y }],
          }}
          {...panResponder.panHandlers}
        >
          <Image
            source={player?.img}
            style={styles.imageSize}
          />
        </Animated.View>
      </View>
      <Obstacle />
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
});
