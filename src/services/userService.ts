import axios from 'axios';
import type { User } from '../types/user';

const API_URL = 'https://dummyjson.com/users';

export const fetchUsersApi = async (): Promise<User[]> => {
  try {
    const response = await axios.get<{ users: User[] }>(API_URL);
    return response.data.users; 
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error';
    throw new Error(errorMessage);
  }
};