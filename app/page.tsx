"use client";

import { login, logout } from "@/apis/auth";
import { keys } from "@/apis/query-keys";
import { addTodo, getAllTodos } from "@/apis/todos";
import TodoCard from "@/components/TodoCard";
import TodoCardSkeleton from "@/components/TodoCardSkeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Card } from "@/components/ui/card";
const Todo = () => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState<string>();

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

  const { data: todoData, isLoading } = useQuery({
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
    <div className="flex flex-col items-center pt-[50px] min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-10">
      <Button
        onClick={() =>
          loginMutation({
            email: "36rahaman@gmail.com",
            password: "123456",
          })
        }
      >
        Login
      </Button>

      {/* <main className="w-full max-w-md mx-auto flex justify-around">
        <Button
          onClick={() =>
            loginMutation({
              email: "36rahaman@gmail.com",
              password: "123456",
            })
          }
        >
          Login
        </Button>
        {/* <Button onClick={() => addTodoMutation({ task: "akhil" })}>
          AddTodo
        </Button>
        <Button onClick={() => logoutMutation()}>Logout</Button> 
      </main>
      */}

      <main className="flex gap-4 mb-[20px] h-auto w-full md:md:w-[400px] ">
        <Input
          className="py-6"
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
          placeholder="Enter Todo"
          required={true}
        />
        <Button
          className="py-6"
          onClick={() => {
            addTodoMutation({ task: input });
            setInput("");
          }}
        >
          Add Todo
        </Button>
      </main>
      <div>
        {isAddTodoPending && (
          <div className="w-full md:w-[400px] ">
            <Card className="w-full md:w-[400px] px-4 py-4 mb-4 bg-pink-200">
              <div className="flex justify-between items-center">
                <h1>{addTodoVariables.task} </h1>
              </div>
            </Card>
          </div>
        )}
        {isLoading ? (
          <TodoCardSkeleton />
        ) : (
          todoData?.map((todo: any) => {
            return (
              <div key={todo.id}>
                <TodoCard
                  item={todo}
                  isAddTodoPending={isAddTodoPending}
                  addTodoVariables={addTodoVariables}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Todo;
