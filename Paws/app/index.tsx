import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import User from './interface/User';
import { PickedPlayer } from './interface/PickedPlayer';
import { UserContext } from './contextProviders/User';
import { PlayerContext } from './contextProviders/Player';
import Register from './routes/Register';
import Gameplay from './routes/Gameplay';
import Home from './routes/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [player, setPlayer] = useState<PickedPlayer | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <PlayerContext.Provider value={{ player, setPlayer }}>
        <Stack.Navigator>
          <Stack.Screen
            name='Register'
            component={Register}
          />
          <Stack.Screen
            name='Home'
            component={Home}
          />
          <Stack.Screen
            name='Gameplay'
            component={Gameplay}
          />
        </Stack.Navigator>
      </PlayerContext.Provider>
    </UserContext.Provider>
  );
}
