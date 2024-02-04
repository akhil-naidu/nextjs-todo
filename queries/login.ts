import http from '@/lib/axios';

export const login = async (data: any) => {
  try {
    const res = await http.post('/api/users/login', data);

    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
