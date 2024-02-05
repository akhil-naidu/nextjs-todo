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
export default function TodoCard() {
  return (
    <div>
      <Card className=" w-full md:w-[400px] px-4 py-3 mb-4">
        <div className="flex justify-between items-center">
          <h1>Todo item</h1>
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
                            <Input id="name" className="col-span-3" />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button>
                      {" "}
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
