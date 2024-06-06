"use client";

import UserAvatar from "@/components/layout/Icons/Avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProps } from "@/lib/types";

export const User = ({ name, email, avatar, id }: UserProps) => {
  return (
    <div className="flex flex-col gap-10 items-center ">
      <Card className=" flex flex-col w-1/2 items-center justify-center">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <UserAvatar />
        </CardContent>
        <CardFooter>{email}</CardFooter>
      </Card>
    </div>
  );
};
