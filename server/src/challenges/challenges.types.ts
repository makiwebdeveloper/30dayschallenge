import { IDay } from 'src/days/days.types';
import { IUser } from 'src/users/users.types';

// TYPES
export interface IMemberChallenge {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  challengeId: string;
  userId: string;
  days: IDay[];
}

export interface IChallenge {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description?: string;
  creator: IUser;
  members: IMemberChallenge[];
}

// SELECTS
export const DaysOrder: {
  orderBy: {
    number: 'asc' | 'desc';
  };
} = {
  orderBy: {
    number: 'asc',
  },
};

export const MemberChallengeSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  challengeId: true,
  userId: true,
  days: DaysOrder,
};

export const ChallengeSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  title: true,
  description: true,
};
