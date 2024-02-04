import http from '@/lib/axios';

export const logout = async () => {
  try {
    await http.post('/api/users/logout');
  } catch (error) {
    console.log(error);
  }
};
