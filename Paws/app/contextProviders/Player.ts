import { createContext } from 'react';
import { PickedPlayer } from '../interface/PickedPlayer';

interface PlayerProps {
  player: PickedPlayer | null;
  setPlayer: (player: PickedPlayer | null) => void;
}

export const PlayerContext = createContext<PlayerProps | null>(null);
