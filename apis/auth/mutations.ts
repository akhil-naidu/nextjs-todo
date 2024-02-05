import http from '@/lib/axios';

export const login = async (data: any) => {
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
