import { Difficulty } from '@prisma/client';

export interface IDay {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  number: number;
  feelings?: string;
  difficulty?: Difficulty;
  completed: boolean;
  memberChallengeId: string;
}
