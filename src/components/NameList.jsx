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
import NameCard from "./NameCard";
import NameNotFound from "./NameNotFound";

const NameList = ({ nameBuffer, handleNameAdded }) => {
  if (nameBuffer.length === 0) {
    return <NameNotFound />;
  }
  return (
    <div className="mt-20 ">
      {nameBuffer.map((name, index) => (
        <NameCard
          name={name}
          index={index}
          key={index}
          handleNameAdded={handleNameAdded}
        />
      ))}
    </div>
  );
};

export default NameList;
