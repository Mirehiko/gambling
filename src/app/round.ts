import { User } from './user';

export interface Round {
  isPrepare: boolean;
  isActive: boolean;
  isEnded: boolean;
  rate: string;
  users: User[];
}
