"use client";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";

type Inputs = {
  category: string;
};

const AddCategory = () => {
  const [newCategory, setNewCategory] = useState<string>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data.category);
    setNewCategory(data.category);

    //   console.log(watch("category"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Category" {...register("category")} />
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default AddCategory;
