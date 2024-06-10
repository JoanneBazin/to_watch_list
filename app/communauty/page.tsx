import FriendRequests from "@/components/FriendRequests";

import FriendsList from "@/components/FriendsList";
import UserSearch from "@/components/actions/social/UserSearch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CommunautyPage = async () => {
  return (
    <div>
      <h1 className="m-10 p-8 text-3xl border rounded-md">Communauté</h1>

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
