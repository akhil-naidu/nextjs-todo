import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { keys } from "@/apis/query-keys";
import { deleteTodo, editTodo } from "@/apis/todos/mutations";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function TodoCard({
  item,
  addTodoVariables,
  isAddTodoPending,
}: {
  item: any;
  addTodoVariables: any;
  isAddTodoPending: any;
}) {
  const queryClient = useQueryClient();
  const {
    isPending: isDeleteTodoPending,
    variables: DeleteTodoVariables,
    mutate: DeleteTodoMutation,
  } = useMutation({
    mutationKey: keys(`/api/users/todos/`, "delete").main(),
    mutationFn: (todoData: any) => deleteTodo(todoData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys("/api/todos", "get").main(),
      });
    },
  });

  const {
    isPending: isEditTodoPending,
    variables: EditTodoVariables,
    mutate: EditTodoMutation,
  } = useMutation({
    mutationKey: keys(`/api/users/todos/`, "patch").main(),
    mutationFn: (obj: any) => editTodo(obj.id, { task: obj.task }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: keys("/api/todos", "get").main(),
      });
    },
  });

  console.log(item);
  const [input, setInput] = useState<string>();
  return (
    <div>
      <Card className=" w-full md:w-[400px] px-4 py-3 mb-4">
        <div className="flex justify-between items-center">
          <h1>{isAddTodoPending ? addTodoVariables.task : item.task}</h1>
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer">
                <BsThreeDotsVertical size={18} />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-45">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid grid-cols-1 items-center gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">
                          <FaEdit size={18} className="text-yellow-400 mr-2" />
                          Edit Profile
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Edit Todo</DialogTitle>
                          <DialogDescription>
                            Make changes to your Todo here. Click save when
                            done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                              Todo
                            </Label>
                            <Input
                              placeholder={item.task}
                              id="name"
                              className="col-span-3"
                              onChange={(e) => {
                                setInput(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            type="submit"
                            onClick={() => {
                              EditTodoMutation({ id: item.id, task: input });
                            }}
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      onClick={() => {
                        DeleteTodoMutation(item.id);
                      }}
                    >
                      <FaEdit size={18} className="text-red-400 mr-2" /> Delete
                      Todo
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Card>
    </div>
  );
}
