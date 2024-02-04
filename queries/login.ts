import http from '@/lib/axios';

export const login = async (data: any) => {
  try {
    await http.post('/api/users/login', data);

    return {};
  } catch (error) {
    console.log(error);
  }
};
