import http from "@/lib/axios";

export const addTodo = async (data: any) => {
  try {
    const res = await http.post("/api/todos", data);

    return res.data.doc;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (data: any) => {
  try {
    const res = await http.delete(`/api/todos/${data}`);

    return res.data.doc;
  } catch (error) {
    console.log(error);
  }
};

export const editTodo = async (id: string, data: any) => {
  try {
    const res = await http.put(`/api/todos/${id}`, data);

    return res.data.doc;
  } catch (error) {
    console.log(error);
  }
};
