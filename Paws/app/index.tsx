import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { PickedPlayer } from './interface/PickedPlayer';
import { UserContext } from './contextProviders/User';
import { PlayerContext } from './contextProviders/Player';
import User from './interface/User';
import Register from './routes/Register';
import Gameplay from './routes/Gameplay';
import ChoosePlayer from './routes/ChoosePlayer';
import CreateProfile from './routes/CreateProfile';

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
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='ChoosePlayer'
            component={ChoosePlayer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='CreateProfile'
            component={CreateProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Gameplay'
            component={Gameplay}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </PlayerContext.Provider>
    </UserContext.Provider>
  );
}
