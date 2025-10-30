import React, { useState } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SquarePen, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "react-toastify";
import api from "@/api/axios";
const NameCard = ({ name, index, handleNameAdded }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [nameInput, setNameInput] = useState("");

  const handleEdit = () => {
    setIsEditting(true);
  };

  const updateNameInput = async () => {
    try {
      await api.put(`/names/${name._id}`, { name: nameInput });
      toast.success("Cập nhật tên thành công!");
      setIsEditting(false);
      handleNameAdded();
    } catch (error) {
      console.error("Lỗi cập nhật tên!", error);
      toast.error("Lỗi cập nhật tên!");
    }
  };

  const deleteNameInput = async () => {
    try {
      await api.delete(`/names/${name._id}`);
      toast.success("Xóa tên thành công!");
      handleNameAdded();
    } catch (error) {
      console.error("Lỗi khi xóa tên!", error);
      toast.error("Chức năng xóa lại lỗi rồi@@!");
    }
  };

  const handleEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      updateNameInput();
    }
  };
  return (
    <Card key={index} className="px-4 mt-4 group">
      <div className="flex justify-between items-center gap-4 group ">
        {isEditting ? (
          <Input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onBlur={() => {
              setIsEditting(false);
              setNameInput(name.name || "");
            }}
            onKeyPress={handleEnterKeyDown}
          />
        ) : (
          <p>{name.name}</p>
        )}

        <div className="flex gap-8 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500">
          {/* Sửa */}
          <Button
            variant=""
            size=""
            className="cursor-pointer"
            onClick={(e) => {
              handleEdit();
              setNameInput(name.name || "");
            }}
          >
            <SquarePen className="" />
          </Button>
          {/* XÓA */}
          <Button
            onClick={deleteNameInput}
            variant="destructive"
            size=""
            className="cursor-pointer"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NameCard;
