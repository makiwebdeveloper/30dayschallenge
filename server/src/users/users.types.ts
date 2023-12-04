// TYPES
export interface IUser {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  name: string;
  imageUrl: string;
}

// SELECTS
export const UserSelect = {
  id: true,
  createdAt: true,
  updatedAt: true,
  username: true,
  name: true,
  imageUrl: true,
};
