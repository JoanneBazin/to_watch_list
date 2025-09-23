import FriendRequests from "@/components/features/social/FriendRequests";
import FriendsList from "@/components/features/social/FriendsList";
import UserSearch from "@/components/features/social/UserSearch";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/src/components/ui/tabs";

const CommunautyPage = async () => {
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
