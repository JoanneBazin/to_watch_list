import ReceivedMessages from "@/components/ReceivedMessages";
import SuggestionsList from "@/components/SuggestionsList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SuggestionsPage = () => {
  return (
    <Tabs defaultValue="suggestions" className=" m-8">
      <TabsList>
        <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        <TabsTrigger value="messages">Messages</TabsTrigger>
      </TabsList>

      <TabsContent value="suggestions">
        <SuggestionsList />
      </TabsContent>

      <TabsContent value="messages">
        <ReceivedMessages />
      </TabsContent>
    </Tabs>
  );
};

export default SuggestionsPage;
