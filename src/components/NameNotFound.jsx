import React from "react";
import { Card } from "./ui/card";
import { Target } from "lucide-react";

const NameNotFound = () => {
  return (
    <div className="my-10">
      <Card>
        <div className="flex flex-col gap-4 justify-center items-center ">
          <Target className="size-10" />
          <p>Không còn cái tên nào hết, thêm tên đi bro!</p>
        </div>
      </Card>
    </div>
  );
};

export default NameNotFound;
