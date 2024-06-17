import { Button } from "@/components/ui/button";
import { RiAddLargeLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

const SuggestionResponse = () => {
  return (
    <div className="flex gap-20 mt-4 justify-center">
      <Button variant="outline">
        <RiAddLargeLine />
      </Button>
      <Button variant="outline">
        <AiOutlineClose />
      </Button>
    </div>
  );
};

export default SuggestionResponse;
