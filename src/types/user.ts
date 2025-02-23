export type User = {
  id: string;
  email: string;
  name: string;
  accountType: 'customer' | 'expert';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
};

export type UserResponse = {
  data: User;
  message: string;
}; 