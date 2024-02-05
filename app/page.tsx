"use client";

import { login, logout } from "@/apis/auth";
import { keys } from "@/apis/query-keys";
import { addTodo, getAllTodos } from "@/apis/todos";
import TodoCard from "@/components/TodoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Todo = () => {
  const queryClient = useQueryClient();

  const {
    isPending: isLoginPending,
    variables: loginVariables,
    mutate: loginMutation,
  } = useMutation({
    mutationKey: keys("/api/users/login", "post").main(),
    mutationFn: (userDetails: any) => login(userDetails),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys("/api/todos", "get").main(),
      });
    },
  });

  const {
    isPending: isLogoutPending,
    variables: logoutVariables,
    mutate: logoutMutation,
  } = useMutation({
    mutationKey: keys("/api/users/logout", "post").main(),
    mutationFn: () => logout(),
    onSuccess: async () => {
      await queryClient.setQueryData(keys("/api/todos", "get").main(), []);
    },
  });

  const { data: todoData } = useQuery({
    queryKey: keys("/api/todos", "get").main(),
    queryFn: getAllTodos,
  });

  const {
    isPending: isAddTodoPending,
    variables: addTodoVariables,
    mutate: addTodoMutation,
  } = useMutation({
    mutationKey: keys("/api/users/todos", "post").main(),
    mutationFn: (todoData: any) => addTodo(todoData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys("/api/todos", "get").main(),
      });
    },
  });

  return (
    <div className="flex flex-col items-center pt-[50px] min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <main className="w-full max-w-md mx-auto flex justify-around">
        <Button
          onClick={() =>
            loginMutation({
              email: "kaparapu.akhilnaidu@gmail.com",
              password: "iwillhack",
            })
          }
        >
          Login
        </Button>
        <Button onClick={() => addTodoMutation({ task: "akhil" })}>
          AddTodo
        </Button>
        <Button onClick={() => logoutMutation()}>Logout</Button>
      </main> */}

      <main className="flex gap-4 mb-[20px] h-auto w-full md:md:w-[400px] ">
        <Input className="py-6" type="text" placeholder="Enter Todo" />
        <Button className="py-6">Add Todo</Button>
      </main>
      <div>
        {isAddTodoPending && (
          <div className="opacity-50 py-2 px-4 bg-red-200 w-60  m-4 text-center rounded-md">
            {addTodoVariables.task}
          </div>
        )}
        {todoData?.map((todo: any) => {
          return (
            <div
              className="py-2 px-4 bg-gray-200 w-60  m-4 text-center rounded-md"
              key={todo.id}
            >
              {todo.task}
            </div>
          );
        })}
      </div>
      <TodoCard />
    </div>
  );
};

export default Todo;
