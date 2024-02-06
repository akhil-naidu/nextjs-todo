import http from '@/lib/axios';

export const currUser = async () => {
  try {
    const res = await http.get('/api/users/me');

    return res.data.user;
  } catch (error) {
    console.log(error);
  }
};
