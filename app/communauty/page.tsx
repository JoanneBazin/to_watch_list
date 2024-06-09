import UserSearch from "@/components/actions/social/UserSearch";

import FriendsList from "@/components/FriendsList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CommunautyPage = async () => {
  return (
    <div>
      <h1 className="m-10 p-8 text-3xl border rounded-md">Communauté</h1>

      <Tabs defaultValue="contacts" className="w-2/3 m-8">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="requests">Demandes en attentes</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <UserSearch />
          <FriendsList />
        </TabsContent>

        <TabsContent value="requests">{/* <FriendRequests /> */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunautyPage;
