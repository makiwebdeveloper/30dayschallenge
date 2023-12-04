import { IUser } from 'src/users/users.types';

export interface IFriendshipRequest {
  toUserId: string;
  fromUserId: string;
  fromUser: IUser;
}
