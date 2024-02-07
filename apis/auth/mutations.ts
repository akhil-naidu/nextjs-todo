import http from '@/lib/axios';
import { User } from '@/types/payload-types';

export const login = async (data: User) => {
  try {
    await http.post('/api/users/login', data);
    return {};
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const res = await http.post('/api/users/logout');
    return res.data.message;
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (data: User) => {
  try {
    const res = await http.post('/api/users', data);
    return res.data.doc;
  } catch (error) {
    console.log(error);
  }
};
