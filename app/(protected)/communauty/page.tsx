"use client";

import FriendRequests from "@/src/features/social/components/FriendRequests";
import FriendsList from "@/src/features/social/components/FriendsList";
import UserSearch from "@/src/features/social/components/UserSearch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/src/components/ui";

const CommunautyPage = () => {
  return (
    <div>
      <h2 className="m-10 p-8 text-3xl border rounded-md">Communauté</h2>

      <Tabs defaultValue="contacts" className=" m-8">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="search">Parcourir</TabsTrigger>
          <TabsTrigger value="requests">Demandes en attente</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <FriendsList />
        </TabsContent>

        <TabsContent value="search">
          <UserSearch />
        </TabsContent>

        <TabsContent value="requests">
          <FriendRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunautyPage;
