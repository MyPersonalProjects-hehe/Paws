import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Obstacle() {
  const [score, setScore] = useState(0);

  /**Timer IDs */
  let easy = useRef<any>(null);
  let medium = useRef<any>(null);
  let hard = useRef<any>(null);
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('screen');
  const [obstacles, setObstacles] = useState<any[]>([]);

  const createObstacle = () => {
    const animatedValue = new Animated.Value(-900);
    const leftPosition = Math.random() * (SCREEN_WIDTH - 110);
    const id = Date.now() + Math.random();

    /*Animate down to bottom of screen*/
    Animated.timing(animatedValue, {
      toValue: SCREEN_HEIGHT + 1700,
      duration: 4000,
      useNativeDriver: false,
    }).start(() => {
      setObstacles((prev) => prev.filter((obs) => obs.id !== id));
      setScore((prev: any) => prev + 1);
    });

    setObstacles((prev) => [
      ...prev,
      { id, animatedValue, left: leftPosition },
    ]);
  };

  useEffect(() => {
    /**First interval */
    easy.current = setInterval(() => {
      createObstacle();
    }, 2000);

    /**Clear previous and start new one  */
    setTimeout(() => {
      clearInterval(easy.current);
      medium.current = setInterval(() => {
        createObstacle();
      }, 1500);
    }, 15000);

    setTimeout(() => {
      clearInterval(medium.current);
      hard.current = setInterval(() => {
        createObstacle();
      }, 1000);
    }, 30000);

    setTimeout(() => {
      clearInterval(hard.current);
    }, 40000);
  }, []);

  return (
    <>
      <View>
        <Text style={styles.score}>Whiskas Points {score}</Text>
      </View>
      {obstacles.map((obstacle, index) => (
        <Animated.View
          key={index}
          style={{
            position: 'absolute',
            left: obstacle.left,
            transform: [{ translateY: obstacle.animatedValue }],
          }}
        >
          <Image
            style={{
              width: 110,
              height: 110,
            }}
            source={require('@/assets/images/obstacles/obstacle.png')}
          />
        </Animated.View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  score: {
    position: 'absolute',
    top: -250,
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
