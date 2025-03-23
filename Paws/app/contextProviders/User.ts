import { createContext } from 'react';
import User from '../interface/User';

interface UserProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const UserContext = createContext<UserProps | null>(null);
