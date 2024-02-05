import http from '@/lib/axios';

export const addTodo = async (data: any) => {
  try {
    const res = await http.post('/api/todos', data);

    return res.data.doc;
  } catch (error) {
    console.log(error);
  }
};
