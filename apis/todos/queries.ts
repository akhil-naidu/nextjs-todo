import http from '@/lib/axios';

export const getAllTodos = async () => {
  try {
    const res = await http.get('/api/todos');

    return res.data.docs;
  } catch (error) {
    console.log(error);
  }
};
