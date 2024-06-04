// "use client";

import { AuthOptions } from "@/app/api/auth/[...nextauth]/options";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export const User = async () => {
  //   Return ==> Client call
  //   const { data: session } = useSession();

  const session = await getServerSession(AuthOptions);

  if (!session) {
    return null;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>{session.user.name}</CardTitle>
      </CardHeader>
      <CardContent>{session.user.email}</CardContent>
    </Card>
  );
};
