import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import api from "@/api/axios";
import { toast } from "react-toastify";

const AddName = ({ handleNameAdded }) => {
  const [name, setName] = useState("");
  const addName = async () => {
    try {
      await api.post("/names", { name: name });
      toast.success("Thêm tên mới thành công!");
      setName("");
      handleNameAdded();
    } catch (error) {
      console.error("Error from post", error);
      toast.error("Lỗi thêm tên mới!");
    }
  };
  return (
    <div className="flex gap-2">
      <Input
        type="text"
        placeholder="Nhập tên bạn đang nghĩ trong đầu vào đây đi!"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button disabled></button>
      <Button
        disabled={!name}
        onClick={addName}
        variant=""
        size=""
        className="cursor-pointer"
      >
        Thêm
      </Button>
    </div>
  );
};

export default AddName;
