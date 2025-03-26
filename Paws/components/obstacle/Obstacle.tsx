import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image } from 'react-native';

export default function Obstacle({ setScore }: any) {
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

    // Animate down to bottom of screen
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
    }, 9000);

    setTimeout(() => {
      clearInterval(medium.current);
      hard.current = setInterval(() => {
        createObstacle();
      }, 1000);
    }, 20000);

    setTimeout(() => {
      clearInterval(hard.current);
    }, 35000);
  }, []);

  return (
    <>
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
