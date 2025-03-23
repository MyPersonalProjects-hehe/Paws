import { useState } from 'react';
import { Animated, Dimensions, Image } from 'react-native';

export default function Obstacle({ setScore }: any) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get('screen');
  const [obstacles, setObstacles] = useState<any[]>([]);
  let currentObstacle: any = null;
  const index = 0;

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

  // useEffect(() => {
  //   // First interval: spawn every 2 seconds
  //   const intervalSlow = setInterval(() => {
  //     createObstacle();
  //   }, 2000);

  //   // After 2 minutes, stop slow interval and start faster one
  //   const switchToFastSpawn = setTimeout(() => {
  //     clearInterval(intervalSlow); // Stop the slow one

  //     // Start fast interval: spawn every 1 second
  //     const intervalFast = setInterval(() => {
  //       createObstacle();
  //     }, 600);

  //     // Clean up fast interval when component unmounts
  //     return () => clearInterval(intervalFast);
  //   }, 10000); // 2 minutes = 120000 ms

  //   // Clean up everything when component unmounts
  //   return () => {
  //     clearInterval(intervalSlow);
  //     // clearTimeout(switchToFastSpawn);
  //   };
  // }, []);

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
            source={require('@/assets/images/planet-2.png')}
          />
        </Animated.View>
      ))}
    </>
  );
}
