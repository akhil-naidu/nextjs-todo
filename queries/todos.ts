import http from '@/lib/axios';

export const getAllTodos = async () => {
  try {
    const res = await http.get('/api/todos');

    return res.data.docs;
  } catch (error) {}
};

export const addTodo = async (data: any) => {
  try {
    const res = await http.post('/api/todos', data);

    console.log(res.data.doc);

    return res.data.doc;
  } catch (error) {}
};
