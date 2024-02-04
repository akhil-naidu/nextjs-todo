import http from '@/lib/axios';

export const todos = async () => {
  try {
    const res = await http.get('/api/todos');

    //  console.log(res.data.docs);

    return res.data.docs;
  } catch (error) {}
};
